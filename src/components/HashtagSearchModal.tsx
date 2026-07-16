import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Copy, Check, Hash } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SITE_CONTENT, GLOBAL_HASHTAGS } from '../config/content';

interface HashtagSearchModalProps {
  onClose: () => void;
}

export function HashtagSearchModal({ onClose }: HashtagSearchModalProps) {
  const { lang } = useLanguage();
  const content = SITE_CONTENT[lang].hashtag;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(content.categories[0]);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const handleCopy = (tag: string, meaning?: string) => {
    const textToCopy = meaning ? `${tag} ${meaning}` : tag;
    navigator.clipboard.writeText(textToCopy);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 2000);
  };

  // Filter tags based on search query and active category
  const catKeys = ['Popup', 'Cafe', 'Food', 'Culture', 'Beauty', 'K-Pop'];
  const filteredTags = GLOBAL_HASHTAGS.filter((t) => {
    const localizedCat = content.categories[catKeys.indexOf(t.cat) + 1];
    const matchesSearch = t.tag.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.cat.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === content.categories[0] || localizedCat === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl h-[75vh] bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-md"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-10 border-b border-white/10 bg-black/20">
          <h2 className="text-3xl sm:text-4xl font-title font-extrabold text-white tracking-[-0.08em] flex items-center gap-3 mb-6">
            <Hash className="text-white/40" />
            {content.title}
          </h2>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-white/30" />
            </div>
            <input
              type="text"
              placeholder={content.placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {content.categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-colors border ${
                  activeCategory === cat 
                    ? 'bg-white text-black border-white font-medium' 
                    : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10 bg-[#0a0a0c]">
          {filteredTags.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/30">
              <Hash size={48} className="mb-4 opacity-20" />
              <p>No hashtags found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTags.map((t, idx) => {
                const isCopied = copiedTag === t.tag;
                const localizedCat = content.categories[catKeys.indexOf(t.cat) + 1];
                return (
                    <div 
                      key={idx} 
                      className="group bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                      onClick={() => handleCopy(t.tag, (t as any).meaning)}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-white font-medium tracking-wide">{t.tag}</span>
                        {(t as any).meaning && <span className="text-white/60 text-sm tracking-wide font-light">{(t as any).meaning}</span>}
                        <span className="text-white/30 text-xs uppercase tracking-wide mt-1">{localizedCat}</span>
                      </div>
                    <button 
                      className={`p-2 rounded-lg transition-colors ${
                        isCopied ? 'bg-green-500/20 text-green-400' : 'bg-black/30 text-white/40 group-hover:bg-white/10 group-hover:text-white'
                      }`}
                    >
                      {isCopied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
