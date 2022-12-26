// import { useSelector, useDispatch } from 'react-redux';
import SongBar from './SongBar';

const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) => {
  // const {activeSong, isPlaying} = useSelector((state) =>state.player);

  const newData = [];
  if (data !== undefined) {
    data.forEach((x) => {
      // console.log(x);
      if (x.images !== undefined) {
        newData.push(x);
      }
    });
  }

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs</h1>

      <div className="mt-6 w-full flex flex-col">
        {newData?.map((song, i) => (
          <SongBar
            key={`${song.key}-${artistId}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
