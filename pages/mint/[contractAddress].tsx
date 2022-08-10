import { HStack, VStack, Image, Text, Input, Button } from "@chakra-ui/react";
import styles from "@styles/Mint.module.css";
import { useRouter } from "next/router";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import communityNFT from "@data/CommunityNFT.json";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import db from "@firebase/firebase";
import { useCallback, useEffect, useState } from "react";

type MintButtonProps = {
  contractAddress: string;
  handleMint: () => void;
};

const MintButton = ({ contractAddress, handleMint }: MintButtonProps) => {
  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress
      ? contractAddress
      : "0x2E20684B8082aaeE594999324E154111d55b58bb",
    contractInterface: communityNFT.abi,
    functionName: "mint",
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <Button bgColor="#3A76F2" disabled={!write} onClick={handleMint}>
      Mint Free NFT
    </Button>
  );
};

const Mint = () => {
  const router = useRouter();

  const { contractAddress } = router.query;
  const address = contractAddress as string;
  const loading = true;

  // const { config } = usePrepareContractWrite({
  //   addressOrName: loadedContractAddress
  //     ? loadedContractAddress
  //     : "0xCa4E3b3f98cCA9e801f88F13d1BfE68176a03dFA",
  //   contractInterface: communityNFT.abi,
  //   functionName: "mint",
  // });
  // const { data, isLoading, isSuccess, write } = useContractWrite(config);

  console.log("address:", address);

  console.log("contractAddress:", contractAddress);

  const test = useCallback(async (address: string) => {
    const docRef = doc(db, "contracts", address);
    await updateDoc(docRef, { users: arrayUnion({ address: "0123" }) });
  }, []);

  const handleMint = async () => {
    // write?.();
    test("0x1234");
  };

  // const saveToDb = useCallback(async () => {
  //   onSnapshot(collection(db, "contracts"), (snapshot) => {
  //     console.log("snapshot: ", snapshot.docs[0].data());
  //   });
  // }, []);

  if (!address) {
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

            <MintButton contractAddress={address} handleMint={handleMint} />
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
