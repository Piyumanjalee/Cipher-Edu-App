import React from 'react';
import { Heart, GraduationCap, ExternalLink } from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 py-8 text-xs text-slate-400 mt-auto backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Column: Copyright & Developer Info */}
          <div className="text-center md:text-left space-y-1.5">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 text-slate-300 font-medium text-sm">
              <span>© 2026</span>
              <span className="font-bold text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                CipherEdu
              </span>
              <span>• Developed with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block animate-pulse" />
              <span>by</span>
              <span className="font-semibold text-slate-100">Piyumanjalee Kavindi</span>
            </div>

            {/* Academic background */}
            <div className="flex items-center justify-center md:justify-start space-x-2 text-xs text-slate-400">
              <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Final-year IT Undergraduate at Rajarata University</span>
            </div>
          </div>

          {/* Right Column: Social & Professional Links */}
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/Piyumanjalee"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800/80 transition-all duration-200 active:scale-95 shadow-sm group"
            >
              <GithubIcon className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
              <span className="font-medium text-xs">GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition" />
            </a>

            <a
              href="https://www.linkedin.com/in/piyumanjalee-kavindi-senadheera/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-950/30 transition-all duration-200 active:scale-95 shadow-sm group"
            >
              <LinkedinIcon className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition" />
              <span className="font-medium text-xs">LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
