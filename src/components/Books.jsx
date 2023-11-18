import { Card, Heading, Image, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link href={`/detail/${id}`}>
      <Card key={id} my={4} p={4} cursor="pointer" bg="beige" color="navy">
        <VStack>
          <Heading size={"md"} color="navy">
            {title} ({year})
          </Heading>
          <Text color="navy">{author}</Text>
          <Image width={500} height={500} src={`${image}`} alt={`${id}-${title}`} />
          <Text color="navy">
            <span>Publisher: </span>
            {publisher}
          </Text>
        </VStack>
      </Card>
    </Link>
  );
}
