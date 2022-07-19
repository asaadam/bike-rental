import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Grid,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { UserResponse } from '../types/Auth';
import { formatDisplayDate } from '../utils/formatDate';
import { Rentedbike } from './RentedBike';

type Props = {
  user: UserResponse;
  onEdit?: () => void;
};

function UserDetail({ user, onEdit }: Props) {
  return (
    <AccordionItem>
      <HStack>
        <AccordionButton>
          <Grid width={'100%'} templateColumns={'repeat(4, 1fr)'} gap={6}>
            <Heading size="sm">Name: {user.name}</Heading>
            <Heading size="sm">Email: {user.email}</Heading>
            <Heading size="sm">Role : {user.role}</Heading>
            <AccordionIcon />
          </Grid>
        </AccordionButton>
        <HStack>
          <Button onClick={onEdit}>Edit User</Button>
          <Button>Delete User</Button>
        </HStack>
      </HStack>
      <AccordionPanel pb={4}>
        <Heading size="md">Rented Data</Heading>
        {user?.RentedBike?.length === 0 && (
          <Heading color="red" size="md">
            This user it&#39;s not rented any bikes yet
          </Heading>
        )}
        {user?.RentedBike?.map?.((rentedBike) => (
          <Rentedbike
            onSuccess={() => {}}
            rentedBike={rentedBike}
            key={rentedBike.id}
            variant="manager"
          />
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
}

export { UserDetail };
