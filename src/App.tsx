import React, { useState } from 'react';
import PlayerRegistration from './components/PlayerRegistration';
import CategorySelection from './components/CategorySelection';
import Quiz from './components/Quiz';
import Results from './components/Results';
import ImageCarousel from './components/ImageCarousel';
import { GameStage, Player } from './types';

function App() {
  const [gameStage, setGameStage] = useState<GameStage>('registration');
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleStartGame = (registeredPlayers: Player[]) => {
    setPlayers(registeredPlayers);
    setGameStage('category-selection');
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setGameStage('quiz');
  };

  const handleGameEnd = (updatedPlayers: Player[]) => {
    setPlayers(updatedPlayers);
    if (updatedPlayers.every(player => !player.active)) {
      setGameStage('results');
    }
  };

  const handleRestart = () => {
    setPlayers([]);
    setSelectedCategory('');
    setGameStage('registration');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ImageCarousel />
      <div className="pt-[140px]"> {/* Adiciona espaço para o banner fixo */}
        {gameStage === 'registration' && (
          <PlayerRegistration onStartGame={handleStartGame} />
        )}
        {gameStage === 'category-selection' && (
          <CategorySelection
            players={players}
            onSelectCategory={handleSelectCategory}
          />
        )}
        {gameStage === 'quiz' && (
          <Quiz
            categoryId={selectedCategory}
            players={players}
            onGameEnd={handleGameEnd}
          />
        )}
        {gameStage === 'results' && (
          <Results
            players={players}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}

export default App;