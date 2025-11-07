import React from 'react';
import Spline from '@splinetool/react-spline';
import { Shield } from 'lucide-react';

export default function Hero3D() {
  return (
    <section className="relative w-full min-h-[420px] md:min-h-[520px] rounded-2xl overflow-hidden bg-[#11122A] border border-white/10">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-10 md:py-16">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs md:text-sm backdrop-blur">
          <Shield className="w-4 h-4" /> Privacy-first • Public data only
        </span>
        <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-white drop-shadow">
          DeepSearch AI — People Finder
        </h1>
        <p className="mt-3 md:mt-4 max-w-2xl text-sm md:text-base text-white/80">
          Discover publicly available profiles and digital footprints across the web with a single search.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#11122A] via-transparent to-transparent opacity-80" />
    </section>
  );
}
