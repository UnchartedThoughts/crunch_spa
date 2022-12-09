import Head from "next/head";
import { useEffect, useState } from "react";
import { FilmStrip } from "../components/FilmStrip";
import { loadUpTemplates } from "../services/getTemplates";
import styles from "../styles/Home.module.css";

export default function Home() {
  function selectedThumbnail(id: string) {
    console.log(id);
    return id;
  }

  interface FilmStrips {
    title: string;
    cost: string;
    id: string;
    description: string;
    thumbnail: string;
    image: string;
    base64?: string;
  }

  const [templates, setTemplates] = useState<FilmStrips[]>([]);

  async function getTemplates() {
    if (templates.length <= 0) {
      const temp = await loadUpTemplates();
      console.log(templates);
      setTemplates(temp);
    }
  }
  getTemplates();
  useEffect(() => {
    getTemplates();
  }, [templates]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Crunch Test</title>
        <meta name="description" content="Crunch SPA test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {templates.length > 0 && (
          <FilmStrip
            isDisabled={false}
            filmStrip={templates}
            selectThumbnail={selectedThumbnail}
            selectedThumbnailId={templates[0].id}
          />
        )}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
