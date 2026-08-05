import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat } from 'lucide-react';
import { cn, formatDuration } from '@/utils';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface MusicPlayerProps {
  className?: string;
}

export function MusicPlayer({ className }: MusicPlayerProps) {
  const { playerState, controls } = useAudioPlayer();

  if (!playerState.currentTrack) {
    return null;
  }

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-dark-900/95 backdrop-blur-lg border-t border-dark-800 px-4 py-3 z-50",
      className
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <img
            src={playerState.currentTrack.coverUrl}
            alt={playerState.currentTrack.title}
            className="w-14 h-14 rounded-lg object-cover shadow-lg"
          />
          <div className="min-w-0">
            <h4 className="font-semibold text-white truncate">
              {playerState.currentTrack.title}
            </h4>
            <p className="text-sm text-dark-400 truncate">
              {playerState.currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex items-center gap-4">
            <button
              onClick={controls.toggleShuffle}
              className={cn(
                "p-2 rounded-full transition-colors",
                playerState.shuffle 
                  ? "text-primary-500 hover:text-primary-400" 
                  : "text-dark-400 hover:text-white"
              )}
              title="Перемешать"
            >
              <Shuffle size={18} />
            </button>

            <button
              onClick={controls.playPrevious}
              className="p-2 text-dark-400 hover:text-white transition-colors"
              title="Предыдущий"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={controls.togglePlay}
              className="p-3 bg-primary-500 hover:bg-primary-600 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              title={playerState.isPlaying ? "Пауза" : "Воспроизвести"}
            >
              {playerState.isPlaying ? (
                <Pause size={24} className="text-white" />
              ) : (
                <Play size={24} className="text-white ml-1" />
              )}
            </button>

            <button
              onClick={controls.playNext}
              className="p-2 text-dark-400 hover:text-white transition-colors"
              title="Следующий"
            >
              <SkipForward size={20} />
            </button>

            <button
              onClick={controls.toggleRepeat}
              className={cn(
                "p-2 rounded-full transition-colors relative",
                playerState.repeat !== 'off'
                  ? "text-primary-500 hover:text-primary-400" 
                  : "text-dark-400 hover:text-white"
              )}
              title={`Повтор: ${playerState.repeat === 'off' ? 'выкл' : playerState.repeat === 'all' ? 'все' : 'один'}`}
            >
              <Repeat size={18} />
              {playerState.repeat === 'one' && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full text-[8px] flex items-center justify-center text-white font-bold">
                  1
                </span>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-dark-400 w-10 text-right">
              {formatDuration(playerState.progress)}
            </span>
            <input
              type="range"
              min={0}
              max={playerState.duration || 100}
              value={playerState.progress}
              onChange={(e) => controls.seek(Number(e.target.value))}
              className="flex-1 h-1 bg-dark-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform"
            />
            <span className="text-xs text-dark-400 w-10">
              {formatDuration(playerState.duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            onClick={() => controls.setVolume(playerState.volume === 0 ? 0.7 : 0)}
            className="p-2 text-dark-400 hover:text-white transition-colors"
          >
            {playerState.volume === 0 ? (
              <VolumeX size={20} />
            ) : (
              <Volume2 size={20} />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={playerState.volume}
            onChange={(e) => controls.setVolume(Number(e.target.value))}
            className="w-24 h-1 bg-dark-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform"
          />
        </div>
      </div>
    </div>
  );
}
