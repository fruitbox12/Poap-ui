import { useState } from "react";
import { HStack, VStack, Text, Button, Select } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "@styles/Leaderboard.module.css";
import Link from "next/link";
// import withTransition from "@components/withTransition";
import { ExternalLinkIcon } from "@chakra-ui/icons";

type ScoreData = {
  wallet: string;
  totalScore: string;
  pScore: string;
  dScore: string;
  cScore: string;
  github: string;
  discord: string;
  tier: string;
};

const dummyData: ScoreData[] = [
  {
    wallet: "0x5A84969bb6627C5A094b478EE979C1dF1069b99A",
    totalScore: "5.4",
    pScore: "2.7",
    dScore: "6.1",
    cScore: "3.1",
    github: "konstan-luka",
    discord: "snowqueen#4321",
    tier: "Platinum",
  },
  {
    wallet: "0x6F46CF5569A67588B43E4134D88A1aDC40e4dc6D",
    totalScore: "7.2",
    pScore: "9.3",
    dScore: "5.4",
    cScore: "7.0",
    github: "jordan-kotler",
    discord: "toasterlover#1234",
    tier: "Platinum",
  },
  {
    wallet: "0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb",
    totalScore: "5.3",
    pScore: "1.6",
    dScore: "8.1",
    cScore: "2.0",
    github: "nick-clegg",
    discord: "dragonrider#0123",
    tier: "Platinum",
  },
  {
    wallet: "0x95cED938F7991cd0dFcb48F0a06A5Dd051d7CC1C",
    totalScore: "5.2",
    pScore: "3.8",
    dScore: "4.7",
    cScore: "7.8",
    github: "andrewww",
    discord: "LOTR#9876",
    tier: "Platinum",
  },
  {
    wallet: "0x3E5e9111Ae8eB78Fe1CC3bb89e84269D7aA5A296",
    totalScore: "6.1",
    pScore: "7.6",
    dScore: "2.0",
    cScore: "5.9",
    github: "sarah-kim1",
    discord: "musicme#2222",
    tier: "Platinum",
  },
  {
    wallet: "0x28a8746e75304c0780E011B41825785639C52814",
    totalScore: "5.9",
    pScore: "4.5",
    dScore: "7.7",
    cScore: "5.5",
    github: "jason-li254",
    discord: "bookworm#3333",
    tier: "Platinum",
  },
  {
    wallet: "0x71f0B67FdA57F68dC5D928d0Ec775F8eF135fae6",
    totalScore: "6.3",
    pScore: "8.5",
    dScore: "1.1",
    cScore: "6.5",
    github: "ryan-ng2",
    discord: "catlover#4124",
    tier: "Platinum",
  },
  {
    wallet: "0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e",
    totalScore: "5.8",
    pScore: "7.5",
    dScore: "2.3",
    cScore: "1.2",
    github: "john-smith",
    discord: "dogperson#5678",
    tier: "Platinum",
  },
  {
    wallet: "0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4b",
    totalScore: "6.3",
    pScore: "5.1",
    dScore: "8.2",
    cScore: "4.0",
    github: "jessica-lee",
    discord: "horseman#1357",
    tier: "Platinum",
  },
  {
    wallet: "0x95cED938F7991cd0dFcb48F0a06A5Dd051d7CC1C",
    totalScore: "5.2",
    pScore: "3.8",
    dScore: "4.7",
    cScore: "7.8",
    github: "andrewww",
    discord: "LOTR#9876",
    tier: "Platinum",
  },
  {
    wallet: "0x3E5e9111Ae8eB78Fe1CC3bb89e84269D7aA5A296",
    totalScore: "6.1",
    pScore: "7.6",
    dScore: "2.0",
    cScore: "5.9",
    github: "joanm231",
    discord: "ohnodo#222",
    tier: "Platinum",
  },
  {
    wallet: "0x28a8746e75304c0780E011B41825785639C52814",
    totalScore: "5.9",
    pScore: "4.5",
    dScore: "7.7",
    cScore: "5.5",
    github: "littleboom",
    discord: "leftcurve#33",
    tier: "Platinum",
  },
  {
    wallet: "0x71f0B67FdA57F68dC5D928d0Ec775F8eF135fae6",
    totalScore: "6.3",
    pScore: "8.5",
    dScore: "1.1",
    cScore: "6.5",
    github: "dodocuck2",
    discord: "fartooright#4444",
    tier: "Platinum",
  },
];

const dummySorted = dummyData
  .sort((a, b) => {
    return parseFloat(b.totalScore) - parseFloat(a.totalScore);
  })
  .slice(0, 10);

const Leaderboard = () => {
  const [scores, setScores] = useState<ScoreData[]>(dummySorted);
  const traits = ["pScore", "dScore", "cScore"];

  function handleSortByTrait(e: any) {
    const newScores = JSON.parse(JSON.stringify(scores));
    if (e.target.value === "totalScore") {
      newScores.sort(
        (a: ScoreData, b: ScoreData) => b.totalScore - a.totalScore
      );
    }
    if (e.target.value === "pScore") {
      newScores.sort((a: ScoreData, b: ScoreData) => b.pScore - a.pScore);
    }
    if (e.target.value === "dScore") {
      newScores.sort((a: ScoreData, b: ScoreData) => b.dScore - a.dScore);
    }
    if (e.target.value === "cScore") {
      newScores.sort((a: ScoreData, b: ScoreData) => b.cScore - a.cScore);
    }
    setScores(newScores);
  }

  return (
    <VStack className={styles.container}>
      <Text className={styles.title}>
        Bored Crepes Yacht Club Community NFT Leaderboard
      </Text>
      <HStack className={styles.filterSection}>
        <Text paddingLeft="1rem">Sort By:</Text>
        <Select
          placeholder="Select option"
          w="200px"
          onChange={handleSortByTrait}
        >
          {traits.map((trait) => (
            <option key={trait} value={trait}>
              {trait}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack className={styles.headerSection}>
        <Text>Rank</Text>
        <Text className={styles.walletAddress}>Wallet Address</Text>
        <HStack className={styles.scoreSection}>
          <Text className={styles.XPscore}>Total XP</Text>
          <Text className={styles.XPscore}>Protocol XP</Text>
          <Text className={styles.XPscore}>Dev XP</Text>
          <Text className={styles.XPscore}>Comm XP</Text>
        </HStack>
        <HStack className={styles.thirdSection}>
          <Text>Github</Text>
          <Text>Discord</Text>
          <Text>Tier</Text>
        </HStack>
        <Text>View NFT</Text>
      </HStack>
      <VStack className={styles.leaderboardSection}>
        {scores.map((item, idx) => (
          <HStack key={idx} className={styles.nftContainer}>
            <Text className={styles.title}>{idx + 1}</Text>
            <Text className={styles.walletAddress}>{item.wallet}</Text>
            <HStack className={styles.scoresSection2}>
              <Text className={styles.subtitle}>{item.totalScore}</Text>
              <Text className={styles.subtitle}>{item.pScore}</Text>
              <Text className={styles.subtitle}>{item.dScore}</Text>
              <Text className={styles.subtitle}>{item.cScore}</Text>
            </HStack>
            <HStack className={styles.thirdSection2}>
              <Text className={styles.subtitle}>{item.github}</Text>
              <Text className={styles.subtitle}>{item.discord}</Text>
              <Text className={styles.subtitle}>{item.tier}</Text>
            </HStack>
            <ExternalLinkIcon />
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default Leaderboard;

// import type { NextPage } from "next";
// import styles from "@styles/Leaderboard.module.css";
// import { VStack, HStack, Text, Link, Box, Tooltip } from "@chakra-ui/react";
// import { CheckCircleIcon, ExternalLinkIcon, InfoIcon } from "@chakra-ui/icons";
// import withTransition from "@components/withTransition";
// import { useEffect, useState } from "react";
// import { getAllScores } from "@state/scores";
// import { Select } from "@chakra-ui/react";

// type ScoreData = {
//   carbonIntensity: number;
//   accountingScore: number;
//   renewableRatio: number;
//   score: number;
//   rScore: number;
//   aScore: number;
//   iScore: number;
//   minerId: string;
//   url: string;
//   region: string;
//   country: string;
//   long: number;
//   lat: number;
//   hasMinted: boolean;
// };

// const description = {
//   rScore: "Renewable Ratio Score",
//   aScore: "Accounting Granularity Score",
//   iScore: "Carbon Intensity Score",
//   gScore: "Overall Score is an aggregate score of the three above",
// };

// // TODO: add raw scores for individual scores
// const Leaderboard: NextPage = () => {
//   const [scores, setScores] = useState<ScoreData[]>([]);
//   const [filteredScores, setFilteredScores] = useState<ScoreData[]>([]);
//   const [regions, setRegions] = useState<string[]>([]);
//   const traits = ["carbonIntensity", "accountingScore", "renewableRatio"];

//   useEffect(() => {
//     async function fetchScores() {
//       const res = await getAllScores();
//       const fetchedScores: ScoreData[] = Object.values(res);
//       fetchedScores.sort((a: ScoreData, b: ScoreData) => b.score - a.score);
//       setScores(fetchedScores);

//       const fetchedRegions = fetchedScores.map((score: any) => score.region);
//       setRegions(["ALL REGIONS", ...Array.from(new Set(fetchedRegions))]);
//     }
//     fetchScores();
//   }, []);

//   function handleSelectRegion(e: any) {
//     if (e.target.value === "ALL REGIONS") setFilteredScores([]);
//     const newScores = scores.filter(
//       (score: any) => score.region === e.target.value
//     );
//     setFilteredScores(newScores);
//   }

//   function handleSortByTrait(e: any) {
//     const newScores = JSON.parse(JSON.stringify(scores));
//     if (e.target.value === "Default") {
//       newScores.sort((a: ScoreData, b: ScoreData) => b.score - a.score);
//     }
//     if (e.target.value === "carbonIntensity") {
//       newScores.sort((a: ScoreData, b: ScoreData) => b.iScore - a.iScore);
//     }
//     if (e.target.value === "accountingScore") {
//       newScores.sort((a: ScoreData, b: ScoreData) => b.aScore - a.aScore);
//     }
//     if (e.target.value === "renewableRatio") {
//       newScores.sort((a: ScoreData, b: ScoreData) => b.rScore - a.rScore);
//     }
//     setScores(newScores);
//     setFilteredScores([]);
//   }

//   return (
//     <div className={styles.container}>
//       <VStack className={styles.titleContainer}>
//         <VStack className={styles.title}>
//           <Text>FIL STORAGE PROVIDER “GREEN” LEADERBOARD</Text>
//           <Box className={styles.headerHr} />
//         </VStack>
//         <HStack className={styles.selectSection}>
//           <HStack>
//             <Text>Filter By:</Text>
//             <Select
//               placeholder="Select option"
//               w="200px"
//               onChange={handleSelectRegion}
//             >
//               {regions.length > 0 &&
//                 regions.map((region) => (
//                   <option key={region} value={region}>
//                     {region}
//                   </option>
//                 ))}
//             </Select>
//           </HStack>
//           <HStack>
//             <Text paddingLeft="1rem">Sort By:</Text>
//             <Select
//               placeholder="Select option"
//               w="200px"
//               onChange={handleSortByTrait}
//             >
//               {traits.map((trait) => (
//                 <option key={trait} value={trait}>
//                   {trait}
//                 </option>
//               ))}
//             </Select>
//           </HStack>
//         </HStack>
//       </VStack>
//       <VStack className={styles.leaderboardContainer}>
//         <HStack className={styles.leaderboardHeader}>
//           <Box className={styles.leaderboardValue}>
//             <Text>#</Text>
//           </Box>
//           <Box className={styles.leaderboardValue}>
//             <Text>Miner ID</Text>
//           </Box>
//           <HStack className={styles.leaderboardValue}>
//             <Text>Renewable Energy</Text>
//             <Tooltip label={description.rScore}>
//               <InfoIcon className={styles.infoIcon} />
//             </Tooltip>
//           </HStack>
//           <HStack className={styles.leaderboardValue}>
//             <Text>Accounting Granularity</Text>
//             <Tooltip label={description.aScore}>
//               <InfoIcon className={styles.infoIcon} />
//             </Tooltip>
//           </HStack>
//           <HStack className={styles.leaderboardValue}>
//             <Text>Grid Carbon Intensity</Text>
//             <Tooltip label={description.iScore}>
//               <InfoIcon className={styles.infoIcon} />
//             </Tooltip>
//           </HStack>
//           <HStack className={styles.leaderboardValue}>
//             <Text>Overall Score</Text>
//             <Tooltip label={description.gScore}>
//               <InfoIcon className={styles.infoIcon} />
//             </Tooltip>
//           </HStack>
//           <Box className={styles.leaderboardValue}>
//             <Text>Region</Text>
//           </Box>
//           <Box className={styles.leaderboardValue}>
//             <Text>REC</Text>
//           </Box>
//         </HStack>
//         {!filteredScores.length
//           ? scores
//               .slice(0, 100)
//               .map(
//                 (
//                   {
//                     minerId,
//                     renewableRatio,
//                     accountingScore,
//                     carbonIntensity,
//                     rScore,
//                     aScore,
//                     iScore,
//                     score,
//                     region,
//                     url,
//                     hasMinted,
//                   }: ScoreData,
//                   idx
//                 ) => (
//                   <HStack key={minerId} className={styles.leaderboardRow}>
//                     <Box className={styles.leaderboardValue}>
//                       <Text>{idx + 1}</Text>
//                     </Box>

//                     <HStack className={styles.leaderboardValue}>
//                       <Text>{minerId}</Text>
//                       {hasMinted && <CheckCircleIcon w={6} h={6} />}
//                     </HStack>

//                     <HStack className={styles.leaderboardValue}>
//                       <Text>{`${renewableRatio.toFixed(2)} (${rScore.toFixed(
//                         2
//                       )})`}</Text>
//                     </HStack>
//                     <HStack className={styles.leaderboardValue}>
//                       <Text>{`${accountingScore.toFixed(2)} (${aScore.toFixed(
//                         2
//                       )})`}</Text>
//                     </HStack>
//                     <HStack className={styles.leaderboardValue}>
//                       <Text>
//                         {carbonIntensity === 1196.36
//                           ? `${(
//                               Math.floor(Math.random() * (1250 - 1100 + 1)) +
//                               1100
//                             ).toFixed(2)} (${iScore.toFixed(2)})`
//                           : `${carbonIntensity.toFixed(2)} (${iScore.toFixed(
//                               2
//                             )})`}
//                       </Text>
//                     </HStack>
//                     <HStack className={styles.leaderboardValue}>
//                       <Text>{score.toFixed(2)}</Text>
//                     </HStack>

//                     <Box className={styles.leaderboardValue}>
//                       <Text>{region}</Text>
//                     </Box>
//                     <Box className={styles.leaderboardValue}>
//                       <Link href={url} isExternal>
//                         <ExternalLinkIcon w={6} h={6} />
//                       </Link>
//                     </Box>
//                   </HStack>
//                 )
//               )
//           : filteredScores
//               .slice(0, 100)
//               .map(
//                 (
//                   {
//                     minerId,
//                     renewableRatio,
//                     accountingScore,
//                     carbonIntensity,
//                     rScore,
//                     aScore,
//                     iScore,
//                     score,
//                     region,
//                     url,
//                     hasMinted,
//                   }: ScoreData,
//                   idx
//                 ) => (
//                   <HStack key={minerId} className={styles.leaderboardRow}>
//                     <Box className={styles.leaderboardValue}>
//                       <Text>{idx + 1}</Text>
//                     </Box>

//                     <HStack className={styles.leaderboardValue}>
//                       <Text>{minerId}</Text>
//                       {hasMinted && <CheckCircleIcon w={6} h={6} />}
//                     </HStack>

//                     <HStack className={styles.leaderboardValue}>
//                       <Text>{`${renewableRatio.toFixed(2)} (${rScore.toFixed(
//                         2
//                       )})`}</Text>
//                     </HStack>
//                     <HStack className={styles.leaderboardValue}>
//                       <Text>{`${accountingScore.toFixed(2)} (${aScore.toFixed(
//                         2
//                       )})`}</Text>
//                     </HStack>
//                     <HStack className={styles.leaderboardValue}>
//                       <Text>
//                         {carbonIntensity === 1196.36
//                           ? `${(
//                               Math.floor(Math.random() * (1250 - 1100 + 1)) +
//                               1100
//                             ).toFixed(2)} (${iScore.toFixed(2)})`
//                           : `${carbonIntensity.toFixed(2)} (${iScore.toFixed(
//                               2
//                             )})`}
//                       </Text>
//                     </HStack>
//                     <HStack className={styles.leaderboardValue}>
//                       <Text>{score.toFixed(2)}</Text>
//                     </HStack>

//                     <Box className={styles.leaderboardValue}>
//                       <Text>{region}</Text>
//                     </Box>
//                     <Box className={styles.leaderboardValue}>
//                       <Link href={url} isExternal>
//                         <ExternalLinkIcon w={6} h={6} />
//                       </Link>
//                     </Box>
//                   </HStack>
//                 )
//               )}
//       </VStack>
//     </div>
//   );
// };

// export default withTransition(Leaderboard);
