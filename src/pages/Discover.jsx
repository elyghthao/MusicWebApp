

import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';

import { useGetTopChartsQuery, useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');

  if (isFetching) return <Loader title="Loading songs..." />;

  //  console.log("data[0]: " + data[0]);
  //  console.log("data: " + data)
  const newData = [];
  data?.forEach((x) => {
    // console.log("x: " + x["attributes"]["artwork"]["url"])
    if (x["attributes"]["artwork"]["url"] !== undefined) {
      // console.log("adding this one: " + JSON.stringify(x["attributes"]["name"]) );
      newData.push(x);
    }
  });
  // console.log("newData: " + newData)

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center
       sm:flex-row flex-col mt-4 mb-10"
      >
        <h2 className="font-bold text-3xl text-white
        text-left"
        >Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId}
          className="bg-black text-gray-300 p-3 text-sm
            rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => <option key={genre.value} value={genre.value}> {genre.title} </option>)}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {newData.map((song, i) => (
          <SongCard
            key={i}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={newData}
          />
        ))}
      </div>
      <div />

    </div>
  );
};

export default Discover;
