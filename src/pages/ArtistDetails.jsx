

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { DetailsHeader, Error, Loader, RelatedSongs, ArtistDetailsHeader } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';

import { useGetSongDetailsQuery, useGetSongRelatedQuery, useGetArtistDetailsQuery } from '../redux/services/shazamCore2';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const dispatch = useDispatch();
  // const {data, isFetch: isFetchingRleatedSongs, error } = useGetSongRelatedQuery({songid});
  // const {data: songData, isFetch: isFetchingSongDetails} = useGetSongDetailsQuery({songid});

  // console.log(artistId);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery({ artistId });
  // console.log(useGetArtistDetailsQuery({artistId}));

  // const divRef = useRef(null);
  const divRef = useRef(null);
  useEffect(() => {
    if (divRef.current != null) {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  if (isFetchingArtistDetails) return <Loader title="Searching artist details" />;
  if (error) return <Error />;

  // console.log()
  // console.log(artistData?.data[0]?.attributes?.artistBio);
  // console.log(artistData);

  return (
    <div ref={divRef} className="flex flex-col ">
      <ArtistDetailsHeader artistData={artistData} />
      <div className="mb-1">
        <h2 className="text-white text-5xl font-bold">Bio</h2>
        <div className="mt-5  whitespace-pre-line">
          {artistData?.data[0]?.attributes?.artistBio
            ? ((
              <p key={artistData?.data[0].id} className="text-white tet-base my-1 ">
                {ReactHtmlParser(artistData?.data[0]?.attributes?.artistBio)}
              </p>
            ))
            : (<p className="text-gray-400 tet-base my-1">Sorry, no bio</p>)}
          {/* {ReactHtmlParser(artistData?.data[0]?.attributes?.artistBio)} */}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
