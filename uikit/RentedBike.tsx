import { Grid, Heading, VStack, Box, Button } from '@chakra-ui/react';
import { BikeDetailVariant } from '../modules/Bike/ListBike';
import { RatingBike } from '../modules/Bike/RatingBike';
import { RentedBikeWithBike } from '../types/Auth';
import { formatDisplayDate } from '../utils/formatDate';

type Props = {
  rentedBike: RentedBikeWithBike;
  variant?: BikeDetailVariant;
  onSuccess: () => void;
};
function Rentedbike({ rentedBike, variant = 'default', onSuccess }: Props) {
  return (
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
          <Heading size="sm">Location : {rentedBike.bike.location}</Heading>
          <Heading size="sm">Color : {rentedBike.bike.color}</Heading>
          <Heading size="sm">Bike Rating : {rentedBike.bike.rating}</Heading>
        </VStack>
      </Box>
      <Heading size="sm">
        Rented From : {formatDisplayDate(rentedBike.startDate)}
      </Heading>
      <Heading size="sm">
        Rented To : {formatDisplayDate(rentedBike.endDate)}
      </Heading>
      {rentedBike?.BikeRating?.rating ? (
        <Heading size="sm">
          Rating:
          <br />
          {rentedBike.BikeRating.rating}{' '}
        </Heading>
      ) : variant === 'default' ? (
        <RatingBike
          bike={rentedBike.bike}
          rentedId={rentedBike.id}
          onSuccess={onSuccess}
        />
      ) : (
        <p>No Rating yet</p>
      )}
    </Grid>
  );
}

export { Rentedbike };
