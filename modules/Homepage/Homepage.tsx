import { Accordion, Heading } from '@chakra-ui/react';
import { BikeDetail } from '../../uikit/BikeDetail';
import { useGetBike } from './HomePageService';

function HomePage() {
  const { data } = useGetBike();

  return (
    <>
      <Heading size="lg">List of Bike</Heading>
      <Accordion allowMultiple width={'100%'}>
        {data?.bikeData.map((bike) => (
          <BikeDetail bike={bike} key={bike.id} />
        ))}
      </Accordion>
    </>
  );
}

export { HomePage };
