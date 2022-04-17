import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Respitory - A Learning Platform</title>
      </Head>
      <div>
        <h1>Welcome to Respitory</h1>
        <img src="https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg" alt="" />
      </div>
    </>
  );
}
