import { Music, Mic2, Radio, Headphones } from 'lucide-react';
import { cn } from '@/utils';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const navItems: NavItem[] = [
    { label: 'Главная', icon: <Music size={20} />, href: '/', active: true },
    { label: 'Артисты', icon: <Mic2 size={20} />, href: '/artists' },
    { label: 'Подкасты', icon: <Radio size={20} />, href: '/podcasts' },
    { label: 'Плейлисты', icon: <Headphones size={20} />, href: '/playlists' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 bg-dark-950/80 backdrop-blur-lg border-b border-dark-800 z-40",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
              <Music size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Music Platform</h1>
              <p className="text-xs text-dark-400">Твоя музыкальная вселенная</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
                  item.active
                    ? "bg-dark-800 text-white"
                    : "text-dark-400 hover:text-white hover:bg-dark-800/50"
                )}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            <button className="btn-secondary text-sm py-2 px-4 hidden sm:block">
              Войти
            </button>
            <button className="btn-primary text-sm py-2 px-4 hidden sm:block">
              Регистрация
            </button>
            <button className="md:hidden p-2 text-dark-400 hover:text-white">
              <Music size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
