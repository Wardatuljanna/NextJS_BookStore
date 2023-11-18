import { useAuth } from "@/modules/context/authContext";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { loginUser } from "../modules/fetch";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="navy"
      color="beige"
    >
      <Link href="/">
        <Flex align="center" mr={5} cursor="pointer">
          <Text fontSize="xl" fontWeight="bold" _hover={{ color: "blue.500" }}>
            My Website
          </Text>
        </Flex>
      </Link>
      <HStack>
        {isLoggedIn && (
          <Link href="/newbook">
            <Button colorScheme="blue" bg="beige" color="navy">
              Create New Book
            </Button>
          </Link>
        )}
        {!isLoggedIn ? (
          <Button onClick={onOpen} colorScheme="blue" bg="beige" color="navy">
            Login
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            onClick={() => {
              Cookies.remove("isLoggedIn");
              setIsLoggedIn(false);
            }}
            bg="beige"
            color="navy"
          >
            Logout
          </Button>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await loginUser(e.target.email.value, e.target.password.value);
              Cookies.set("isLoggedIn", true);
              setIsLoggedIn(true);
              onClose();
            } catch (err) {
              toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          <ModalOverlay />
          <ModalContent bg="navy" color="beige">
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    bg="beige"
                    color="navy"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    bg="beige"
                    color="navy"
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" form="login-form" colorScheme="blue" mr={3} bg="navy" color="beige">
                Login
              </Button>
              <Link href="/register" onClick={onClose}>
                <Button variant="ghost" color="beige" _hover={{ bg: "blue" }}>
                  Doesn&apos;t Have Account? Click here
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
};

export default Navbar;
