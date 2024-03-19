import React, { useEffect, useState, useCallback } from 'react';
import ReactPlayer from 'react-player';
import api from '../../Services/api';
import { useParams } from 'react-router-dom';
import './style.css';

export const Streaming = () => {
  const { id, sector_id } = useParams();
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isChecked, setChecked] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isInitialized, setInitialized] = useState(false);
  const [isDelayedStart, setDelayedStart] = useState(false);

  const getMidias = useCallback(async () => {
    try {
      const response = await api.getMidias(id, sector_id);
      console.log(response.data);
      if (response && response.data) {
       
        setVideos(response.data);
        setChecked(true);
        setCurrentVideoIndex(0);
        setInitialized(true);

        // Start delay after 2 seconds
        setTimeout(() => {
          setDelayedStart(true);
        }, 1000);
      } else {
        console.error("Empty or undefined response for videos");
        setChecked(false);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setLoading(false);
    }
  }, [id, sector_id]);

  useEffect(() => {
    if (!isInitialized) {
      getMidias();
    }
  }, [getMidias, isInitialized]);

  const handleVideoEnd = useCallback(() => {
    // Passar para o próximo vídeo ao finalizar o atual   
      // Se há apenas um vídeo, reiniciar o mesmo
    //  setCurrentVideoIndex(0);
    if (currentVideoIndex < videos.length - 1) {
      // Se há mais de um vídeo, passar para o próximo
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    } else {
      // Se já reproduziu todos os vídeos, fazer uma nova consulta à API
      getMidias();
    }
  }, [currentVideoIndex, videos, setCurrentVideoIndex, getMidias]);

  const handleVideoError = useCallback(() => {
    // Passar para o próximo vídeo em caso de erro
    handleVideoEnd();
  }, [handleVideoEnd]);

  return (
    <div className="streaming">
      {isChecked && isInitialized && (
        <ReactPlayer
          key={`${videos[currentVideoIndex]?.url}_${Math.random()}`} // Add a variation to the key
          url={videos[currentVideoIndex]?.url}
          playing={isDelayedStart}
          controls={false}
          onEnded={handleVideoEnd}
          onError={handleVideoError}
          className="video"
          volume={0}
          config={{ youtube: { playerVars: { rel: 0 } } }}
          
        />
      
      )}
    </div>
  );
};
