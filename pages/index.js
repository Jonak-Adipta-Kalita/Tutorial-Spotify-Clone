import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { hasPremiumState } from "../atoms/userAtom";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";
import useSpotify from "../hooks/useSpotify";

const Home = () => {
  const setHasPremium = useSetRecoilState(hasPremiumState);
  const { data: session } = useSession();
  const spotifyAPI = useSpotify();

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getUser(session?.user?.username).then((user) => {
        setHasPremium(false);
      });
    }
  }, [spotifyAPI, session]);

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
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session: session,
    },
  };
}
