import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Grid,
  Heading,
  HStack,
} from '@chakra-ui/react';
import { AllBikeType } from '../types/Bike';
import { formatDisplayDate } from '../utils/formatDate';
type Props = {
  bike: AllBikeType;
};

function BikeDetail({ bike }: Props) {
  return (
    <AccordionItem>
      <AccordionButton>
        <Grid width={'100%'} templateColumns="repeat(5, 1fr)" gap={6}>
          <Heading size="sm">Model : {bike.model}</Heading>
          <Heading size="sm">Location : {bike.location}</Heading>
          <Heading size="sm">Color : {bike.color}</Heading>
          <Heading size="sm"> Rating : {bike.rating} </Heading>
          <AccordionIcon />
        </Grid>
      </AccordionButton>
      <AccordionPanel pb={4}>
        <Heading size="md">Rented Data</Heading>
        {bike.rentedData.map((rented) => (
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
    </AccordionItem>
  );
}

export { BikeDetail };
