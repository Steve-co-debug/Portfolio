import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Terminal, User, Briefcase, Mail, Code, Star, GraduationCap, Github, Linkedin, ExternalLink, Power, Settings, Search } from 'lucide-react';
import { WindowType, WindowState } from '../types';

interface TaskbarProps {
  windows: Record<WindowType, WindowState>;
  onToggleWindow: (id: WindowType) => void;
  activeWindowId: WindowType | null;
  onShutdown: () => void;
}

interface DockIconProps {
  key?: any;
  id: string;
  icon: any;
  isOpen: boolean;
  isActive: boolean;
  onClick: () => void;
  mouseX: any;
  isMobile: boolean;
  isTablet: boolean;
}

function DockIcon({ 
  id, 
  icon: Icon, 
  isOpen, 
  isActive, 
  onClick, 
  mouseX,
  isMobile,
  isTablet
}: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const baseWidth = isMobile ? 40 : isTablet ? 44 : 48;
  const magnification = isMobile ? 60 : isTablet ? 70 : 80;

  const widthSync = useTransform(distance, [-150, 0, 150], [baseWidth, magnification, baseWidth]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onClick={onClick}
      className="relative aspect-square rounded-[1rem] md:rounded-2xl flex items-center justify-center cursor-pointer group"
    >
      <div className={`
        absolute inset-0 rounded-[1rem] md:rounded-2xl transition-all duration-300
        ${isActive ? 'bg-white/30 shadow-xl ring-1 ring-white/40' : 'bg-white/10 group-hover:bg-white/20'}
      `} />
      
      <Icon 
        size={isMobile ? 20 : 24} 
        className={`relative z-10 transition-all duration-500 ${isActive ? 'text-white scale-110' : 'text-white/70 group-hover:text-white'}`} 
      />

      {/* Tooltip */}
      {!isMobile && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
          {id}
        </div>
      )}

      {/* Open Indicator Dot */}
      {isOpen && (
        <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 md:w-1 h-0.5 md:h-1 rounded-full bg-white transition-all duration-300 ${isActive ? 'opacity-100 scale-125 shadow-[0_0_8px_white]' : 'opacity-40'}`} />
      )}
    </motion.div>
  );
}

export default function Taskbar({ windows, onToggleWindow, activeWindowId, onShutdown }: TaskbarProps) {
  const [time, setTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const mouseX = useMotionValue(Infinity);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    const checkViewport = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsStartMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkViewport);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const apps: { id: WindowType; icon: any; label: string }[] = [
    { id: 'about', icon: User, label: 'About Me' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  const handleAppClick = (id: WindowType) => {
    onToggleWindow(id);
    setIsStartMenuOpen(false);
  };

  return (
    <div className="fixed bottom-4 md:bottom-6 left-0 right-0 flex justify-center items-end px-2 md:px-4 h-20 md:h-24 pointer-events-none z-[9999]">
      <div className="relative pointer-events-auto" ref={menuRef}>
        <AnimatePresence>
          {isStartMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[280px] md:w-[320px] bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-6 ring-1 ring-white/10"
            >
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Search apps..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  readOnly
                />
              </div>

              {/* Apps Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {apps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => handleAppClick(app.id)}
                    className="flex flex-col items-center gap-2 group p-2 rounded-2xl hover:bg-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white transition-colors group-hover:scale-110 duration-300">
                      <app.icon size={20} />
                    </div>
                    <span className="text-[9px] font-black text-white/60 uppercase tracking-widest text-center group-hover:text-white transition-colors">
                      {app.label.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Quick Links */}
              <div className="space-y-1 mb-8">
                <a href="https://github.com/Steve-co-debug" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-all group">
                  <div className="flex items-center gap-3">
                    <Github size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">GitHub Profile</span>
                  </div>
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="https://www.linkedin.com/in/steve-taiwa" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-all group">
                  <div className="flex items-center gap-3">
                    <Linkedin size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">LinkedIn</span>
                  </div>
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* User Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black text-white">
                    ST
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white uppercase tracking-tight">Steve Taiwa</p>
                    <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Online</p>
                  </div>
                </div>
                <button 
                  onClick={onShutdown}
                  className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-red-400 transition-colors"
                >
                  <Power size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="flex items-end gap-2 md:gap-3 px-3 md:px-4 pb-2 md:pb-3 pt-3 md:pt-4 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[1.5rem] md:rounded-[2.5rem] pointer-events-auto shadow-2xl ring-1 ring-black/20"
        >
          {/* Start / Logo Icon */}
          <div className="flex items-center gap-2 md:gap-3">
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 12 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
              className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 text-white transition-all ${isStartMenuOpen ? 'ring-2 ring-white/50' : ''}`}
            >
              <Star size={isMobile ? 20 : 24} fill="white" />
            </motion.button>
            <div className="w-px h-6 md:h-8 bg-white/10 mx-0.5 md:mx-1" />
          </div>

          {/* Dock Icons */}
          <div className="flex items-end gap-1 md:gap-2">
            {apps.map((app) => (
              <DockIcon
                key={app.id}
                id={app.label}
                icon={app.icon}
                isOpen={windows[app.id].isOpen}
                isActive={activeWindowId === app.id}
                onClick={() => handleAppClick(app.id)}
                mouseX={mouseX}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            ))}
          </div>

          <div className="w-px h-6 md:h-8 bg-white/10 mx-1 md:mx-2" />

          {/* System Info */}
          <div className="px-2 md:px-4 py-1.5 md:py-2 flex flex-col items-center justify-center min-w-[60px] md:min-w-[70px]">
            <span className="text-white text-[10px] md:text-xs font-black tracking-tight">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-white/40 text-[7px] md:text-[9px] font-bold uppercase tracking-widest">
              {time.toLocaleDateString([], { month: 'short', day: '2-digit' })}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
