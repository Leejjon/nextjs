import {sql} from "@vercel/postgres";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest,
                                      res: NextApiResponse) {
    const {entryId} = req.query;
    const {rows} = await sql`SELECT COUNT(*) FROM queueEntries WHERE entryId < ${entryId as string} AND ready = false;`;
    res.setHeader('Cache-Control', 'public, max-age=0');
    let returnValue = 0;
    if (rows) {
        const {count} = rows[0];
        returnValue = count;
    }
    res.status(200).json({count: returnValue});
}
