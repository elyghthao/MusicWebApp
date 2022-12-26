
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopCharts = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  // console.log(country);

  if (isFetching && loading) return <Loader title="Loading songs around you" />;
  if (error) return <Error />;

  // console.log(data);
  const newData = [];
  data?.forEach((x) => {
    if (x.images !== undefined) {
      newData.push(x);
    }
  });

  // console.log("country code: " + country);
  // console.log(newData);
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Charts
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
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
};

export default TopCharts;
