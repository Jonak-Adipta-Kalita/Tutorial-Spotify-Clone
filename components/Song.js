import useSpotify from "../hooks/useSpotify";
import millistoMinuteAndSeconds from "../lib/time";
import { HeartIcon, DotsHorizontalIcon } from "@heroicons/react/outline";

const Song = ({ order, track }) => {
  const spotifyAPI = useSpotify();
  const { album, name, artists, duration_ms } = track.track;

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={() => {}}
    >
      <div className="flex items-center space-x-4">
        <p className="">{order + 1}</p>
        <img src={album.images[0].url} className="h-10 w-10" />
        <div>
          <p className="w-36 lg:w-64 truncate">{name}</p>
          <p className="w-40">
            {artists[1]
              ? artists[0].name
              : artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline w-40">{album.name}</p>
        <div className="flex items-center space-x-2">
          <HeartIcon className="h-5 w-5 cursor-pointer hover:text-white" />
          <p>{millistoMinuteAndSeconds(duration_ms)}</p>
          <DotsHorizontalIcon className="h-5 w-5 cursor-pointer hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default Song;
