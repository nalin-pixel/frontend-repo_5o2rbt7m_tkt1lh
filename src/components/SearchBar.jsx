import React, { useState } from 'react';
import { Search, Loader2, Moon, Sun } from 'lucide-react';

export default function SearchBar({ onSearch, darkMode, onToggleTheme }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      await onSearch(query.trim());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        <div className={`flex items-center w-full rounded-xl border bg-white/5 backdrop-blur focus-within:ring-2 ${darkMode ? 'border-white/15' : 'border-black/10'} focus-within:ring-[#2F8BE6]` }>
          <Search className="w-5 h-5 mx-3 text-[#2F8BE6]" />
          <input
            aria-label="Search by name, email, phone, or username"
            className="flex-1 bg-transparent outline-none text-sm md:text-base py-3 md:py-4 pr-3 text-white placeholder:text-white/50"
            placeholder="Search by name, email, phone, or username"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="mx-2 my-1 inline-flex items-center gap-2 rounded-lg px-3 md:px-4 py-2 bg-[#2F8BE6] hover:bg-[#2b7ccc] active:scale-[0.99] text-white text-sm font-medium transition-colors"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} 
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
        <button
          type="button"
          onClick={onToggleTheme}
          className="shrink-0 rounded-xl border px-3 py-2 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors text-white"
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </form>
      <div className="mt-2 text-xs text-white/60">
        Tip: Try "john doe", "+1 415 555 2671", "jane@domain.com", or "@username"
      </div>
    </div>
  );
}
