import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Wrapper from "@/components/Wrapper";
import { useRouter } from "next/router";
import Link from "next/link";
import { deleteBook, getBookDetailById } from "@/modules/fetch";
import { useAuth } from "@/modules/context/authContext";
import { prisma } from "@/utils/prisma";

export default function BookDetails({ book }) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const handleDeleteBook = async () => {
    try {
      await deleteBook(router.query.id);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <Box
        border="1px solid #E2E8F0"
        borderRadius="md"
        p="4"
      >
        <Flex
          my="6"
          direction={{ base: "column", md: "row" }}
          justify="center"
          align="center"
          alignItems="flex-start"
        >
          <Box w={{ base: "100%", md: "300px" }} mb={{ base: "4", md: "0" }}>
            <Image width={500} height={500} src={`${book.image}`} alt={book.title} />
          </Box>
          <Box ml={{ base: "0", md: "8" }} textAlign={{ base: "center", md: "left" }}>
            <Heading as="h1" size="lg" color="navy">
              {book.title}
            </Heading>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              {book.author}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              {book.publisher}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500" mb="4">
              {book.year} | {book.pages} pages
            </Text>
          </Box>
        </Flex>
      </Box>
      {isLoggedIn && (
        <HStack justify="center">
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="red" bg="navy" color="beige">
                Delete
              </Button>
            </PopoverTrigger>
            <PopoverContent bg="beige" color="navy">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>
                Are you sure you want to delete this book?
              </PopoverBody>
              <Button onClick={handleDeleteBook} colorScheme="red" bg="navy" color="beige" _hover={{ bg: "darkslategray" }}>
                Delete
              </Button>
            </PopoverContent>
          </Popover>
          <Link href={`/edit/${router.query.id}`}>
            <Button bg="navy" color="beige" _hover={{ bg: "darkslategray" }}>
              Edit
            </Button>
          </Link>
        </HStack>
      )}
    </Wrapper>
  );
}


export async function getStaticPaths() {
  // get all books id
  const books = await prisma.book.findMany({
    select: {
      id: true,
    },
  });
  const paths = books.map((book) => ({
    params: { id: book.id.toString() },
  }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(context.params.id) },
    });
    return {
      props: {
        book,
      },
      revalidate: 10,
    };
  } catch (e) {
    console.log(e);
    return {
      props: {},
    };
  }
}
