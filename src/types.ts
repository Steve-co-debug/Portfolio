import React from 'react';

export type WindowType = 'about' | 'projects' | 'skills' | 'contact' | 'terminal' | 'education';

export interface WindowState {
  id: WindowType;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface AppConfig {
  id: WindowType;
  title: string;
  icon: string;
  component: React.ComponentType;
}
