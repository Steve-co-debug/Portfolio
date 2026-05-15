/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import OSWindow from './components/OSWindow';
import DesktopIcon from './components/DesktopIcon';
import Taskbar from './components/Taskbar';
import { AboutMe, Projects, SkillsTerminal, Contact, Education } from './components/AppContent';
import { WindowType, WindowState } from './types';
import { Terminal, Power } from 'lucide-react';

export default function App() {
  const [windows, setWindows] = useState<Record<WindowType, WindowState>>({
    about: { id: 'about', isOpen: true, isMinimized: false, isMaximized: false, zIndex: 20 },
    projects: { id: 'projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    contact: { id: 'contact', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    education: { id: 'education', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  });

  const [activeWindowId, setActiveWindowId] = useState<WindowType | null>('about');
  const [maxZIndex, setMaxZIndex] = useState(20);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [isPoweredOff, setIsPoweredOff] = useState(false);

  const handleShutdown = () => {
    setIsShuttingDown(true);
    setTimeout(() => {
      setIsShuttingDown(false);
      setIsPoweredOff(true);
    }, 3000);
  };

  const handleRestart = () => {
    setIsPoweredOff(false);
    setIsShuttingDown(false);
  };

  const focusWindow = (id: WindowType) => {
    setActiveWindowId(id);
    const newZ = maxZIndex + 1;
    setMaxZIndex(newZ);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: newZ }
    }));
  };

  const toggleWindow = (id: WindowType) => {
    if (windows[id].isOpen) {
      if (activeWindowId === id) {
        // If already active, minimize it
        setWindows(prev => ({
          ...prev,
          [id]: { ...prev[id], isMinimized: true }
        }));
        setActiveWindowId(null);
      } else {
        // If open but not focused, focus it
        focusWindow(id);
      }
    } else {
      // If closed, open and focus it
      focusWindow(id);
    }
  };

  const closeWindow = (id: WindowType) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const toggleMaximize = (id: WindowType) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
    }));
    focusWindow(id);
  };

  const apps = useMemo(() => [
    { id: 'about' as WindowType, title: 'About Me', component: <AboutMe /> },
    { id: 'projects' as WindowType, title: 'Projects', component: <Projects /> },
    { id: 'contact' as WindowType, title: 'Contact', component: <Contact /> },
    { id: 'education' as WindowType, title: 'Education', component: <Education /> },
  ], []);

  const desktopRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0f1d] font-sans">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2500&auto=format&fit=crop" 
          alt="Guinness Gate"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#0a0f1d]/40 backdrop-blur-[1px]" />
      </div>

      {/* Background Mesh Gradient Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div 
          className="absolute -top-[10%] -right-[10%] w-full h-full opacity-40 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute -bottom-[20%] -left-[10%] w-full h-[80%] opacity-30 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 blur-[140px]"
          style={{
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 60%)'
          }}
        />
        
        {/* Animated Floating Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 100, -50, 0],
            y: [0, -150, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[80px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -120, 80, 0],
            y: [0, 180, -100, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]"
        />

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
      </div>
      
      {/* Desktop Grid (Responsive layout) */}
      <div 
        ref={desktopRef} 
        className="p-8 grid grid-cols-auto-fill gap-6 select-none h-[calc(100vh-100px)] relative w-full z-[5] overflow-visible pointer-events-none"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gridAutoFlow: 'row dense'
        }}
      >
        {apps.map(app => (
          <div key={app.id} className="pointer-events-auto">
            <DesktopIcon 
              id={app.id}
              title={app.title}
              onOpen={() => toggleWindow(app.id)}
              dragConstraints={desktopRef}
            />
          </div>
        ))}
      </div>

      {/* Windows Overlay */}
      {apps.map(app => (
        <OSWindow
          key={app.id}
          id={app.id}
          title={app.title}
          isOpen={windows[app.id].isOpen && !windows[app.id].isMinimized}
          isActive={activeWindowId === app.id}
          isMaximized={windows[app.id].isMaximized}
          zIndex={windows[app.id].zIndex}
          onFocus={() => focusWindow(app.id)}
          onClose={() => closeWindow(app.id)}
          onMaximize={() => toggleMaximize(app.id)}
          onMinimize={() => toggleWindow(app.id)}
          onNavigate={focusWindow}
        >
          {app.component}
        </OSWindow>
      ))}

      {/* Startup Sound / Visual Effect (Simulation) */}
      <div className="absolute inset-0 pointer-events-none bg-blue-500/5 animate-pulse overflow-hidden" />

      <Taskbar 
        windows={windows} 
        onToggleWindow={toggleWindow}
        activeWindowId={activeWindowId}
        onShutdown={handleShutdown}
      />

      {/* Shutdown Overlay */}
      <AnimatePresence>
        {isShuttingDown && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-slate-900 flex flex-col items-center justify-center text-white"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="mb-8"
            >
              <Terminal size={48} className="text-blue-500" />
            </motion.div>
            <h2 className="text-xl font-black uppercase tracking-[0.3em] mb-2">Steve OS</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">Shutting down application...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Powered Off Screen */}
      <AnimatePresence>
        {isPoweredOff && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[10001] bg-black flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRestart}
              className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-white/80 transition-all hover:bg-white/10 group shadow-2xl"
            >
              <Power size={24} className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            </motion.button>
            <div className="absolute bottom-12 text-center">
              <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.4em]">System Offline</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global OS Styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
          border: 2px solid #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}

