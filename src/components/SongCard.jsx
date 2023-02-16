import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  console.log(activeSong);
  const dispatch = useDispatch();
  const handlePause = () => {
    dispatch(playPause(false));
  };

  const handlePlay = () => {
    dispatch(playPause(true));
    dispatch(setActiveSong({ song, data, i }));
  };
  return (
    <div
      className="flex flex-col w-[250px] p-4 
 bg-white/5 bg-opacity-70
 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer
 "
    >
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0  justify-center items-center bg-black
    bg-opacity-80 group-hover:flex flex ${
      activeSong?.name === song.name ? 'flex bg-black bg-opacity-70' : ''
    }`}
        >
          <PlayPause
            song={song}
            handlePause={handlePause}
            handlePlay={handlePlay}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>
        <img
          alt="song_img"
          src={song?.images[0]?.url}
          className="w-full  h-full rounded-lg"
        />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.id}`}>{song.name}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.artists ? `/artists/${song?.artists[0]?.id}` : '/top-artists'
            }
          >
            {song?.artists[0]?.name}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
