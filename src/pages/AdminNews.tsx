import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

export function AdminNews() {
  const { user } = useAuth();
  const [tab, setTab] = useState<'news' | 'popup'>('news');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // News State
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [url, setUrl] = useState('');
  const [lang, setLang] = useState('EN');

  // Popup State
  const [pTitle, setPTitle] = useState('');
  const [pLocation, setPLocation] = useState('');
  const [pStartDate, setPStartDate] = useState('');
  const [pEndDate, setPEndDate] = useState('');
  const [pDesc, setPDesc] = useState('');

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return setMessage('You must be logged in to post news.');
    setLoading(true); setMessage('');
    try {
      await addDoc(collection(db, 'news'), {
        title, summary, url, lang, createdAt: serverTimestamp(),
      });
      setMessage('✅ News successfully uploaded!');
      setTitle(''); setSummary(''); setUrl('');
    } catch (err: any) {
      console.error(err); setMessage(`❌ Error: ${err.message}`);
    } finally { setLoading(false); }
  };

  const handlePopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return setMessage('You must be logged in to post popup stores.');
    setLoading(true); setMessage('');
    try {
      await addDoc(collection(db, 'popups'), {
        title: pTitle,
        location: pLocation,
        startDate: pStartDate,
        endDate: pEndDate,
        description: pDesc,
        createdAt: serverTimestamp(),
      });
      setMessage('✅ Popup Store successfully uploaded!');
      setPTitle(''); setPLocation(''); setPStartDate(''); setPEndDate(''); setPDesc('');
    } catch (err: any) {
      console.error(err); setMessage(`❌ Error: ${err.message}`);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-6 sm:p-10 flex flex-col items-center justify-center font-sans">
      <div className="max-w-xl w-full bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
        
        {/* Header & Tabs */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-light mb-6">Admin Dashboard</h1>
          <div className="flex bg-black/50 p-1 rounded-xl">
            <button 
              onClick={() => setTab('news')}
              className={`flex-1 py-2 rounded-lg text-sm transition-colors ${tab === 'news' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'}`}
            >
              Upload News
            </button>
            <button 
              onClick={() => setTab('popup')}
              className={`flex-1 py-2 rounded-lg text-sm transition-colors ${tab === 'popup' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'}`}
            >
              Upload Popup Store
            </button>
          </div>
        </div>
        
        {message && (
          <div className="mb-6 p-4 bg-white/10 rounded-lg text-sm border border-white/10">
            {message}
          </div>
        )}

        {/* ────────── NEWS FORM ────────── */}
        {tab === 'news' && (
          <form onSubmit={handleNewsSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/70 uppercase tracking-wider">Language</label>
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white/50">
                <option value="EN">English (EN)</option>
                <option value="KO">Korean (KO)</option>
                <option value="JP">Japanese (JP)</option>
                <option value="CN">Chinese (CN)</option>
                <option value="VN">Vietnamese (VN)</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/70 uppercase tracking-wider">Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="E.g. Seoul named top global travel destination" className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white/50"/>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/70 uppercase tracking-wider">Summary</label>
              <textarea required rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Write a brief summary of the news..." className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white/50 resize-none"/>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/70 uppercase tracking-wider">Original Article URL (Optional)</label>
              <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://news.example.com/article" className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white/50"/>
            </div>
            <button type="submit" disabled={loading} className="mt-2 w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50">
              {loading ? 'Uploading...' : 'Upload News'}
            </button>
          </form>
        )}

        {/* ────────── POPUP STORE FORM ────────── */}
        {tab === 'popup' && (
          <form onSubmit={handlePopupSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/70 uppercase tracking-wider">Popup Store Title</label>
              <input type="text" required value={pTitle} onChange={(e) => setPTitle(e.target.value)} placeholder="E.g. NewJeans Supernatural Popup" className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white/50"/>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/70 uppercase tracking-wider">Location (Address or Area)</label>
              <input type="text" required value={pLocation} onChange={(e) => setPLocation(e.target.value)} placeholder="E.g. Seongsu-dong (Line Friends Store)" className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white/50"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-white/70 uppercase tracking-wider">Start Date</label>
                <input type="date" required value={pStartDate} onChange={(e) => setPStartDate(e.target.value)} className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white/50"/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-white/70 uppercase tracking-wider">End Date</label>
                <input type="date" required value={pEndDate} onChange={(e) => setPEndDate(e.target.value)} className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white/50"/>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/70 uppercase tracking-wider">Description</label>
              <textarea required rows={4} value={pDesc} onChange={(e) => setPDesc(e.target.value)} placeholder="What can visitors expect here?" className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-white/50 resize-none"/>
            </div>
            <button type="submit" disabled={loading} className="mt-2 w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50">
              {loading ? 'Uploading...' : 'Upload Popup Schedule'}
            </button>
          </form>
        )}
        
        <div className="mt-8 pt-8 border-t border-white/10 flex justify-center">
          <a href="/" className="text-white/40 hover:text-white text-sm transition-colors">
            ← Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
