import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import Navbar from "./StudyNavBar";
import DisplayCard from "./DisplayCard";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDecks() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDecks();
    return () => abortController.abort();
  }, [deckId]);

  return (
    <div className="col">
      <div>
        <Navbar deckId={deckId} deck={deck} />
      </div>
      <div>
        <DisplayCard deck={deck} deckId={deckId} />
      </div>
    </div>
  );
}

export default Study;
