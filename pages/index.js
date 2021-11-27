import Head from "next/head";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="">
      <Head>
        <title>JAK Spotify Clone</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="">
        <Sidebar />
        {/* Center */}
      </main>
      {/* Player */}
    </div>
  );
};

export default Home;
