import React, { useState } from 'react';
import { Player } from '../types';
import { Trophy } from 'lucide-react';

interface PlayerRegistrationProps {
  onStartGame: (players: Player[]) => void;
}

const PlayerRegistration: React.FC<PlayerRegistrationProps> = ({ onStartGame }) => {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: '', score: 0, active: false },
    { id: 2, name: '', score: 0, active: false },
  ]);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (id: number, name: string) => {
    setPlayers(prevPlayers => 
      prevPlayers.map(player => 
        player.id === id ? { ...player, name } : player
      )
    );
  };

  const addPlayer = () => {
    if (players.length >= 6) {
      setError('Máximo de 6 jogadores permitido!');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    setPlayers(prevPlayers => [
      ...prevPlayers,
      { 
        id: Math.max(...prevPlayers.map(p => p.id)) + 1,
        name: '',
        score: 0,
        active: false
      }
    ]);
  };

  const removePlayer = (id: number) => {
    if (players.length <= 2) {
      setError('Você precisa de pelo menos 2 jogadores!');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emptyNames = players.some(player => player.name.trim() === '');
    if (emptyNames) {
      setError('Todos os jogadores precisam ter nomes!');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    const names = players.map(p => p.name.trim().toLowerCase());
    const hasDuplicates = names.some((name, index) => names.indexOf(name) !== index);
    if (hasDuplicates) {
      setError('Os nomes dos jogadores devem ser únicos!');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    const playersWithActive = players.map((player, index) => 
      index === 0 ? { ...player, active: true } : player
    );
    
    onStartGame(playersWithActive);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-500 p-3 rounded-full">
              <Trophy size={36} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-blue-900">Quiz Esportivo - Narfive</h1>
          <p className="text-gray-600 mt-2">Digite os nomes dos jogadores para começar</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4 mb-6">
            {players.map((player, index) => (
              <div key={player.id} className="flex items-center space-x-2">
                <div className="bg-blue-100 text-blue-800 font-semibold h-8 w-8 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => handleNameChange(player.id, e.target.value)}
                  placeholder={`Nome do Jogador ${index + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={15}
                />
                {players.length > 2 && (
                  <button 
                    type="button" 
                    onClick={() => removePlayer(player.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-lg text-center text-sm">
              {error}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              type="button"
              onClick={addPlayer}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              + Adicionar Jogador
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Começar Jogo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerRegistration;