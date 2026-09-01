import React, { useEffect, useState } from 'react';
import { Shield, Sparkles, GraduationCap, Lock } from 'lucide-react';

export default function SplashScreen({ onFinish, minDuration = 1800 }) {
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, minDuration / 22);

    // Trigger fade-out animation
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, minDuration);

    // Completely unmount splash after fade transition
    const unmountTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, minDuration + 600);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [minDuration, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-slate-950 text-slate-100 p-6 select-none transition-all duration-700 ease-in-out ${
        isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background ambient radial glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-2xl"></div>
      </div>

      {/* Top spacer */}
      <div className="h-4"></div>

      {/* Center Animated Cryptographic Spinner & Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md px-4">
        {/* Futuristic Multi-Ring Cryptographic Spinner */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-8">
          {/* Outer dashed spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/40 animate-[spin_8s_linear_infinite]"></div>

          {/* Middle reverse spinning gradient ring */}
          <div className="absolute inset-2 rounded-full border-2 border-t-purple-500 border-r-pink-500 border-b-transparent border-l-transparent animate-[spin_3s_linear_infinite_reverse]"></div>

          {/* Inner pulsing ring */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 border border-indigo-400/30 animate-pulse"></div>

          {/* Central Shield Icon */}
          <div className="relative z-10 h-12 w-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Shield className="w-6 h-6 text-indigo-400 animate-bounce" />
          </div>

          {/* Orbiting particles */}
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
            <div className="w-2.5 h-2.5 rounded-full bg-pink-400 shadow-sm shadow-pink-400 -top-1 left-1/2 -translate-x-1/2"></div>
          </div>
        </div>

        {/* Brand Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Cryptography Studio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent tracking-tight">
            CipherEdu
          </h1>

          {/* Educational Welcome Tagline */}
          <p className="text-sm text-slate-400 font-medium pt-1">
            Securing the Future of Cryptography Education...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 mt-8 space-y-2">
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-150 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span className="flex items-center space-x-1">
              <Lock className="w-2.5 h-2.5 text-indigo-400" />
              <span>Loading modules...</span>
            </span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Attribution */}
      <div className="relative z-10 text-center space-y-1 pb-4">
        <p className="text-xs text-slate-300 font-medium flex items-center justify-center space-x-2">
          <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Powered by <span className="text-white font-semibold">Piyumanjalee Kavindi</span> | Rajarata University</span>
        </p>
        <p className="text-[10px] text-slate-500">
          © 2026 CipherEdu • All Ciphers Initialized
        </p>
      </div>
    </div>
  );
}
