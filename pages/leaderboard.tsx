import { useState } from "react";
import { HStack, VStack, Text, Button, Select } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "@styles/Dashboard.module.css";
import Link from "next/link";
// import withTransition from "@components/withTransition";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const dummyData = [
  {
    rank: "1",
    wallet: "0x4A59253d792fC51d2D37B3616966A3Ba1EA91c76",
    totalScore: "9",
    pScore: "3",
    dScore: "3",
    cScore: "3",
    github: "iamminci",
    discord: "minci#4229",
    tier: "Gold",
  },
  {
    rank: "1",
    wallet: "0x4A59253d792fC51d2D37B3616966A3Ba1EA91c76",
    totalScore: "9",
    pScore: "3",
    dScore: "3",
    cScore: "3",
    github: "iamminci",
    discord: "minci#4229",
    tier: "Gold",
  },
  {
    rank: "1",
    wallet: "0x4A59253d792fC51d2D37B3616966A3Ba1EA91c76",
    totalScore: "9",
    pScore: "3",
    dScore: "3",
    cScore: "3",
    github: "iamminci",
    discord: "minci#4229",
    tier: "Gold",
  },
  {
    rank: "1",
    wallet: "0x4A59253d792fC51d2D37B3616966A3Ba1EA91c76",
    totalScore: "9",
    pScore: "3",
    dScore: "3",
    cScore: "3",
    github: "iamminci",
    discord: "minci#4229",
    tier: "Gold",
  },
  {
    rank: "1",
    wallet: "0x4A59253d792fC51d2D37B3616966A3Ba1EA91c76",
    totalScore: "9",
    pScore: "3",
    dScore: "3",
    cScore: "3",
    github: "iamminci",
    discord: "minci#4229",
    tier: "Gold",
  },
  {
    rank: "1",
    wallet: "0x4A59253d792fC51d2D37B3616966A3Ba1EA91c76",
    totalScore: "9",
    pScore: "3",
    dScore: "3",
    cScore: "3",
    github: "iamminci",
    discord: "minci#4229",
    tier: "Gold",
  },
  {
    rank: "1",
    wallet: "0x4A59253d792fC51d2D37B3616966A3Ba1EA91c76",
    totalScore: "9",
    pScore: "3",
    dScore: "3",
    cScore: "3",
    github: "iamminci",
    discord: "minci#4229",
    tier: "Gold",
  },
  {
    rank: "1",
    wallet: "0x4A59253d792fC51d2D37B3616966A3Ba1EA91c76",
    totalScore: "9",
    pScore: "3",
    dScore: "3",
    cScore: "3",
    github: "iamminci",
    discord: "minci#4229",
    tier: "Gold",
  },
  {
    rank: "1",
    wallet: "0x4A59253d792fC51d2D37B3616966A3Ba1EA91c76",
    totalScore: "9",
    pScore: "3",
    dScore: "3",
    cScore: "3",
    github: "iamminci",
    discord: "minci#4229",
    tier: "Gold",
  },
];

const Dashboard = () => {
  return (
    <VStack className={styles.container}>
      <Text className={styles.title}>VerbsDao Community NFT Leaderboard</Text>
      <HStack className={styles.filterSection}>
        <Text>Filter By:</Text>
        <Select></Select>
        <Text>Sort By:</Text>
        <Select></Select>
      </HStack>
      <HStack>
        <Text>Rank</Text>
        <Text>Wallet Address</Text>
        <Text>Total XP</Text>
        <Text>Protocol XP</Text>
        <Text>Developer XP</Text>
        <Text>Community XP</Text>
        <Text>Github</Text>
        <Text>Discord</Text>
        <Text>View NFT</Text>
      </HStack>
      {dummyData.map((item, idx) => (
        <HStack key={idx} className={styles.nftContainer}>
          <Text className={styles.title}>{item.rank}</Text>
          <Text className={styles.subtitle}>{item.wallet}</Text>
          <Text className={styles.subtitle}>{item.totalScore}</Text>
          <Text className={styles.subtitle}>{item.pScore}</Text>
          <Text className={styles.subtitle}>{item.dScore}</Text>
          <Text className={styles.subtitle}>{item.cScore}</Text>
          <Text className={styles.subtitle}>{item.github}</Text>
          <Text className={styles.subtitle}>{item.discord}</Text>
          <Text className={styles.subtitle}>{item.tier}</Text>
          <ExternalLinkIcon />
        </HStack>
      ))}
    </VStack>
  );
};

export default Dashboard;
