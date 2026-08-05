import { MusicPlayer } from '@/components/MusicPlayer';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import type { Track } from '@/types';

// Demo tracks data
const demoTracks: Track[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Wave',
    album: 'Night Sessions',
    duration: 234,
    coverUrl: 'https://picsum.photos/seed/track1/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    genre: 'Electronic',
    releaseDate: '2024-01-15',
    playCount: 1250000,
  },
  {
    id: '2',
    title: 'Summer Vibes',
    artist: 'The Sunsets',
    album: 'Warm Days',
    duration: 198,
    coverUrl: 'https://picsum.photos/seed/track2/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    genre: 'Pop',
    releaseDate: '2024-02-20',
    playCount: 890000,
  },
  {
    id: '3',
    title: 'Urban Jungle',
    artist: 'City Beats',
    album: 'Metropolitan',
    duration: 267,
    coverUrl: 'https://picsum.photos/seed/track3/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    genre: 'Hip-Hop',
    releaseDate: '2024-03-10',
    playCount: 2100000,
  },
  {
    id: '4',
    title: 'Ocean Waves',
    artist: 'Ambient Soul',
    album: 'Nature Sounds',
    duration: 312,
    coverUrl: 'https://picsum.photos/seed/track4/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    genre: 'Ambient',
    releaseDate: '2024-01-05',
    playCount: 650000,
  },
  {
    id: '5',
    title: 'Electric Heart',
    artist: 'Neon Lights',
    album: 'Synthwave Dreams',
    duration: 245,
    coverUrl: 'https://picsum.photos/seed/track5/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    genre: 'Synthwave',
    releaseDate: '2024-04-01',
    playCount: 1800000,
  },
];

function App() {
  const handlePlayTrack = (track: Track) => {
    console.log('Playing track:', track.title);
    // In a real app, this would use the audio player hook
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main className="pt-20 pb-32">
        <HeroSection featuredTracks={demoTracks} onPlayTrack={handlePlayTrack} />
        
        {/* Additional Sections Placeholder */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-white mb-8">
            Новые релизы
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {demoTracks.slice(0, 5).map((track) => (
              <div key={track.id}>
                <div className="card group cursor-pointer hover:bg-dark-800/70 transition-all duration-300">
                  <div className="relative mb-4">
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-full aspect-square object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <h3 className="font-semibold text-white truncate">{track.title}</h3>
                  <p className="text-sm text-dark-400 truncate">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-dark-900/50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Почему выбирают нас
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Высокое качество</h3>
                <p className="text-dark-400">Lossless аудио и студийное качество звучания</p>
              </div>
              
              <div className="card text-center">
                <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Офлайн режим</h3>
                <p className="text-dark-400">Слушай музыку без интернета</p>
              </div>
              
              <div className="card text-center">
                <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Персонализация</h3>
                <p className="text-dark-400">Умные рекомендации под твой вкус</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MusicPlayer />
    </div>
  );
}

export default App;
