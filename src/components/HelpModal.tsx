import React from 'react';
import { X, HelpCircle, Brain, Cpu, Lock, Key, Clock, CheckCircle } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in text-slate-100"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col gap-5 animate-scale-up max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span>Museum Escape Protocols</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close help"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-sans">90-Second Countdown</strong>
              You have 90 seconds from when you enter to solve all three exhibits. If the timer hits zero, lockdown locks all doors permanently.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-sans">Immediate Feedback & Progression</strong>
              Submitting an answer immediately checks it against the room's protocol. Correct answers trigger door unseals and advance you to the next room. Incorrect attempts highlight helpful guidance without penalizing your time!
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <Key className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-sans">Clue System</strong>
              If you get stuck, click the Clue button in the top bar or room header. Each room has up to 2 progressive hints to guide your reasoning.
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <strong className="text-white block font-sans">The Three Exhibits:</strong>
            <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
              <li className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Room 1: Number sequence — deduce the next exponential weight.</span>
              </li>
              <li className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Room 2: Logic riddle — exactly 1 of 3 curators tells the truth.</span>
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Room 3: Caesar cipher — decrypt the +3 shifted escape code.</span>
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors cursor-pointer"
        >
          Got It, Resume Escape
        </button>
      </div>
    </div>
  );
};
