import { Play } from 'lucide-react';
import { cn, formatDuration } from '@/utils';
import type { Track } from '@/types';

interface TrackCardProps {
  track: Track;
  onPlay?: (track: Track) => void;
  className?: string;
}

export function TrackCard({ track, onPlay, className }: TrackCardProps) {
  return (
    <div className={cn(
      "card group cursor-pointer hover:bg-dark-800/70 transition-all duration-300",
      className
    )}>
      <div className="relative mb-4">
        <img
          src={track.coverUrl}
          alt={track.title}
          className="w-full aspect-square object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
        />
        <button
          onClick={() => onPlay?.(track)}
          className="absolute bottom-2 right-2 w-12 h-12 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
        >
          <Play size={20} className="text-white ml-1" />
        </button>
      </div>
      <h3 className="font-semibold text-white truncate mb-1">{track.title}</h3>
      <p className="text-sm text-dark-400 truncate mb-2">{track.artist}</p>
      <div className="flex items-center justify-between text-xs text-dark-500">
        <span>{track.genre || 'Неизвестно'}</span>
        <span>{formatDuration(track.duration)}</span>
      </div>
    </div>
  );
}
