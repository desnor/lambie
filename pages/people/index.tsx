import { Amplify, withSSRContext } from 'aws-amplify';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import PersonList from '../../components/PersonList';
import { Person } from '../../interfaces';
import awsExports from '../../src/aws-exports';
import { listPersons } from '../../src/graphql/queries';

type PeopleIndexProps = {
  items: Person[];
};

Amplify.configure({ ...awsExports, ssr: true });

const PeopleIndexPage = ({ items }: PeopleIndexProps) => (
  <Layout title="People">
    <h1>List of People</h1>
    <p>You are currently on: /people</p>
    <PersonList items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getServerSideProps: GetServerSideProps<PeopleIndexProps> = async ({
  req
}) => {
  const SSR = withSSRContext({ req });
  const {
    data: {
      listPersons: { items }
    }
  } = await SSR.API.graphql({ query: listPersons });

  return {
    props: {
      items
    }
  };
};

export default PeopleIndexPage;
