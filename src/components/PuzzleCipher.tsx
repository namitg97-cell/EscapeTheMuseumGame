import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, AlertTriangle, Key, Send, HelpCircle, Sliders, ArrowLeftRight } from 'lucide-react';
import { RoomConfig } from '../types';
import { sound } from '../audio';

interface PuzzleCipherProps {
  room: RoomConfig;
  onSubmitAnswer: (input: string) => boolean;
  onOpenClue: () => void;
  unlockedClues: number;
}

const CIPHERTEXT = 'HVFDSH';
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const PuzzleCipher: React.FC<PuzzleCipherProps> = ({
  room,
  onSubmitAnswer,
  onOpenClue,
  unlockedClues,
}) => {
  const [answerInput, setAnswerInput] = useState('');
  const [activeShift, setActiveShift] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Compute live shifted characters based on activeShift
  const decodeCharWithShift = (char: string, shift: number) => {
    const idx = ALPHABET.indexOf(char);
    if (idx === -1) return char;
    // shift can be negative or positive
    const newIdx = (idx + shift + 26) % 26;
    return ALPHABET[newIdx];
  };

  const previewDecrypted = CIPHERTEXT.split('').map((c) => decodeCharWithShift(c, activeShift)).join('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!answerInput.trim()) return;

    sound.playClick();
    const isCorrect = onSubmitAnswer(answerInput.trim());

    if (isCorrect) {
      setFeedback({
        type: 'success',
        message: 'Master override accepted! Quantum iris releasing. Freedom achieved!',
      });
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setFeedback({
        type: 'error',
        message: 'Invalid override password. Ensure you reverse the +3 forward shift (H minus 3 letters is E).',
      });
    }
  };

  const handleApplyShiftedToInput = () => {
    sound.playKeyStroke();
    setAnswerInput(previewDecrypted);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-6 text-slate-100 p-4 sm:p-6 animate-fade-in">
      
      {/* Exhibit Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-xl">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-1">
            {room.subtitle} · Exhibit #03 (Final Vault Door)
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {room.exhibitName}
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {room.lore}
          </p>
        </div>

        <button
          onClick={onOpenClue}
          className="shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
        >
          <Key className="w-4 h-4" />
          <span>Need Clue? ({unlockedClues} unlocked)</span>
        </button>
      </div>

      {/* Main Vault Interface */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 shadow-2xl flex flex-col items-center">
        
        {/* Terminal Header */}
        <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
          <span className="text-xs font-mono text-emerald-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            QUANTUM IRIS OVERRIDE CONSOLE · CAESAR CIPHER LOCKED
          </span>
          <span className="text-xs font-mono text-slate-400">SHIFT: -3 REVERSE</span>
        </div>

        {/* Encrypted Code Displays */}
        <div className="flex flex-col items-center mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
            Encrypted Lockdown Signal:
          </span>
          <div className="flex items-center gap-2 sm:gap-3">
            {CIPHERTEXT.split('').map((letter, idx) => (
              <div
                key={idx}
                className="w-12 h-14 sm:w-16 sm:h-18 rounded-xl bg-slate-950 border-2 border-emerald-500/60 flex flex-col items-center justify-center font-mono shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                <span className="text-xl sm:text-2xl font-black text-emerald-400">{letter}</span>
                <span className="text-[9px] font-mono text-slate-500">
                  {decodeCharWithShift(letter, activeShift)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Cipher Wheel / Slider Tool */}
        <div className="w-full max-w-lg bg-slate-950/80 p-4 rounded-xl border border-slate-800 mb-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              INTERACTIVE CAESAR DECODER SLIDER
            </span>
            <span className="text-xs font-mono text-amber-300 font-semibold">
              Current Offset: {activeShift > 0 ? `+${activeShift}` : activeShift}
            </span>
          </div>

          {/* Slider input */}
          <input
            type="range"
            min="-5"
            max="5"
            value={activeShift}
            onChange={(e) => {
              sound.playClick();
              setActiveShift(parseInt(e.target.value, 10));
            }}
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>-5 (Back 5)</span>
            <span className={activeShift === -3 ? 'text-emerald-400 font-bold' : ''}>-3 (Reverse Shift)</span>
            <span>0 (None)</span>
            <span>+3 (Forward)</span>
            <span>+5 (Fwd 5)</span>
          </div>

          {/* Quick Decoder Action */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span className="text-xs font-mono text-slate-400">
              Decoded with offset ({activeShift}):{' '}
              <strong className="text-emerald-300 font-bold text-sm tracking-widest">
                {previewDecrypted}
              </strong>
            </span>
            <button
              type="button"
              onClick={handleApplyShiftedToInput}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors cursor-pointer"
            >
              <ArrowLeftRight className="w-3 h-3" />
              <span>Use in Input</span>
            </button>
          </div>
        </div>

        {/* Input Form & Controls */}
        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-md flex flex-col gap-4 ${isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}
        >
          <div className="flex items-stretch gap-2">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={answerInput}
                onChange={(e) => {
                  sound.playKeyStroke();
                  setAnswerInput(e.target.value.toUpperCase());
                  if (feedback.type) setFeedback({ type: null, message: '' });
                }}
                placeholder="Enter decrypted word..."
                aria-label="Decrypted release code"
                className="w-full h-13 px-4 rounded-xl bg-slate-950 border-2 border-slate-700 focus:border-emerald-400 focus:outline-none text-xl font-mono font-bold text-center text-white tracking-widest placeholder:text-slate-600 uppercase shadow-inner"
              />
              {answerInput && (
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setAnswerInput('');
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!answerInput.trim()}
              className="h-13 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shrink-0"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>Submit Answer</span>
            </button>
          </div>
        </form>

        {/* Immediate Feedback Banner */}
        {feedback.type && (
          <div
            className={`w-full max-w-md mt-4 p-3.5 rounded-xl border flex items-start gap-3 text-sm transition-all animate-fade-in ${
              feedback.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                : 'bg-red-950/60 border-red-500/60 text-red-200'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <span className="font-semibold block">
                {feedback.type === 'success' ? 'ACCESS GRANTED' : 'CIPHER REJECTED'}
              </span>
              <span className="text-xs leading-relaxed opacity-90">{feedback.message}</span>
            </div>
          </div>
        )}
      </div>

      {/* Helpful Guide Note */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2 font-mono">
        <span className="flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          Tip: Set the slider to -3 to invert the forward cipher.
        </span>
        <span>Goal: Solve Room 3 to escape the museum!</span>
      </div>
    </div>
  );
};
