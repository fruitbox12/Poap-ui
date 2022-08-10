import { HStack, VStack, Image, Text, Input, Button } from "@chakra-ui/react";
import styles from "@styles/Mint.module.css";

const Mint = () => {
  const loading = false;
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

            <Button bgColor="#3A76F2">Mint Free NFT</Button>
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
