import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserStore } from '../store/UserStore';
import { Layout } from '../uikit/Layout';

export default function Logout() {
  const { removeUser } = useUserStore();
  const router = useRouter();
  useEffect(() => {
    removeUser();
    router.push('/');
  }, [removeUser, router]);
  return <Layout>{}</Layout>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  //clear cookies and redirect to login
  context.res.setHeader('Set-Cookie', [
    `token=deleted; Max-Age=0; path=/`,
    `isLoggedIn=deleted; Max-Age=0; path=/`,
  ]);
  return {
    props: {},
  };
}
