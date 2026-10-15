import React from 'react';
import { Volume2, VolumeX, RotateCcw, HelpCircle, Clock, Key } from 'lucide-react';
import { ROOMS } from '../puzzleData';

interface HUDProps {
  currentRoom: number;
  timeRemaining: number;
  hintsUsed: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onRestart: () => void;
  onOpenHelp: () => void;
  onOpenClue: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  currentRoom,
  timeRemaining,
  hintsUsed,
  isMuted,
  onToggleMute,
  onRestart,
  onOpenHelp,
  onOpenClue,
}) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isLowTime = timeRemaining <= 20;
  const isCriticalTime = timeRemaining <= 10;

  return (
    <header className="relative z-20 w-full px-4 sm:px-6 py-3 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 text-slate-100 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 sm:gap-6">
        {/* Left: Brand Wordmark & Current Room Step */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              AI MUSEUM ESCAPE
            </span>
            <span className="text-xs text-slate-400 font-mono tracking-wide">
              SECURITY LOCKDOWN IN PROGRESS
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-slate-800">
            {ROOMS.map((room) => {
              const isPast = room.id < currentRoom;
              const isCurrent = room.id === currentRoom;
              return (
                <div
                  key={room.id}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    isCurrent
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                      : isPast
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40'
                      : 'bg-slate-900/60 text-slate-500 border border-slate-800'
                  }`}
                >
                  <span className="font-mono">{room.id}</span>
                  <span className="hidden lg:inline">{room.subtitle}</span>
                  {isPast && <span className="text-emerald-400 ml-0.5">✓</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Timer & Hints Cluster */}
        <div className="flex items-center gap-4 sm:gap-6 mx-auto sm:mx-0">
          {/* 90s Countdown */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
              isCriticalTime
                ? 'bg-red-950/70 border-red-500/80 text-red-300 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                : isLowTime
                ? 'bg-amber-950/60 border-amber-500/70 text-amber-300'
                : 'bg-slate-900/90 border-slate-800 text-slate-200'
            }`}
            title="Time remaining before complete lockdown"
          >
            <Clock className={`w-4 h-4 ${isCriticalTime ? 'text-red-400 animate-spin' : 'text-amber-400'}`} />
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Time Left</span>
              <span className="text-lg font-mono font-bold tracking-wider tabular-nums">
                {timeFormatted}
              </span>
            </div>
          </div>

          {/* Clues & Hints Badge */}
          <button
            onClick={onOpenClue}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-200 transition-colors shadow-sm cursor-pointer"
            title="View puzzle clues"
          >
            <Key className="w-4 h-4 text-amber-400" />
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400">Clue / Hint</span>
              <span className="text-xs font-mono font-medium text-amber-100">
                {hintsUsed} used
              </span>
            </div>
          </button>
        </div>

        {/* Right: Sound, Instructions, Restart Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute game audio' : 'Mute game audio'}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={onOpenHelp}
            aria-label="View instructions"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Museum Escape Guide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            onClick={onRestart}
            aria-label="Restart puzzle game"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-rose-950/40 hover:border-rose-800 transition-colors cursor-pointer text-xs font-medium"
            title="Restart Mission"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restart</span>
          </button>
        </div>
      </div>

      {/* Progress Bar under HUD */}
      <div className="w-full bg-slate-900 h-1 mt-3 -mb-3 overflow-hidden rounded-full">
        <div
          className={`h-full transition-all duration-1000 ${
            isCriticalTime ? 'bg-red-500' : isLowTime ? 'bg-amber-500' : 'bg-cyan-500'
          }`}
          style={{ width: `${Math.max(0, (timeRemaining / 90) * 100)}%` }}
        />
      </div>
    </header>
  );
};
