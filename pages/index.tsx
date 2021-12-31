import styles from "../src/assets/styles/Home.module.scss";

function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Prettier GitHub Links!</h1>
      <p className={styles.preview}>
        Customize your repository presentation card using form below, preview it
        and then hit publish!
      </p>
      <p className={styles.preview}>
        Now you have your own personalized way to present your repository on any
        social media!
      </p>
    </main>
  );
}

export default Home;
