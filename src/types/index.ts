export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl: string;
  genre?: string;
  releaseDate?: string;
  playCount?: number;
}

export interface Artist {
  id: string;
  name: string;
  bio?: string;
  imageUrl: string;
  verified?: boolean;
  followers?: number;
}

export interface Album {
  id: string;
  title: string;
  artist: Artist;
  coverUrl: string;
  releaseDate: string;
  tracks: Track[];
  genre?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverUrl?: string;
  tracks: Track[];
  isPublic: boolean;
  creator: User;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  role: 'user' | 'artist' | 'admin';
  createdAt: string;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  shuffle: boolean;
  repeat: 'off' | 'all' | 'one';
}

export type RepeatMode = 'off' | 'all' | 'one';
