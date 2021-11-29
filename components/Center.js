import { useSession } from "next-auth/react";
import { ChevronDownIcon, PlayIcon } from "@heroicons/react/solid";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState, playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Center = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const spotifyAPI = useSpotify();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  let totalTime = "";

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyAPI
      .getPlaylist(playlistId)
      .then((data) => setPlaylist(data.body))
      .catch((error) => console.log(error.message));
  }, [spotifyAPI, playlistId]);

  console.log(playlist);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img className="rounded-full w-10 h-10" src={session?.user?.image} />
          <h2 className="text-white">{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5 text-white" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          className="h-[232px] w-[232px] shadow-2xl"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl mb-2 font-bold">
            {playlist?.name}
          </h1>
          <p className="hidden md:inline mt-5 text-gray-400 text-xs xl:text-sm">
            {playlist?.description}
          </p>
          <div>
            <p className="hidden md:inline text-gray-400 text-xs">
              <span className="font-bold text-white">
                {playlist?.owner?.display_name}
              </span>{" "}
              • {playlist?.tracks?.items.length} Songs • {totalTime}
            </p>
          </div>
        </div>
      </section>
      <div className="flex items-center px-10 py-4 pb-6 space-x-12">
        <PlayIcon
          className="h-[60px] w-[60px] text-green-500 bg-white rounded-full cursor-pointer hover:bg-gray-200"
          onClick={() => {}}
        />
        <DotsHorizontalIcon className="h-7 w-7 text-gray-400 cursor-pointer hover:text-gray-600" />
      </div>
      <div className="flex text-gray-400 mb-4 px-14 justify-between">
        <h2>
          # <span className="ml-5">TITLE</span>
        </h2>
        <h2>ALBUM</h2>
        <h2>Duration</h2>
      </div>
      <hr className="border-gray-500 mb-4 mx-12" />
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
