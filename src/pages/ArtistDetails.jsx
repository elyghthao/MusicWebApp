
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs, ArtistDetailsHeader} from '../components';
import { setActiveSong, playPause } from "../redux/features/playerSlice";

import { useGetSongDetailsQuery, useGetSongRelatedQuery, useGetArtistDetailsQuery } from "../redux/services/shazamCore2";
import { useEffect, useRef } from "react";



const ArtistDetails = () => {
    const { id: artistId } = useParams();
    const dispatch = useDispatch();
    // const {data, isFetch: isFetchingRleatedSongs, error } = useGetSongRelatedQuery({songid});
    // const {data: songData, isFetch: isFetchingSongDetails} = useGetSongDetailsQuery({songid});

    // console.log(artistId);
    const {activeSong, isPlaying} = useSelector((state) =>state.player);
    const { data: artistData, isFetching: isFetchingArtistDetails, error} = useGetArtistDetailsQuery({artistId});
    // console.log(useGetArtistDetailsQuery({artistId}));

    if(isFetchingArtistDetails) return <Loader title="Searching artist details" />
    if(error) return <Error />;

    // const divRef = useRef(null);

    // useEffect(() => {
    //     divRef.current.scrollIntoView({behavior: 'smooth'})
    // });

    // console.log()
    // console.log(artistData?.data[0]?.attributes?.artistBio);
    console.log(artistData);
    return (
        <div  className="flex flex-col ">
            <ArtistDetailsHeader artistData={artistData}/>
            <div className="mb-1">
                <h2 className="text-white text-5xl font-bold">Bio</h2>
                <div className="mt-5">
                    {artistData?.data[0]?.attributes?.artistBio ?  
                    ((<p key={artistData?.data[0].id} className="text-gray-400 tet-base my-1">{artistData?.data[0]?.attributes?.artistBio}</p>)) : 
                    (<p className="text-gray-400 tet-base my-1">Sorry, no bio</p>)}
                </div>
            </div>
        </div>
    )
};

export default ArtistDetails;
