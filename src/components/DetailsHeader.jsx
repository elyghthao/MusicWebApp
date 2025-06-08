import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artist = artistData?.artists[artistId].attribtutes;

  
  let singerId = ""
  let img = ""
  let shazamId = ""
  let artwork = ""
  let artistName = "Loading"
  let songTitle = "Loading"

  if (songData) {
    // console.log(songData)
    singerId = Object.keys(songData["resources"]["artists"])[0]
    // console.log(songData["resources"]["artists"][singerId]["attributes"]["name"])

    shazamId = Object.keys(songData["resources"]["shazam-songs"])
    // console.log("shazamID: " + shazamId)
    
    artwork = songData["resources"]["shazam-songs"][shazamId]["attributes"]["artwork"]["url"]
    // console.log(songData["resources"]["shazam-songs"][shazamId]["attributes"]["artwork"]["url"])

    artistName = songData["resources"]["artists"][singerId]["attributes"]["name"]
    // console.log(artistName)

    songTitle = songData["resources"]["shazam-songs"][shazamId]["attributes"]["title"]
    // console.log(songTitle)

  }



  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex place-items-center">
        <img
          alt="art"
          src={artistId ? artist.artwork?.url.replace('{w}', '500').replace('{h}', '500')
            : artwork}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">{songTitle}</p>
          {!artist && (
          <Link to={`/artists/${songData? singerId : ""}`}>
            <p className="text-base text-gray-400 mt-2">{artistName}</p>
          </Link>
          )}

          <p className="text-base text-gray-400 mt-2">
            {artistId ? artist?.genreNames[0] : songData?.genres?.primary }
          </p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
