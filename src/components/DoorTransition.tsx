import React from 'react';
import { Unlock, ArrowRight } from 'lucide-react';
import { ROOMS } from '../puzzleData';

interface DoorTransitionProps {
  completedRoomId: number;
  nextRoomId: number;
}

export const DoorTransition: React.FC<DoorTransitionProps> = ({
  completedRoomId,
  nextRoomId,
}) => {
  const completedRoom = ROOMS.find((r) => r.id === completedRoomId);
  const nextRoom = ROOMS.find((r) => r.id === nextRoomId);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in text-slate-100 select-none">
      <div className="max-w-md w-full flex flex-col items-center text-center p-8 rounded-3xl bg-slate-900 border-2 border-emerald-500/60 shadow-[0_0_60px_rgba(16,185,129,0.3)] animate-scale-up">
        
        {/* Unlocking animation icon */}
        <div className="w-18 h-18 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-4 animate-bounce">
          <Unlock className="w-9 h-9 text-emerald-300" />
        </div>

        <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-2">
          Security Clearance Verified
        </div>

        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
          {completedRoom?.title} Unlocked!
        </h3>

        <p className="text-xs text-slate-300 font-mono mb-6">
          BLAST DOORS DISENGAGING · PRESSURE EQUALIZED
        </p>

        {nextRoom ? (
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
            <span>Entering {nextRoom.title}</span>
            <ArrowRight className="w-4 h-4 animate-pulse" />
          </div>
        ) : (
          <div className="text-xs font-mono text-emerald-300">
            FINAL VAULT DOOR UNLOCKED · ESCAPING...
          </div>
        )}
      </div>
    </div>
  );
};
