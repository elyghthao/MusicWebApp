import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { nextSong, prevSong, playPause, setActiveSong } from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';


const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();
  // console.log(currentSongs);
  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    // dispatch(playPause(false));
    // console.log(currentSongs);
    if (!shuffle) {
      // console.log(activeSong);
      // dispatch(nextSong((currentIndex + 1) % currentSongs.length));
      const randomNum = (activeSong.i + 1) % currentSongs.length;
      const data = activeSong.data;
      const i = activeSong.i;
      const song = {
        activeSong : activeSong.activeSong,
        data : activeSong.data,
        i : randomNum,
        isPlaying: activeSong.isPlaying,
        song: currentSongs[randomNum]
      }
      dispatch(setActiveSong({song, data, i}));
      dispatch(playPause(true));
      // console.log(randomNum);
    } else {
      // dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
      const randomNum = Math.trunc(Math.random() * currentSongs.length);
      // console.log(randomNum);
      const data = activeSong.data;
      const i = activeSong.i;
      const song = {
        activeSong : activeSong.activeSong,
        data : activeSong.data,
        i : randomNum,
        isPlaying: activeSong.isPlaying,
        song: currentSongs[randomNum]
      }
      dispatch(setActiveSong({song, data, i}));
      dispatch(playPause(true));

    }
  };

  const handlePrevSong = () => {
    if (activeSong.i === 0) {
      // dispatch(prevSong(currentSongs.length - 1));
      const randomNum =  currentSongs.length-1;
      const data = activeSong.data;
      const i = activeSong.i;
      const song = {
        activeSong : activeSong.activeSong,
        data : activeSong.data,
        i : randomNum,
        isPlaying: activeSong.isPlaying,
        song: currentSongs[randomNum]
      }
      dispatch(setActiveSong({song, data, i}));
      dispatch(playPause(true));
    } else if (shuffle) {
      // dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
      const randomNum = (Math.floor(Math.random() * currentSongs.length));
      const data = activeSong.data;
      const i = activeSong.i;
      const song = {
        activeSong : activeSong.activeSong,
        data : activeSong.data,
        i : randomNum,
        isPlaying: activeSong.isPlaying,
        song: currentSongs[randomNum]
      }
      dispatch(setActiveSong({song, data, i}));
      dispatch(playPause(true));
    } else {
      const randomNum = (activeSong.i - 1) % currentSongs.length;
      const data = activeSong.data;
      const i = activeSong.i;
      const song = {
        activeSong : activeSong.activeSong,
        data : activeSong.data,
        i : randomNum,
        isPlaying: activeSong.isPlaying,
        song: currentSongs[randomNum]
      }
      dispatch(setActiveSong({song, data, i}));
      dispatch(playPause(true));
    }
  };

  return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />
    </div>
  );
};

export default MusicPlayer;
