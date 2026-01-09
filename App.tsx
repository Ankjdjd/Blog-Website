
import React, { useState } from 'react';
import { ProjectTab } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardOverview from './components/DashboardOverview';
import BlogProject from './components/projects/BlogProject';
import MemoryGameProject from './components/projects/MemoryGameProject';
import MailProject from './components/projects/MailProject';
import VideoProject from './components/projects/VideoProject';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProjectTab>(ProjectTab.OVERVIEW);

  const renderContent = () => {
    switch (activeTab) {
      case ProjectTab.OVERVIEW:
        return <DashboardOverview onNavigate={setActiveTab} />;
      case ProjectTab.BLOG:
        return <BlogProject />;
      case ProjectTab.MEMORY_GAME:
        return <MemoryGameProject />;
      case ProjectTab.MAIL_APP:
        return <MailProject />;
      case ProjectTab.VIDEO_APP:
        return <VideoProject />;
      default:
        return <DashboardOverview onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header activeTab={activeTab} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
