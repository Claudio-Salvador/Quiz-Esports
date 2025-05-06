import React from 'react';
import { Category, Player } from '../types';
import { categories } from '../data/categories';
import * as Icons from 'lucide-react';

interface CategorySelectionProps {
  players: Player[];
  onSelectCategory: (categoryId: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({ players, onSelectCategory }) => {
  const activePlayer = players.find(player => player.active);

  const getIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons];
    return Icon ? <Icon size={24} /> : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            {activePlayer?.name}, escolha uma categoria
          </h2>
          <div className="flex justify-center space-x-4 mb-6">
            {players.map(player => (
              <div
                key={player.id}
                className={`px-4 py-2 rounded-full ${
                  player.active
                    ? 'bg-white text-blue-900'
                    : 'bg-blue-800 text-white'
                }`}
              >
                {player.name}: {player.score} pontos
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className="p-6 rounded-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
              style={{ backgroundColor: category.backgroundColor }}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="text-white">
                  {getIcon(category.icon)}
                </div>
                <span className="text-lg font-medium text-white">
                  {category.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;