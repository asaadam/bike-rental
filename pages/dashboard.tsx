import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import Cookies from 'universal-cookie';
import { ListBikeContainer } from '../modules/Bike/ListBike';
import { ListUsers } from '../modules/Profile/ListUsers';
import { Layout } from '../uikit/Layout';

export default function DashboardPage() {
  return (
    <Layout>
      <>
        <Tabs isFitted variant="enclosed" width={'100%'}>
          <TabList mb="1em">
            <Tab>Bike</Tab>
            <Tab>Users</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ListBikeContainer variant="manager" />
            </TabPanel>
            <TabPanel>
              <ListUsers />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = new Cookies(context.req.headers.cookie);
  if (cookies.get('role') !== 'MANAGER') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: {},
  };
}
