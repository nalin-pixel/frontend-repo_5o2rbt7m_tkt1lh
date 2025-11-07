import React from 'react';
import { ExternalLink, Link as LinkIcon, User } from 'lucide-react';

const platformBrand = {
  linkedin: { name: 'LinkedIn', color: '#0A66C2' },
  twitter: { name: 'X (Twitter)', color: '#111111' },
  facebook: { name: 'Facebook', color: '#1877F2' },
  instagram: { name: 'Instagram', color: '#E1306C' },
  tiktok: { name: 'TikTok', color: '#010101' },
  youtube: { name: 'YouTube', color: '#FF0000' },
  github: { name: 'GitHub', color: '#24292E' },
  web: { name: 'Website', color: '#2F8BE6' },
};

export default function ResultsGrid({ results }) {
  if (!results || results.length === 0) {
    return (
      <div className="text-center text-white/70 text-sm md:text-base">
        No results yet. Start by searching for a name, email, phone, or username.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {results.map((r, idx) => {
        const brand = platformBrand[r.platform] || { name: r.platform, color: '#2F8BE6' };
        return (
          <a
            key={idx}
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="group relative rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors overflow-hidden"
          >
            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                {r.avatar ? (
                  <img src={r.avatar} alt={r.username || r.name || 'avatar'} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-white/70" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-white truncate">{r.username || r.name || 'Unknown'}</span>
                  <span className="text-white/60">•</span>
                  <span className="text-white/80" style={{ color: brand.color }}>{brand.name}</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-white/60 truncate">
                  <LinkIcon className="w-3.5 h-3.5" />
                  {r.url}
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white" />
            </div>
            {r.bio && (
              <div className="px-4 pb-4 text-xs text-white/70 line-clamp-2">{r.bio}</div>
            )}
          </a>
        );
      })}
    </div>
  );
}
