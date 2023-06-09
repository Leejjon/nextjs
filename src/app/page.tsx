import styles from './page.module.css';
import CountDisplayer from './components/CountDisplayer'

export default async function Home() {
  return (
    <main className={styles.main}>
      <div style={{color: "black"}} >
        <CountDisplayer/>
      </div>
    </main>
  )
}
