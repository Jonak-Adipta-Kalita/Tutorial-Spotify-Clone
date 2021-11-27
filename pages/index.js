import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>JAK Spotify Clone</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      {/* Player */}
    </div>
  );
};

export default Home;
