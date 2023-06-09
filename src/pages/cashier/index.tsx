import styles from "@/app/page.module.css";
import QueueEntriesList from "@/app/components/QueueEntriesList";

export default function Home() {
    return (
        <main className={styles.main}>
            <div style={{color: "black"}}>
                <QueueEntriesList/>
            </div>
        </main>
    )
}
