import { Button, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { useUserStore } from '../../store/UserStore';

function ButtonNavbar() {
  const { user } = useUserStore();
  const cookies = new Cookies();

  if (user) {
    return (
      <HStack>
        {user.role === 'ADMIN' && cookies.get('isLoggedin') && (
          <>
            <Link href="/dashboard" passHref>
              <Button>Go To dashboard</Button>
            </Link>
          </>
        )}
        <Button>My booking List</Button>
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
