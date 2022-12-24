import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';

const SongBar = ({ data, song, i, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {

  // console.log(song);
  // console.log(activeSong);
  // console.log(activeSong);
  const newSong = {
    song: song,
    data: data,
    i: i,
    activeSong: activeSong,
    isPlaying: isPlaying

  }
  // console.log(newSong);
  // console.log(newSong.isPlaying);
  // console.log(Object.keys(newSong.activeSong).length);
  // console.log(newSong?.activeSong?.song?.title);
  // console.log(newSong.song.title);
  // console.log((newSong.isPlaying && (Object.keys(newSong.activeSong).length !== 0) && 
  // (newSong.activeSong.song.title == newSong.song.title)));

  
  return(
    <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.title === song?.title ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={artistId ? song?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125') : song?.images?.coverart}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          {!artistId ? (
            <Link to={`/songs/${song.key}`}>
              <p className="text-xl font-bold text-white">
                {song?.title}
              </p>
            </Link>
          ) : (
            <p className="text-xl font-bold text-white">
              {song?.attributes?.name}
            </p>
          )}
          <p className="text-base text-gray-300 mt-1">
            {artistId ? song?.attributes?.albumName : song?.subtitle}
          </p>
        </div>
      </div>
      {!artistId
        ? (
          <PlayPause
            isPlaying={newSong.isPlaying}
            activeSong={newSong.activeSong}
            song={newSong}
            handlePause={handlePauseClick}
            handlePlay={() => handlePlayClick(newSong)}
            i={i}
          />
        )
        : null}
    </div>
  )
}

export default SongBar;