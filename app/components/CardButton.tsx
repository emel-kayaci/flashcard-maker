import React from 'react';
import { FaRandom, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
    <div className="flex flex-col sm:flex-row justify-center mt-4 space-y-2 sm:space-y-0 sm:space-x-4">
      <button
        onClick={onFlip}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Flip
      </button>
      <div className="flex space-x-2">
        <button
          onClick={onPrevious}
          disabled={currentCardIndex === 0}
          className={`${
            currentCardIndex === 0
              ? 'bg-gray-500 text-gray-200'
              : 'bg-gray-500 hover:bg-gray-600 text-gray-200'
          } py-2 px-4 rounded`}
        >
          <FaArrowLeft className="inline-block mr-1" /> Prev
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
          Next <FaArrowRight className="inline-block mr-1" />
        </button>
      </div>
      <button
        onClick={onShuffle}
        className="bg-purple-600 text-white py-2 px-4 rounded"
      >
        <FaRandom className="inline-block mr-1" />
        Shuffle
      </button>
      <button
        onClick={onChangeLanguages}
        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
      >
        Change Languages
      </button>
    </div>
  );
};

export default CardButton;
