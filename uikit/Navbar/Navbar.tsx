import { Heading, HStack } from '@chakra-ui/react';
import { ButtonNavbar } from './RenderButton';

function Navbar() {
  return (
    <HStack justifyContent="space-between" maxW={'8xl'} mx="auto" mt={4} px={6}>
      <Heading>Bike Rent</Heading>
      <ButtonNavbar />
    </HStack>
  );
}
export { Navbar };
