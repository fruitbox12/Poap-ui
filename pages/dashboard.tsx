import { useState } from "react";
import { HStack, VStack, Text, Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "@styles/Dashboard.module.css";
import Link from "next/link";
// import withTransition from "@components/withTransition";

const dummyData = [
  {
    title: "Web3 Infinity DAO Community NFT",
    desc: "Status: In Progress, 1/10000 Minted",
    isClosed: false,
  },

  {
    title: "Bored Crepes Yacht Club Community NFT",
    desc: "Status: In Progress, 487/1000 Minted",
    isDemo: true,
    isClosed: false,
  },
  {
    title: "Crypto Monks Community NFT",
    desc: "Status: Completed, 1729/1729 Minted",
    isClosed: true,
  },
  {
    title: "FIL Diamond Hands Community NFT",
    desc: "Status: Completed, 7403/8000 Minted",
    isClosed: true,
  },
  {
    title: "FileDogecoin Community NFT",
    desc: "Status: Completed, 3879/5000 Minted",
    isClosed: true,
  },
];

const Dashboard = () => {
  return (
    <VStack>
      <VStack className={styles.container}>
        <Text className={styles.header}>Your Community NFTs</Text>
        {dummyData.map((item, idx) => (
          <HStack key={idx} className={styles.nftContainer}>
            <VStack className={styles.titleContainer}>
              <Text className={styles.title}>{item.title}</Text>
              <Text className={styles.subtitle}>{item.desc}</Text>
            </VStack>
            <HStack>
              {item.isDemo ? (
                <Link href="/detail">
                  <Button className={styles.button}>View Details</Button>
                </Link>
              ) : (
                <Button className={styles.button}>View Details</Button>
              )}
              {item.isDemo ? (
                <Link href="/leaderboard">
                  <Button className={styles.button}>View Leaderboard</Button>
                </Link>
              ) : (
                <Button className={styles.button}>View Leaderboard</Button>
              )}
              <Button isDisabled={item.isClosed} className={styles.button}>
                Close Minting
              </Button>
            </HStack>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default Dashboard;
