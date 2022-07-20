import { Button, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useUserStore } from '../../store/UserStore';

function ButtonNavbar() {
  const { user } = useUserStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();

    cookies.get('isLoggedIn') ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);
  if (isLoggedIn) {
    return (
      <HStack>
        {user?.role === 'USER' && (
          <Link href="/mybooking" passHref>
            <Button>My booking List</Button>
          </Link>
        )}
        <Link href="/logout" passHref>
          <Button color="white">Logout</Button>
        </Link>
      </HStack>
    );
  }
  return (
    <HStack>
      <Link href="/login" passHref>
        <Button> Login </Button>
      </Link>
      <Link href="/register" passHref>
        <Button> Register </Button>
      </Link>
    </HStack>
  );
}

export { ButtonNavbar };
