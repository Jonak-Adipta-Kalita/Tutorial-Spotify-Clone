const Playlist = ({ playlist }) => {
  return (
    <div className="">
      <p className="cursor-pointer hover:text-white">{playlist.name}</p>
    </div>
  );
};

export default Playlist;
