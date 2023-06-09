import {NextApiRequest, NextApiResponse} from "next";
import {sql} from "@vercel/postgres";

export default async function handler(req: NextApiRequest,
                                      res: NextApiResponse) {
    if (req.method === "POST") {
        const {entryId} = req.query;
        await sql`UPDATE queueEntries SET ready = true WHERE entryid = ${entryId as string}`;

        res.status(200).json({});
    } else {
        res.status(405).json({});
    }
}
