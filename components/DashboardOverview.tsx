
import React from 'react';
import { ProjectTab } from '../types';

interface DashboardOverviewProps {
  onNavigate: (tab: ProjectTab) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  const projects = [
    {
      id: ProjectTab.BLOG,
      title: 'Blog Website',
      level: 'Entry Level',
      desc: 'Dynamic article creation with comments and categories.',
      tech: ['React', 'Tailwind', 'Gemini API'],
      color: 'bg-blue-500',
    },
    {
      id: ProjectTab.MEMORY_GAME,
      title: 'Memory Game',
      level: 'Intermediate Level',
      desc: 'Real-time card matching game with timer and scoring.',
      tech: ['React', 'CSS Animations', 'Logic'],
      color: 'bg-indigo-500',
    },
    {
      id: ProjectTab.MAIL_APP,
      title: 'Mail Application',
      level: 'Golden Level',
      desc: 'Secure mail system with folders and SMTP simulation.',
      tech: ['React', 'Auth', 'CRUD'],
      color: 'bg-amber-500',
    },
    {
      id: ProjectTab.VIDEO_APP,
      title: 'Video Streaming',
      level: 'Golden Level',
      desc: 'Comprehensive video sharing platform with privacy controls.',
      tech: ['React', 'Video.js', 'User Systems'],
      color: 'bg-rose-500',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-extrabold mb-4 leading-tight">Internship Completion Portfolio</h1>
          <p className="text-cyan-100 text-lg mb-8 opacity-90">
            Welcome, Ankush Manjute. This dashboard presents the full realization of your Web Development internship tasks. All projects are fully functional, responsive, and ready for review.
          </p>
          <div className="flex flex-wrap gap-4">
             <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                <span className="text-cyan-200 text-xs uppercase font-bold tracking-widest">Projects</span>
                <span className="text-xl font-bold">04</span>
             </div>
             <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                <span className="text-cyan-200 text-xs uppercase font-bold tracking-widest">Status</span>
                <span className="text-xl font-bold italic">Qualified</span>
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((p) => (
          <div 
            key={p.id}
            onClick={() => onNavigate(p.id)}
            className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-100 transition-all cursor-pointer flex flex-col h-full"
          >
            <div className={`w-12 h-12 ${p.color} rounded-xl mb-4 flex items-center justify-center text-white shadow-lg shadow-${p.color.split('-')[1]}-200 group-hover:scale-110 transition-transform`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest mb-1">{p.level}</span>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{p.title}</h3>
            <p className="text-slate-500 text-sm mb-6 flex-grow">{p.desc}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {p.tech.map((t) => (
                <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center text-cyan-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
              View Project
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
