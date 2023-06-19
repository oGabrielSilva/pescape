import { Exception } from '@PescaPE/exceptions/Exception';
import { InternalServerError } from '@PescaPE/exceptions/InternalServerError';
import { ApiResponse } from '@PescaPE/resources/ApiResponse';
import type { NextApiRequest, NextApiResponse } from 'next';

interface NextApiRequestExtended extends NextApiRequest {
  body: {
    type: string;
    detailsInvolved: string;
    descriptionOccurred: string;
    evidences: Array<string>;
  };
}

export default async function handler(req: NextApiRequestExtended, res: NextApiResponse) {
  try {
    const { descriptionOccurred, detailsInvolved, type, evidences } = req.body;
    res.status(201).end();
  } catch (error) {
    if (error instanceof Exception) return res.status(error.status).json(error);
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(false, null, new InternalServerError('unknown exception')));
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
};
