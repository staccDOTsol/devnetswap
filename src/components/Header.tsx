import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  LinkProps,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useWallet } from "@solana/wallet-adapter-react";
import { TwitterLink } from "./TwitterLink";
import { WalletModalButton } from "./WalletModalButton";
import { route, routes } from "../utils/routes";


const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link px={2} py={1} href={href} fontSize="sm">
    {children}
  </Link>
);

export const Header: React.FC = () => {
  const Links = [
    { link: "Fair3d.me", href: "https://fair3d.me" },
    { link: "Swap", href: route(routes.swap) },
  ];
  const { disconnect, connected } = useWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box zIndex={100} color="white" bg="black.300" w="full">
        <Center w="full" height="56px" alignItems="center">
          <Container
            maxW="container.lg"
            w="full"
            display="flex"
            justifyContent="space-between"
          >
            <IconButton
              size={"md"}
              bg="black.300"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              _active={{
                bg: "black.300",
              }}
              _hover={{
                bg: "black.300",
              }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Link href="/">
                <Image alt="Strata Launchpad" style={{width:"11%", height: "11%"}} src="/jare.png" />
              </Link>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link) => (
                  <NavLink key={link.link} href={link.href}>
                    {link.link}
                  </NavLink>
                ))}
              </HStack>
            </HStack>
            <HStack
              align="center"
              justify={["center", "space-between", "flex-end", "flex-end"]}
              direction={["column", "row", "row", "row"]}
              pt="0"
            >
              <Flex justify="center" align="center" display={{ base: "none", md: "flex" }}>
                <TwitterLink />
                {connected && (
                  <Button
                    size="sm"
                    _hover={{ backgroundColor: "black.500" }}
                    variant="ghost"
                    onClick={() => disconnect()}
                  >
                    Disconnect
                  </Button>
                )}
                <WalletModalButton />
              </Flex>
              <Flex justify="center" display={{ base: "flex", md: "none" }}>
                <WalletModalButton size="sm" />
              </Flex>
            </HStack>
          </Container>
        </Center>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <VStack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.link} href={link.href}>
                  {link.link}
                </NavLink>
              ))}
            </VStack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
