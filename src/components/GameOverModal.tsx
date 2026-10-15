import React, { useState } from 'react';
import { Skull, RotateCcw, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { ROOMS } from '../puzzleData';
import { sound } from '../audio';

interface GameOverModalProps {
  failedRoomId: number;
  hintsUsed: number;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  failedRoomId,
  hintsUsed,
  onRestart,
}) => {
  const [showSolutions, setShowSolutions] = useState(false);

  const handleRestart = () => {
    sound.playClick();
    onRestart();
  };

  const failedRoom = ROOMS.find((r) => r.id === failedRoomId) || ROOMS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-xl animate-fade-in text-slate-100 select-none">
      <div className="relative max-w-xl w-full bg-slate-900 border-2 border-red-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(239,68,68,0.3)] flex flex-col items-center text-center animate-scale-up">
        
        {/* Lockdown Skull / Alarm Icon */}
        <div className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(239,68,68,0.5)]">
          <Skull className="w-10 h-10 text-red-400" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono uppercase tracking-widest mb-2">
          <span>Containment Lockdown Active</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase mb-2">
          Time Has Run Out!
        </h2>

        <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
          The 90-second emergency window lapsed. The museum blast doors have engaged magnetic lockdown. You were trapped in{' '}
          <strong className="text-amber-400 font-semibold">{failedRoom.title}</strong>.
        </p>

        {/* Stats strip */}
        <div className="w-full grid grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
            <span className="text-[10px] uppercase font-mono text-slate-400">Progression</span>
            <span className="text-xl font-bold font-mono text-red-400">
              Room {failedRoomId} / 3
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
            <span className="text-[10px] uppercase font-mono text-slate-400">Hints Consulted</span>
            <span className="text-xl font-bold font-mono text-slate-200">
              {hintsUsed}
            </span>
          </div>
        </div>

        {/* Reveal Solutions Toggle */}
        <div className="w-full mb-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setShowSolutions(!showSolutions);
            }}
            className="w-full py-2 px-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {showSolutions ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-amber-400" />}
            <span>{showSolutions ? 'Hide Museum Solutions' : 'Inspect Room Solutions'}</span>
          </button>

          {showSolutions && (
            <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs font-mono space-y-2.5 animate-fade-in">
              {ROOMS.map((r) => (
                <div key={r.id} className="border-b border-slate-800/80 pb-2 last:border-0 last:pb-0">
                  <div className="text-slate-300 font-bold">{r.title}:</div>
                  <div className="text-amber-300 font-semibold mt-0.5">Answer: {r.answer[0]}</div>
                  <div className="text-slate-400 text-[11px] leading-relaxed mt-0.5 font-sans">
                    {r.solutionExplanation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Restart Action */}
        <button
          onClick={handleRestart}
          autoFocus
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-base uppercase tracking-wider transition-all shadow-lg hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Try Again (Restart 90s)</span>
        </button>
      </div>
    </div>
  );
};
