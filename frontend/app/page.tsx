import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { Image, Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pb-10">
      <h1
        className="text-6xl mb-2 font-bold text-center"
        style={{ fontFamily: '"Roboto Condensed", sans-serif' }}
      >
        Darkpool
      </h1>
      <Link href="/trade">
        <Button
          mt={2}
          px={6}
          py={4}
          textTransform="uppercase"
          fontSize="lg"
          rounded="lg"
          _hover={{ bg: "black" }}
          transition="colors 300ms ease-in-out"
          bg="#01333E"
          color="white"
          // bg={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random background color
        >
          Launch App
        </Button>
      </Link>
      <div className="w-full max-w-4xl mt-5">
        <Image borderRadius="20px" src="/homepage.png" alt="Homepage photo" />
      </div>
    </div>
  );
}
