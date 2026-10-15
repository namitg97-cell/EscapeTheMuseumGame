import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, Key, Send, Calculator, HelpCircle } from 'lucide-react';
import { RoomConfig } from '../types';
import { sound } from '../audio';

interface PuzzleSequencesProps {
  room: RoomConfig;
  onSubmitAnswer: (input: string) => boolean;
  onOpenClue: () => void;
  unlockedClues: number;
}

export const PuzzleSequences: React.FC<PuzzleSequencesProps> = ({
  room,
  onSubmitAnswer,
  onOpenClue,
  unlockedClues,
}) => {
  const [answerInput, setAnswerInput] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });
  const [showDifferenceTool, setShowDifferenceTool] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!answerInput.trim()) return;

    sound.playClick();
    const isCorrect = onSubmitAnswer(answerInput.trim());

    if (isCorrect) {
      setFeedback({
        type: 'success',
        message: 'Harmonic frequency matched! Neural sequence validated. Door 1 disengaged!',
      });
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setFeedback({
        type: 'error',
        message: 'Incorrect harmonic value. The sequence formula rejected your input. Try examining the growth between terms.',
      });
    }
  };

  const handleQuickKey = (num: string) => {
    sound.playKeyStroke();
    setAnswerInput((prev) => prev + num);
    inputRef.current?.focus();
  };

  const handleBackspace = () => {
    sound.playKeyStroke();
    setAnswerInput((prev) => prev.slice(0, -1));
    inputRef.current?.focus();
  };

  const handleClear = () => {
    sound.playClick();
    setAnswerInput('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-6 text-slate-100 p-4 sm:p-6 animate-fade-in">
      
      {/* Exhibit Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-xl">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-1">
            {room.subtitle} · Exhibit #01
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {room.exhibitName}
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {room.lore}
          </p>
        </div>

        {/* Clue Quick Button */}
        <button
          onClick={onOpenClue}
          className="shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
        >
          <Key className="w-4 h-4" />
          <span>Need Clue? ({unlockedClues} unlocked)</span>
        </button>
      </div>

      {/* Main Interactive Sequence Board */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 shadow-2xl flex flex-col items-center">
        
        {/* Security Terminal Prompt */}
        <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
          <span className="text-xs font-mono text-cyan-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            SYNAPSE HARMONIC RECEPTOR ONLINE
          </span>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setShowDifferenceTool(!showDifferenceTool);
            }}
            className="text-xs font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>{showDifferenceTool ? 'Hide Interval Arcs' : 'Show Interval Arcs'}</span>
          </button>
        </div>

        {/* Floating Illuminated Sequence Nodes */}
        <div className="w-full py-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 my-2">
          {[
            { val: 3, diff: null },
            { val: 7, diff: '+4' },
            { val: 15, diff: '+8' },
            { val: 31, diff: '+16' },
            { val: 63, diff: '+32' },
            { val: '?', diff: '+64', isTarget: true },
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && (
                <div className="flex flex-col items-center justify-center px-1">
                  {showDifferenceTool && (
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30 mb-1 animate-pulse">
                      {item.diff}
                    </span>
                  )}
                  <ArrowRight className="w-4 h-4 text-cyan-500/60" />
                </div>
              )}

              <div
                className={`relative flex items-center justify-center w-14 h-14 sm:w-18 sm:h-18 rounded-2xl font-mono text-lg sm:text-2xl font-bold transition-all ${
                  item.isTarget
                    ? 'bg-gradient-to-br from-amber-500/25 to-orange-500/20 border-2 border-dashed border-amber-400 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-105'
                    : 'bg-slate-950 border border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                }`}
              >
                {item.val}
                <div className="absolute -bottom-2 text-[9px] font-mono text-slate-500 uppercase">
                  Node 0{idx + 1}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Formula Hint / Pattern Clue */}
        <div className="text-center mt-6 mb-4 max-w-md">
          <p className="text-xs sm:text-sm text-slate-300">
            Deduce the next number in the synaptic sequence to unlock the magnetic blast gate.
          </p>
        </div>

        {/* Input Form & Controls */}
        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-md flex flex-col gap-4 mt-2 ${isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}
        >
          <div className="flex items-stretch gap-2">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                value={answerInput}
                onChange={(e) => {
                  sound.playKeyStroke();
                  setAnswerInput(e.target.value);
                  if (feedback.type) setFeedback({ type: null, message: '' });
                }}
                placeholder="Enter missing number..."
                aria-label="Missing sequence number answer"
                className="w-full h-13 px-4 rounded-xl bg-slate-950 border-2 border-slate-700 focus:border-cyan-400 focus:outline-none text-xl font-mono font-bold text-center text-white tracking-widest placeholder:text-slate-600 shadow-inner"
              />
              {answerInput && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!answerInput.trim()}
              className="h-13 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shrink-0"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>Submit Answer</span>
            </button>
          </div>

          {/* Quick On-Screen Number Pad for effortless mouse/touch play */}
          <div className="grid grid-cols-6 gap-1.5 pt-2 border-t border-slate-800/80">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleQuickKey(digit)}
                className="py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white font-mono text-base font-semibold transition-colors cursor-pointer"
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              onClick={handleBackspace}
              className="col-span-2 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              ⌫ Del
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
                {feedback.type === 'success' ? 'ACCESS CONFIRMED' : 'REJECTED: SYNAPSE MISMATCH'}
              </span>
              <span className="text-xs leading-relaxed opacity-90">{feedback.message}</span>
            </div>
          </div>
        )}
      </div>

      {/* Helpful Guide Note */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2 font-mono">
        <span className="flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          Tip: Notice how 3 * 2 + 1 = 7, 7 * 2 + 1 = 15...
        </span>
        <span>Goal: Solve Room 1 to open Room 2</span>
      </div>
    </div>
  );
};
