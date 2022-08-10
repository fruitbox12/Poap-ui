import {
  Box,
  HStack,
  VStack,
  Text,
  Input,
  Button,
  Select,
  Switch,
} from "@chakra-ui/react";
import styles from "@styles/Builder.module.css";

const Builder = () => {
  return (
    <HStack className={styles.container}>
      <Editor />
      <Artwork />
    </HStack>
  );
};

const Editor = () => {
  return (
    <VStack className={styles.editorContainer} gap={3}>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Name</Text>
        <Input
          className={styles.editorInput}
          placeholder="Enter Name for Community NFT"
        />
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Template</Text>
        <HStack className={styles.templateSelectionContainer} gap={1}>
          <VStack>
            <Box className={styles.midnightDarkContainer}>
              <Box className={styles.midnightDarkInnerContainer}></Box>
            </Box>
            <Text>Midnight Dark</Text>
          </VStack>
          <VStack>
            <Box className={styles.solidCreamContainer}>
              <Box className={styles.solidCreamInnerContainer}></Box>
            </Box>
            <Text>Solid Cream</Text>
          </VStack>
          <VStack>
            <Box className={styles.pastelLavenderContainer}>
              <Box className={styles.pastelLavenderInnerContainer}></Box>
            </Box>
            <Text>Pastel Lavender</Text>
          </VStack>
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
            <Text>placeholder</Text>
          </Box>
          <Button className={styles.editorButton}>Upload</Button>
        </HStack>
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Protocol XP</Text>
        <Input
          className={styles.editorInput}
          placeholder="Enter Contract Address"
        />
        <Select placeholder="Select option" className={styles.editorSelect}>
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
        <Select placeholder="Select option" className={styles.editorSelect}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Community XP</Text>
        <HStack w="100%">
          <Select placeholder="Select option" className={styles.editorSelect}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Button className={styles.editorButton}>Link</Button>
        </HStack>
        <Select placeholder="Select option" className={styles.editorSelect}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <HStack w="100%">
          <Input className={styles.editorInput} placeholder="Enter Message" />
          <Select placeholder="Select option" className={styles.editorSelect}>
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
        <Text className={styles.editorHeader}>Metadata Update Interval</Text>
        <Select placeholder="Select option" className={styles.editorSelect}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Rank &#x26; Tier</Text>
        <HStack>
          <Switch colorScheme="blue" />
          <Text className={styles.editorText}>Display rank on NFT</Text>
        </HStack>
        <HStack>
          <Switch colorScheme="blue" />
          <Text className={styles.editorText}>Display rank on NFT</Text>
        </HStack>
      </VStack>
      <VStack></VStack>
    </VStack>
  );
};

const Artwork = () => {
  return (
    <VStack className={styles.artworkContainer}>
      <VStack className={styles.artworkInnerContainer}>
        <Box className={styles.profileContainer}></Box>
        <HStack>
          <VStack>
            <Text className={styles.wallet}>0x17...df</Text>
            <Text className={styles.title}>Gold Tier</Text>
          </VStack>
          <VStack>
            <Text className={styles.header}>Rank 1/1</Text>
            <Text className={styles.title}>Total Score</Text>
          </VStack>
        </HStack>
        <hr className={styles.divider}></hr>
        <HStack>
          <VStack>
            <Text className={styles.header}>Metrics</Text>
            <Text className={styles.title}>Protocol XP</Text>
            <Text className={styles.title}>Developer XP</Text>
            <Text className={styles.title}>Community XP</Text>
          </VStack>
          <VStack>
            <Text className={styles.header}>Current Score</Text>
            <Text className={styles.title}>Score 1</Text>
            <Text className={styles.title}>Score 2</Text>
            <Text className={styles.title}>Score 3</Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Builder;
