// import { Link } from 'react-router-dom';

const ArtistDetailsHeader = ({ artistData }) => (
  <div className="relative w-full flex flex-col">
    <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
    <div className="absolute inset-0 flex place-items-center">
      <img
        alt="art"
        src={artistData?.data[0]?.attributes?.artwork?.url}
        className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
      />

      <div className="ml-5">
        <p className="font-bold sm:text-3xl text-xl text-white">{artistData?.data[0]?.attributes?.name}</p>
      </div>

    </div>
    <div className="w-full sm:h-44 h-24" />
  </div>
);
export default ArtistDetailsHeader;
