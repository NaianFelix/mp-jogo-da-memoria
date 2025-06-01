import { useEffect, useState } from "react";
import Timer from "../components/Timer";

const cardImages = [
  "/images/card-Goku.png",
  "/images/card-Vegeta.png",
  "/images/card-Gohan.png",
  "/images/card-Piccolo.png",
  "/images/card-Kuririn.png",
  "/images/card-Freeza.png",
  "/images/card-Cell.png",
  "/images/card-Boo.png",
  "/images/card-Trunks.png",
  "/images/card-Satan.png",
];

const shuffleCards = () => {
  const duplicated = [...cardImages, ...cardImages];
  return duplicated.sort(() => Math.random() - 0.5);
};

interface CardProps {
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card = ({ image, isFlipped, isMatched, onClick }: CardProps) => {
  return (
    <div
      className={`w-[129px] h-[187px] perspective cursor-pointer ${
        isMatched ? "pointer-events-none grayscale" : ""
      }`}
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style ${
          isFlipped || isMatched ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden transform rotate-y-180">
          <img src={image} alt="front" className="w-full h-full object-cover" />
        </div>
        <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden bg-gray-300">
          <img
            src="/images/card.png"
            alt="back"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const Game = () => {
  const [name, setName] = useState("");
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("playerName");
    if (savedName) setName(savedName);
  }, []);

  useEffect(() => {
    setCards(shuffleCards());
  }, []);

  const handleCardClick = (index: number) => {
    if (isChecking) return; 
    if (flipped.includes(index) || matched.includes(index)) return; 

    if (flipped.length === 0) {
      setFlipped([index]);
    } else if (flipped.length === 1) {
      setFlipped((prev) => [...prev, index]);
      setIsChecking(true);

      setTimeout(() => {
        const [first, second] = [...flipped, index];
        if (cards[first] === cards[second]) {
          setMatched((prev) => [...prev, first, second]);
        }
        setFlipped([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  return (
    <>
      <div className="-z-[9] bg-black fixed w-full h-full top-0 left-0 opacity-50"></div>
      <img
        className="-z-10 fixed h-full w-full object-cover"
        src="/images/kame.jpeg"
        alt=""
      />
      <div className="flex justify-between w-full container">
        <p className="text-[74px] text-white font-title drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {name}
        </p>
        <p className="text-[74px] text-white font-title drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <Timer></Timer>
        </p>
      </div>

      <div className="flex flex-wrap gap-6 max-w-[750px] mt-6">
        {cards.map((image, index) => (
          <Card
            key={index}
            image={image}
            isFlipped={flipped.includes(index)}
            isMatched={matched.includes(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </>
  );
};

export default Game;