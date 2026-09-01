import React, { useState } from 'react';
import CipherLayout from '../CipherLayout';
import InfoBanner from '../InfoBanner';
import { apiRailFence } from '../../services/api';
import { GitCommit, AlignJustify } from 'lucide-react';

const infoData = {
  title: 'Rail Fence Cipher',
  category: 'Transposition (Zig-Zag) Cipher',
  mechanism:
    'Writes characters in a diagonal downward and upward zigzag path across a predefined number of parallel lines (rails), then reads the letters row by row.',
  formula: 'Period = 2 * (Rails - 1)',
  history:
    'Used by ancient Greeks (scytale variation) and prominently during the American Civil War by Union soldiers to dispatch telegraphs secretly.',
  security:
    'Vulnerable to anagramming, geometric reconstruction, and brute force since the key space is bounded by the length of the message.',
};

export default function RailFenceTab() {
  const [text, setText] = useState('WE ARE DISCOVERED FLEE AT ONCE');
  const [rails, setRails] = useState(3);
  const [operation, setOperation] = useState('encrypt');
  const [result, setResult] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProcess = async () => {
    if (rails < 2) {
      setError('Number of rails must be at least 2.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const response = await apiRailFence(text, rails, operation);
      setResult(response.result);
      setMetadata({
        rails: response.rails,
        operation: response.operation,
      });
    } catch (err) {
      setError(err.message || 'Failed to execute Rail Fence Cipher');
    } finally {
      setIsLoading(false);
    }
  };

  const paramControls = (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
        <label htmlFor="rails-input" className="flex items-center space-x-1.5">
          <AlignJustify className="w-3.5 h-3.5 text-emerald-400" />
          <span>Number of Rails (Depth)</span>
        </label>
        <span className="font-mono text-emerald-400 text-sm bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
          {rails} Rails
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <input
          id="rails-range"
          type="range"
          min="2"
          max="10"
          value={rails}
          onChange={(e) => setRails(Number(e.target.value))}
          className="flex-1 accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
        />
        <input
          id="rails-input"
          type="number"
          min="2"
          max="10"
          value={rails}
          onChange={(e) => setRails(Number(e.target.value))}
          className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-center font-mono text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Visual Zig-Zag Depth representation */}
      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>Zig-Zag Cycle:</span>
        <span className="text-emerald-300">2 × ({rails} - 1) = {2 * (rails - 1)} chars</span>
      </div>

      {/* Presets */}
      <div className="flex items-center space-x-2 pt-1">
        <span className="text-[10px] text-slate-500 font-medium">Presets:</span>
        {[2, 3, 4, 5].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRails(r)}
            className={`text-[10px] px-2.5 py-0.5 rounded border transition cursor-pointer ${
              rails === r
                ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            {r} Rails
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <InfoBanner info={infoData} />
      <CipherLayout
        cipherName="Rail Fence Cipher"
        tagline="Transposition zigzag rail depth permutation"
        text={text}
        setText={setText}
        operation={operation}
        setOperation={setOperation}
        paramControls={paramControls}
        onProcess={handleProcess}
        result={result}
        isLoading={isLoading}
        error={error}
        sampleText="DEFEND THE EAST WALL OF THE CASTLE"
        metadata={metadata}
      />
    </div>
  );
}
