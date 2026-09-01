import React from 'react';
import { Shield, Sparkles, Wifi, WifiOff, Terminal } from 'lucide-react';

export default function Header({ isConnected, onCheckHealth }) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Shield className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                CipherEdu
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full flex items-center space-x-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>v1.0</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Interactive Cryptography & Cipher Studio</p>
          </div>
        </div>

        {/* Status indicator & links */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onCheckHealth}
            title="Click to recheck FastAPI backend connection"
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium transition border cursor-pointer hover:opacity-90 active:scale-95 bg-slate-800/80 border-slate-700"
          >
            {isConnected ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-mono">Backend Online</span>
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                <WifiOff className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-rose-400 font-mono">Backend Offline</span>
              </>
            )}
          </button>

          <a
            href="http://127.0.0.1:8000/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/50 hover:bg-slate-800 hover:text-white border border-slate-700/60 transition"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Swagger API</span>
          </a>
        </div>
      </div>
    </header>
  );
}
