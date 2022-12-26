import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './pages';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  // console.log(JSON.stringify(activeSong));
  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/MusicWebApp/" element={<Discover />} />
              <Route path="/MusicWebApp/top-artists" element={<TopArtists />} />
              <Route path="/MusicWebApp/top-charts" element={<TopCharts />} />
              <Route path="/MusicWebApp/around-you" element={<AroundYou />} />
              <Route path="/MusicWebApp/artists/:id" element={<ArtistDetails />} />
              <Route path="/MusicWebApp/songs/:songid" element={<SongDetails />} />
              <Route path="/MusicWebApp/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>

          {/* since topplay and music player are outside of the routes, it will show up no matter what page we are on */}
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {JSON.stringify(activeSong) === '{}' ? (<div />) : (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}

    </div>
  );
};

export default App;
