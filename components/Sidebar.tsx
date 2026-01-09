
import React from 'react';
import { ProjectTab } from '../types';

interface SidebarProps {
  activeTab: ProjectTab;
  onTabChange: (tab: ProjectTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: ProjectTab.OVERVIEW, label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: ProjectTab.BLOG, label: 'Blog Website', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z M14 2v4a2 2 0 002 2h4' },
    { id: ProjectTab.MEMORY_GAME, label: 'Memory Game', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: ProjectTab.MAIL_APP, label: 'Mail Application', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: ProjectTab.VIDEO_APP, label: 'Video Streaming', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col shadow-sm">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          C
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800 leading-tight">CodeClause</h1>
          <p className="text-xs text-cyan-600 font-semibold tracking-wider uppercase">Internship Hub</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-cyan-50 text-cyan-600 font-semibold shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs text-slate-500 font-medium mb-2">Intern Status</p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">Ankush Manjute</span>
          </div>
          <div className="mt-3 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div className="bg-cyan-500 w-full h-full" />
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Completion: 100%</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
