import {
  HStack,
  VStack,
  Text,
  Box,
  Button,
  Select,
  Input,
  Image,
} from "@chakra-ui/react";
import styles from "@styles/Detail.module.css";

const Detail = () => {
  return (
    <VStack className={styles.container}>
      <Box className={styles.titleContainer}>
        <Text className={styles.title}>Verbs Dao Community NFT</Text>
      </Box>
      <VStack>
        <HStack>
          <VStack className={styles.totalContainer}>
            <Text className={styles.header}>Total Community NFTs Minted</Text>
            <Text>1 / 10000</Text>
            <Button className={styles.button}>View Leaderboard</Button>
          </VStack>
          <VStack className={styles.chartContainer}>
            <Text className={styles.header}>Minting Progress</Text>
          </VStack>
        </HStack>

        <HStack>
          <VStack className={styles.firstContainer}>
            <VStack className={styles.section}>
              <Text>Theme</Text>
              <Box>midnight dark</Box>
            </VStack>
            <VStack className={styles.section}>
              <Text>Logo</Text>
              <HStack>
                <Box className={styles.logo}></Box>
                <Button />
              </HStack>
            </VStack>
            <VStack className={styles.section}>
              <Text>Interval</Text>
              <Select />
            </VStack>
          </VStack>
          <VStack className={styles.secondContainer}>
            <VStack className={styles.section}>
              <Text className={styles.editorHeader}>Protocol XP</Text>
              <Input
                className={styles.editorInput}
                placeholder="Enter Contract Address"
              />
              <Select
                placeholder="Select option"
                className={styles.editorSelect}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </VStack>
            <VStack className={styles.section}>
              <Text className={styles.editorHeader}>Developer XP</Text>
              <Input
                className={styles.editorInput}
                placeholder="Enter Github Repo URL (e.g. https://github.com/iamminci...)"
              />
              <Select
                placeholder="Select option"
                className={styles.editorSelect}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </VStack>
            <VStack className={styles.section}>
              <Text className={styles.editorHeader}>Community XP</Text>
              <HStack w="100%">
                <Select
                  placeholder="Select option"
                  className={styles.editorSelect}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
                <Button className={styles.editorButton}>Link</Button>
              </HStack>
              <Select
                placeholder="Select option"
                className={styles.editorSelect}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <HStack w="100%">
                <Input
                  className={styles.editorInput}
                  placeholder="Enter Message"
                />
                <Select
                  placeholder="Select option"
                  className={styles.editorSelect}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </HStack>
            </VStack>
            <VStack className={styles.section}>
              <Text className={styles.editorHeader}>Token Supply</Text>
              <Input className={styles.editorInput} placeholder="1 - 10000" />
            </VStack>
            <VStack className={styles.section}>
              <Text className={styles.editorHeader}>
                Metadata Update Interval
              </Text>
              <Select
                placeholder="Select option"
                className={styles.editorSelect}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </VStack>
          </VStack>
          <VStack>
            <Text>artwork</Text>
            <Image
              src="/nft.png"
              alt="nft sample"
              cursor="pointer"
              className={styles.nft}
            ></Image>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};
export default Detail;
