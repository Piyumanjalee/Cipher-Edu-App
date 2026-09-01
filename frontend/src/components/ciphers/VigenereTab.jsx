import React, { useState } from 'react';
import CipherLayout from '../CipherLayout';
import InfoBanner from '../InfoBanner';
import { apiVigenere } from '../../services/api';
import { Key, AlertCircle } from 'lucide-react';

const infoData = {
  title: 'Vigenère Cipher',
  category: 'Polyalphabetic Substitution',
  mechanism:
    'Uses an alphabetic keyword to shift letters cyclically. Each letter of the key determines a distinct Caesar shift for the corresponding plaintext letter.',
  formula: 'C_i = (P_i + K_(i mod m)) mod 26',
  history:
    'Invented by Giovan Battista Bellaso in 1553, though later misattributed to Blaise de Vigenère in the 19th century. Remained unbroken for nearly 3 centuries, nicknamed "le chiffre indéchiffrable".',
  security:
    'Resistant to simple single-letter frequency analysis, but vulnerable to Kasiski examination and Friedman test to determine key length, followed by polyalphabetic cracking.',
};

export default function VigenereTab() {
  const [text, setText] = useState('ATTACK AT DAWN!');
  const [keyword, setKeyword] = useState('LEMON');
  const [operation, setOperation] = useState('encrypt');
  const [result, setResult] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const hasValidLetters = /[a-zA-Z]/.test(keyword);

  const handleProcess = async () => {
    if (!hasValidLetters) {
      setError('Keyword must contain at least one alphabetic letter.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const response = await apiVigenere(text, keyword, operation);
      setResult(response.result);
      setMetadata({
        keyword: response.keyword,
        operation: response.operation,
      });
    } catch (err) {
      setError(err.message || 'Failed to execute Vigenère Cipher');
    } finally {
      setIsLoading(false);
    }
  };

  const paramControls = (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
        <label htmlFor="keyword-input" className="flex items-center space-x-1.5">
          <Key className="w-3.5 h-3.5 text-purple-400" />
          <span>Keyword Key</span>
        </label>
        <span className="font-mono text-purple-400 text-xs bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
          Length: {keyword.replace(/[^a-zA-Z]/g, '').length}
        </span>
      </div>

      <div>
        <input
          id="keyword-input"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="e.g. SECRET or KEYWORD"
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 font-mono text-xs text-white uppercase focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
      </div>

      {!hasValidLetters && (
        <div className="text-[11px] text-amber-400 flex items-center space-x-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Keyword must contain at least one letter (A-Z)</span>
        </div>
      )}

      {/* Keyword Presets */}
      <div className="flex items-center space-x-2 pt-1">
        <span className="text-[10px] text-slate-500 font-medium">Presets:</span>
        {['LEMON', 'CIPHER', 'SECRET', 'CRYPTO'].map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKeyword(k)}
            className={`text-[10px] px-2 py-0.5 rounded border transition cursor-pointer ${
              keyword.toUpperCase() === k
                ? 'bg-purple-600/30 text-purple-300 border-purple-500/50'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <InfoBanner info={infoData} />
      <CipherLayout
        cipherName="Vigenère Cipher"
        tagline="Polyalphabetic repeated-keyword substitution"
        text={text}
        setText={setText}
        operation={operation}
        setOperation={setOperation}
        paramControls={paramControls}
        onProcess={handleProcess}
        result={result}
        isLoading={isLoading}
        error={error}
        sampleText="CRYPTO IS THE FUTURE"
        metadata={metadata}
      />
    </div>
  );
}
