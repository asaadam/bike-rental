import {
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ListBikeContainer } from '../modules/Bike/ListBike';
import { ListUsers } from '../modules/Profile/ListUsers';
import { useUserStore } from '../store/UserStore';
import { Layout } from '../uikit/Layout';

type modalVariant = 'createUser' | 'editUser' | 'createBike' | 'editBike';

export default function DashboardPage() {
  const { user } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user?.role !== 'ADMIN') {
        router.push('/');
      }
    }
  }, [user, router]);

  return (
    <Layout>
      {user ? (
        <>
          <Tabs isFitted variant="enclosed" width={'100%'}>
            <TabList mb="1em">
              <Tab>Bike</Tab>
              <Tab>Users</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ListBikeContainer variant="admin" />
              </TabPanel>
              <TabPanel>
                <ListUsers />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
}
