import { HStack, VStack, Image, Text, Input, Button } from "@chakra-ui/react";
import styles from "@styles/Mint.module.css";
import { useRouter } from "next/router";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import communityNFT from "@data/CommunityNFT.json";

const Mint = () => {
  const router = useRouter();

  const { contractAddress } = router.query;
  const address = contractAddress as string;
  const loading = true;

  const { config } = usePrepareContractWrite({
    addressOrName: address
      ? address
      : "0xCa4E3b3f98cCA9e801f88F13d1BfE68176a03dFA",
    contractInterface: communityNFT.abi,
    functionName: "mint",
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  console.log("contractAddress:", contractAddress);

  if (!contractAddress) {
    return;
  }

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
              <Input className={styles.input} placeholder="@iamminci" />
            </VStack>

            <VStack className={styles.inputSection}>
              <Text className={styles.header}>Discord Username</Text>
              <Input className={styles.input} placeholder="@minci#4229" />
            </VStack>

            <Button
              bgColor="#3A76F2"
              disabled={!write}
              onClick={() => write?.()}
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
