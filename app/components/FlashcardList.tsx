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
          className="relative bg-blue-600 rounded-lg text-white text-lg font-bold p-4 w-auto max-w-72 h-auto shadow-md"
          animate={{ rotateY: isFrontVisible ? 0 : 180 }}
          transition={{ duration: 0.6 }}
          style={{ perspective: '1000px' }}
        >
          {isFrontVisible ? (
            <div className="text-center">
              <div className="text-xs">{currentCard.frontLanguage}</div>
              {currentCard.front.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          ) : (
            <motion.div className="transform" style={{ rotateY: '180deg' }}>
              <div className="text-center">
                <div className="text-xs">{currentCard.backLanguage}</div>
                {currentCard.back.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
              {currentCard.image && (
                <div className="mt-4">
                  <img
                    src={currentCard.image}
                    alt="Card"
                    className="w-40 h-auto mx-auto"
                  />
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FlashcardList;
