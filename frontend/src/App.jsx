import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import CaesarTab from './components/ciphers/CaesarTab';
import VigenereTab from './components/ciphers/VigenereTab';
import AtbashTab from './components/ciphers/AtbashTab';
import Base64Tab from './components/ciphers/Base64Tab';
import RailFenceTab from './components/ciphers/RailFenceTab';
import { checkBackendHealth } from './services/api';
import { KeyRound, FileCode2, ArrowRightLeft, Binary, GitFork, ShieldCheck } from 'lucide-react';

const CIPHERS = [
  {
    id: 'caesar',
    name: 'Caesar Cipher',
    shortDesc: 'Shift Substitution',
    icon: KeyRound,
    color: 'from-blue-500 to-indigo-500',
    borderActive: 'border-indigo-500 text-indigo-400 bg-indigo-500/10',
  },
  {
    id: 'vigenere',
    name: 'Vigenère Cipher',
    shortDesc: 'Keyword Polyalphabetic',
    icon: FileCode2,
    color: 'from-indigo-500 to-purple-500',
    borderActive: 'border-purple-500 text-purple-400 bg-purple-500/10',
  },
  {
    id: 'atbash',
    name: 'Atbash Cipher',
    shortDesc: 'Alphabet Mirror',
    icon: ArrowRightLeft,
    color: 'from-cyan-500 to-blue-500',
    borderActive: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
  },
  {
    id: 'base64',
    name: 'Base64 Encoding',
    shortDesc: 'Radix-64 Representation',
    icon: Binary,
    color: 'from-amber-500 to-orange-500',
    borderActive: 'border-amber-500 text-amber-400 bg-amber-500/10',
  },
  {
    id: 'railfence',
    name: 'Rail Fence Cipher',
    shortDesc: 'Zig-Zag Transposition',
    icon: GitFork,
    color: 'from-emerald-500 to-teal-500',
    borderActive: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('caesar');
  const [backendOnline, setBackendOnline] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const verifyHealth = async () => {
    const isUp = await checkBackendHealth();
    setBackendOnline(isUp);
  };

  useEffect(() => {
    verifyHealth();
    const interval = setInterval(verifyHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Animated Fullscreen Splash Loading Screen */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Header */}
      <Header isConnected={backendOnline} onCheckHealth={verifyHealth} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs (Desktop & Tablet) */}
        <div className="hidden sm:grid sm:grid-cols-5 gap-3">
          {CIPHERS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? `${tab.borderActive} shadow-lg shadow-indigo-500/10 scale-[1.02]`
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      isActive ? 'bg-indigo-500/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                  )}
                </div>
                <span className="font-semibold text-xs text-slate-100">{tab.name}</span>
                <span className="text-[10px] text-slate-400 line-clamp-1">{tab.shortDesc}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Dropdown Navigation */}
        <div className="sm:hidden">
          <label htmlFor="cipher-select" className="block text-xs font-semibold text-slate-400 mb-2">
            SELECT CIPHER METHOD:
          </label>
          <div className="relative">
            <select
              id="cipher-select"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {CIPHERS.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.name} - {tab.shortDesc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Tab View */}
        <div className="transition-all duration-300">
          {activeTab === 'caesar' && <CaesarTab />}
          {activeTab === 'vigenere' && <VigenereTab />}
          {activeTab === 'atbash' && <AtbashTab />}
          {activeTab === 'base64' && <Base64Tab />}
          {activeTab === 'railfence' && <RailFenceTab />}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
