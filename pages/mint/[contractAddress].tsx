import { HStack, VStack, Image, Text, Input, Button } from "@chakra-ui/react";
import styles from "@styles/Mint.module.css";
import { useRouter } from "next/router";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

import communityNFT from "@data/CommunityNFT.json";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import db from "@firebase/firebase";
import { useCallback, useEffect, useState } from "react";

const Mint = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  const router = useRouter();

  const [githubUsername, setGithubUsername] = useState<string>("");
  const [discordUsername, setDiscordUsername] = useState<string>("");

  const { contractAddress } = router.query;
  const nftAddress = contractAddress as string;
  const loading = true;

  const { config } = usePrepareContractWrite({
    addressOrName: nftAddress
      ? nftAddress
      : "0x2E20684B8082aaeE594999324E154111d55b58bb",
    contractInterface: communityNFT.abi,
    functionName: "mint",
  });

  const { data: txn, isLoading, isSuccess, write } = useContractWrite(config);

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

  useEffect(() => {
    async function saveDB() {
      if (isSuccess) {
        if (!address || !txn) return;
        await txn.wait();
        await saveUserInfo(
          nftAddress,
          address.toLowerCase(),
          githubUsername,
          discordUsername
        );
      }
    }
    saveDB();
  }, [
    address,
    discordUsername,
    githubUsername,
    isSuccess,
    nftAddress,
    saveUserInfo,
    txn,
  ]);

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

  if (!address) {
    return;
  }

  const disableButton = !write || !githubUsername || !discordUsername;

  return (
    <HStack className={styles.container}>
      <Image
        src="/nft.png"
        alt="nft sample"
        cursor="pointer"
        className={styles.nft}
      ></Image>

      <VStack className={styles.mintContainer} gap={5}>
        <VStack>
          <Text className={styles.title}>VerbsDAO Community NFT</Text>
          <Text className={styles.subtitle}>
            Community NFT is a soul-bound token (non-transferrable).
          </Text>
        </VStack>

        {loading ? (
          <VStack>
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

            <Button
              bgColor="#3A76F2"
              disabled={disableButton}
              onClick={handleMint}
            >
              Mint Free NFT
            </Button>
          </VStack>
        ) : (
          <VStack>
            <Text>Community NFT has been successfully minted!</Text>
            <Text>Etherscan: ...</Text>
          </VStack>
        )}
      </VStack>
    </HStack>
  );
};
export default Mint;
