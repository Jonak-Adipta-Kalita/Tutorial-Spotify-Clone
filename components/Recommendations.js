import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { hasPremiumState } from "../atoms/userAtom";
import useSpotify from "../hooks/useSpotify";

const Recommendations = () => {
  const spotifyAPI = useSpotify();
  const { data: session } = useSession();
  const [recommendations, setRecommendations] = useState(null);
  const setCurrentTrackId = useSetRecoilState(currentTrackIdState);
  const setIsPlaying = useSetRecoilState(isPlayingState);
  const hasPremium = useRecoilValue(hasPremiumState);
  const playlist = useRecoilValue(playlistState);

  const seedArtists = [
    ...new Set(
      playlist?.tracks?.items
        ?.map((item) => item?.track?.artists.map((artist) => artist?.id))
        .flat()
    ),
  ];

  useEffect(() => {
    if (!spotifyAPI.getAccessToken()) return;
    spotifyAPI
      .getRecommendations({
        // seed_artists: [seedArtists[0], seedArtists[1]],
        seed_artists: ["6mfK6Q2tzLMEchAr0e9Uzu", "4DYFVNKZ1uixa6SQTvzQwJ"],
      })
      .then((recommendations_) => setRecommendations(recommendations_));
  }, [spotifyAPI, session]);

  // console.log(
  //   spotifyAPI.getAccessToken() && spotifyAPI.getArtist(seedArtists[0])
  // );

  const playSong = () => {
    setCurrentTrackId(id);
    setIsPlaying(true);
    if (hasPremium) {
      spotifyAPI.play({
        uris: [uri],
      });
    }
  };

  return (
    <div className="pt-14">
      {recommendations?.body?.tracks?.map((track, order) => (
        <div key={track?.id}>
          {order <= 4 && (
            <div
              className="flex text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer justify-between"
              onClick={playSong}
            >
              <div className="flex items-center">
                <div className="flex items-center space-x-4">
                  <p className="">{order + 1}</p>
                  <img src={track?.album.images[0].url} className="h-10 w-10" />
                </div>
                <div className="pl-5">
                  <p className="w-36 lg:w-64 truncate">{track?.name}</p>
                  <p className="">
                    {track?.artists[1]
                      ? track?.artists[0].name
                      : track?.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </div>
              <p className="">{track?.album?.name}</p>
              <button className="text-white rounded-full border px-7 py-3 hover:scale-125 transition transform duration-100 ease-out">
                Add
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
