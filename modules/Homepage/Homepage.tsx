import { useGetBike } from './HomePageService';

function HomePage() {
  const { data } = useGetBike();
  {
    console.log(data);
  }
  return <div>Homepage</div>;
}

export { HomePage };
