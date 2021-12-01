import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { hasPremiumState } from "../atoms/userAtom";
import useSpotify from "../hooks/useSpotify";

const Recommendations = () => {
  const spotifyAPI = useSpotify();
  const { data: session } = useSession();
  const [recommendations, setRecommendations] = useState(null);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const hasPremium = useRecoilValue(hasPremiumState);
  const playlist = useRecoilValue(playlistState);

  useEffect(() => {
    if (!spotifyAPI.getAccessToken()) return;
    spotifyAPI
      .getRecommendations({
        min_energy: 0.4,
        min_popularity: 50,
        seed_artists: ["6mfK6Q2tzLMEchAr0e9Uzu", "4DYFVNKZ1uixa6SQTvzQwJ"],
      })
      .then((recommendations_) => setRecommendations(recommendations_));
  }, [spotifyAPI, session]);

  console.log([
    ...new Set(
      playlist?.tracks?.items
        ?.map((item) => item?.track?.artists.map((artist) => artist?.id))
        .flat()
    ),
  ]);

  const playSong = () => {
    setCurrentTrackId(id);
    setIsPlaying(true);
    if (hasPremium) {
      spotifyAPI.play({
        uris: [uri],
      });
    }
  };

  // return (
  //   <>
  //     {recommendations.map((recommendation) => (
  //       <div
  //         className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
  //         onClick={playSong}
  //       >
  //         <div className="flex items-center space-x-4">
  //           {/* <p className="">{order + 1}</p>
  //             <img src={album.images[0].url} className="h-10 w-10" />
  //             <div>
  //               <p className="w-36 lg:w-64 truncate">{name}</p>
  //               <p className="w-40">
  //                 {artists[1]
  //                   ? artists[0].name
  //                   : artists.map((artist) => artist.name).join(", ")}
  //                 Jonak, Tanmoy
  //               </p>
  //             </div> */}
  //         </div>
  //       </div>
  //     ))}
  //   </>
  // );

  return <div></div>;
};

export default Recommendations;
