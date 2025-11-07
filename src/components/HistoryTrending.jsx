import React from 'react';
import { Clock, Flame } from 'lucide-react';

export default function HistoryTrending({ history, onSelect, trending }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-2 text-white/80 mb-2">
          <Clock className="w-4 h-4" /> Recent Searches
        </div>
        {history.length === 0 ? (
          <p className="text-white/60 text-sm">No recent searches yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {history.slice(0, 10).map((q, i) => (
              <button
                key={`${q}-${i}`}
                onClick={() => onSelect(q)}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-sm hover:bg-white/20 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-2 text-white/80 mb-2">
          <Flame className="w-4 h-4 text-[#2F8BE6]" /> Trending Searches
        </div>
        <div className="flex flex-wrap gap-2">
          {trending.map((q, i) => (
            <button
              key={`${q}-${i}`}
              onClick={() => onSelect(q)}
              className="px-3 py-1.5 rounded-lg bg-[#2F8BE6]/20 text-[#9fd0ff] hover:bg-[#2F8BE6]/30 transition-colors text-sm"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
