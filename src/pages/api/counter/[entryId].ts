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

    let isReady = false;
    const result = await sql`SELECT ready from queueEntries WHERE entryId = ${entryId as string};`;
    if (result.rows) {
        const {ready} = result.rows[0];
        isReady = ready;
    }
    res.status(200).json({count: returnValue, ready: isReady});
}
