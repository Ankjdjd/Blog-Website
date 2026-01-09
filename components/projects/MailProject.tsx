
import React, { useState } from 'react';
import { Email } from '../../types';
import { generateEmailResponse } from '../../services/geminiService';

const MailProject: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([
    { id: '1', from: 'internship@codeclause.com', subject: 'Project Milestone Update', body: 'Dear Intern, your progress on the Golden Level projects is impressive. Please continue!', date: 'Jan 28, 2026', folder: 'inbox' },
    { id: '2', from: 'notifications@github.com', subject: 'New Pull Request on Repository', body: 'A new PR has been opened on your portfolio project. Review required.', date: 'Jan 27, 2026', folder: 'inbox' },
    { id: '3', from: 'hr@codeclause.com', subject: 'Invitation: Swags Verification', body: 'You have been selected for swags verification based on your golden project quality.', date: 'Jan 26, 2026', folder: 'inbox' },
  ]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [folder, setFolder] = useState<'inbox' | 'sent'>('inbox');
  const [replyLoading, setReplyLoading] = useState(false);

  const filteredEmails = emails.filter(e => e.folder === folder);

  const handleCompose = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newMail: Email = {
      id: Date.now().toString(),
      from: 'me@ankush.dev',
      subject: formData.get('subject') as string,
      body: formData.get('body') as string,
      date: 'Just now',
      folder: 'sent'
    };
    setEmails([newMail, ...emails]);
    setIsComposing(false);
  };

  const generateAIPly = async () => {
    if (!selectedEmail) return;
    setReplyLoading(true);
    const aiResponse = await generateEmailResponse(selectedEmail.body);
    // In a real app we would pre-fill the compose window
    alert(`Gemini Suggestion:\n\n${aiResponse}`);
    setReplyLoading(false);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm animate-fadeIn">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-100 flex flex-col p-6 space-y-6">
        <button 
          onClick={() => setIsComposing(true)}
          className="bg-cyan-600 text-white px-4 py-3 rounded-2xl font-bold hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-100 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          <span>Compose</span>
        </button>
        
        <nav className="space-y-1">
          <button 
            onClick={() => setFolder('inbox')}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-medium ${folder === 'inbox' ? 'bg-cyan-50 text-cyan-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-8 4-8-4" /></svg>
              <span>Inbox</span>
            </div>
            {emails.filter(e => e.folder === 'inbox').length > 0 && <span className="bg-cyan-100 text-cyan-600 px-2 py-0.5 rounded-md text-xs font-bold">{emails.filter(e => e.folder === 'inbox').length}</span>}
          </button>
          <button 
            onClick={() => setFolder('sent')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-medium ${folder === 'sent' ? 'bg-cyan-50 text-cyan-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <span>Sent</span>
          </button>
        </nav>
      </div>

      {/* List */}
      <div className="w-1/3 border-r border-slate-100 overflow-y-auto">
        {filteredEmails.map(email => (
          <div 
            key={email.id} 
            onClick={() => setSelectedEmail(email)}
            className={`p-6 border-b border-slate-50 cursor-pointer transition-colors ${selectedEmail?.id === email.id ? 'bg-cyan-50/50' : 'hover:bg-slate-50'}`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-sm font-bold text-slate-800 truncate pr-2">{email.from}</span>
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{email.date}</span>
            </div>
            <h4 className="text-xs font-bold text-slate-600 mb-1 truncate">{email.subject}</h4>
            <p className="text-xs text-slate-400 line-clamp-1">{email.body}</p>
          </div>
        ))}
      </div>

      {/* Detail */}
      <div className="flex-1 bg-slate-50/30 flex flex-col">
        {selectedEmail ? (
          <div className="p-10 flex flex-col h-full animate-fadeIn">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{selectedEmail.subject}</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                    {selectedEmail.from[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">{selectedEmail.from}</p>
                    <p className="text-xs text-slate-400">to me • {selectedEmail.date}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={generateAIPly}
                disabled={replyLoading}
                className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                <span>{replyLoading ? 'Analyzing...' : 'AI Response Suggestion'}</span>
              </button>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 flex-1 whitespace-pre-wrap text-slate-600 leading-relaxed shadow-sm">
              {selectedEmail.body}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
            <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <p className="text-lg font-medium">Select an email to read</p>
          </div>
        )}
      </div>

      {/* Compose Modal */}
      {isComposing && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCompose} className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
            <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
              <h4 className="font-bold">New Message</h4>
              <button type="button" onClick={() => setIsComposing(false)} className="text-slate-400 hover:text-white transition-colors">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l18 18" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <input name="to" type="text" placeholder="To" className="w-full border-b border-slate-100 py-2 outline-none focus:border-cyan-500 transition-colors" />
              <input name="subject" type="text" placeholder="Subject" className="w-full border-b border-slate-100 py-2 outline-none focus:border-cyan-500 transition-colors" />
              <textarea name="body" rows={8} placeholder="Message body..." className="w-full py-2 outline-none resize-none text-slate-600" />
            </div>
            <div className="p-6 bg-slate-50 flex justify-end">
              <button type="submit" className="bg-cyan-600 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-cyan-100 hover:bg-cyan-700 transition-all">Send Email</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MailProject;
