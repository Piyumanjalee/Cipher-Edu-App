import React, { useState } from 'react';
import CipherLayout from '../CipherLayout';
import InfoBanner from '../InfoBanner';
import { apiBase64 } from '../../services/api';
import { Binary, Database, Info } from 'lucide-react';

const infoData = {
  title: 'Base64 Encoding & Decoding',
  category: 'Binary-to-Text Encoding (Radix-64)',
  mechanism:
    'Groups binary data into 6-bit chunks and maps each chunk to one of 64 ASCII printable characters (A-Z, a-z, 0-9, +, /) with "=" padding as needed.',
  formula: '3 Bytes (24 bits) ──► 4 Base64 Chunks (6 bits each)',
  history:
    'Designed for MIME (Multipurpose Internet Mail Extensions) to allow arbitrary 8-bit binary data (like images and attachments) to traverse 7-bit ASCII transport protocols safely.',
  security:
    'Base64 is an ENCODING scheme, NOT encryption! It provides zero confidentiality because anyone can decode it instantly without a key.',
};

export default function Base64Tab() {
  const [text, setText] = useState('Welcome to Cryptography!');
  const [operation, setOperation] = useState('encode');
  const [result, setResult] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProcess = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await apiBase64(text, operation);
      setResult(response.result);
      setMetadata({
        operation: response.operation,
      });
    } catch (err) {
      setError(err.message || 'Failed to process Base64');
    } finally {
      setIsLoading(false);
    }
  };

  const paramControls = (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
        <Binary className="w-3.5 h-3.5 text-amber-400" />
        <span>Encoding Specification</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
        <div className="p-2 bg-slate-900 rounded border border-slate-800">
          <span className="text-slate-500 block text-[9px]">Character Set</span>
          <span className="text-amber-300">A-Z, a-z, 0-9, +, /</span>
        </div>
        <div className="p-2 bg-slate-900 rounded border border-slate-800">
          <span className="text-slate-500 block text-[9px]">Padding Symbol</span>
          <span className="text-amber-300">= (Zero-padded)</span>
        </div>
      </div>

      <div className="p-2 bg-amber-500/10 rounded border border-amber-500/20 text-[10px] text-amber-300 flex items-start space-x-1.5">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        <span>Base64 expands data size by ~33% due to 6-bit conversion.</span>
      </div>
    </div>
  );

  return (
    <div>
      <InfoBanner info={infoData} />
      <CipherLayout
        cipherName="Base64 Encoding"
        tagline="Binary-to-text radix-64 representation"
        text={text}
        setText={setText}
        operation={operation}
        setOperation={setOperation}
        paramControls={paramControls}
        onProcess={handleProcess}
        result={result}
        isLoading={isLoading}
        error={error}
        encodeMode={true}
        sampleText="FastAPI + React = Awesome!"
        metadata={metadata}
      />
    </div>
  );
}
