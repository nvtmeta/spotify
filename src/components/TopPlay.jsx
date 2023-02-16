import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
}) => (
  <div
    className="w-full flex flex-row items-center 
   hover:bg-[4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2"
  >
    <h3 className="font-bold text-base text-white mr-3">{i + 1}</h3>
    <div className="flex-1 flex flex-row justify-between items-center ">
      <img
        src={song?.images[0]?.url}
        alt={song?.name}
        className="w-20 h-20 rounded-lg"
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.name}`}>
          <p className="text-xl font-bold text-white">{song?.name}</p>
        </Link>
        <Link to={`/artists/${song.artists[0]?.name}`}>
          <p className="text-base font-bold text-gray-300 mt-1">
            {song.artists[0]?.name}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      handlePause={handlePause}
      handlePlay={handlePlay}
      song={song}
    />
  </div>
);
const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const Ref = useRef(null);
  const topPlays = data?.albums?.items?.slice(0, 5);
  useEffect(() => {
    Ref.current.scrollIntoView({ behavior: 'smooth' });
  });

  const handlePause = () => {
    dispatch(playPause(false));
  };

  const handlePlay = ({ song, i }) => {
    dispatch(playPause(true));
    dispatch(setActiveSong({ song, data, i }));
  };
  return (
    <div
      ref={Ref}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1
       xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between  items-center">
          <h2 className="text-white font-bold">Top chart</h2>

          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              song={song}
              i={i}
              key={song.name}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePause={handlePause}
              handlePlay={() => handlePlay(song, i)}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between  items-center">
          <h2 className="text-white font-bold">Top Artist</h2>

          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1"></div>
      </div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className="mt-4"
      >
        {topPlays?.map((song, i) => (
          <SwiperSlide
            key={song?.name}
            style={{ width: '25%', height: 'auto' }}
            className="shadow-lg rounded-full animate-slideright"
          >
            <Link to={`/artists/${song?.artists[0]?.id}`}>
              <img
                src={song?.images[0]?.url}
                alt="name"
                className="rounded-full w-full object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopPlay;
