import React from 'react';
import { motion } from 'motion/react';
import { Terminal, User, Briefcase, Mail, Code, GraduationCap } from 'lucide-react';
import { WindowType } from '../types';

interface DesktopIconProps {
  id: WindowType;
  title: string;
  onOpen: () => void;
  dragConstraints?: React.RefObject<HTMLDivElement>;
  key?: React.Key;
}

export default function DesktopIcon({ id, title, onOpen, dragConstraints }: DesktopIconProps) {
  const Icon = {
    about: User,
    projects: Briefcase,
    skills: Code,
    contact: Mail,
    terminal: Terminal,
    education: GraduationCap,
  }[id];

  return (
    <motion.div 
      drag
      dragConstraints={dragConstraints}
      dragElastic={0.1}
      dragMomentum={false}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onOpen}
      className="flex flex-col items-center group cursor-default w-20 h-24 select-none transition-shadow hover:shadow-xl active:z-50 relative"
    >
      <div className={`
        w-14 h-14 rounded-xl flex items-center justify-center mb-1 transition-all
        ${id === 'projects' ? 'bg-blue-500/20 border border-blue-400/30 text-blue-400 group-hover:bg-blue-400/40' :
          id === 'about' ? 'bg-indigo-500/20 border border-indigo-400/30 text-indigo-400 group-hover:bg-indigo-400/40' :
          id === 'skills' ? 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 group-hover:bg-emerald-400/40' :
          id === 'education' ? 'bg-purple-500/20 border border-purple-400/30 text-purple-400 group-hover:bg-purple-400/40' :
          'bg-amber-500/20 border border-amber-400/30 text-amber-400 group-hover:bg-amber-400/40'}
      `}>
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <span className="text-[10px] text-white font-black uppercase tracking-widest text-center shadow-black drop-shadow-md truncate w-full px-1">
        {title}
      </span>
    </motion.div>
  );
}
