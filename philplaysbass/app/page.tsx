import Image from "next/image";
import styles from "./page.module.css";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Nav />
        <Hero /> 
      </main>
    </div>
  );
}
