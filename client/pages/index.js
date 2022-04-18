import axios from "axios";
import Head from "next/head";
import { useUser } from "../store";

export default function Home() {
  const user = useUser();

  return (
    <>
      <Head>
        <title>Respitory - A Learning Platform</title>
      </Head>
      <div>
        <h1>Welcome {user?.userName}, to Respitory </h1>
        <button>Send Email</button>
        <img src="https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg" alt="" />
      </div>
    </>
  );
}
