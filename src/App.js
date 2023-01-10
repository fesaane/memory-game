import { useEffect } from "react";
import { useState } from "react";
import SingleCard from "./components/singleCard";

const cardImages = [
  { src: "/img/bird.png", matched: false },
  { src: "/img/budgie.png", matched: false },
  { src: "/img/crane-bird.png", matched: false },
  { src: "/img/duck.png", matched: false },
  { src: "/img/parrot.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiseOne, setchoiseOne] = useState(null);
  const [choiseTwo, setchoiseTwo] = useState(null);
  const [disabled, setdisabled] = useState(false);
  const [show, setShow] = useState(false);

  const handleChoise = (card) => {
    choiseOne ? setchoiseTwo(card) : setchoiseOne(card);
  };

  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setdisabled(true);
      if (choiseOne.src === choiseTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiseOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
        setTurns((prevTurns) => prevTurns + 1);
      } else {
        // console.log("no matches");
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiseOne, choiseTwo]);

  const resetTurn = () => {
    setchoiseOne(null);
    setchoiseTwo(null);

    setdisabled(false);
  };

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setchoiseOne(null);
    setchoiseTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };
  useEffect(() => {
    shuffleCards();
  }, []);
  // console.log(cards, turns);
  return (
    <div
      className={
        "App p-8 bg-gray-200 h-screen flex flex-col items-center justify-center " +
        (show ? "showcard" : "")
      }
    >
      <h1 className="text-3xl font-bold mb-3">Magic Match</h1>
      <button
        className="rounded-md bg-slate-700 text-white px-8 py-2 mb-8"
        onClick={shuffleCards}
      >
        New Game
      </button>
      <div className="grid md:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-4">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoise={handleChoise}
            flipped={card === choiseOne || card === choiseTwo || card.matched}
            hidecard={card.matched}
            disabled={disabled}
          ></SingleCard>
        ))}
      </div>
      <p className="mt-5">Score :{turns}</p>
    </div>
  );
}

export default App;
