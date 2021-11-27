import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";

function login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <Head>
        <title>JAK Spotify Clone | Login</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <img src="https://links.papareact.com/9xl" className="w-52 pb-5" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="">
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            className="bg-[#18D860] text-white p-5 rounded-full"
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers: providers,
    },
  };
}
