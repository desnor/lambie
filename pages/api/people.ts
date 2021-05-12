import { Amplify, withSSRContext } from 'aws-amplify';
import { NextApiRequest, NextApiResponse } from 'next';
import { listPersons } from '../../src/graphql/queries';
import awsExports from '../../src/aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const SSR = withSSRContext({ req });

  const {
    data: {
      listPersons: { items }
    }
  } = await SSR.API.graphql({ query: listPersons });

  res.status(200).json({
    items
  });
}
