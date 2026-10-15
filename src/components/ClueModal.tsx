import React from 'react';
import { X, Key, Lightbulb, AlertCircle } from 'lucide-react';
import { RoomConfig } from '../types';
import { sound } from '../audio';

interface ClueModalProps {
  room: RoomConfig;
  isOpen: boolean;
  unlockedClueLevel: number; // 0 = none unlocked yet, 1 = clue 1 unlocked, 2 = clue 2 unlocked
  onUnlockNextClue: () => void;
  onClose: () => void;
}

export const ClueModal: React.FC<ClueModalProps> = ({
  room,
  isOpen,
  unlockedClueLevel,
  onUnlockNextClue,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleRevealClue = () => {
    sound.playClue();
    onUnlockNextClue();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-slate-900 border border-amber-500/40 rounded-2xl p-6 sm:p-7 shadow-2xl text-slate-100 flex flex-col gap-4 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
            <Key className="w-5 h-5 text-amber-400" />
            <span>Museum Archive Clue Terminal</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close clue modal"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Room Info */}
        <div className="text-xs font-mono text-slate-400">
          LOCATION: <span className="text-amber-300 font-semibold">{room.title}</span> ({room.subtitle})
        </div>

        {/* Clues list */}
        <div className="flex flex-col gap-3 my-1">
          {room.clues.map((clueText, index) => {
            const isUnlocked = index < unlockedClueLevel;
            const clueNum = index + 1;

            return (
              <div
                key={index}
                className={`p-4 rounded-xl border transition-all ${
                  isUnlocked
                    ? 'bg-amber-950/20 border-amber-500/40 text-slate-200'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold flex items-center gap-1.5 text-amber-400">
                    <Lightbulb className="w-3.5 h-3.5" />
                    CLUE #{clueNum} {isUnlocked ? 'DECRYPTED' : 'ENCRYPTED'}
                  </span>
                  {isUnlocked ? (
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-700/50 text-emerald-300">
                      Active
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      Locked
                    </span>
                  )}
                </div>

                {isUnlocked ? (
                  <p className="text-sm leading-relaxed text-amber-100/90 font-sans">
                    {clueText}
                  </p>
                ) : (
                  <p className="text-xs italic text-slate-500 font-mono">
                    [Access encrypted. Click "Reveal Clue #{clueNum}" to query museum neural archive]
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Action to unlock next clue */}
        {unlockedClueLevel < room.clues.length ? (
          <button
            onClick={handleRevealClue}
            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm tracking-wide uppercase transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <Lightbulb className="w-4 h-4 fill-current" />
            <span>Reveal Clue #{unlockedClueLevel + 1} (+1 Hint count)</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-800">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>All clues for this room have been revealed. Use this information to deduce the answer!</span>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors cursor-pointer"
        >
          Return to Puzzle Terminal
        </button>
      </div>
    </div>
  );
};
