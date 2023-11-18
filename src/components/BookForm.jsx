import { createBook, editBook } from "@/modules/fetch";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Image,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function BookForm({ bookData }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select an image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        toast({
          title: "Success",
          description: "Book edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.response.data.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      return;
    }
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: "Success",
        description: "Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedImage("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:3000/${bookData?.image}`);
    }
  }, [bookData]);

  return (
    <Box
      border="1px solid #E2E8F0"
      borderRadius="md"
      p="4"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              required
              defaultValue={bookData?.title}
              bg="beige"
              color="navy"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Author</FormLabel>
            <Input
              name="author"
              required
              defaultValue={bookData?.author}
              bg="beige"
              color="navy"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Publisher</FormLabel>
            <Input
              name="publisher"
              required
              defaultValue={bookData?.publisher}
              bg="beige"
              color="navy"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Year</FormLabel>
            <Input
              name="year"
              type="number"
              required
              defaultValue={bookData?.year}
              bg="beige"
              color="navy"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Pages</FormLabel>
            <Input
              name="pages"
              type="number"
              required
              defaultValue={bookData?.pages}
              bg="beige"
              color="navy"
            />
          </FormControl>
          {selectedImage && (
            <Image w={64} src={selectedImage} alt="Selected Image" />
          )}
          {!bookData?.image && (
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                }}
              />
            </FormControl>
          )}
          <Button type="submit" bg="navy" color="beige" _hover={{ bg: "darkslategray" }}>
            {bookData ? "Edit Book" : "Create Book"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
