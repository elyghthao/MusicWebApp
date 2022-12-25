import React from 'react';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import {Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery, useGetSongsBySearchQuery } from '../redux/services/shazamCore';
import { useParams } from 'react-router-dom';

const Search = () => {
const [country, setCountry] = useState('');
const [loading, setLoading] = useState(true);
const {activeSong, isPlaying} = useSelector((state) => state.player);
// const {data, isFetching, error} = useGetTopChartsQuery();
const {searchTerm} = useParams();
const {data, isFetching,error} = useGetSongsBySearchQuery(searchTerm);

// console.log(data);
const newData = [];
data?.tracks?.hits?.forEach( x => {
  if(x.track.images != undefined){
    newData.push(x.track);
  }
})

// console.log(newData);

// data?.forEach( x=> {
//   if(x.images != undefined){
//     newData.push(x);
//   }
// });
// console.log(newData);


// const songs = data?



if(isFetching && loading) return <Loader title="Loading songs around you"/>
if(error) return <Error/>



return (
    <div className="flex flex-col">
        <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
            Showing Results for: <span className='font-black'>{searchTerm}</span>
        </h2>
        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {newData.map((song, i) => (
        <SongCard
          key={song.key}
          song={song}
          i={i} 
          isPlaying={isPlaying}
          activeSong={activeSong}
          data={newData}
          />
      ))}
        </div>
    </div>
);

}

export default Search;
