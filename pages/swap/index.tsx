// @ts-nocheck
import { Box, Center, Container, Heading, Spinner } from "@chakra-ui/react";
import {
  Swap,
  usePublicKey,
  useTokenBondingFromMint,
} from "@strata-foundation/react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import React from "react";

export const SwapDisplay: NextPage = () => {
  const router = useRouter();
  const mintKeyRaw = "DwyrS41AcCcfjRXeCMnGHtkr84Yij6VCzhac5pJM9Ejm";
  const mintKey = usePublicKey(mintKeyRaw as string);
  const { info: tokenBonding, loading } = useTokenBondingFromMint(mintKey);
console.log(tokenBonding?.publicKey.toBase58())
  return (
    <Box
      w="full"
      backgroundColor="#f9f9f9"
      height="100vh"
      overflow="auto"
      paddingBottom="200px"
    >
      <Box padding="54px" backgroundColor="black.500" />
      <Container mt="-72px"  maxW="460px">
        <Heading mb={2} color="white" fontSize="24px" fontWeight={600}>
          Swap
        </Heading>
        <Box zIndex={1} bg="white" shadow="xl" rounded="lg" minH="400px">
          {loading && (
            <Center>
              <Spinner />
            </Center>
          )}
          {!loading && tokenBonding && (
            <Swap tokenBondingKey={tokenBonding!.publicKey} />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default SwapDisplay;
