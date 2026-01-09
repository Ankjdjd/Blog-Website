
import React, { useState } from 'react';
import { Video } from '../../types';

const VideoProject: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      title: 'Internship Journey at CodeClause',
      description: 'Experience the dynamic environment and learning curve as a web developer intern.',
      thumbnail: 'https://picsum.photos/seed/v1/800/450',
      videoUrl: '#',
      views: 1245,
      author: 'Ankush Manjute',
      isPrivate: false
    },
    {
      id: '2',
      title: 'Advanced React Hooks Tutorial',
      description: 'Deep dive into useEffect and useCallback for performance optimization.',
      thumbnail: 'https://picsum.photos/seed/v2/800/450',
      videoUrl: '#',
      views: 890,
      author: 'Tech Guru',
      isPrivate: false
    },
    {
      id: '3',
      title: 'Golden Level Task: Video Logic',
      description: 'Private documentation for backend video processing logic.',
      thumbnail: 'https://picsum.photos/seed/v3/800/450',
      videoUrl: '#',
      views: 12,
      author: 'Ankush Manjute',
      isPrivate: true
    }
  ]);
  const [selectedVideo, setSelectedVideo] = useState<Video>(videos[0]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData(e.currentTarget);
    setTimeout(() => {
      const newVid: Video = {
        id: Date.now().toString(),
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        thumbnail: `https://picsum.photos/seed/${Date.now()}/800/450`,
        videoUrl: '#',
        views: 0,
        author: 'Ankush Manjute',
        isPrivate: formData.get('privacy') === 'private'
      };
      setVideos([newVid, ...videos]);
      setIsUploading(false);
      alert('Video uploaded successfully and is being processed!');
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
      {/* Player Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl group">
          <img src={selectedVideo.thumbnail} alt="Placeholder" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-20 h-20 bg-cyan-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
               <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
            </button>
          </div>
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-bold">{selectedVideo.title}</h3>
            <p className="text-sm opacity-80">{selectedVideo.views} views • {selectedVideo.isPrivate ? '🔒 Private' : '🌍 Public'}</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                {selectedVideo.author[0]}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{selectedVideo.author}</h4>
                <p className="text-xs text-slate-500">Subscribers: 1.2K</p>
              </div>
            </div>
            <button className="bg-slate-800 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-700 transition-colors">Subscribe</button>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl">
            <p className="text-slate-600 leading-relaxed">{selectedVideo.description}</p>
          </div>
        </div>
      </div>

      {/* Sidebar & Upload */}
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h4 className="text-lg font-bold text-slate-800 mb-4">Upload Video</h4>
          <form onSubmit={handleUpload} className="space-y-4">
            <input name="title" required placeholder="Title" className="w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none" />
            <textarea name="description" required placeholder="Description" rows={3} className="w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none resize-none" />
            <select name="privacy" className="w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <button 
              type="submit" 
              disabled={isUploading}
              className="w-full bg-cyan-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-cyan-100 hover:bg-cyan-700 transition-all flex items-center justify-center space-x-2"
            >
              {isUploading ? 'Uploading...' : 'Publish Video'}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Up Next</h4>
          {videos.map(v => (
            <div 
              key={v.id} 
              onClick={() => setSelectedVideo(v)}
              className={`group flex items-center space-x-4 p-2 rounded-2xl cursor-pointer transition-all ${selectedVideo.id === v.id ? 'bg-cyan-50' : 'hover:bg-slate-50'}`}
            >
              <div className="w-32 aspect-video rounded-xl overflow-hidden flex-shrink-0 relative">
                <img src={v.thumbnail} className="w-full h-full object-cover" />
                {v.isPrivate && <span className="absolute top-1 right-1 bg-black/60 text-[8px] text-white px-1 py-0.5 rounded">PRIVATE</span>}
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-slate-800 text-sm truncate group-hover:text-cyan-600 transition-colors">{v.title}</h5>
                <p className="text-xs text-slate-500 truncate">{v.author}</p>
                <p className="text-[10px] text-slate-400 mt-1">{v.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoProject;
