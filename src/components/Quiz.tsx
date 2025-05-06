import React, { useState, useEffect } from 'react';
import { Player, Question } from '../types';
import { getQuestionsByCategory, shuffleQuestions } from '../data/questions';
import { Timer, ChevronRight } from 'lucide-react';

interface QuizProps {
  categoryId: string;
  players: Player[];
  onGameEnd: (updatedPlayers: Player[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ categoryId, players, onGameEnd }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isAnswered, setIsAnswered] = useState(false);

  const activePlayer = players.find(player => player.active);
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const categoryQuestions = getQuestionsByCategory(categoryId);
    setQuestions(shuffleQuestions(categoryQuestions).slice(0, 10));
  }, [categoryId]);

  useEffect(() => {
    if (!isAnswered && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswer(null);
    }
  }, [timeLeft, isAnswered]);

  const handleAnswer = (option: string | null) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedOption(option);

    const updatedPlayers = players.map(player => {
      if (player.active && option === currentQuestion.correctAnswer) {
        // Aumenta a pontuação baseada no tempo restante
        const timeBonus = Math.ceil(timeLeft / 2);
        const basePoints = 10;
        return { ...player, score: player.score + basePoints + timeBonus };
      }
      return player;
    });

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
        setTimeLeft(20);

        const nextPlayerIndex = (players.findIndex(p => p.active) + 1) % players.length;
        const newPlayers = updatedPlayers.map((player, index) => ({
          ...player,
          active: index === nextPlayerIndex
        }));
        onGameEnd(newPlayers);
      } else {
        // Última questão, desativa todos os jogadores para indicar fim do jogo
        const finalPlayers = updatedPlayers.map(player => ({
          ...player,
          active: false
        }));
        onGameEnd(finalPlayers);
      }
    }, 2000);
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 p-4">
      <div className="flex">
        {/* Área principal do quiz */}
        <div className="flex-1 max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold text-blue-900">
                Jogador: <span className="text-blue-600">{activePlayer?.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Timer size={20} />
                <span className={`font-mono ${timeLeft <= 5 ? 'text-red-500' : ''}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">
                {currentQuestion.question}
              </h2>

              <div className="grid gap-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswered}
                    className={`p-4 rounded-lg text-left transition-all ${
                      isAnswered
                        ? option === currentQuestion.correctAnswer
                          ? 'bg-green-100 border-green-500'
                          : option === selectedOption
                            ? 'bg-red-100 border-red-500'
                            : 'bg-gray-100 border-gray-300'
                        : 'bg-white border-gray-300 hover:bg-blue-50'
                    } border-2`}
                  >
                    <div className="flex items-center">
                      <span className="flex-1">{option}</span>
                      {isAnswered && option === currentQuestion.correctAnswer && (
                        <ChevronRight className="text-green-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Placar dos jogadores (lado direito) */}
        <div className="ml-4 w-64">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Placar</h3>
            <div className="space-y-3">
              {players.map(player => (
                <div
                  key={player.id}
                  className={`p-3 rounded-lg transition-all ${
                    player.active
                      ? 'bg-blue-100 border-blue-500'
                      : 'bg-gray-50'
                  } border-2`}
                >
                  <div className="font-medium text-gray-800">{player.name}</div>
                  <div className="text-blue-600 font-bold">{player.score} pontos</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;