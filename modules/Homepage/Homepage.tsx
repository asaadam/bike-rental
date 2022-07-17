import { useGetBike } from './HomePageService';

function HomePage() {
  const { data } = useGetBike();

  return <div>Homepage</div>;
}

export { HomePage };
