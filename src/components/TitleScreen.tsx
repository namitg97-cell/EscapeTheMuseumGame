import React from 'react';
import { Play, Sparkles, ShieldAlert, Cpu, Brain, Lock } from 'lucide-react';
import { LOBBY_IMAGE } from '../puzzleData';
import { sound } from '../audio';

interface TitleScreenProps {
  onStartGame: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStartGame }) => {
  const handleStart = () => {
    sound.playSuccess();
    sound.startAmbient();
    onStartGame();
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4 sm:p-8 bg-slate-950 overflow-hidden text-slate-100 select-none">
      {/* Background Image with dramatic gradient vignette scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={LOBBY_IMAGE}
          alt="Futuristic AI Museum Atrium at Night"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-35 scale-105 transition-transform duration-10000 ease-out"
        />
        <div className="absolute inset-0 bg-radial-at-c from-slate-950/40 via-slate-950/80 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/90" />
      </div>

      {/* Decorative Cybernetic Circuit Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Main Content Modal Container */}
      <div className="relative z-10 max-w-3xl w-full mx-auto flex flex-col items-center text-center p-6 sm:p-10 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 shadow-2xl">
        
        {/* Museum Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest mb-6">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>Automated Lockdown · Protocol 90</span>
        </div>

        {/* Title Lockup */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase mb-4 drop-shadow-md">
          Escape The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400">AI Museum</span>
        </h1>

        <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
          You are trapped inside after closing hours. The museum security system has initiated a 
          <span className="text-amber-300 font-semibold"> 90-second containment lockdown</span>. 
          To escape, you must solve three distinct cryptographic exhibits in order before the blast doors seal permanently.
        </p>

        {/* 3 Exhibit Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full mb-8 text-left">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col gap-1.5 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
              <Brain className="w-4 h-4 shrink-0" />
              <span>Room 1 · Sequence</span>
            </div>
            <div className="text-sm font-semibold text-slate-200">Neural Gallery</div>
            <div className="text-xs text-slate-400 leading-normal">
              Deduce the missing harmonic weight in an exponential number sequence.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col gap-1.5 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold">
              <Cpu className="w-4 h-4 shrink-0" />
              <span>Room 2 · Logic</span>
            </div>
            <div className="text-sm font-semibold text-slate-200">Synthetic Truths</div>
            <div className="text-xs text-slate-400 leading-normal">
              Test three AI curator statements where only one tells the truth.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col gap-1.5 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
              <Lock className="w-4 h-4 shrink-0" />
              <span>Room 3 · Cipher</span>
            </div>
            <div className="text-sm font-semibold text-slate-200">Quantum Vault</div>
            <div className="text-xs text-slate-400 leading-normal">
              Decrypt an emergency Caesar shift code to open the final escape portal.
            </div>
          </div>
        </div>

        {/* Start Game Action Button */}
        <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleStart}
            autoFocus
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-lg tracking-wide uppercase shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start Game (90s Timer)</span>
          </button>

          <span className="text-xs text-slate-400 font-mono tracking-wide">
            Use hints if stuck · Immediate feedback on submit · Press Enter or Space to Start
          </span>
        </div>

        {/* Subtle Feature Perks */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 w-full flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Interactive clue system
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Built-in calculation & cipher tools
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            High-contrast accessible display
          </span>
        </div>
      </div>
    </div>
  );
};
