import { client } from '@PescaPE/db/client';
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
    let code = '';
    const count = await client.report.count();
    code += count.toString();
    code += new Date().toLocaleDateString('pt-BR').split('/')[1].split('')[1];
    while (code.length <= 7) code += Math.random().toString().at(-1);
    const report = await client.report.create({
      data: {
        descriptionOccurred,
        detailsInvolved,
        type,
        code,
      },
    });
    const e = evidences.map(
      async (dataURL) => await client.evidence.create({ data: { dataURL, reportId: report.id } })
    );
    Promise.all(e).then((e) => {
      res.status(201).json(
        new ApiResponse(true, {
          report: { code: report.code },
        })
      );
    });
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
