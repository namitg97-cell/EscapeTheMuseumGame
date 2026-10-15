/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameState } from './types';
import { ROOMS, TOTAL_GAME_TIME } from './puzzleData';
import { sound } from './audio';
import { TitleScreen } from './components/TitleScreen';
import { HUD } from './components/HUD';
import { PuzzleSequences } from './components/PuzzleSequences';
import { PuzzleLogic } from './components/PuzzleLogic';
import { PuzzleCipher } from './components/PuzzleCipher';
import { ClueModal } from './components/ClueModal';
import { HelpModal } from './components/HelpModal';
import { DoorTransition } from './components/DoorTransition';
import { VictoryModal } from './components/VictoryModal';
import { GameOverModal } from './components/GameOverModal';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('WELCOME');
  const [currentRoomId, setCurrentRoomId] = useState<number>(1);
  const [timeRemaining, setTimeRemaining] = useState<number>(TOTAL_GAME_TIME);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [hintsByRoom, setHintsByRoom] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0 });
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isClueOpen, setIsClueOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [transitioningFrom, setTransitioningFrom] = useState<number | null>(null);

  const timerRef = useRef<number | null>(null);

  const currentRoom = ROOMS.find((r) => r.id === currentRoomId) || ROOMS[0];

  // Restart function resets all game variables
  const handleRestart = useCallback((startImmediately = false) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimeRemaining(TOTAL_GAME_TIME);
    setCurrentRoomId(1);
    setHintsUsed(0);
    setHintsByRoom({ 1: 0, 2: 0, 3: 0 });
    setIsClueOpen(false);
    setIsHelpOpen(false);
    setTransitioningFrom(null);

    if (startImmediately) {
      setGameState('PLAYING');
      sound.playDoorUnlock();
      sound.startAmbient();
    } else {
      setGameState('WELCOME');
    }
  }, []);

  // Timer interval for 90-second countdown
  useEffect(() => {
    if (gameState === 'PLAYING') {
      timerRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            sound.playGameOver();
            setGameState('GAME_OVER');
            return 0;
          }

          // Sound tick on last 15 seconds
          if (prev <= 16 && prev > 1) {
            sound.playTick();
          }

          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState]);

  // Global keyboard shortcuts (Enter / Space to start, Esc to dismiss modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'WELCOME' && (e.code === 'Enter' || e.code === 'Space')) {
        e.preventDefault();
        sound.playSuccess();
        sound.startAmbient();
        setGameState('PLAYING');
      } else if (e.code === 'Escape') {
        if (isClueOpen) setIsClueOpen(false);
        if (isHelpOpen) setIsHelpOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isClueOpen, isHelpOpen]);

  // Audio mute toggle handler
  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  // Clue reveal progression
  const handleUnlockNextClue = () => {
    const currentCount = hintsByRoom[currentRoomId] || 0;
    if (currentCount < currentRoom.clues.length) {
      setHintsByRoom((prev) => ({
        ...prev,
        [currentRoomId]: currentCount + 1,
      }));
      setHintsUsed((prev) => prev + 1);
    }
  };

  // Answer submission and immediate validation
  const handleSubmitAnswer = (userInput: string): boolean => {
    const cleaned = userInput.trim().toUpperCase();
    const isMatch = currentRoom.answer.some((ans) => ans.toUpperCase() === cleaned);

    if (isMatch) {
      sound.playSuccess();
      sound.playDoorUnlock();

      if (currentRoomId < 3) {
        // Trigger intermediate door unlock animation
        setTransitioningFrom(currentRoomId);
        setGameState('ROOM_TRANSITION');
        setTimeout(() => {
          setCurrentRoomId((prev) => prev + 1);
          setTransitioningFrom(null);
          setGameState('PLAYING');
        }, 1300);
      } else {
        // Solved final room! Trigger victory
        sound.playVictoryFanfare();
        setGameState('VICTORY');
      }
      return true;
    } else {
      sound.playError();
      return false;
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* Dynamic Background Image Layer with smooth crossfade */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          key={currentRoom.backgroundUrl}
          src={currentRoom.backgroundUrl}
          alt={currentRoom.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25 scale-102 transition-opacity duration-1000 ease-out"
        />
        {/* Measured dark gradient scrims for maximum text contrast */}
        <div className="absolute inset-0 bg-radial-at-c from-slate-950/60 via-slate-950/85 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/90" />
      </div>

      {/* Screen 1: Welcome / Title Screen */}
      {gameState === 'WELCOME' && (
        <TitleScreen onStartGame={() => setGameState('PLAYING')} />
      )}

      {/* Screen 2: Active Gameplay Screen */}
      {(gameState === 'PLAYING' || gameState === 'ROOM_TRANSITION') && (
        <div className="relative z-10 flex flex-col min-h-screen">
          <HUD
            currentRoom={currentRoomId}
            timeRemaining={timeRemaining}
            hintsUsed={hintsUsed}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onRestart={() => handleRestart(false)}
            onOpenHelp={() => setIsHelpOpen(true)}
            onOpenClue={() => setIsClueOpen(true)}
          />

          <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {currentRoomId === 1 && (
              <PuzzleSequences
                room={currentRoom}
                onSubmitAnswer={handleSubmitAnswer}
                onOpenClue={() => setIsClueOpen(true)}
                unlockedClues={hintsByRoom[1] || 0}
              />
            )}

            {currentRoomId === 2 && (
              <PuzzleLogic
                room={currentRoom}
                onSubmitAnswer={handleSubmitAnswer}
                onOpenClue={() => setIsClueOpen(true)}
                unlockedClues={hintsByRoom[2] || 0}
              />
            )}

            {currentRoomId === 3 && (
              <PuzzleCipher
                room={currentRoom}
                onSubmitAnswer={handleSubmitAnswer}
                onOpenClue={() => setIsClueOpen(true)}
                unlockedClues={hintsByRoom[3] || 0}
              />
            )}
          </main>
        </div>
      )}

      {/* Door Transition Animation Screen */}
      {gameState === 'ROOM_TRANSITION' && transitioningFrom && (
        <DoorTransition
          completedRoomId={transitioningFrom}
          nextRoomId={transitioningFrom + 1}
        />
      )}

      {/* Screen 3: Victory Modal */}
      {gameState === 'VICTORY' && (
        <VictoryModal
          timeTaken={TOTAL_GAME_TIME - timeRemaining}
          hintsUsed={hintsUsed}
          onRestart={() => handleRestart(true)}
        />
      )}

      {/* Screen 4: Game Over Modal */}
      {gameState === 'GAME_OVER' && (
        <GameOverModal
          failedRoomId={currentRoomId}
          hintsUsed={hintsUsed}
          onRestart={() => handleRestart(true)}
        />
      )}

      {/* Clue / Hint Modal */}
      <ClueModal
        room={currentRoom}
        isOpen={isClueOpen}
        unlockedClueLevel={hintsByRoom[currentRoomId] || 0}
        onUnlockNextClue={handleUnlockNextClue}
        onClose={() => setIsClueOpen(false)}
      />

      {/* Help / Guide Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
