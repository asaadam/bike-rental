import { GetServerSidePropsContext } from 'next';

export default function logout() {
  return (
    <div>
      <h1>Logout</h1>
      <p>You are now logged out</p>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  //clear cookies and redirect to login
  context.res.setHeader('Set-Cookie', [`token=deleted; Max-Age=0; path=/`]);

  return {
    redirect: {
      permanent: false,
      destination: '/login',
    },
  };
}
