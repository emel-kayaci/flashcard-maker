import React from 'react';
import { motion } from 'framer-motion';
import { Flashcard } from '../interfaces/Flashcard';

interface FlashcardListProps {
  flashcards: Flashcard[];
  currentCardIndex: number;
  isFrontVisible: boolean;
}

const FlashcardList: React.FC<FlashcardListProps> = ({
  flashcards,
  currentCardIndex,
  isFrontVisible,
}) => {
  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="mt-8">
      <div className="flex justify-center">
        <motion.div
          className="relative w-72 h-40 rounded-lg bg-gray-800 shadow-md"
          animate={{ rotateY: isFrontVisible ? 0 : 180 }}
          transition={{ duration: 0.6 }}
          style={{ perspective: '1000px' }}
        >
          <div className="absolute inset-0 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">
            {isFrontVisible ? (
              <div>
                <div className="text-xs">{currentCard.frontLanguage}</div>
                <div>{currentCard.front}</div>
              </div>
            ) : (
              <motion.div className="transform" style={{ rotateY: '180deg' }}>
                <div>
                  <div className="text-xs">{currentCard.backLanguage}</div>
                  <div>{currentCard.back}</div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FlashcardList;
