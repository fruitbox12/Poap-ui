import {
  Box,
  Button,
  HStack,
  IconButton,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import type { NextPage } from "next";
import { FaGithub } from "react-icons/fa";
import styles from "@styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Link from "next/link";
// import withTransition from "@components/withTransition";

const Home: NextPage = () => {
  const { address } = useAccount();

  return (
    <div className={styles.container}>
      <Head>
        <title>Web3 Infinity DAO</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {!address ? (
          <VStack gap={2}>
            <h1 className={styles.title}>Welcome to Credly</h1>
            <Text className={styles.subtitle}>Community NFT-as-a-service</Text>
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
        ) : (
          <HStack gap={2} className={styles.selectionContainer}>
            <VStack className={styles.containerLeft}>
              <Text fontSize="1.5rem" w="400px">
                Already have an existing NFT to manage?
              </Text>
              <Spacer h="10px"></Spacer>
              <Link href={`/dashboard`}>
                <Button className={styles.dashboardButton}>
                  Go to Dashboard
                </Button>
              </Link>
            </VStack>
            <Box className={styles.divider}></Box>
            <VStack className={styles.containerRight}>
              <Text fontSize="1.5rem" w="400px">
                Launch a community NFT for your new community?
              </Text>
              <Spacer h="10px"></Spacer>
              <Link href={`/builder`}>
                <Button className={styles.buildButton}>Create NFT</Button>
              </Link>
            </VStack>
          </HStack>
        )}
      </main>
    </div>
  );
};

export default Home;
