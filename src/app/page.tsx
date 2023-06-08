import styles from './page.module.css';
import { sql } from "@vercel/postgres";

async function enterQueue(): Promise<JSX.Element> {
  const { rows } = await sql`INSERT INTO queueEntries(ready) VALUES(false) RETURNING entryId;`;
  const row = rows[0];
  const {entryid} = row;
  return (
      <div>
        Thanks for ordering, your number is {entryid}. There are x people in front of you in the queue
      </div>
  );
}

export default async function Home() {
  const queueNumberElement = await enterQueue();
  return (
    <main className={styles.main}>
      <div style={{color: "black"}} >
        {queueNumberElement}
      </div>
    </main>
  )
}
