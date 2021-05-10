import { NextApiRequest, NextApiResponse } from 'next';
import { samplePeopleData } from '../../../utils/sample-data';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(samplePeopleData)) {
      throw new Error('Cannot find people data');
    }

    res.status(200).json(samplePeopleData);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
