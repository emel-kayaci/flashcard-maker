import React from 'react';
import { FaRandom } from 'react-icons/fa';

interface CardButtonProps {
  onFlip: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onShuffle: () => void;
  onChangeLanguages: () => void;
  currentCardIndex: number;
  flashcardsLength: number;
}

const CardButton: React.FC<CardButtonProps> = ({
  onFlip,
  onPrevious,
  onNext,
  onShuffle,
  onChangeLanguages,
  currentCardIndex,
  flashcardsLength,
}) => {
  return (
    <div className="flex justify-center mt-4 space-x-4">
      <button
        onClick={onFlip}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2"
      >
        Flip
      </button>
      <button
        onClick={onShuffle}
        className="bg-purple-600 text-white py-2 px-4 rounded"
      >
        <FaRandom className="inline-block mr-1" />
        Shuffle
      </button>
      <button
        onClick={onChangeLanguages}
        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mr-2"
      >
        Change Languages
      </button>
      <button
        onClick={onPrevious}
        disabled={currentCardIndex === 0}
        className={`${
          currentCardIndex === 0
            ? 'bg-gray-500 text-gray-200'
            : 'bg-gray-500 hover:bg-gray-600 text-gray-200'
        } py-2 px-4 rounded mr-2`}
      >
        Previous Card
      </button>
      <button
        onClick={onNext}
        disabled={currentCardIndex === flashcardsLength - 1}
        className={`${
          currentCardIndex === flashcardsLength - 1
            ? 'bg-gray-500 text-gray-200'
            : 'bg-gray-500 hover:bg-gray-600 text-gray-200'
        } py-2 px-4 rounded`}
      >
        Next Card
      </button>
    </div>
  );
};

export default CardButton;
