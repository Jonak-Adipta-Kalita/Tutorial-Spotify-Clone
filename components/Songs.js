import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

const Songs = () => {
  const playlists = useRecoilValue(playlistState);
  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {playlists?.tracks?.items?.map((track, index) => (
        <Song key={track.track.id} track={track} order={index} />
      ))}
    </div>
  );
};

export default Songs;
