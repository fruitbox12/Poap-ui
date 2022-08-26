import { useEffect, useState } from "react";
import { HStack, VStack, Text, Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "@styles/Dashboard.module.css";
import Link from "next/link";
import { where, query, collection, getDocs } from "firebase/firestore";
import { useAccount } from "wagmi";
import db from "@firebase/firebase";
import withTransition from "@components/withTransition";

const dummyData = [
  {
    title: "BUIDL IT DAO Community NFT",
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
    title: "MATIC Diamond Hands Community NFT",
    desc: "Status: Completed, 7403/8000 Minted",
    isClosed: true,
  },
  {
    title: "MATIC Doge Community NFT",
    desc: "Status: Completed, 3879/5000 Minted",
    isClosed: true,
  },
];

type Collection = {
  address: string;
  name: string;
  description: string;
  githubRepoURL: string;
  protocolAddress: string;
  users: string[];
};

const Dashboard = () => {
  const { address } = useAccount();
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    async function getCollections() {
      const q = query(
        collection(db, "contracts"),
        where("owner", "==", address?.toLowerCase())
      );

      const querySnapshot = await getDocs(q);
      const fetchedCollections: Collection[] = [];

      querySnapshot.forEach((doc) => {
        fetchedCollections.push(doc.data() as Collection);
      });

      console.log(fetchedCollections);
      setCollections(fetchedCollections);
    }
    getCollections();
  }, [address]);

  const hasCollections = collections && collections.length > 0;

  return (
    <VStack>
      <VStack className={styles.container}>
        <Text className={styles.header}>Your Community NFTs</Text>
        {hasCollections ? (
          collections.map(({ name, description }, idx) => (
            <HStack key={idx} className={styles.nftContainer}>
              <VStack className={styles.titleContainer}>
                <Text className={styles.title}>{`${name} Community NFT`}</Text>
                <Text className={styles.subtitle}>{description}</Text>
              </VStack>
              <HStack>
                {/* {item.isDemo ? (
                <Link href="/detail">
                  <Button className={styles.button}>View Details</Button>
                </Link>
              ) : ( */}
                <Button disabled className={styles.button}>
                  View Details
                </Button>
                {/* )}
              {item.isDemo ? (
                <Link href="/leaderboard">
                  <Button className={styles.button}>View Leaderboard</Button>
                </Link>
              ) : ( */}
                <Button disabled className={styles.button}>
                  View Leaderboard
                </Button>
                {/* )} */}
                <Button isDisabled={true} className={styles.button}>
                  Close Minting
                </Button>
              </HStack>
            </HStack>
          ))
        ) : (
          <VStack className={styles.nullContainer} gap={5}>
            <Text className={styles.title}>
              You have not published any Community NFTs yet :(
            </Text>
            <Text className={styles.subtitle}>
              Go to the Community NFT Builder to launch your first Community NFT
            </Text>
            <Link href="/builder">
              <Button className={styles.button}>Go to Builder</Button>
            </Link>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
};

export default withTransition(Dashboard);
