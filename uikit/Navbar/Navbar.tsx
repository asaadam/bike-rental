import { Heading, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { ButtonNavbar } from './RenderButton';

function Navbar() {
  return (
    <HStack justifyContent="space-between" maxW={'8xl'} mx="auto" mt={4} px={6}>
      <Link passHref href={'/'}>
        <Heading cursor={'pointer'}>Bike Rent</Heading>
      </Link>
      <ButtonNavbar />
    </HStack>
  );
}
export { Navbar };
