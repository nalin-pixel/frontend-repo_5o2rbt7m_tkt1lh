import React, { useEffect, useMemo, useState } from 'react';
import Hero3D from './components/Hero3D';
import SearchBar from './components/SearchBar';
import ResultsGrid from './components/ResultsGrid';
import HistoryTrending from './components/HistoryTrending';
import { Sparkles } from 'lucide-react';

function mockAggregateSearch(query) {
  const seed = query.toLowerCase();
  const base = [
    { platform: 'linkedin', username: `${seed.replace(/\s+/g, '')}`, url: `https://www.linkedin.com/in/${seed.replace(/\s+/g, '-')}` },
    { platform: 'github', username: `${seed.split(' ')[0] || seed}`, url: `https://github.com/${seed.split(' ')[0] || seed}` },
    { platform: 'twitter', username: `${seed.replace(/\s+/g, '')}`, url: `https://x.com/${seed.replace(/\s+/g, '')}` },
    { platform: 'web', username: seed, url: `https://www.google.com/search?q=${encodeURIComponent(seed)}` },
  ];
  return base.map((b) => ({ ...b, bio: 'Public profile preview', avatar: undefined }));
}

function aiEnrich(results) {
  if (!results || results.length === 0) return '';
  const platforms = Array.from(new Set(results.map((r) => r.platform))).join(', ');
  return `Appears on ${platforms}. Activity suggests a public presence across key platforms.`;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState('');
  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem('ph_history');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const trending = useMemo(
    () => ['john doe', 'elon musk', 'sundar pichai', 'taylor swift', 'ada lovelace', 'grace hopper'],
    []
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('ph_history', JSON.stringify(history.slice(0, 50)));
    } catch {}
  }, [history]);

  const handleSearch = async (q) => {
    // In real app, call backend aggregator using VITE_BACKEND_URL
    const res = mockAggregateSearch(q);
    setResults(res);
    setSummary(aiEnrich(res));
    setHistory((h) => [q, ...h.filter((x) => x !== q)].slice(0, 20));
  };

  return (
    <div className="min-h-screen bg-[#0c0d1e] text-white">
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-8 space-y-6 md:space-y-8">
        <Hero3D />

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} darkMode={darkMode} onToggleTheme={() => setDarkMode((v) => !v)} />
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
            Public info only. We never store personal data.
          </div>
        </div>

        {summary && (
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#2F8BE6]/20 via-transparent to-transparent p-4 flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-[#9fd0ff]" />
            </div>
            <p className="text-sm text-white/90">
              AI Summary: {summary}
            </p>
          </div>
        )}

        <ResultsGrid results={results} />

        <HistoryTrending history={history} trending={trending} onSelect={(q) => handleSearch(q)} />

        <footer className="pt-8 text-center text-xs text-white/60">
          DeepSearch AI • Ethical People Search • All information shown is publicly available.
        </footer>
      </div>
    </div>
  );
}
