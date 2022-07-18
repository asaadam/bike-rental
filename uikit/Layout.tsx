import { VStack } from '@chakra-ui/react';
import { Navbar } from './Navbar/Navbar';
import styles from '../styles/Home.module.css';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <VStack maxW={'8xl'} mx="auto" mt={8}>
        {children}
      </VStack>
    </>
  );
}

export { Layout };
