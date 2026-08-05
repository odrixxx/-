import { useState, useEffect, useCallback, useRef } from 'react';
import type { Track, PlayerState, RepeatMode } from '@/types';

interface UseAudioPlayerProps {
  initialVolume?: number;
}

export function useAudioPlayer({ initialVolume = 0.7 }: UseAudioPlayerProps = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    volume: initialVolume,
    progress: 0,
    duration: 0,
    shuffle: false,
    repeat: 'off',
  });

  const [queue, setQueue] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setPlayerState(prev => ({
        ...prev,
        progress: audio.currentTime,
        duration: audio.duration || 0,
      }));
    };

    const handleLoadedMetadata = () => {
      setPlayerState(prev => ({
        ...prev,
        duration: audio.duration,
      }));
    };

    const handleEnded = () => {
      handleTrackEnd();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const handleTrackEnd = useCallback(() => {
    setPlayerState(prev => {
      if (prev.repeat === 'one') {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
        return prev;
      }

      if (prev.repeat === 'all' || currentIndex < queue.length - 1) {
        playNext();
      } else {
        return { ...prev, isPlaying: false };
      }

      return prev;
    });
  }, [currentIndex, queue]);

  const loadTrack = useCallback((track: Track, shouldPlay = true) => {
    if (!audioRef.current) return;

    audioRef.current.src = track.audioUrl;
    audioRef.current.load();

    setPlayerState(prev => ({
      ...prev,
      currentTrack: track,
      progress: 0,
      isPlaying: shouldPlay,
    }));

    if (shouldPlay) {
      audioRef.current.play().catch(console.error);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !playerState.currentTrack) return;

    if (playerState.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }

    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, [playerState.currentTrack, playerState.isPlaying]);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = time;
    setPlayerState(prev => ({ ...prev, progress: time }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (!audioRef.current) return;

    const normalizedVolume = Math.max(0, Math.min(1, volume));
    audioRef.current.volume = normalizedVolume;
    setPlayerState(prev => ({ ...prev, volume: normalizedVolume }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setPlayerState(prev => ({ ...prev, shuffle: !prev.shuffle }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setPlayerState(prev => {
      const modes: RepeatMode[] = ['off', 'all', 'one'];
      const currentIndex = modes.indexOf(prev.repeat);
      const nextIndex = (currentIndex + 1) % modes.length;
      return { ...prev, repeat: modes[nextIndex] };
    });
  }, []);

  const playNext = useCallback(() => {
    if (queue.length === 0) return;

    let nextIndex: number;
    if (playerState.shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = currentIndex + 1;
      if (nextIndex >= queue.length) {
        nextIndex = playerState.repeat === 'all' ? 0 : currentIndex;
      }
    }

    if (nextIndex !== currentIndex && nextIndex < queue.length) {
      setCurrentIndex(nextIndex);
      loadTrack(queue[nextIndex]);
    }
  }, [queue, currentIndex, playerState.shuffle, playerState.repeat, loadTrack]);

  const playPrevious = useCallback(() => {
    if (queue.length === 0) return;

    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = playerState.repeat === 'all' ? queue.length - 1 : 0;
    }

    if (prevIndex !== currentIndex) {
      setCurrentIndex(prevIndex);
      loadTrack(queue[prevIndex]);
    }
  }, [queue, currentIndex, playerState.repeat, loadTrack]);

  const setQueueAndPlay = useCallback((tracks: Track[], startIndex = 0) => {
    if (tracks.length === 0) return;

    setQueue(tracks);
    setCurrentIndex(startIndex);
    loadTrack(tracks[startIndex], true);
  }, [loadTrack]);

  return {
    playerState,
    queue,
    currentIndex,
    controls: {
      loadTrack,
      togglePlay,
      seek,
      setVolume,
      toggleShuffle,
      toggleRepeat,
      playNext,
      playPrevious,
      setQueueAndPlay,
    },
  };
}
