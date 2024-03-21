import React, { useEffect, useState, useCallback } from 'react';
import ReactPlayer from 'react-player';
import api from '../../Services/api';
import { useParams } from 'react-router-dom';
import { Sniper } from '../../Components/Loadings/Sniper';
import './style.css';

export const Streaming = () => {
  const { id, sector_id } = useParams();
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isChecked, setChecked] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isInitialized, setInitialized] = useState(false);
  const [isDelayedStart, setDelayedStart] = useState(false);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('https://www.google.com', { mode: 'no-cors' });
        console.log(response);
        setIsOnline(response.status === 200);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsOnline(false);
        setLoading(true);
      }
    };
  
    const interval = setInterval(checkConnection, 3000); // Verificar a conexão a cada 10 segundos
  
    checkConnection(); // Verificar a conexão imediatamente ao montar o componente
  
    return () => clearInterval(interval); // Limpar o intervalo ao desmontar o componente
  }, []);
  

 

  const getMidias = useCallback(async () => {
    try {
      setLoading(true);
      if(isOnline){
        const response = await api.getMidias(id, sector_id);
        console.log(response);
        if (response && response.data) {
          setVideos(response.data);
          setChecked(true);
          setCurrentVideoIndex(0);
          setInitialized(true);
          setDelayedStart(true); // Começar a reprodução do vídeo assim que os dados forem carregados
          setError(null);
        } else {
          console.error("Empty or undefined response for videos");
          setChecked(false);
          setError("Empty or undefined response for videos");
          setTimeout(getMidias, 10000); // Tentar obter os dados novamente após 10 segundos
        }
      }else{
        setLoading(true);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError(error.message || "Error fetching videos");
      setTimeout(getMidias, 10000); // Tentar obter os dados novamente após 10 segundos
    } finally {
      setLoading(false);
    }
  }, [id, sector_id]);

  useEffect(() => {
    
    if (!isInitialized && navigator.onLine) {     
      getMidias();
    }
  }, [getMidias, isInitialized]);
  

  const handleVideoEnd = useCallback(() => {
    if (currentVideoIndex < videos.length - 1) {
      console.log('fim');
      setCurrentVideoIndex(prevIndex => prevIndex + 1);
    } else {
      getMidias();
      setCurrentVideoIndex(0);
    }
  }, [currentVideoIndex, videos, setCurrentVideoIndex, getMidias]);

  const handleVideoError = useCallback(() => {
    setError("Error playing video");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 10000); // Definir isLoading como falso após 10 segundos para tentar reproduzir o vídeo novamente
    handleVideoEnd();
  }, [handleVideoEnd]);

  return (
    <>
      {(isLoading || error) ? ( // Mostrar o Sniper se não estiver online, estiver carregando ou se houver um erro
        <Sniper isLoading={isLoading} />
      ) : (
        
          
          <div className="streaming">
            {isChecked && isInitialized && (
              <ReactPlayer
                key={`${videos[currentVideoIndex]?.url}_${Math.random()}`}
                url={videos[currentVideoIndex]?.url}
                playing={isDelayedStart}
                controls={false}
                onEnded={handleVideoEnd}
                onError={handleVideoError}
                className="video"
                volume={0}
                config={{
                  youtube: {
                    playerVars: {
                      rel: 0,
                      fs: 1,
                      autoplay: 1, // Adicionar autoplay para iniciar automaticamente o vídeo
                      mute: 0, // Remover o mudo para permitir o áudio
                      controls: 0, // Remover os controles
                      playsinline: 1, // Permitir reprodução em tela inteira
                      showinfo: 0, // Ocultar informações do vídeo
                      iv_load_policy: 3, // Desativar anotações
                      modestbranding: 1, // Modo de marcação modesta
                      enablejsapi: 1, // Permitir uso da API JavaScript do player
                      widgetid: 5 // ID do widget do player
                    }
                  }
                }}
                width={'100%'}
                height={'100%'}
                style={{ objectFit: 'contain' }}
              />
            )}
          </div>
          
      )}
    </>
  );
};
