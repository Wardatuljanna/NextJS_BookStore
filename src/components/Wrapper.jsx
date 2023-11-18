import { VStack } from "@chakra-ui/react";
import Navbar from "./Navbar";

function Wrapper(props) {
  return (
    <VStack minH="100vh" minW="100vw" bg="beige" align="stretch">
      <Navbar />
      <VStack align="stretch" w="full" p={12}>
        {props.children}
      </VStack>
    </VStack>
  );
}

export default Wrapper;
