import {sql} from "@vercel/postgres";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest,
                                      res: NextApiResponse) {
    const {rows} = await sql`INSERT INTO queueEntries(ready)
                             VALUES (false)
                             RETURNING entryId;`;
    const row = rows[0];
    const {entryid} = row;

    res.status(200).json({entryid: entryid});
}
