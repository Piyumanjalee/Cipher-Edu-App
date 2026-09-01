import React, { useState } from 'react';
import CipherLayout from '../CipherLayout';
import InfoBanner from '../InfoBanner';
import { apiCaesar } from '../../services/api';
import { Sliders, Hash } from 'lucide-react';

const infoData = {
  title: 'Caesar Cipher',
  category: 'Monoalphabetic Substitution',
  mechanism:
    'Shifts each letter in the plaintext forward or backward by a fixed integer key (N positions) along the 26-letter Latin alphabet.',
  formula: 'E(x) = (x + k) mod 26 | D(x) = (x - k) mod 26',
  history:
    'Attributed to Julius Caesar around 58 BC, who utilized a shift of 3 to protect military correspondences across the Roman Republic.',
  security:
    'Extremely trivial to break today via brute-force attack (only 25 non-trivial keys) or English letter frequency analysis (checking for peak at letter E).',
};

export default function CaesarTab() {
  const [text, setText] = useState('Hello, World! Welcome to Cryptography.');
  const [shift, setShift] = useState(3);
  const [operation, setOperation] = useState('encrypt');
  const [result, setResult] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProcess = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await apiCaesar(text, shift, operation);
      setResult(response.result);
      setMetadata({
        shift: response.shift,
        operation: response.operation,
      });
    } catch (err) {
      setError(err.message || 'Failed to execute Caesar Cipher');
    } finally {
      setIsLoading(false);
    }
  };

  const paramControls = (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
        <label htmlFor="shift-input" className="flex items-center space-x-1.5">
          <Sliders className="w-3.5 h-3.5 text-indigo-400" />
          <span>Shift Value (Key)</span>
        </label>
        <span className="font-mono text-indigo-400 text-sm bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
          {shift}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <input
          id="shift-range"
          type="range"
          min="1"
          max="25"
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          className="flex-1 accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
        />
        <input
          id="shift-input"
          type="number"
          min="1"
          max="25"
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-center font-mono text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Quick Presets */}
      <div className="flex items-center space-x-2 pt-1">
        <span className="text-[10px] text-slate-500 font-medium">Presets:</span>
        {[
          { label: 'Classic (+3)', val: 3 },
          { label: 'ROT13 (+13)', val: 13 },
          { label: 'Shift (+5)', val: 5 },
          { label: 'Shift (+7)', val: 7 },
        ].map((p) => (
          <button
            key={p.val}
            type="button"
            onClick={() => setShift(p.val)}
            className={`text-[10px] px-2 py-0.5 rounded border transition cursor-pointer ${
              shift === p.val
                ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <InfoBanner info={infoData} />
      <CipherLayout
        cipherName="Caesar Cipher"
        tagline="Monoalphabetic rotational shift substitution"
        text={text}
        setText={setText}
        operation={operation}
        setOperation={setOperation}
        paramControls={paramControls}
        onProcess={handleProcess}
        result={result}
        isLoading={isLoading}
        error={error}
        sampleText="ATTACK AT DAWN!"
        metadata={metadata}
      />
    </div>
  );
}
