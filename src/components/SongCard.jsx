/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = (song, isPlaying, activeSong, data, i) => {
  const newSong = song.song;
  // console.log(newSong);
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    // console.log("playclick songcard");
    // console.log(song);
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  // console.log(handlePlayClick);


  // console.log("i: " + i)
  // console.log("song: " + song.song)
  // console.log(data[0]);
  // console.log("here")
  // console.log("artists: " + JSON.stringify(newSong["attributes"])) //working on 
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'hidden' : 'flex bg-black bg-opacity-70'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song_img" src={song.song["attributes"]["artwork"]["url"] || 'https://th.bing.com/th/id/OIP.zl3PcrZaVLg5_htGHrHPAQAAAA?pid=ImgDet&rs=1'} />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.song["id"]}`}>
            {song.song["attributes"]["name"]}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={`/artists/${song.song["relationships"]["artists"]["href"]}`}>
            {song.song["attributes"]["artistName"]}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
