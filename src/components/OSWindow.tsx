import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Square, Terminal, User, Briefcase, Mail, Code, GraduationCap } from 'lucide-react';
import { WindowType } from '../types';

interface OSWindowProps {
  id: WindowType;
  title: string;
  isOpen: boolean;
  isActive: boolean;
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onNavigate?: (id: WindowType) => void;
  zIndex: number;
  children: React.ReactNode;
  key?: React.Key;
}

export default function OSWindow({
  id,
  title,
  isOpen,
  isActive,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onNavigate,
  zIndex,
  children
}: OSWindowProps) {
  const [windowSize, setWindowSize] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768 
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const effectivelyMaximized = isMaximized || isMobile;

  // Responsive window dimensions
  const getWindowWidth = () => {
    if (effectivelyMaximized) return '100%';
    if (isTablet) return '90%';
    return '800px';
  };

  const getWindowHeight = () => {
    if (effectivelyMaximized) return 'calc(100vh - 48px)';
    if (isTablet) return '80%';
    return '550px';
  };

  const getWindowPos = () => {
    if (effectivelyMaximized) return { top: 0, left: 0 };
    if (isTablet) return { top: '30px', left: '5%' };
    
    // Stagger windows based on z-index or a simple offset
    const offset = (zIndex - 20) * 20;
    return { top: 60 + offset, left: 240 + offset };
  };

  const pos = getWindowPos();

  const Icon = {
    about: User,
    projects: Briefcase,
    skills: Code,
    contact: Mail,
    terminal: Terminal,
    education: GraduationCap,
  }[id];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            x: effectivelyMaximized ? 0 : undefined,
            y: effectivelyMaximized ? 0 : undefined,
            width: getWindowWidth(),
            height: getWindowHeight(),
          }}
          exit={{ scale: 0.9, opacity: 0 }}
          drag={!effectivelyMaximized}
          dragMomentum={false}
          onPointerDown={onFocus}
          style={{ 
            zIndex,
            position: 'absolute',
            top: pos.top,
            left: pos.left,
          }}
          className={`flex flex-col bg-white overflow-hidden border-slate-200 shadow-2xl transition-all duration-300 ${effectivelyMaximized ? 'rounded-none border-0' : 'rounded-2xl border'} ${isActive ? 'ring-1 ring-blue-500/30' : ''}`}
        >
          {/* Title Bar */}
          <div 
            className={`h-14 border-b flex items-center px-5 justify-between select-none cursor-default transition-all duration-500 ${effectivelyMaximized ? 'bg-white/95 backdrop-blur-xl border-slate-100' : 'bg-slate-50/90 backdrop-blur-md border-slate-200/60'}`}
            onDoubleClick={onMaximize}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-xl transition-all duration-500 ${isActive ? 'bg-blue-600 shadow-lg shadow-blue-500/20' : 'bg-slate-200/50'}`}>
                <Icon size={isMobile ? 14 : 16} className={`transition-colors duration-500 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              </div>
              <div className="flex flex-col">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                  {title}
                </span>
                {!isMobile && (
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 opacity-50">System Application</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-100/30 rounded-2xl border border-slate-200/20 group/controls">
              <div className="relative group/btn">
                <button 
                  onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                  className="w-3 h-3 rounded-full bg-amber-400/90 hover:bg-amber-400 transition-all flex items-center justify-center group/min shadow-sm active:scale-90"
                >
                  <Minus size={8} strokeWidth={4} className="text-amber-900/0 group-hover/controls:text-amber-900/60 transition-colors" />
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[7px] font-black uppercase tracking-[0.2em] rounded-md opacity-0 group-hover/btn:opacity-100 transition-all scale-95 group-hover:scale-100 pointer-events-none whitespace-nowrap shadow-xl ring-1 ring-white/10 z-50">
                  Minimize
                </div>
              </div>

              {!isMobile && (
                <div className="relative group/btn">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onMaximize(); }}
                    className="w-3 h-3 rounded-full bg-emerald-400/90 hover:bg-emerald-400 transition-all flex items-center justify-center group/max shadow-sm active:scale-90"
                  >
                    <Square size={6} strokeWidth={4} className="text-emerald-900/0 group-hover/controls:text-emerald-900/60 transition-colors" />
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[7px] font-black uppercase tracking-[0.2em] rounded-md opacity-0 group-hover/btn:opacity-100 transition-all scale-95 group-hover:scale-100 pointer-events-none whitespace-nowrap shadow-xl ring-1 ring-white/10 z-50">
                    {isMaximized ? 'Restore' : 'Maximize'}
                  </div>
                </div>
              )}

              <div className="relative group/btn">
                <button 
                  onClick={(e) => { e.stopPropagation(); onClose(); }}
                  className="w-3 h-3 rounded-full bg-red-400/90 hover:bg-red-400 transition-all flex items-center justify-center group/close shadow-sm active:scale-90"
                >
                  <X size={8} strokeWidth={4} className="text-red-900/0 group-hover/controls:text-red-900/60 transition-colors" />
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[7px] font-black uppercase tracking-[0.2em] rounded-md opacity-0 group-hover/btn:opacity-100 transition-all scale-95 group-hover:scale-100 pointer-events-none whitespace-nowrap shadow-xl ring-1 ring-white/10 z-50">
                  Close
                </div>
              </div>
            </div>
          </div>

          {/* Menu Bar */}
          <motion.div 
            key={`menu-${effectivelyMaximized}`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex gap-6 px-7 py-3.5 text-[9px] uppercase font-black text-slate-400 tracking-[0.25em] border-b border-slate-100/50 bg-white/50 backdrop-blur-sm overflow-x-auto no-scrollbar"
          >
            {[
              { id: 'about', label: 'About' },
              { id: 'projects', label: 'Projects' },
              { id: 'education', label: 'Education' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate?.(item.id as WindowType);
                }}
                className={`hover:text-blue-600 transition-all cursor-pointer shrink-0 flex items-center gap-2 group/menu ${id === item.id ? 'text-blue-600' : ''}`}
              >
                <span className={`w-1 h-1 rounded-full bg-blue-500 scale-0 group-hover/menu:scale-100 transition-transform ${id === item.id ? 'scale-100' : ''}`} />
                {item.label}
              </button>
            ))}
          </motion.div>

          {/* Content Area */}
          <motion.div 
            key={`content-${effectivelyMaximized}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={!effectivelyMaximized ? { 
              scale: 1.005,
              y: -2,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)"
            } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`flex-1 overflow-auto bg-white custom-scrollbar focus:outline-none transition-all duration-300 relative z-0 ${effectivelyMaximized || isTablet ? 'p-6 pb-32' : 'p-4 pb-8'}`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
