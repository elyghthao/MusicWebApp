

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';

import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore2';

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { data, isFetch: isFetchingRleatedSongs, error } = useGetSongRelatedQuery({ songid });

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetch: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
  

  if (isFetchingSongDetails || isFetchingRleatedSongs) return <Loader title="Searching song details" />;

  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  // console.log(isPlaying);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song) => {
    const newSong = { ...song };
    song.activeSong = newSong;
    dispatch(playPause(true));


    const { i } = song;
    dispatch(setActiveSong({ song, data, i }));// keep data and song as it is
  };


  let lyricId = "";
  let lyrics = [];

  //  lyricId = Object.keys(songData["resources"]["lyrics"])[0];
  if (songData) {

    try{
      lyricId = Object.keys(songData["resources"]["lyrics"])[0];
      // console.log(lyricId);

      lyrics = songData["resources"]["lyrics"][lyricId]["attributes"]["text"];
      // console.log(songData["resources"]["lyrics"][lyricId]["attributes"]);
    }catch (error){

    }
    
  }
  
  
  return (
    <div ref={divRef} className="flex flex-col ">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {lyrics.length !== 0
            ? (lyrics.map((line, i) => (<p key={i} className="text-gray-400 tet-base my-1">{line}</p>)))
            : (<p className="text-gray-400 tet-base my-1">Sorry, no lyrics</p>)}
        </div>
      </div>

      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
