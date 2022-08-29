import {
  HStack,
  VStack,
  Image,
  Text,
  Input,
  Button,
  Box,
  Spinner,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import styles from "@styles/Mint.module.css";
import { useRouter } from "next/router";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

import communityNFT from "@data/CommunityNFT.json";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import db from "@firebase/firebase";
import { useCallback, useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";
import { abridgeAddress, abridgeAddressShort } from "@utils/abridgeAddress";
import withTransition from "@components/withTransition";

const Mint: NextPage = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  const router = useRouter();

  const [githubUsername, setGithubUsername] = useState<string>("");
  const [discordUsername, setDiscordUsername] = useState<string>("");
  const [uploadedPfpFile, setUploadedPfpFile] = useState<any>("");
  const [uploadedPfpURL, setUploadedPfpURL] = useState<string>("");
  const [transactionHash, setTransactionHash] = useState<string>("");

  const [logoURL, setLogoURL] = useState<string>("");
  const [tokenSupply, setTokenSupply] = useState<string>("");
  const [name, setName] = useState<string>("");

  const { contractAddress } = router.query;
  console.log("contractAddress:", contractAddress);
  const nftAddress = contractAddress as string;
  // const loading = true;

  const { config } = usePrepareContractWrite({
    addressOrName: nftAddress
      ? nftAddress
      : "0xD7c9cAae85de9b2B530DEb3e9d3CD730D7e564d0",
    contractInterface: communityNFT.abi,
    functionName: "mint",
  });

  const { data: txn, isLoading, isSuccess, write } = useContractWrite(config);

  // const isLoading = true;

  useEffect(() => {
    async function fetchContractInfo() {
      if (!nftAddress) return;
      const docRef = doc(db, "contracts", nftAddress.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        setLogoURL(data.logoURL);
        setTokenSupply(data.tokenSupply);
        console.log("data: ", data);
      } else {
        console.log("No such document!");
      }
    }
    fetchContractInfo();
  }, [nftAddress]);

  const saveUserInfo = useCallback(
    async (
      contract: string,
      address: string,
      github: string,
      discord: string
    ) => {
      const contractRef = doc(db, "contracts", contract.toLowerCase());
      await updateDoc(contractRef, {
        users: arrayUnion(address.toLowerCase()),
      });

      const userRef = doc(db, "users", address.toLowerCase());
      await setDoc(userRef, {
        github: github,
        discord: discord,
        pscore: 0,
        dscore: 0,
        cscore: 0,
        lastUpdated: 0,
        createdAt: new Date().getTime(),
        address: address.toLowerCase(),
        rank: 1,
        tier: "Gold",
      });
    },
    []
  );

  const handleFileChange = (event: any) => {
    console.log("loaded file: ", event.target.files[0]);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setUploadedPfpURL(url);
    setUploadedPfpFile(event.target.files[0]);
  };

  useEffect(() => {
    async function saveDB() {
      if (isSuccess) {
        if (!address || !txn) return;
        const txnResponse = await txn.wait();
        console.log("txnResponse: ", txnResponse);
        setTransactionHash(txnResponse.transactionHash);
        await saveUserInfo(
          nftAddress,
          address.toLowerCase(),
          githubUsername,
          discordUsername
        );
      }
    }
    saveDB();
  }, [isSuccess]);

  const handleMint = async () => {
    await write?.();
  };

  const handleGithubInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const github = e.target.value;
      setGithubUsername(github);
    },
    []
  );

  const handleDiscordInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const discord = e.target.value;
      setDiscordUsername(discord);
    },
    []
  );

  const disableButton = !write || !githubUsername || !discordUsername;

  const completed = true;

  return (
    <>
      {!address ? (
        <HStack className={styles.container}>
          <VStack gap={2}>
            <h1 className={styles.title}>Connect your wallet</h1>
            <Text className={styles.subtitle}>
              {`Mint your ${name} Community NFT for free!`}
            </Text>
            <Spacer h="10px"></Spacer>
            <ConnectButton />
            <Spacer h="10px"></Spacer>
            <a
              href="https://github.com/interform-open-web/interform"
              rel="noreferrer"
              target="_blank"
            >
              <IconButton
                aria-label="github icon"
                colorScheme="dark"
                variant="ghost"
                icon={<FaGithub className={styles.githubButton} />}
              />
            </a>
          </VStack>
        </HStack>
      ) : (
        <HStack className={styles.container}>
          {/* <Image
            src={uploadedLogoURL ? "/buidl2.png" : "/buidl.png"}
            alt="nft sample"
            cursor="pointer"
            className={styles.nft}
          ></Image> */}
          <ArtworkPreview
            address={address}
            uploadedPfpURL={uploadedPfpURL}
            uploadedLogoURL={logoURL}
            tokenSupply={tokenSupply}
            showRank={true}
            showTier={true}
          />
          <VStack className={styles.mintContainer} gap={10}>
            <VStack>
              <Text className={styles.title}>{`${name} Community NFT`}</Text>
              <Text className={styles.subtitle}>
                Note this Community NFT is a non-transferrable, soul-bound
                token.
              </Text>
            </VStack>
            {!isSuccess ? (
              <VStack className={styles.detailsSection}>
                <VStack className={styles.inputSection}>
                  <Text className={styles.header}>Logo</Text>
                  <HStack w="100%">
                    <Box className={styles.logoNameSection}>
                      <Text color="white" fontSize=".7rem" opacity={0.7}>
                        {!uploadedPfpFile
                          ? "Please upload image with square dimensions."
                          : uploadedPfpFile.name}
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
                <VStack className={styles.inputSection}>
                  <Text className={styles.header}>Github Username</Text>
                  <Input
                    className={styles.input}
                    placeholder="@iamminci"
                    onChange={handleGithubInput}
                  />
                </VStack>

                <VStack className={styles.inputSection}>
                  <Text className={styles.header}>Discord Username</Text>
                  <Input
                    className={styles.input}
                    placeholder="@minci#4229"
                    onChange={handleDiscordInput}
                  />
                </VStack>
                <VStack className={styles.buttonSection}>
                  <Button
                    bgColor="#3A76F2"
                    disabled={disableButton}
                    onClick={handleMint}
                    color="white"
                    width="150px"
                  >
                    {isLoading ? <Spinner color="white" /> : "Mint Free NFT"}
                  </Button>
                </VStack>
              </VStack>
            ) : (
              <VStack w="100%" className={styles.successSection}>
                <Text>Community NFT has been successfully minted!</Text>
                <a
                  href={`https://polygonscan.com/tx/${transactionHash}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Text>{`Polygonscan: https://polygonscan.com/tx/${abridgeAddress(
                    transactionHash
                  )}`}</Text>
                </a>
              </VStack>
            )}
          </VStack>
        </HStack>
      )}
    </>
  );
};

type ArtworkProps = {
  address: string;
  uploadedPfpURL: string;
  uploadedLogoURL: string;
  tokenSupply: string;
  showRank: boolean;
  showTier: boolean;
};

const ArtworkPreview = ({
  address,
  uploadedPfpURL,
  uploadedLogoURL,
  tokenSupply,
  showRank,
  showTier,
}: ArtworkProps) => {
  console.log("uploadedLogoURL: ", uploadedLogoURL);
  return (
    <VStack
      className={`${styles.artworkPreviewContainer} ${styles.midnightDarkBg}`}
    >
      <VStack
        className={`${styles.artworkInnerContainer} ${styles.midnightDarkArtworkFg}`}
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
          <Box className={styles[`midnightPfpPreviewContainer`]}>
            <Image
              src={uploadedPfpURL ? uploadedPfpURL : "../avatar.png"}
              alt="community logo"
              cursor="pointer"
              className={styles.pfp}
            ></Image>
            {showTier && (
              <Image
                src="../platinum.png"
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
                    styles[`midnightScoreBar`]
                  }`}
                >
                  <Box
                    className={`${styles.scoreBar} ${styles[`midnightTotal`]}`}
                  ></Box>
                </Box>
                <Text className={styles.scorePreviewLabel}>8.6</Text>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
        <hr
          className={`${styles.previewDivider} ${styles[`midnightDivider`]}`}
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
                  styles[`midnightScoreBar`]
                }`}
              >
                <Box
                  className={`${styles.scoreBar} ${styles[`midnightProtocol`]}`}
                ></Box>
              </Box>
              <Text className={styles.scorePreviewLabel}>8.6</Text>
            </HStack>
            <HStack w="100%" h="100%">
              <Box
                className={`${styles.scoreBarPreviewContainer} ${
                  styles[`midnightScoreBar`]
                }`}
              >
                <Box
                  className={`${styles.scoreBar} ${
                    styles[`midnightDeveloper`]
                  }`}
                ></Box>
              </Box>
              <Text className={styles.scorePreviewLabel}>8.6</Text>
            </HStack>
            <HStack w="100%" h="100%">
              <Box
                className={`${styles.scoreBarPreviewContainer} ${
                  styles[`midnightScoreBar`]
                }`}
              >
                <Box
                  className={`${styles.scoreBar} ${
                    styles[`midnightCommunity`]
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

export default withTransition(Mint);
