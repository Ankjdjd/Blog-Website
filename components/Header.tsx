
import React from 'react';
import { ProjectTab } from '../types';

interface HeaderProps {
  activeTab: ProjectTab;
}

const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const getTitle = () => {
    switch (activeTab) {
      case ProjectTab.OVERVIEW: return 'Dashboard Overview';
      case ProjectTab.BLOG: return 'Blog Website Project';
      case ProjectTab.MEMORY_GAME: return 'Memory Game Project';
      case ProjectTab.MAIL_APP: return 'Mail Application Project';
      case ProjectTab.VIDEO_APP: return 'Video Streaming Project';
      default: return 'Project Documentation';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800">{getTitle()}</h2>
      <div className="flex items-center space-x-4">
        <div className="flex space-x-2">
           <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">All Tasks Complete</span>
           <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-xs font-bold rounded-full uppercase">Jan 2026</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
