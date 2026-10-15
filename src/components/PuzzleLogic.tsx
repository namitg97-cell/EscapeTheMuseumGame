import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, AlertTriangle, Key, Send, HelpCircle, Sparkles } from 'lucide-react';
import { RoomConfig } from '../types';
import { sound } from '../audio';

interface PuzzleLogicProps {
  room: RoomConfig;
  onSubmitAnswer: (input: string) => boolean;
  onOpenClue: () => void;
  unlockedClues: number;
}

export const PuzzleLogic: React.FC<PuzzleLogicProps> = ({
  room,
  onSubmitAnswer,
  onOpenClue,
  unlockedClues,
}) => {
  const [answerInput, setAnswerInput] = useState('');
  const [testedHypothesis, setTestedHypothesis] = useState<'ALPHA' | 'BETA' | 'GAMMA' | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });
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
        message: 'Logic verified! Curator statements resolved. Archway 2 unlocked!',
      });
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setFeedback({
        type: 'error',
        message: 'Invalid access word. Re-examine which curator is the only one telling the truth.',
      });
    }
  };

  const handleTestCurator = (curator: 'ALPHA' | 'BETA' | 'GAMMA') => {
    sound.playClick();
    setTestedHypothesis(testedHypothesis === curator ? null : curator);
  };

  const handleSelectWord = (word: string) => {
    sound.playKeyStroke();
    setAnswerInput(word);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-6 text-slate-100 p-4 sm:p-6 animate-fade-in">
      
      {/* Exhibit Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-xl">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-1">
            {room.subtitle} · Exhibit #02
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

      {/* Museum Holographic Curators Display */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 shadow-2xl flex flex-col items-center">
        
        {/* Terminal Header */}
        <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
          <span className="text-xs font-mono text-amber-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            SYNTHETIC TRUTH VERIFIER · EXACTLY 1 STATEMENT IS TRUE
          </span>
          <span className="text-xs font-mono text-slate-400">2 FALSE / 1 TRUE</span>
        </div>

        {/* The 3 Curators Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-6">
          
          {/* Curator Alpha */}
          <div
            onClick={() => handleTestCurator('ALPHA')}
            className={`p-4 rounded-xl border flex flex-col gap-2 transition-all cursor-pointer ${
              testedHypothesis === 'ALPHA'
                ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-400/30'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                CURATOR ALPHA
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                Test Hypothesis
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">Statement:</div>
            <blockquote className="text-sm font-medium text-slate-100 italic bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80">
              "The secret access word is <span className="text-amber-300 font-bold not-italic">NOT</span> ALGORITHM."
            </blockquote>
          </div>

          {/* Curator Beta */}
          <div
            onClick={() => handleTestCurator('BETA')}
            className={`p-4 rounded-xl border flex flex-col gap-2 transition-all cursor-pointer ${
              testedHypothesis === 'BETA'
                ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-400/30'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                CURATOR BETA
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                Test Hypothesis
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">Statement:</div>
            <blockquote className="text-sm font-medium text-slate-100 italic bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80">
              "The secret access word is <span className="text-amber-300 font-bold not-italic">SYNAPSE</span>."
            </blockquote>
          </div>

          {/* Curator Gamma */}
          <div
            onClick={() => handleTestCurator('GAMMA')}
            className={`p-4 rounded-xl border flex flex-col gap-2 transition-all cursor-pointer ${
              testedHypothesis === 'GAMMA'
                ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-400/30'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                CURATOR GAMMA
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                Test Hypothesis
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">Statement:</div>
            <blockquote className="text-sm font-medium text-slate-100 italic bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80">
              "Curator Beta is hallucinating and telling a <span className="text-rose-300 font-bold not-italic">LIE</span>."
            </blockquote>
          </div>
        </div>

        {/* Live Interactive Hypothesis Deduction Bar */}
        {testedHypothesis && (
          <div className="w-full mb-6 p-4 rounded-xl bg-slate-950/90 border border-amber-500/40 flex flex-col gap-2 animate-fade-in text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-mono font-bold text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>TESTING: ASSUME CURATOR {testedHypothesis} IS THE ONLY ONE TELLING THE TRUTH</span>
            </div>
            {testedHypothesis === 'ALPHA' && (
              <p className="text-slate-300 leading-relaxed font-sans">
                ⚠️ If Alpha is TRUE, then Beta and Gamma must both be FALSE. But if Gamma is FALSE, that means Beta is NOT lying (so Beta is telling the truth!).
                A statement cannot be both true and false. <span className="text-rose-400 font-semibold">Contradiction! Alpha cannot be the sole truth-teller.</span>
              </p>
            )}
            {testedHypothesis === 'BETA' && (
              <p className="text-slate-300 leading-relaxed font-sans">
                ⚠️ If Beta is TRUE, the word is SYNAPSE. But if the word is SYNAPSE, Alpha's claim ("word is not ALGORITHM") is ALSO TRUE!
                That produces TWO truthful curators. <span className="text-rose-400 font-semibold">Contradiction! Beta cannot be telling the truth.</span>
              </p>
            )}
            {testedHypothesis === 'GAMMA' && (
              <p className="text-slate-300 leading-relaxed font-sans">
                ✅ If Gamma is TRUE, Beta is LYING (the word is NOT SYNAPSE). Since only one is true, Alpha must ALSO BE LYING!
                Alpha claims: "The word is NOT ALGORITHM". Since Alpha is lying, <span className="text-emerald-400 font-bold">the secret word IS ALGORITHM!</span> Zero contradictions.
              </p>
            )}
          </div>
        )}

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
                placeholder="Enter access keyword..."
                aria-label="Access keyword"
                className="w-full h-13 px-4 rounded-xl bg-slate-950 border-2 border-slate-700 focus:border-amber-400 focus:outline-none text-lg font-mono font-bold text-center text-white tracking-widest placeholder:text-slate-600 uppercase shadow-inner"
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
              className="h-13 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shrink-0"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>Submit Answer</span>
            </button>
          </div>

          {/* Quick Word Suggestions / Clue Shortcuts */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-xs font-mono text-slate-400">Quick Fill:</span>
            {['ALGORITHM', 'SYNAPSE', 'COGNITION'].map((word) => (
              <button
                key={word}
                type="button"
                onClick={() => handleSelectWord(word)}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-mono text-xs font-medium transition-colors cursor-pointer"
              >
                {word}
              </button>
            ))}
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
                {feedback.type === 'success' ? 'LOGIC RESOLVED' : 'SYNTACTIC TRUTH REJECTED'}
              </span>
              <span className="text-xs leading-relaxed opacity-90">{feedback.message}</span>
            </div>
          </div>
        )}
      </div>

      {/* Helpful Guide Note */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2 font-mono">
        <span className="flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          Tip: Click on each curator card above to test hypotheses live.
        </span>
        <span>Goal: Solve Room 2 to open Room 3 (Final Vault)</span>
      </div>
    </div>
  );
};
