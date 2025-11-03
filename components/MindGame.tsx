"use client";
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
  const [cards, setCards] = useState<string[]>(generateDeck);
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

  const checkCard = (index: number) => {
    if (!flipped.includes(index) && flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
  };

  const matchWinner = solved.length === cards.length;

  const restartMatch = () => {
    setCards(generateDeck());
    setFlipped([]);
    setSolved([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden ">
      <h1 className="text-red-400 text-4xl font-bold font-mono mt-4 mb-4">
        Mind <span className="text-yellow-300">Game</span>
      </h1>

      {matchWinner && (
        <h2 className="text-green-400 text-2xl mb-4 ml-9 font-bold font-mono">You Won!! 🎉</h2>
      )}

      <div className="grid grid-cols-3 md:grid-cols-4 gap-5 mb-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`w-24 h-24 md:w-32 md:h-32 relative border bg-slate-700 border-gray-600 rounded-3xl font-mono cursor-pointer text-amber-50 flex justify-center items-center font-bold text-5xl transition-transform duration-300 ease-in-out ${flipped.includes(index) || solved.includes(index)
                ? "rotate-180"
                : ""
              }`}
            onClick={() => checkCard(index)}
          >
            {flipped.includes(index) || solved.includes(index) ? (
              <Image
                src={`/memory-card/${card}.jpg`}
                fill
                alt="cards"
                className="rounded-3xl rotate-180 object-cover"
              />
            ) : (
              "?"
            )}
          </div>
        ))}
      </div>

      <button
        onClick={restartMatch}
        className="text-red-700 text-xl bg-slate-200  border border-gray-400 font-bold font-mono cursor-pointer outline-none px-6 py-2 my-2 rounded-lg hover:bg-red-700 hover:text-white"
      >
        Reset Game
      </button>
    </div>
  );
}
