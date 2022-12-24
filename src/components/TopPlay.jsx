import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from "swiper";

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import 'swiper/css';
import 'swiper/css/free-mode';
import { TopCharts } from "../pages";



const TopChartCard = (song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick, data) => {
  // console.log("song in topChart");
  // console.log(song.handlePauseClick);

  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg curor-pointer mb-2">
      <h3 className="fot-bold text-base text-white mr-3">{song?.i+1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img className="w-20 h-20 rounded-lg" src={song?.song?.images?.coverart} alt={song?.title} />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song?.song?.key}`}>
            <p className="text-xl font-bold text-white">{song?.song?.title}</p>
          </Link>
          <Link to={`/songs/${song?.song?.artists[0].adamid}`}>
            <p className="text-base mt-1 text-gray-300">{song?.song?.subtitle}</p>
          </Link>
        </div>
      </div>
      <PlayPause 
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={() => song?.handlePauseClick()}
      handlePlay={() => song?.handlePlayClick(song)}/>
  </div>
  );
  
}

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector( (state) => state.player);

  const { data, isFetching, error } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({behavior: 'smooth'})
  });
  



  // if (isFetching) return <div></div>;

  // console.log(data);
  const newData = [];
  if(data != undefined){
    data.forEach( x=> {
      // console.log(x);
      if(x.images != undefined){
        newData.push(x);
      }
    });
  }
  const topPlays = newData?.slice(0,5);



  const handlePauseClick = () =>{
    console.log("in pause click");
    dispatch(playPause(false));
  };
  const handlePlayClick = (song) =>{
    console.log("in play click topplay");
    console.log(song);
    const i = song.i;
    // let newSong = ({...song}._doc);
    // console.log(newSong);
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
  };
  
  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] mx-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song,i) => (
            <TopChartCard
            key={song.key} 
            song={song} 
            i={i}  
            isPlaying={isPlaying} 
            activeSong={activeSong} 
            handlePauseClick={handlePauseClick} 
            handlePlayClick= {handlePlayClick} 
            data={newData}/>
          ))}
        </div>
      </div>
      


      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>

            {/* maybe look up more about swiper */}
        <Swiper 
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlidesBounds 
        modules={[FreeMode]}
        className="mt-4">
          {topPlays?.map((song,i) => (
            <SwiperSlide
            key={song?.key}
            style={{width: '25%', height: 'auto'}}
            className="shadow-lg rounded-full animate-slideright">
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img src={song?.images.background} alt="name"
                className="rounded-full w-full object-cover" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      

    </div>
  )
}

export default TopPlay;
