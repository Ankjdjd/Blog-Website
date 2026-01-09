
import React, { useState, useEffect, useCallback } from 'react';

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const SYMBOLS = ['🚀', '🎨', '🎮', '🍕', '🌍', '🎸', '📱', '🚲'];

const MemoryGameProject: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  const initGame = useCallback(() => {
    const shuffledSymbols = [...SYMBOLS, ...SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledSymbols);
    setFlippedCards([]);
    setScore(0);
    setMoves(0);
    setTimer(0);
    setIsGameActive(true);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    let interval: number;
    if (isGameActive) {
      interval = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive]);

  const handleCardClick = (id: number) => {
    if (!isGameActive || flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [firstId, secondId] = newFlipped;
      
      if (cards[firstId].symbol === cards[secondId].symbol) {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
          setScore(prev => prev + 10);
          
          if (cards.filter(c => !c.isMatched).length === 2) {
            setIsGameActive(false);
          }
        }, 600);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-8">
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Time</p>
            <p className="text-3xl font-black text-slate-800 font-mono">{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Score</p>
            <p className="text-3xl font-black text-cyan-600 font-mono">{score}</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Moves</p>
            <p className="text-3xl font-black text-slate-800 font-mono">{moves}</p>
          </div>
        </div>
        <button 
          onClick={initGame}
          className="w-full md:w-auto px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          <span>Reset Game</span>
        </button>
      </div>

      {!isGameActive && score === 80 && (
        <div className="bg-green-50 border border-green-200 p-6 rounded-3xl text-center animate-bounce">
          <h3 className="text-2xl font-bold text-green-700">Perfect Match! 🎉</h3>
          <p className="text-green-600">You completed the board in {moves} moves.</p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 md:gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square relative cursor-pointer group transition-all duration-500 transform-gpu ${
              card.isFlipped || card.isMatched ? '[transform:rotateY(180deg)]' : ''
            }`}
          >
            <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center text-4xl shadow-md ${
              card.isMatched 
                ? 'bg-green-50 border-green-200' 
                : card.isFlipped 
                  ? 'bg-white border-cyan-400' 
                  : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
            } [backface-visibility:hidden] z-10`}>
              <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center">
                 <span className="text-slate-500 font-bold text-sm">?</span>
              </div>
            </div>
            
            <div className={`absolute inset-0 rounded-2xl border-2 flex items-center justify-center text-4xl shadow-inner bg-white border-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)]`}>
              {card.symbol}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGameProject;
