import React, { useState } from 'react';
import { Play, Copy, Check, ArrowDownUp, RotateCcw, AlertCircle, Sparkles, Loader2 } from 'lucide-react';

export default function CipherLayout({
  cipherName,
  tagline,
  text,
  setText,
  operation,
  setOperation,
  paramControls,
  onProcess,
  result,
  isLoading,
  error,
  encodeMode = false, // if true, uses Encode/Decode labels instead of Encrypt/Decrypt
  sampleText = 'Hello, World!',
  metadata = null,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    if (result) {
      setText(result);
      // Toggle operation if applicable
      if (encodeMode) {
        setOperation(operation === 'encode' ? 'decode' : 'encode');
      } else {
        setOperation(operation === 'encrypt' ? 'decrypt' : 'encrypt');
      }
    }
  };

  const handleLoadSample = () => {
    setText(sampleText);
  };

  const handleClear = () => {
    setText('');
  };

  const encryptLabel = encodeMode ? 'Encode' : 'Encrypt';
  const decryptLabel = encodeMode ? 'Decode' : 'Decrypt';
  const encryptVal = encodeMode ? 'encode' : 'encrypt';
  const decryptVal = encodeMode ? 'decode' : 'decrypt';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
      {/* Title & Operation Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
            <span>{cipherName}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">{tagline}</p>
        </div>

        {/* Operation segmented switch */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 w-fit self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setOperation(encryptVal)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
              operation === encryptVal
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {encryptLabel}
          </button>
          <button
            type="button"
            onClick={() => setOperation(decryptVal)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
              operation === decryptVal
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {decryptLabel}
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mt-6 p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 flex items-start space-x-3 text-xs animate-shake">
          <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
          <div className="flex-1">
            <span className="font-semibold text-rose-200">Error processing request:</span> {error}
          </div>
        </div>
      )}

      {/* Main Grid: Inputs -> Controls -> Outputs */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Input text & parameters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <span>Input Text</span>
              <span className="text-[10px] text-slate-500 font-normal">({text.length} chars)</span>
            </label>
            <div className="flex items-center space-x-2 text-[11px]">
              <button
                type="button"
                onClick={handleLoadSample}
                className="text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer flex items-center space-x-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Sample</span>
              </button>
              {text && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-slate-400 hover:text-slate-200 hover:underline cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Enter text to ${operation}...`}
              rows={5}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-mono transition resize-y"
            />
          </div>

          {/* Custom Parameter Controls (e.g. Shift, Key, Rails) */}
          {paramControls && (
            <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl">
              {paramControls}
            </div>
          )}

          {/* Action Button */}
          <button
            type="button"
            onClick={onProcess}
            disabled={isLoading || !text.trim()}
            className="w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-indigo-500/20 active:scale-[0.99]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing with FastAPI...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Execute {cipherName}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Output & Metadata */}
        <div className="space-y-4 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <span>Processed Result</span>
              {result && (
                <span className="text-[10px] text-emerald-400 font-normal">
                  ({result.length} chars)
                </span>
              )}
            </label>

            {result && (
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleSwap}
                  title="Swap result into input and reverse operation"
                  className="flex items-center space-x-1 text-[11px] text-slate-300 hover:text-indigo-400 transition cursor-pointer px-2 py-0.5 rounded bg-slate-800 border border-slate-700"
                >
                  <ArrowDownUp className="w-3 h-3" />
                  <span>Swap & Invert</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center space-x-1 text-[11px] text-slate-300 hover:text-emerald-400 transition cursor-pointer px-2 py-0.5 rounded bg-slate-800 border border-slate-700"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="relative flex-1 min-h-[140px]">
            <textarea
              readOnly
              value={result || ''}
              placeholder="Output will appear here after execution..."
              rows={5}
              className={`w-full h-full bg-slate-950/80 border rounded-xl p-3.5 text-sm font-mono focus:outline-none transition resize-y ${
                result
                  ? 'border-emerald-500/40 text-emerald-300 shadow-inner'
                  : 'border-slate-800 text-slate-500'
              }`}
            />
          </div>

          {/* Response Metadata Card */}
          {metadata && result && (
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs space-y-1.5">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                API Response Payload
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-300 font-mono text-[11px]">
                {Object.entries(metadata).map(([key, value]) => (
                  <div key={key} className="bg-slate-900/90 px-2.5 py-1.5 rounded border border-slate-800/80">
                    <span className="text-slate-500 block text-[9px] uppercase">{key}</span>
                    <span className="text-indigo-300 truncate block">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
