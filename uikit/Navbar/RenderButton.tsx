import { Button, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useUserStore } from '../../store/UserStore';

function ButtonNavbar() {
  const { user, removeUser } = useUserStore();
  if (user) {
    return (
      <HStack>
        {user.role === 'ADMIN' && <Button>Go To dashboard</Button>}
        <Button>My booking List</Button>
        <Link href="/logout" passHref>
          <Button color="white" onClick={() => removeUser()}>
            Logout
          </Button>
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
