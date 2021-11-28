import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

const Playlist = ({ playlist }) => {
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  return (
    <div className="">
      <p
        onClick={() => setPlaylistId(playlist.id)}
        className="cursor-pointer hover:text-white"
      >
        {playlist.name}
      </p>
    </div>
  );
};

export default Playlist;
