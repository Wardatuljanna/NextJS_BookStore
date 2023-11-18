import { useEffect, useState } from "react";
import Wrapper from "@/components/Wrapper";
import BookForm from "@/components/BookForm";
import { getBookDetailById } from "@/modules/fetch";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function EditBookPage() {
  const [book, setBook] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(router.query.id);
        setBook(response.book);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [router.query.id]);

  return (
    <Wrapper>
      <Box
        border="1px solid #E2E8F0"
        borderRadius="md"
        p="4"
      >
        <BookForm bookData={book} />
      </Box>
    </Wrapper>
  );
}
