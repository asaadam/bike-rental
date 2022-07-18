import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  Grid,
  Heading,
  HStack,
} from '@chakra-ui/react';
import { BikeDetailVariant } from '../modules/Bike/ListBike';
import { AllBikeType } from '../types/Bike';
import { formatDisplayDate } from '../utils/formatDate';

type Props = {
  bike: AllBikeType;
  variant?: BikeDetailVariant;
};

function BikeDetail({ bike, variant = 'default' }: Props) {
  return (
    <AccordionItem>
      <AccordionButton>
        <Grid
          width={'100%'}
          templateColumns={
            variant === 'default' ? 'repeat(6, 1fr)' : 'repeat(5, 1fr)'
          }
          gap={6}
        >
          <Heading size="sm">Model : {bike.model}</Heading>
          <Heading size="sm">Location : {bike.location}</Heading>
          <Heading size="sm">Color : {bike.color}</Heading>
          <Heading size="sm"> Rating : {bike.rating} </Heading>
          {variant === 'default' && (
            <Heading size="sm">
              Available for book :
              <Checkbox isChecked={bike.rentedData.length === 0} />
            </Heading>
          )}

          {variant === 'admin' && <AccordionIcon />}
        </Grid>
      </AccordionButton>
      {variant === 'admin' && (
        <AccordionPanel pb={4}>
          <Heading size="md">Rented Data</Heading>
          {bike?.rentedData?.map?.((rented) => (
            <Grid
              key={rented.id}
              width={'100%'}
              templateColumns="repeat(5, 1fr)"
              gap={6}
            >
              <Heading size="sm">User: {rented.user.name}</Heading>
              <Heading size="sm">
                Rented From : {formatDisplayDate(rented.startDate)}
              </Heading>
              <Heading size="sm">
                Rented To : {formatDisplayDate(rented.endDate)}
              </Heading>
              <Heading size="sm">
                Rating:
                {rented.BikeRating ? rented.BikeRating.rating : 'No Rating'}
              </Heading>
            </Grid>
          ))}
        </AccordionPanel>
      )}
    </AccordionItem>
  );
}

export { BikeDetail };
