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
];

const Detail = () => {
  return (
    <VStack className={styles.container}>
      <Box className={styles.titleContainer}>
        <Text className={styles.title}>
          Bored Crepes Yacht Club Community NFT
        </Text>
      </Box>
      <VStack>
        <HStack className={styles.upperSection}>
          <VStack className={styles.totalContainer}>
            <Text className={styles.totalHeader}>
              Total Community NFTs Minted
            </Text>
            <Text className={styles.totalSubheader}>487 / 10000</Text>
            <Link href="/leaderboard">
              <Button className={styles.button}>View Leaderboard</Button>
            </Link>
          </VStack>
          <VStack className={styles.chartContainer}>
            <Box className={styles.line1}></Box>
            <Box className={styles.line2}></Box>
            <Box className={styles.line3}></Box>
            <Box className={styles.line4}></Box>
            <Text className={styles.mintingHeader}>Minting Progress</Text>
            <HStack>
              <VStack className={styles.chartSidebar}>
                <Text>600</Text>
                <Text>500</Text>
                <Text>400</Text>
                <Text>300</Text>
                <Text>200</Text>
                <Text>100</Text>
                <Text>0</Text>
              </VStack>
              <VStack>
                <Image src="chart.png" alt="chart"></Image>
                <HStack className={styles.chartFooter}>
                  <Text>4/17</Text>
                  <Text>5/17</Text>
                  <Text>6/17</Text>
                  <Text>7/17</Text>
                  <Text>8/17</Text>
                </HStack>
              </VStack>
            </HStack>
          </VStack>
        </HStack>

        <HStack>
          <VStack className={styles.firstContainer}>
            <VStack className={styles.section}>
              <Text className={styles.header}>Theme</Text>
              <HStack className={styles.templateSelectionContainer} gap={1}>
                {themes.map(
                  ({ id, name, foregroundClassname, backgroundClassname }) => (
                    <VStack key={name}>
                      <Box
                        className={`${styles.themeContainer} ${styles[backgroundClassname]}`}
                      >
                        <Box
                          className={`${styles.themeInnerContainer} ${styles[foregroundClassname]}`}
                        ></Box>
                      </Box>
                      <Text>{name}</Text>
                    </VStack>
                  )
                )}
              </HStack>
            </VStack>
            <VStack className={styles.section}>
              <Text className={styles.header}>Logo</Text>
              <HStack w="100%">
                <Box className={styles.logoNameSection}>
                  <Text>Upload file</Text>
                </Box>
                <input
                  type="file"
                  id="logoInput"
                  accept="image/png, image/jpg"
                  // onChange={handleFileChange}
                  className={styles.logoInput}
                />
              </HStack>
            </VStack>
            <VStack className={styles.section}>
              <Text className={styles.header}>Update Interval</Text>
              <Select
                placeholder="Every Minute"
                className={styles.editorSelect}
              >
                <option value="option1">Every Minute</option>
                <option value="option1">Every Day</option>
                <option value="option1">Every Week</option>
                <option value="option1">Every Month</option>
              </Select>
            </VStack>
          </VStack>
          <VStack className={styles.secondContainer}>
            <VStack className={styles.section}>
              <Text className={styles.editorHeader}>Protocol XP</Text>
              <Input
                className={styles.editorInput}
                placeholder="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
              />
              <Select
                placeholder="voteProposalFor(uint256 proposalId)"
                className={styles.editorSelect}
              >
                <option value="option1">voteProposalFor</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </VStack>
            <VStack className={styles.section}>
              <Text className={styles.editorHeader}>Developer XP</Text>
              <Input
                className={styles.editorInput}
                placeholder="https://github.com/iovisor/bcc"
              />
              <Select
                placeholder="Number of Merged Pull Requests"
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
                <Select placeholder="Twitter" className={styles.editorSelect}>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
                <Button disabled className={styles.editorButton}>
                  Linked
                </Button>
              </HStack>
              <Select
                placeholder="Number of Retweets"
                className={styles.editorSelect}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              {/* <HStack w="100%">
                <Input className={styles.editorInput} placeholder="gm" />
                <Select placeholder="#gm" className={styles.editorSelect}>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </HStack> */}
            </VStack>
            <VStack className={styles.section}>
              <Text className={styles.editorHeader}>Token Supply</Text>
              <Input className={styles.editorInput} placeholder="10000" />
            </VStack>
            {/* <VStack className={styles.section}>
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
            </VStack> */}
          </VStack>
          <VStack>
            <Image
              src="/bcyc.png"
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
