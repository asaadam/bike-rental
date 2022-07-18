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
          <Grid
            key={rentedBike.id}
            width={'100%'}
            templateColumns="repeat(4, 1fr)"
            gap={6}
          >
            <Box>
              <Heading size="sm">Bike Detail</Heading>
              <VStack>
                <Heading size="sm">Model : {rentedBike.bike.model}</Heading>
                <Heading size="sm">
                  Location : {rentedBike.bike.location}
                </Heading>
                <Heading size="sm">Color : {rentedBike.bike.color}</Heading>
                <Heading size="sm">
                  Bike Rating : {rentedBike.bike.rating}
                </Heading>
              </VStack>
            </Box>
            <Heading size="sm">
              Rented From : {formatDisplayDate(rentedBike.startDate)}
            </Heading>
            <Heading size="sm">
              Rented To : {formatDisplayDate(rentedBike.endDate)}
            </Heading>
            <Heading size="sm">
              Rating:
              <br />
              {rentedBike?.BikeRating?.rating ? (
                rentedBike.BikeRating.rating
              ) : (
                <p color="red">This user it&#39;s not giving rating yet</p>
              )}
            </Heading>
          </Grid>
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
}

export { UserDetail };
