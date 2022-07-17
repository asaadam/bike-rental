import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useUserStore } from '../../store/UserStore';

function ButtonNavbar() {
  const { user, removeUser } = useUserStore();
  if (user) {
    return (
      <Link href="/logout" passHref>
        <Button variant="ghost" color="white" onClick={() => removeUser()}>
          Logout
        </Button>
      </Link>
    );
  }
  return (
    <Link href="/login" passHref>
      <Button> Login </Button>
    </Link>
  );
}

export { ButtonNavbar };
