import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { registerUser } from "../modules/fetch";
import Wrapper from "@/components/Wrapper";
import { useRouter } from "next/router";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await registerUser(e.target.name.value, e.target.email.value, password);
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    } catch (e) {
      const errorMessage = e.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      toast({
        title: "An error occurred.",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Wrapper>
      <Box w="full" py={4} px={24} mx="auto" mt={8}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Register
        </Text>

        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <form onSubmit={handleSubmit}>
            {error && (
              <Box color="red.500" mb={4}>
                {error}
              </Box>
            )}

            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="name" name="name" placeholder="Enter your name" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {password !== confirmPassword && (
                <Text fontSize="xs" color="red.500">
                  The password does not match
                </Text>
              )}
            </FormControl>

            <Button
            mt={6}
            colorScheme="teal"
            type="submit"
            color="white"
            bg="navy"
            _hover={{ bg: "blue.700" }}
          >
            Register
          </Button>
          </form>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Register;
