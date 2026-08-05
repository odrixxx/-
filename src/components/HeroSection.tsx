import { Music, TrendingUp, Clock, Heart } from 'lucide-react';
import { TrackCard } from './TrackCard';
import type { Track } from '@/types';

interface HeroSectionProps {
  featuredTracks?: Track[];
  onPlayTrack?: (track: Track) => void;
}

export function HeroSection({ featuredTracks = [], onPlayTrack }: HeroSectionProps) {
  const stats = [
    { icon: <Music size={24} />, value: '10M+', label: 'Треков' },
    { icon: <TrendingUp size={24} />, value: '500K+', label: 'Артистов' },
    { icon: <Clock size={24} />, value: '24/7', label: 'Доступно' },
    { icon: <Heart size={24} />, value: '1M+', label: 'Пользователей' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent" />
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Hero Content */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Открой для себя</span>
            <br />
            <span className="text-white">новую музыку</span>
          </h1>
          <p className="text-xl text-dark-400 max-w-2xl mx-auto mb-8">
            Миллионы треков, плейлистов и подкастов ждут тебя. 
            Слушай любимую музыку без ограничений.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="btn-primary text-lg px-8">
              Начать слушать бесплатно
            </button>
            <button className="btn-secondary text-lg px-8">
              Узнать больше
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card text-center hover:border-primary-500/50 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 text-primary-500">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-dark-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Tracks */}
        {featuredTracks.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Популярное сейчас
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {featuredTracks.slice(0, 5).map((track, index) => (
                <div
                  key={track.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <TrackCard track={track} onPlay={onPlayTrack} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
