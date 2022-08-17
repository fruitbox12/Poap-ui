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
} from "@chakra-ui/react";
import styles from "@styles/Builder.module.css";
import { useCallback, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import db from "@firebase/firebase";

const themes = [
  {
    name: "Midnight Dark",
    foregroundColor: "#1a1820",
    backgroundColor: "#100e14",
    foregroundClassname: "midnightDarkFg",
    foregroundClassname2: "midnightDarkArtworkFg",
    backgroundClassname: "midnightDarkBg",
  },
  {
    name: "Solid Cream",
    foregroundColor: "#ffffff",
    backgroundColor: "#f8f8f8",
    foregroundClassname: "solidCreamFg",
    foregroundClassname2: "solidCreamArtworkFg",
    backgroundClassname: "solidCreamBg",
  },
  {
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
  const [selectedTheme, setSelectedTheme] = useState<string>("Midnight Dark");
  const [uploadedLogoFile, setUploadedLogoFile] = useState<any>("");
  const [uploadedLogoURL, setUploadedLogoURL] = useState<string>("");

  const saveContract = useCallback(async (address: string) => {
    const docRef = doc(db, "contracts", address.toLowerCase());
    await setDoc(docRef, {
      address: address.toLowerCase(),
      users: [],
      protocolAddress: "0x48adbf604c7ff9e2b2e8c01b243ba446538972ea", // TODO: dynamic
      githubRepoURL: "https://github.com/iamminci/verbsdao",
    });
  }, []);

  const publishNFT = useCallback(async () => {
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
      saveContract(data.contractAddress);
    } catch (err) {
      console.log("Error request: ", err);
    }
  }, []);

  const handleFileChange = (event: any) => {
    console.log("event: ", event.target.files[0]);

    const file = event.target.files[0];

    const url = URL.createObjectURL(file);
    setUploadedLogoURL(url);
    setUploadedLogoFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("myFile", uploadedLogoFile, uploadedLogoFile.name);

    console.log(uploadedLogoFile);

    // Request made to the backend api
    // Send formData object
    // axios.post("api/uploadfile", formData);
  };

  const loading = true;
  return (
    <HStack className={styles.container}>
      {!publishedContract ? (
        <>
          <Editor
            publishNFT={publishNFT}
            setSelectedTheme={setSelectedTheme}
            selectedTheme={selectedTheme}
            handleFileChange={handleFileChange}
            handleFileUpload={handleFileUpload}
            uploadedLogoFile={uploadedLogoFile}
          />
          <Artwork
            selectedTheme={selectedTheme}
            uploadedLogoFile={uploadedLogoFile}
            uploadedLogoURL={uploadedLogoURL}
          />
        </>
      ) : (
        <VStack w="100%">
          <Image
            src="/nft.png"
            alt="soundscape Logo"
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
          <a
            href={`http://localhost:3000/mint/${publishedContract}`}
            rel="noreferrer"
            target="_blank"
          >
            <Text>{`Shareable Link: http://localhost:3000/mint/${publishedContract}`}</Text>
          </a>
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
  handleFileUpload: () => void;
  uploadedLogoFile: any;
};

const Editor = ({
  publishNFT,
  selectedTheme,
  setSelectedTheme,
  handleFileChange,
  handleFileUpload,
  uploadedLogoFile,
}: EditorProps) => {
  return (
    <VStack className={styles.editorContainer} gap={3}>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Community Name</Text>
        <Input
          className={styles.editorInput}
          placeholder="Enter the name of your community"
        />
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Theme</Text>
        <HStack className={styles.templateSelectionContainer} gap={1}>
          {themes.map(({ name, foregroundClassname, backgroundClassname }) => (
            <VStack key={name} onClick={() => setSelectedTheme(name)}>
              <Box
                className={`${styles.themeContainer} ${
                  styles[backgroundClassname]
                } ${selectedTheme === name ? styles.selected : ""}`}
              >
                <Box
                  className={`${styles.themeInnerContainer} ${styles[foregroundClassname]}`}
                ></Box>
              </Box>
              <Text>{name}</Text>
            </VStack>
          ))}
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
        />
        <Select placeholder="Select option" className={styles.editorSelect}>
          <option value="option1">Number of Commits</option>
          <option value="option2">Number of Pull Requests</option>
          <option value="option3">Number of PR comments</option>
        </Select>
      </VStack>
      <VStack className={styles.section}>
        <Text className={styles.editorHeader}>Community XP</Text>
        <HStack w="100%">
          <Select placeholder="Select option" className={styles.editorSelect}>
            <option value="option1">Discord</option>
            <option value="option2">Twitter</option>
            <option value="option3">Telegram</option>
          </Select>
          <Button className={styles.editorButton}>Link</Button>
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
        <Input className={styles.editorInput} placeholder="1 - 10000" />
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
          <Switch colorScheme="blue" />
          <Text className={styles.editorText}>Display rank on NFT</Text>
        </HStack>
        <HStack>
          <Switch colorScheme="blue" />
          <Text className={styles.editorText}>Display rank on NFT</Text>
        </HStack>
      </VStack>
      <VStack>
        <Button onClick={publishNFT}>Publish</Button>
      </VStack>
    </VStack>
  );
};

type ArtworkProps = {
  selectedTheme: string;
  uploadedLogoFile: any;
  uploadedLogoURL: string;
};

const Artwork = ({
  selectedTheme,
  uploadedLogoFile,
  uploadedLogoURL,
}: ArtworkProps) => {
  const selected = themes.find((theme) => theme.name === selectedTheme)!;

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
            alt="soundscape Logo"
            cursor="pointer"
            className={styles.communityLogo}
          ></Image>
        )}
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
