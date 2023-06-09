import {NextApiRequest, NextApiResponse} from "next";
import {sql} from "@vercel/postgres";

export default async function handler(req: NextApiRequest,
                                      res: NextApiResponse) {
    const {rows} = await sql`select entryid from queueEntries where ready = false`;

    const unfinishedEntries: Array<number> = [];
    if (rows) {
        rows.forEach(item => {
            const {entryid} = item;
            unfinishedEntries.push(entryid);
        });
    }
    res.status(200).json({entries: unfinishedEntries});
}
