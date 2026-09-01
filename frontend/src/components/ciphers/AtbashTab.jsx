import React, { useState } from 'react';
import CipherLayout from '../CipherLayout';
import InfoBanner from '../InfoBanner';
import { apiAtbash } from '../../services/api';
import { RefreshCw, ArrowRightLeft } from 'lucide-react';

const infoData = {
  title: 'Atbash Cipher',
  category: 'Reciprocal Substitution (Involution)',
  mechanism:
    'Substitutes the 1st letter of the alphabet with the 26th, the 2nd with the 25th, and so forth (A↔Z, B↔Y, C↔X, etc.). The cipher is its own inverse.',
  formula: 'E(x) = (25 - x) mod 26 (Identical for Decryption)',
  history:
    'An ancient biblical cipher originated in Hebrew script (Aleph-Taw-Bet-Shin). Used in the Book of Jeremiah to conceal the name Babel as "Sheshach".',
  security:
    'Zero key security because there is only one fixed mapping with no variable key parameter. Easily solved with a single reverse alphabet lookup table.',
};

export default function AtbashTab() {
  const [text, setText] = useState('Hello, World! 123');
  const [operation, setOperation] = useState('encrypt');
  const [result, setResult] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProcess = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await apiAtbash(text, operation);
      setResult(response.result);
      setMetadata({
        operation: response.operation,
      });
    } catch (err) {
      setError(err.message || 'Failed to execute Atbash Cipher');
    } finally {
      setIsLoading(false);
    }
  };

  const paramControls = (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
        <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-400" />
        <span>Symmetric Alphabet Mirror</span>
      </div>

      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] space-y-1">
        <div className="text-slate-400 flex justify-between">
          <span className="text-slate-500">Normal:</span>
          <span className="tracking-widest text-indigo-300">A B C D E F G ... T U V W X Y Z</span>
        </div>
        <div className="text-slate-400 flex justify-between">
          <span className="text-slate-500">Mirror:</span>
          <span className="tracking-widest text-cyan-300">Z Y X W V U T ... G F E D C B A</span>
        </div>
      </div>
      <p className="text-[10px] text-slate-400 italic">
        *Atbash has no key input because encryption and decryption share the exact same reciprocal mapping.
      </p>
    </div>
  );

  return (
    <div>
      <InfoBanner info={infoData} />
      <CipherLayout
        cipherName="Atbash Cipher"
        tagline="Monoalphabetic reverse alphabet mapping"
        text={text}
        setText={setText}
        operation={operation}
        setOperation={setOperation}
        paramControls={paramControls}
        onProcess={handleProcess}
        result={result}
        isLoading={isLoading}
        error={error}
        sampleText="SHESHACH BABEL MYSTERY"
        metadata={metadata}
      />
    </div>
  );
}
