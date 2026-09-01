import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Key, Lock, AlertTriangle, Lightbulb } from 'lucide-react';

export default function InfoBanner({ info }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!info) return null;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl mb-6 transition-all duration-300">
      {/* Header Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 flex items-center justify-between text-left bg-slate-800/40 hover:bg-slate-800/70 transition border-b border-slate-800/60 cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
              <span>{info.title} - Educational Deep Dive</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                {info.category}
              </span>
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>{isOpen ? 'Collapse' : 'Expand'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Content Area */}
      {isOpen && (
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          {/* How it works */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="flex items-center space-x-2 font-semibold text-indigo-400">
              <Lightbulb className="w-4 h-4" />
              <span>How It Works</span>
            </div>
            <p className="leading-relaxed text-slate-300">{info.mechanism}</p>
            {info.formula && (
              <div className="mt-2 p-2 bg-slate-900 rounded font-mono text-[11px] text-emerald-400 border border-slate-800">
                {info.formula}
              </div>
            )}
          </div>

          {/* History */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="flex items-center space-x-2 font-semibold text-purple-400">
              <Key className="w-4 h-4" />
              <span>History & Origin</span>
            </div>
            <p className="leading-relaxed text-slate-300">{info.history}</p>
          </div>

          {/* Security & Vulnerability */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="flex items-center space-x-2 font-semibold text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Cryptanalysis & Flaws</span>
            </div>
            <p className="leading-relaxed text-slate-300">{info.security}</p>
          </div>
        </div>
      )}
    </div>
  );
}
