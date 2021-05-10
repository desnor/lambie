import Link from 'next/link';
import Layout from '../components/Layout';

const ProfilePage = () => (
  <Layout title="Profile | Bail Out!">
    <h1>Profile</h1>
    <p>This is profile page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default ProfilePage;
