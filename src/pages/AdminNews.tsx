import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

export function AdminNews() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [url, setUrl] = useState('');
  const [lang, setLang] = useState('EN');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setMessage('You must be logged in to post news.');
      return;
    }
    setLoading(true);
    setMessage('');
    
    try {
      await addDoc(collection(db, 'news'), {
        title,
        summary,
        url,
        lang,
        createdAt: serverTimestamp(),
      });
      setMessage('✅ News successfully uploaded!');
      setTitle('');
      setSummary('');
      setUrl('');
    } catch (err: any) {
      console.error(err);
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center justify-center font-sans">
      <div className="max-w-xl w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
        <h1 className="text-3xl font-light mb-2">Admin: Upload News</h1>
        <p className="text-white/40 text-sm mb-8">Post real-time news to K-Trend News</p>
        
        {message && (
          <div className="mb-6 p-4 bg-white/10 rounded-lg text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/70">Language</label>
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white/50"
            >
              <option value="EN">English (EN)</option>
              <option value="KO">Korean (KO)</option>
              <option value="JP">Japanese (JP)</option>
              <option value="CN">Chinese (CN)</option>
              <option value="VN">Vietnamese (VN)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/70">Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Seoul named top global travel destination"
              className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white/50"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/70">Summary</label>
            <textarea 
              required
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Write a brief summary of the news..."
              className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white/50 resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/70">Original Article URL (Optional)</label>
            <input 
              type="url" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://news.example.com/article"
              className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white/50"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload News'}
          </button>
        </form>
        
        <div className="mt-8 pt-8 border-t border-white/10 flex justify-center">
          <a href="/" className="text-white/40 hover:text-white text-sm transition-colors">
            ← Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
