import { Button } from '@chakra-ui/react';
import Link from 'next/link';

function ButtonNavbar() {
  return (
    <Link href="/login" passHref>
      <Button> Login </Button>
    </Link>
  );
}

export { ButtonNavbar };
