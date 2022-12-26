/* eslint-disable no-unused-vars */
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => ((song.isPlaying && (Object.keys(song.activeSong).length !== 0)
&& (song.activeSong.song.title === song.song.title))
  ? (
    <FaPauseCircle
      size={35}
      className="text-gray-300"
      onClick={handlePause}
    />
  )
  : (
    <FaPlayCircle
      size={35}
      className="text-gray-300"
      onClick={handlePlay}
    />
  )

);

// const PlayPause = ({isPlaying, activeSong, song, handlePause, handlePlay}) =>
// ((isPlaying && (Object.keys(activeSong).length !== 0) &&
// (activeSong == song.title) ) ?
//     (<FaPauseCircle
//       size={35}
//       className="text-gray-300"
//       onClick={handlePause}
//     />) :
//     (<FaPlayCircle
//       size={35}
//       className="text-gray-300"
//       onClick={handlePlay}
//       />)

// );

export default PlayPause;
