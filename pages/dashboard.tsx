import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ListBikeContainer } from '../modules/Bike/ListBike';
import { ListUsers } from '../modules/Profile/ListUsers';
import { RegisterContainer } from '../modules/Register/RegisterContainer';
import { useUserStore } from '../store/UserStore';
import { Layout } from '../uikit/Layout';

export default function DashboardPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user?.role !== 'ADMIN') {
        console.log('dashboard', user);
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
                <Button>Create bike</Button>
                <ListBikeContainer variant="admin" />
              </TabPanel>
              <TabPanel>
                <Button onClick={onOpen}>Create user</Button>
                <ListUsers />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <RegisterContainer variant="admin" />
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
}
