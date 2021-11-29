import useSpotify from "../hooks/useSpotify";
import millistoMinuteAndSeconds from "../lib/time";

const Song = ({ order, track }) => {
  const spotifyAPI = useSpotify();
  const { album, name, artists, duration_ms } = track.track;
  let artistsName;

  if (artists[1]) {
    artistsName = artists.map((artist) => artist.name).join(", ");
  } else {
    artistsName = artists[0].name;
  }

  return (
    <div className="grid grid-cols-2">
      <div className="flex items-center space-x-4">
        <p className="">{order + 1}</p>
        <img src={album.images[0].url} className="h-10 w-10" />
        <div>
          <p>{name}</p>
          <p>{artistsName}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline">{album.name}</p>
        <p>{millistoMinuteAndSeconds(duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
