"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

const generateDeck = () => {
  const memoryCards = [
    "blues",
    "Bomb",
    "chuck",
    "Eagle",
    "pig",
    "red",
    "small",
    "smallpig",
  ];
  const deck = [...memoryCards, ...memoryCards];
  return deck.sort(() => Math.random() - 0.5);
};

export default function MindGame() {
  const [cards, setCards] = useState<string[]>(generateDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);

  useEffect(() => {
    const checkResult = () => {
      const [first, second] = flipped;
      if (cards[first] === cards[second]) {
        setSolved([...solved, ...flipped]);
      }
      setFlipped([]);
    };

    if (flipped.length === 2) {
      setTimeout(() => checkResult(), 1000);
    }
  }, [cards, flipped, solved]);

  const handleClick = (index: number) => {
    if (!flipped.includes(index) && flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
  };

  const matchWinner = solved.length === cards.length;

  const resetMatch = () => {
    setCards(generateDeck());
    setFlipped([]);
    setSolved([]);
  };

  return (
    <div>
      {matchWinner && (
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-6 animate-bounce">
          🎉 You Won!!!
        </h2>
      )}

      {/* Responsive Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`relative flex justify-center items-center text-white text-4xl sm:text-5xl font-bold w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 cursor-pointer border border-gray-600 rounded-2xl shadow-lg transition-transform duration-500 transform hover:scale-105 hover:shadow-2xl ${
              flipped.includes(index) || solved.includes(index)
                ? "rotate-y-180 bg-gray-700"
                : "bg-gray-900"
            }`}
          >
            {flipped.includes(index) || solved.includes(index) ? (
              <Image
                src={`/memory-card/${card}.jpg`}
                fill
                alt="memory card"
                className="object-cover rounded-2xl"
              />
            ) : (
              <span className="select-none">?</span>
            )}
          </div>
        ))}
      </div>

      {/* Stylish Button */}
      <button
        onClick={resetMatch}
        className="mt-10 px-8 py-3 text-lg sm:text-xl font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-md hover:shadow-2xl text-white"
      >
        🔁 Reset Game
      </button>
    </div>
  );
}
