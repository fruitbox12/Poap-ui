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
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import styles from "@styles/Builder.module.css";
import { useCallback, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import db from "@firebase/firebase";
import Link from "next/link";

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

const Builder = () => {
  const [publishedContract, setPublishedContract] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("midnight");
  const [uploadedLogoFile, setUploadedLogoFile] = useState<any>("");
  const [uploadedLogoURL, setUploadedLogoURL] = useState<string>("");
  const [communityName, setCommunityName] = useState<string>("");
  const [communityDescription, setCommunityDescription] = useState<string>("");
  const [protocolAddress, setProtocolAddress] = useState<string>("");
  const [tokenSupply, setTokenSupply] = useState<string>("1");
  const [githubURL, setGithubURL] = useState<string>("");
  const [showRank, setShowRank] = useState<boolean>(true);
  const [showTier, setShowTier] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSocial, setSelectedSocial] = useState<string>("");

  const saveContract = useCallback(async (address: string) => {
    const docRef = doc(db, "contracts", address.toLowerCase());
    await setDoc(docRef, {
      address: address.toLowerCase(),
      name: communityName,
      description: communityDescription,
      users: [],

      protocolAddress:
        protocolAddress ?? "0x48adbf604c7ff9e2b2e8c01b243ba446538972ea", // TODO: dynamic
      githubRepoURL: githubURL ?? "https://github.com/iamminci/verbsdao",
    });
  }, []);

  const publishNFT = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/deploy", {
        method: "POST",
        body: JSON.stringify({ tokenSupply: 100 }),
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
      console.log("data: ", data);
      setPublishedContract(data.contractAddress);
      const logoURL = handleLogoFileUpload();
      saveContract(data.contractAddress);
    } catch (err) {
      console.log("Error request: ", err);
    }
    setLoading(false);
  }, []);

  const handleFileChange = (event: any) => {
    console.log("loaded file: ", event.target.files[0]);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setUploadedLogoURL(url);
    setUploadedLogoFile(event.target.files[0]);
  };

  const handleLogoFileUpload = async () => {
    const formData = new FormData();
    formData.append("myFile", uploadedLogoFile, uploadedLogoFile.name);

    console.log(uploadedLogoFile);

    // Request made to the backend api
    // await axios.post("api/uploadfile", formData);
    console.log("logo file successfully uploaded");
    // return uploadedLogoURL;
  };

  const handleNameChange = (event: any) => {
    console.log("name: ", event.target.value);
    setCommunityName(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    console.log("name: ", event.target.value);
    setCommunityDescription(event.target.value);
  };

  const handleProtocolChange = (event: any) => {
    console.log("protocol: ", event.target.value);
    setProtocolAddress(event.target.value);
  };

  const handleGithubURLChange = (event: any) => {
    console.log("github: ", event.target.value);
    setGithubURL(event.target.value);
  };

  const handleTokenSupplyChange = (event: any) => {
    console.log("token supply: ", event.target.value);
    setTokenSupply(event.target.value);
  };

  const toggleRank = (event: any) => {
    console.log("event: ", event.target.checked);
    setShowRank(event.target.checked);
  };

  const toggleTier = (event: any) => {
    console.log("event: ", event.target.checked);
    setShowTier(event.target.checked);
  };

  function handleSelectSocial(e: any) {
    setSelectedSocial(e.target.value);
  }

  return (
    <HStack className={styles.container}>
      {!publishedContract ? (
        <>
          <Editor
            publishNFT={publishNFT}
            setSelectedTheme={setSelectedTheme}
            selectedTheme={selectedTheme}
            handleFileChange={handleFileChange}
            uploadedLogoFile={uploadedLogoFile}
            handleNameChange={handleNameChange}
            handleDescriptionChange={handleDescriptionChange}
            handleProtocolChange={handleProtocolChange}
            handleGithubURLChange={handleGithubURLChange}
            handleTokenSupplyChange={handleTokenSupplyChange}
            handleSelectSocial={handleSelectSocial}
            selectedSocial={selectedSocial}
            toggleRank={toggleRank}
            toggleTier={toggleTier}
            isLoading={loading}
          />
          <Box className={styles.spacer}></Box>
          <Artwork
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
          <Image
            src="/nft2.png"
            alt="nft sample"
            cursor="pointer"
            className={styles.logo}
          ></Image>
          <Text>Community NFT has been successfully published!</Text>
          <a
            href={`https://rinkeby.etherscan.io/address/${publishedContract}`}
            rel="noreferrer"
            target="_blank"
          >
            <Text>{`Etherscan: https://rinkeby.etherscan.io/address/${publishedContract}`}</Text>
          </a>
          <Link href={`/mint/${publishedContract}`}>
            <Text>{`Shareable Link: http://app.credly.dev/mint/${publishedContract}`}</Text>
          </Link>
        </VStack>
      )}
    </HStack>
  );
};

type EditorProps = {
  publishNFT: () => void;
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  handleFileChange: (event: any) => void;
  uploadedLogoFile: any;
  handleNameChange: (event: any) => void;
  handleDescriptionChange: (event: any) => void;
  handleProtocolChange: (event: any) => void;
  handleGithubURLChange: (event: any) => void;
  handleTokenSupplyChange: (event: any) => void;
  handleSelectSocial: (e: any) => void;
  selectedSocial: string;
  toggleRank: (event: any) => void;
  toggleTier: (event: any) => void;
  isLoading: boolean;
};

const Editor = ({
  publishNFT,
  selectedTheme,
  setSelectedTheme,
  handleFileChange,
  uploadedLogoFile,
  handleNameChange,
  handleDescriptionChange,
  handleProtocolChange,
  handleGithubURLChange,
  handleTokenSupplyChange,
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
          placeholder="Enter the name of your community"
          onChange={handleNameChange}
        />
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Description</Text>
        <Input
          className={styles.editorInput}
          placeholder="Enter a description for your community NFT"
          onChange={handleDescriptionChange}
        />
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Theme</Text>
        <HStack className={styles.templateSelectionContainer} gap={1}>
          {themes.map(
            ({ id, name, foregroundClassname, backgroundClassname }) => (
              <VStack key={name} onClick={() => setSelectedTheme(id)}>
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
            <Box className={styles.addCustomContainer}>
              <Text fontSize="6xl">+</Text>
            </Box>
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
          <Button
            disabled={selectedSocial !== "discord"}
            className={styles.editorButton}
          >
            Link
          </Button>
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
          onChange={handleTokenSupplyChange}
        />
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Metadata Update Interval</Text>
        <Select placeholder="Select option" className={styles.editorSelect}>
          <option value="option1">Every Minute</option>
          <option value="option1">Every Day</option>
          <option value="option1">Every Week</option>
          <option value="option1">Every Month</option>
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
  selectedTheme: string;
  uploadedLogoFile: any;
  uploadedLogoURL: string;
  tokenSupply: string;
  showRank: boolean;
  showTier: boolean;
};

const Artwork = ({
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
              <Text className={styles.walletHeader}>0x17...df</Text>
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
              <HStack className={styles.headerScoreContainer}>
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

export default Builder;
