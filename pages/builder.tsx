import {
  Box,
  HStack,
  VStack,
  Text,
  Input,
  Button,
  Select,
  Switch,
  Image,
  Spinner,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "@styles/Builder.module.css";
import { useCallback, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import db from "@firebase/firebase";
import withTransition from "@components/withTransition";
import { useAccount, useSigner } from "wagmi";
import { Tooltip } from "@chakra-ui/react";
import { Web3Storage } from "web3.storage";
import { abridgeAddressShort } from "@utils/abridgeAddress";
import CommunityNFT from "@data/CommunityNFT.json";
import { ethers } from "ethers";
import Link from "next/link";

const WEB3_STORAGE_TOKEN =
  process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERjNTkyMTc3NjlhNjFkMjU1NzliMDlmNzhBQWMyYkNGMTY0NDcxMmQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjEwNTcyNzU5NDMsIm5hbWUiOiJnaWZ0bHkifQ.0behxUifkGPImkPNiaZOFw-61QP8NszNvw6UOEd1Eyo";

const themes = [
  {
    id: "midnight",
    name: "Midnight Dark",
    foregroundColor: "#1a1820",
    backgroundColor: "#100e14",
    foregroundClassname: "midnightDarkFg",
    foregroundClassname2: "midnightDarkArtworkFg",
    backgroundClassname: "midnightDarkBg",
  },
  {
    id: "cream",
    name: "Solid Cream",
    foregroundColor: "#ffffff",
    backgroundColor: "#f8f8f8",
    foregroundClassname: "solidCreamFg",
    foregroundClassname2: "solidCreamArtworkFg",
    backgroundClassname: "solidCreamBg",
  },
  {
    id: "pastel",
    name: "Pastel Lavender",
    foregroundColor: "#d4c8f5",
    backgroundColor: "#ad9dce",
    foregroundClassname: "pastelLavenderFg",
    foregroundClassname2: "pastelLavenderArtworkFg",
    backgroundClassname: "pastelLavenderBg",
  },
];

const client = new Web3Storage({
  token: WEB3_STORAGE_TOKEN,
  endpoint: new URL("https://api.web3.storage"),
});

const Builder: NextPage = () => {
  const { data: signer, isError } = useSigner();
  const { address: userAddress } = useAccount();
  const [publishedContract, setPublishedContract] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("midnight");
  const [uploadedLogoFile, setUploadedLogoFile] = useState<any>("");
  const [uploadedLogoURL, setUploadedLogoURL] = useState<string>("");
  const [communityName, setCommunityName] = useState<string>("");
  const [communitySymbol, setCommunitySymbol] = useState<string>("");
  const [communityDescription, setCommunityDescription] = useState<string>("");
  const [communityURL, setCommunityURL] = useState<string>("");
  const [protocolAddress, setProtocolAddress] = useState<string>("");
  const [tokenSupply, setTokenSupply] = useState<string>("1");
  const [githubURL, setGithubURL] = useState<string>("");
  const [showRank, setShowRank] = useState<boolean>(true);
  const [showTier, setShowTier] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSocial, setSelectedSocial] = useState<string>("");

  async function deployContract() {
    if (!signer) return;
    setLoading(true);

    try {
      const [collectionURI, imageURI] = await uploadMetadata();

      const contractFactory = new ethers.ContractFactory(
        CommunityNFT.abi,
        CommunityNFT.bytecode,
        signer
      );

      const contract = await contractFactory.deploy(
        tokenSupply,
        `${communityName} Community NFT`,
        communitySymbol,
        collectionURI
      );

      console.log("contrat deployed");
      console.log("contract: ", contract);
      console.log("contract address: ", contract.address);
      setPublishedContract(contract.address);
      saveContract(contract.address, imageURI);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  const saveContract = useCallback(
    async (contractAddress: string, imageURI: string) => {
      const docRef = doc(db, "contracts", contractAddress.toLowerCase());
      await setDoc(docRef, {
        owner: userAddress?.toLowerCase(),
        address: contractAddress.toLowerCase(),
        name: communityName,
        symbol: communitySymbol,
        link: communityURL,
        description: communityDescription,
        theme: selectedTheme,
        tokenSupply: tokenSupply,
        users: [],
        protocolAddress:
          protocolAddress ?? "0x48adbf604c7ff9e2b2e8c01b243ba446538972ea", // TODO: dynamic
        githubRepoURL: githubURL ?? "https://github.com/iamminci/verbsdao",
        updateInterval: "monthly",
        createdAt: new Date(),
        logoURL: imageURI,
      });
    },
    [
      communityDescription,
      communityName,
      communitySymbol,
      communityURL,
      githubURL,
      protocolAddress,
      selectedTheme,
      tokenSupply,
      userAddress,
    ]
  );

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setUploadedLogoURL(url);
    setUploadedLogoFile(event.target.files[0]);
  };

  const getFilesObject = useCallback(
    (imageCID?: string) => {
      const formData = {
        name: `${communityName} Community NFT`,
        description: communityDescription,
        image: imageCID
          ? `https://${imageCID}.ipfs.w3s.link/logo.png`
          : "https://bafybeidsw3nosqs6ydqwak2fry3wmb3dklgmml54n55j2jnu32zubesxji.ipfs.w3s.link/logo.png",
        external_link: communityURL,
      };

      const blob = new Blob([JSON.stringify(formData)], {
        type: "application/json",
      });

      const files = [new File([blob], "metadata.json")];
      return files;
    },
    [communityDescription, communityName, communityURL]
  );

  const uploadMetadata = useCallback(async () => {
    let imageCID;
    if (uploadedLogoFile) {
      const blob = new Blob([uploadedLogoFile], { type: "image/png" });
      const imageFiles = [new File([blob], "logo.png")];
      imageCID = await client.put(imageFiles);
      console.log("uploaded imageCID: ", imageCID);
    }
    const files = imageCID ? getFilesObject(imageCID) : getFilesObject();
    const imageURI = imageCID
      ? `https://${imageCID}.ipfs.w3s.link/logo.png`
      : "https://bafybeidsw3nosqs6ydqwak2fry3wmb3dklgmml54n55j2jnu32zubesxji.ipfs.w3s.link/logo.png";
    const cid = await client.put(files);
    console.log("uploaded metadataCID:", cid);
    const collectionURI = `https://${cid}.ipfs.w3s.link/metadata.json`;
    return [collectionURI, imageURI];
  }, [getFilesObject, uploadedLogoFile]);

  const handleNameChange = (event: any) => {
    setCommunityName(event.target.value);
  };

  const handleSymbolChange = (event: any) => {
    const ticker = event.target.value.toUpperCase();
    setCommunitySymbol(ticker);
  };

  const handleDescriptionChange = (event: any) => {
    setCommunityDescription(event.target.value);
  };

  const handleURLChange = (event: any) => {
    setCommunityURL(event.target.value);
  };

  const handleProtocolChange = (event: any) => {
    setProtocolAddress(event.target.value);
  };

  const handleGithubURLChange = (event: any) => {
    setGithubURL(event.target.value);
  };

  const handleTokenSupplyChange = (event: any) => {
    setTokenSupply(event.target.value);
  };

  const toggleRank = (event: any) => {
    setShowRank(event.target.checked);
  };

  const toggleTier = (event: any) => {
    setShowTier(event.target.checked);
  };

  function handleSelectSocial(e: any) {
    setSelectedSocial(e.target.value);
  }

  if (!userAddress) {
    return <div>Please connect wallet to continue</div>;
  }

  return (
    <HStack className={styles.container}>
      <Head>
        <title>Credly: NFT Builder</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!publishedContract ? (
        <>
          <Editor
            address={userAddress}
            publishNFT={deployContract}
            setSelectedTheme={setSelectedTheme}
            selectedTheme={selectedTheme}
            handleFileChange={handleFileChange}
            uploadedLogoFile={uploadedLogoFile}
            handleNameChange={handleNameChange}
            communityName={communityName}
            handleSymbolChange={handleSymbolChange}
            communitySymbol={communitySymbol}
            handleDescriptionChange={handleDescriptionChange}
            communityDescription={communityDescription}
            handleURLChange={handleURLChange}
            communityURL={communityURL}
            handleProtocolChange={handleProtocolChange}
            protocolAddress={protocolAddress}
            handleGithubURLChange={handleGithubURLChange}
            githubURL={githubURL}
            handleTokenSupplyChange={handleTokenSupplyChange}
            tokenSupply={tokenSupply}
            handleSelectSocial={handleSelectSocial}
            selectedSocial={selectedSocial}
            toggleRank={toggleRank}
            toggleTier={toggleTier}
            isLoading={loading}
          />
          <Box className={styles.spacer}></Box>
          <Artwork
            address={userAddress}
            selectedTheme={selectedTheme}
            uploadedLogoFile={uploadedLogoFile}
            uploadedLogoURL={uploadedLogoURL}
            tokenSupply={tokenSupply}
            showRank={showRank}
            showTier={showTier}
          />
        </>
      ) : (
        <VStack w="100%">
          <ArtworkPreview
            address={userAddress}
            selectedTheme={selectedTheme}
            uploadedLogoFile={uploadedLogoFile}
            uploadedLogoURL={uploadedLogoURL}
            tokenSupply={tokenSupply}
            showRank={showRank}
            showTier={showTier}
          />
          <Text>
            The BUIDL IT DAO Community NFT has been successfully published!
          </Text>
          <a
            href={`https://polygonscan.com/address/${publishedContract}`}
            rel="noreferrer"
            target="_blank"
          >
            <Text>{`Polygonscan: https://polygonscan.com/address/${publishedContract}`}</Text>
          </a>
          <Link href={`/mint/${publishedContract}`}>
            <Text cursor="pointer">{`Shareable Link: http://app.credly.fun/mint/${publishedContract}`}</Text>
          </Link>
        </VStack>
      )}
    </HStack>
  );
};

type EditorProps = {
  address: string;
  publishNFT: () => void;
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  handleFileChange: (event: any) => void;
  uploadedLogoFile: any;
  handleNameChange: (event: any) => void;
  communityName: string;
  handleSymbolChange: (event: any) => void;
  communitySymbol: string;
  handleDescriptionChange: (event: any) => void;
  communityDescription: string;
  handleURLChange: (event: any) => void;
  communityURL: string;
  handleProtocolChange: (event: any) => void;
  protocolAddress: string;
  handleGithubURLChange: (event: any) => void;
  githubURL: string;
  handleTokenSupplyChange: (event: any) => void;
  tokenSupply: string;
  handleSelectSocial: (e: any) => void;
  selectedSocial: string;
  toggleRank: (event: any) => void;
  toggleTier: (event: any) => void;
  isLoading: boolean;
};

const Editor = ({
  address,
  publishNFT,
  selectedTheme,
  setSelectedTheme,
  handleFileChange,
  uploadedLogoFile,
  handleNameChange,
  communityName,
  handleSymbolChange,
  communitySymbol,
  handleDescriptionChange,
  communityDescription,
  handleURLChange,
  communityURL,
  handleProtocolChange,
  protocolAddress,
  handleGithubURLChange,
  githubURL,
  handleTokenSupplyChange,
  tokenSupply,
  handleSelectSocial,
  selectedSocial,
  toggleRank,
  toggleTier,
  isLoading,
}: EditorProps) => {
  return (
    <VStack className={styles.editorContainer} gap={3}>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Community Name</Text>
        <Input
          className={styles.editorInput}
          value={communityName}
          placeholder="Enter the name of your community to be used for the collection (e.g. BUIDL IT DAO)"
          onChange={handleNameChange}
        />
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Collection Symbol</Text>
        <Input
          value={communitySymbol}
          className={styles.editorInput}
          maxLength={6}
          placeholder="Enter the ticker to be used on your community NFT (e.g. CNFT)"
          onChange={handleSymbolChange}
        />
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Description</Text>
        <Input
          className={styles.editorInput}
          value={communityDescription}
          placeholder="Enter a description for your community NFT (e.g. the best DAO)"
          onChange={handleDescriptionChange}
        />
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Community Link</Text>
        <Input
          className={styles.editorInput}
          value={communityURL}
          type="url"
          placeholder="Enter a link to your community website for the collection (e.g. https://buidl.it)"
          onChange={handleURLChange}
        />
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Theme</Text>
        <HStack className={styles.templateSelectionContainer} gap={1}>
          {themes.map(
            ({ id, name, foregroundClassname, backgroundClassname }) => (
              <VStack
                key={name}
                onClick={() => setSelectedTheme(id)}
                cursor="pointer"
              >
                <Box
                  className={`${styles.themeContainer} ${
                    styles[backgroundClassname]
                  } ${selectedTheme === id ? styles.selected : ""}`}
                >
                  <Box
                    className={`${styles.themeInnerContainer} ${styles[foregroundClassname]}`}
                  ></Box>
                </Box>
                <Text>{name}</Text>
              </VStack>
            )
          )}
          <VStack>
            <Tooltip label="Feature coming soon">
              <Box className={styles.addCustomContainer} cursor="not-allowed">
                <Text fontSize="6xl">+</Text>
              </Box>
            </Tooltip>
            <Text>Add Custom</Text>
          </VStack>
        </HStack>
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Logo</Text>
        <HStack w="100%">
          <Box className={styles.logoNameSection}>
            <Text>
              {!uploadedLogoFile
                ? "Please upload an image with square dimensions."
                : uploadedLogoFile.name}
            </Text>
          </Box>
          <input
            type="file"
            id="logoInput"
            accept="image/png, image/jpg"
            onChange={handleFileChange}
            className={styles.logoInput}
          />
        </HStack>
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Protocol XP</Text>
        <Input
          className={styles.editorInput}
          value={protocolAddress}
          placeholder="Enter Contract Address"
          onChange={handleProtocolChange}
        />
        <Select placeholder="Select option" className={styles.editorSelect}>
          <option value="option1">voteProposal</option>
          <option value="option2">createProposal</option>
        </Select>
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Developer XP</Text>
        <Input
          className={styles.editorInput}
          value={githubURL}
          placeholder="Enter Github Repo URL (e.g. https://github.com/iamminci...)"
          onChange={handleGithubURLChange}
        />
        <Select placeholder="Select option" className={styles.editorSelect}>
          <option value="option1">Number of Merged Commits</option>
          <option value="option2">Number of Merged Pull Requests</option>
          <option value="option3">Number of Merged PR comments</option>
          <option value="option3">Number of Issues Opened</option>
        </Select>
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Community XP</Text>
        <HStack w="100%">
          <Select
            placeholder="Select option"
            className={styles.editorSelect}
            onChange={handleSelectSocial}
          >
            <option value="discord">Discord</option>
            <option value="option2">Twitter</option>
            <option value="option3">Telegram</option>
          </Select>
          <Tooltip
            label={
              !selectedSocial
                ? "Please select a social platform to continue"
                : selectedSocial !== "discord"
                ? "Feature coming soon"
                : ""
            }
          >
            <a
              href="https://discord.com/api/oauth2/authorize?client_id=1004630657886072833&permissions=8591056896&scope=bot"
              rel="noreferrer"
              target="_blank"
            >
              <Button
                disabled={selectedSocial !== "discord"}
                className={styles.editorButton}
              >
                Link
              </Button>
            </a>
          </Tooltip>
        </HStack>
        <Select placeholder="Select option" className={styles.editorSelect}>
          <option value="option1">Minutes on Community Voice Chat</option>
          <option value="option2">Number of Messages in Channel</option>
        </Select>
        <HStack w="100%">
          <Input className={styles.editorInput} placeholder="Enter Message" />
          <Select placeholder="Select option" className={styles.editorSelect}>
            <option value="option1">#general</option>
            <option value="option2">#developers</option>
            <option value="option3">#gm</option>
          </Select>
        </HStack>
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Token Supply</Text>
        <Input
          className={styles.editorInput}
          placeholder="1 - 10000"
          value={tokenSupply}
          onChange={handleTokenSupplyChange}
        />
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Metadata Update Interval</Text>
        <Select
          placeholder="Select option"
          className={styles.editorSelect}
          onChange={() => {}}
        >
          {/* <option value="option1">Every Minute</option> */}
          <option value="day">Every Day</option>
          <option value="week">Every Week</option>
          <option value="month">Every Month</option>
        </Select>
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Rank &#x26; Tier</Text>
        <HStack>
          <Switch defaultChecked colorScheme="blue" onChange={toggleRank} />
          <Text className={styles.editorText}>Display rank on NFT</Text>
        </HStack>
        <HStack>
          <Switch defaultChecked colorScheme="blue" onChange={toggleTier} />
          <Text className={styles.editorText}>Display tier on NFT</Text>
        </HStack>
      </VStack>
      <VStack>
        <Button className={styles.publishButton} onClick={publishNFT}>
          {isLoading ? <Spinner color="white" /> : "Publish"}
        </Button>
      </VStack>
    </VStack>
  );
};

type ArtworkProps = {
  address: string;
  selectedTheme: string;
  uploadedLogoFile: any;
  uploadedLogoURL: string;
  tokenSupply: string;
  showRank: boolean;
  showTier: boolean;
};

const Artwork = ({
  address,
  selectedTheme,
  uploadedLogoFile,
  uploadedLogoURL,
  tokenSupply,
  showRank,
  showTier,
}: ArtworkProps) => {
  const selected = themes.find((theme) => theme.id === selectedTheme)!;

  return (
    <VStack
      className={`${styles.artworkContainer} ${
        styles[selected.backgroundClassname]
      }`}
    >
      <VStack
        className={`${styles.artworkInnerContainer} ${
          styles[selected.foregroundClassname2]
        }`}
      >
        {uploadedLogoURL && (
          <Image
            src={uploadedLogoURL}
            alt="community logo"
            cursor="pointer"
            className={styles.communityLogo}
          ></Image>
        )}
        <VStack className={styles.artworkUpperSection}>
          <Box className={styles[`${selected.id}PfpContainer`]}>
            <Image
              src="avatar.png"
              alt="community logo"
              cursor="pointer"
              className={styles.pfp}
            ></Image>
            {showTier && (
              <Image
                src="platinum.png"
                alt="community logo"
                cursor="pointer"
                className={styles.badge}
              ></Image>
            )}
          </Box>
          <HStack className={styles.headerStatsContainer}>
            <VStack className={styles.headerStatsLeftSection}>
              <Text className={styles.walletHeader}>
                {abridgeAddressShort(address)}
              </Text>
              {showTier ? (
                <Text className={styles.tierHeader}>Platinum Tier</Text>
              ) : (
                <Text className={styles.tierHeader}>Member</Text>
              )}
            </VStack>
            <VStack className={styles.headerStatsRightSection}>
              {!showRank ? (
                <Text className={styles.rankLabel}>Total Score</Text>
              ) : (
                <HStack className={styles.rankLabelContainer}>
                  <Text className={styles.rankLabel}>Rank #1</Text>
                  <Text
                    className={styles.rankTotalLabel}
                  >{`/ ${tokenSupply}`}</Text>
                </HStack>
              )}
              <HStack w="100%" h="100%">
                <Box
                  className={`${styles.scoreBarContainer} ${
                    styles[`${selected.id}ScoreBar`]
                  }`}
                >
                  <Box
                    className={`${styles.scoreBar} ${
                      styles[`${selected.id}Total`]
                    }`}
                  ></Box>
                </Box>
                <Text className={styles.scoreLabel}>8.6</Text>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
        <hr
          className={`${styles.divider} ${styles[`${selected.id}Divider`]}`}
        ></hr>
        <HStack className={styles.individualStatsContainer}>
          <VStack className={styles.individualStatsLeftSection}>
            <Text className={styles.header}>Metrics</Text>
            <Text className={styles.scoreTitle}>Protocol XP</Text>
            <Text className={styles.scoreTitle}>Developer XP</Text>
            <Text className={styles.scoreTitle}>Community XP</Text>
          </VStack>
          <VStack className={styles.individualStatsRightSection}>
            <Text className={styles.header}>Current Score</Text>
            <HStack className={styles.scoreContainer}>
              <Box
                className={`${styles.scoreBarContainer} ${
                  styles[`${selected.id}ScoreBar`]
                }`}
              >
                <Box
                  className={`${styles.scoreBar} ${
                    styles[`${selected.id}Protocol`]
                  }`}
                ></Box>
              </Box>
              <Text className={styles.scoreLabel}>8.6</Text>
            </HStack>
            <HStack className={styles.scoreContainer}>
              <Box
                className={`${styles.scoreBarContainer} ${
                  styles[`${selected.id}ScoreBar`]
                }`}
              >
                <Box
                  className={`${styles.scoreBar} ${
                    styles[`${selected.id}Developer`]
                  }`}
                ></Box>
              </Box>
              <Text className={styles.scoreLabel}>8.6</Text>
            </HStack>
            <HStack className={styles.scoreContainer}>
              <Box
                className={`${styles.scoreBarContainer} ${
                  styles[`${selected.id}ScoreBar`]
                }`}
              >
                <Box
                  className={`${styles.scoreBar} ${
                    styles[`${selected.id}Community`]
                  }`}
                ></Box>
              </Box>
              <Text className={styles.scoreLabel}>8.6</Text>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

const ArtworkPreview = ({
  address,
  selectedTheme,
  uploadedLogoFile,
  uploadedLogoURL,
  tokenSupply,
  showRank,
  showTier,
}: ArtworkProps) => {
  const selected = themes.find((theme) => theme.id === selectedTheme)!;

  return (
    <VStack
      className={`${styles.artworkPreviewContainer} ${
        styles[selected.backgroundClassname]
      }`}
    >
      <VStack
        className={`${styles.artworkInnerContainer} ${
          styles[selected.foregroundClassname2]
        }`}
      >
        {uploadedLogoURL && (
          <Image
            src={uploadedLogoURL}
            alt="community logo"
            cursor="pointer"
            className={styles.communityPreviewLogo}
          ></Image>
        )}
        <VStack className={styles.artworkUpperPreviewSection}>
          <Box className={styles[`${selected.id}PfpPreviewContainer`]}>
            <Image
              src="avatar.png"
              alt="community logo"
              cursor="pointer"
              className={styles.pfp}
            ></Image>
            {showTier && (
              <Image
                src="platinum.png"
                alt="community logo"
                cursor="pointer"
                className={styles.badge}
              ></Image>
            )}
          </Box>
          <HStack className={styles.headerStatsContainer}>
            <VStack className={styles.headerStatsLeftSection}>
              <Text className={styles.walletPreviewHeader}>
                {abridgeAddressShort(address)}
              </Text>
              {showTier ? (
                <Text className={styles.tierPreviewHeader}>Platinum Tier</Text>
              ) : (
                <Text className={styles.tierPreviewHeader}>Member</Text>
              )}
            </VStack>
            <VStack className={styles.headerStatsPreviewRightSection}>
              {!showRank ? (
                <Text className={styles.rankPreviewLabel}>Total Score</Text>
              ) : (
                <HStack>
                  <Text className={styles.rankPreviewLabel}>Rank #1</Text>
                  <Text
                    className={styles.rankTotalPreviewLabel}
                  >{`/ ${tokenSupply}`}</Text>
                </HStack>
              )}
              <HStack w="100%" h="100%">
                <Box
                  className={`${styles.scoreBarPreviewContainer} ${
                    styles[`${selected.id}ScoreBar`]
                  }`}
                >
                  <Box
                    className={`${styles.scoreBar} ${
                      styles[`${selected.id}Total`]
                    }`}
                  ></Box>
                </Box>
                <Text className={styles.scorePreviewLabel}>8.6</Text>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
        <hr
          className={`${styles.previewDivider} ${
            styles[`${selected.id}Divider`]
          }`}
        ></hr>
        <HStack className={styles.individualStatsPreviewContainer}>
          <VStack className={styles.individualStatsPreviewLeftSection}>
            <Text className={styles.headerPreview}>Metrics</Text>
            <Text className={styles.scoreTitlePreview}>Protocol XP</Text>
            <Text className={styles.scoreTitlePreview}>Developer XP</Text>
            <Text className={styles.scoreTitlePreview}>Community XP</Text>
          </VStack>
          <VStack className={styles.individualStatsPreviewRightSection}>
            <Text className={styles.headerPreview}>Current Score</Text>
            <HStack w="100%" h="100%">
              <Box
                className={`${styles.scoreBarPreviewContainer} ${
                  styles[`${selected.id}ScoreBar`]
                }`}
              >
                <Box
                  className={`${styles.scoreBar} ${
                    styles[`${selected.id}Protocol`]
                  }`}
                ></Box>
              </Box>
              <Text className={styles.scorePreviewLabel}>8.6</Text>
            </HStack>
            <HStack w="100%" h="100%">
              <Box
                className={`${styles.scoreBarPreviewContainer} ${
                  styles[`${selected.id}ScoreBar`]
                }`}
              >
                <Box
                  className={`${styles.scoreBar} ${
                    styles[`${selected.id}Developer`]
                  }`}
                ></Box>
              </Box>
              <Text className={styles.scorePreviewLabel}>8.6</Text>
            </HStack>
            <HStack w="100%" h="100%">
              <Box
                className={`${styles.scoreBarPreviewContainer} ${
                  styles[`${selected.id}ScoreBar`]
                }`}
              >
                <Box
                  className={`${styles.scoreBar} ${
                    styles[`${selected.id}Community`]
                  }`}
                ></Box>
              </Box>
              <Text className={styles.scorePreviewLabel}>8.6</Text>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default withTransition(Builder);
