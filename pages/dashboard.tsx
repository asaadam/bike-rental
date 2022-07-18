import { ListBikeContainer } from '../modules/ListBike/ListBike';
import { Layout } from '../uikit/Layout';

export default function DashboardPage() {
  return (
    <Layout>
      <ListBikeContainer variant="admin" />
    </Layout>
  );
}
