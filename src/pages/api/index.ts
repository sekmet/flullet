import type { NextApiRequest, NextApiResponse } from "next"

export default async function apiResult(req: NextApiRequest, res: NextApiResponse) {

    res.status(200).json({
        result: "ok",
        status: true,
        statusCode: 200, 
        message: "ok"
    });

    return res;
}