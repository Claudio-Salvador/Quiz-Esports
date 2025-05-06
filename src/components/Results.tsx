import React from 'react';
import { Player } from '../types';
import { Trophy, RotateCcw } from 'lucide-react';

interface ResultsProps {
  players: Player[];
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ players, onRestart }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const isTie = sortedPlayers[1]?.score === winner.score;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 p-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-yellow-500 p-4 rounded-full">
              <Trophy size={48} className="text-white" />
            </div>
          </div>
          {isTie ? (
            <h2 className="text-3xl font-bold text-blue-900 mb-2">Empate!</h2>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-blue-900 mb-2">
                {winner.name} Venceu!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                com {winner.score} pontos
              </p>
            </>
          )}

          <div className="space-y-3 mb-8">
            {sortedPlayers.map((player, index) => (
              <div
                key={player.id}
                className={`p-4 rounded-lg ${
                  index === 0 && !isTie
                    ? 'bg-yellow-100 border-2 border-yellow-500'
                    : 'bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    {index + 1}º {player.name}
                  </span>
                  <span className="text-blue-600 font-bold">
                    {player.score} pontos
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onRestart}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            <RotateCcw size={20} />
            <span>Jogar Novamente</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;