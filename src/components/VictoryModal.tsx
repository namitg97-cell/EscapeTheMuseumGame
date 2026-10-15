import React from 'react';
import { Trophy, Clock, Key, RotateCcw, Award, Check } from 'lucide-react';
import { sound } from '../audio';

interface VictoryModalProps {
  timeTaken: number;
  hintsUsed: number;
  onRestart: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  timeTaken,
  hintsUsed,
  onRestart,
}) => {
  const getRank = () => {
    if (hintsUsed === 0 && timeTaken <= 45) return 'Quantum Prodigy (Flawless & Blazing)';
    if (hintsUsed === 0) return 'Grand Cryptographer (Zero Hints)';
    if (hintsUsed <= 2) return 'Senior Algorithmic Detective';
    return 'Resilient AI Museum Escapist';
  };

  const handleRestart = () => {
    sound.playClick();
    onRestart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-fade-in text-slate-100 select-none">
      <div className="relative max-w-xl w-full bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.3)] flex flex-col items-center text-center animate-scale-up">
        
        {/* Glow Crown Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(16,185,129,0.5)]">
          <Trophy className="w-10 h-10 text-emerald-300" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-widest mb-2">
          <span>Exit Blast Doors Released</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase mb-2">
          You Escaped The Museum!
        </h2>

        <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
          Through rapid sequence deduction, curator truth verification, and cipher decryption, you bypassed the museum containment protocol before total lockdown!
        </p>

        {/* Escape Stats Grid */}
        <div className="grid grid-cols-2 gap-3 w-full mb-6">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center">
            <Clock className="w-5 h-5 text-amber-400 mb-1" />
            <span className="text-xs font-mono uppercase text-slate-400">Escape Time</span>
            <span className="text-2xl font-bold font-mono text-white tabular-nums">
              {timeTaken}s
            </span>
            <span className="text-[10px] text-slate-500 font-mono">out of 90s</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center">
            <Key className="w-5 h-5 text-cyan-400 mb-1" />
            <span className="text-xs font-mono uppercase text-slate-400">Hints Used</span>
            <span className="text-2xl font-bold font-mono text-white tabular-nums">
              {hintsUsed}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">clues consulted</span>
          </div>
        </div>

        {/* Assigned Rank */}
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/40 to-emerald-950/40 border border-emerald-500/30 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 text-left">
            <Award className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 block">
                Official Museum Rating
              </span>
              <span className="text-sm font-bold text-white">
                {getRank()}
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-300 px-2.5 py-1 rounded bg-emerald-900/40 border border-emerald-700/50">
            PASSED
          </span>
        </div>

        {/* Solved Exhibits Recap */}
        <div className="w-full bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 mb-6 text-left text-xs font-mono text-slate-400 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Room 1: Neural Sequence
            </span>
            <span className="text-cyan-400 font-bold">127</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Room 2: Synthetic Truth
            </span>
            <span className="text-amber-400 font-bold">ALGORITHM</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Room 3: Caesar Vault
            </span>
            <span className="text-emerald-400 font-bold">ESCAPE</span>
          </div>
        </div>

        {/* Restart Button */}
        <button
          onClick={handleRestart}
          autoFocus
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-base uppercase tracking-wider transition-all shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Play Again (Restart)</span>
        </button>
      </div>
    </div>
  );
};
