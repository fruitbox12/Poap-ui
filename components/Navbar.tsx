import Link from "next/link";
import styles from "@styles/Navbar.module.css";
import { HStack, Spacer, Text, Image, Box } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <HStack className={styles.navbar}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="soundscape Logo"
          cursor="pointer"
          className={styles.logo}
        ></Image>
      </Link>
      <HStack>
        <ConnectButton />
      </HStack>
    </HStack>
  );
};

export default Navbar;
