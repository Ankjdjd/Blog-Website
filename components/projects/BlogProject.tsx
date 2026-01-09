
import React, { useState, useEffect } from 'react';
import { BlogPost, Comment } from '../../types';
import { generateBlogPost } from '../../services/geminiService';

const BlogProject: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'The Future of Web Development',
      category: 'Technology',
      content: 'Web development is evolving faster than ever. From AI-driven interfaces to serverless architectures...',
      image: 'https://picsum.photos/seed/tech/800/400',
      date: 'Jan 15, 2026',
      comments: [
        { id: 'c1', author: 'Jane Doe', text: 'Great insights!', date: 'Jan 16' }
      ]
    },
    {
       id: '2',
       title: 'Mastering Tailwind CSS',
       category: 'Design',
       content: 'Tailwind CSS has changed the way we think about styling. Utility-first is not just a trend...',
       image: 'https://picsum.photos/seed/design/800/400',
       date: 'Jan 12, 2026',
       comments: []
     }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newComment, setNewComment] = useState<{postId: string, text: string}>({postId: '', text: ''});

  const handleCreatePost = async () => {
    setIsGenerating(true);
    const postData = await generateBlogPost('Artificial Intelligence in Creative Industries');
    if (postData) {
      const newPost: BlogPost = {
        ...postData,
        id: Date.now().toString(),
        image: `https://picsum.photos/seed/${Date.now()}/800/400`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        comments: []
      };
      setPosts([newPost, ...posts]);
    }
    setIsGenerating(false);
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.text.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Guest User',
      text: newComment.text,
      date: 'Just now'
    };
    setPosts(posts.map(p => p.id === postId ? { ...p, comments: [...p.comments, comment] } : p));
    setNewComment({postId: '', text: ''});
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dynamic Content Platform</h2>
          <p className="text-slate-500 text-sm">Create and interact with articles powered by AI.</p>
        </div>
        <button 
          onClick={handleCreatePost}
          disabled={isGenerating}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-cyan-200 transition-all flex items-center space-x-2 disabled:opacity-50"
        >
          {isGenerating ? (
            <span className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>Generating AI Post...</span>
            </span>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              <span>Generate New Article</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {posts.map(post => (
          <article key={post.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
            <div className="p-8">
              <div className="flex items-center space-x-2 mb-3">
                <span className="px-3 py-1 bg-cyan-50 text-cyan-600 text-xs font-bold rounded-full uppercase">{post.category}</span>
                <span className="text-slate-400 text-xs">• {post.date}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">{post.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-8 line-clamp-3">{post.content}</p>
              
              <div className="border-t border-slate-100 pt-6">
                <h4 className="text-sm font-bold text-slate-800 mb-4">Comments ({post.comments.length})</h4>
                <div className="space-y-4 mb-6">
                  {post.comments.map(c => (
                    <div key={c.id} className="bg-slate-50 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-slate-700">{c.author}</span>
                        <span className="text-xs text-slate-400">{c.date}</span>
                      </div>
                      <p className="text-sm text-slate-600">{c.text}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    placeholder="Write a comment..." 
                    className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-cyan-500 transition-all outline-none"
                    value={newComment.postId === post.id ? newComment.text : ''}
                    onChange={(e) => setNewComment({postId: post.id, text: e.target.value})}
                  />
                  <button 
                    onClick={() => handleAddComment(post.id)}
                    className="bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-700 transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogProject;
