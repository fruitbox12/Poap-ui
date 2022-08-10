import { useState } from "react";
import { HStack, VStack, Text, Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "@styles/Dashboard.module.css";
import Link from "next/link";
// import withTransition from "@components/withTransition";

const dummyData = [
  {
    title: "Verbs Dao Community NFT",
    desc: "Status: In Progress, 1/10000 Minted",
  },

  {
    title: "3D Verbs Dao Community NFT",
    desc: "Status: In Progress, 487/1000 Minted",
  },
  {
    title: "Verb Punks Community NFT",
    desc: "Status: Completed, 1729/1729 Minted",
  },
  {
    title: "Lost Verbs Community NFT",
    desc: "Status: Completed, 7403/8000 Minted",
  },
  {
    title: "Verbles Community NFT",
    desc: "Status: Completed, 3879/5000 Minted",
  },
];

const Dashboard = () => {
  return (
    <VStack className={styles.container}>
      {dummyData.map((item, idx) => (
        <HStack key={idx} className={styles.nftContainer}>
          <VStack>
            <Text className={styles.title}>{item.title}</Text>
            <Text className={styles.subtitle}>{item.desc}</Text>
          </VStack>
          <HStack>
            <Button className={styles.button}>View Details</Button>
            <Button className={styles.button}>View Leaderboard</Button>
            <Button className={styles.button}>Close Minting</Button>
          </HStack>
        </HStack>
      ))}
    </VStack>
  );
};

export default Dashboard;
