import { Card, DecksData, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  decks: DecksData[];
  user: User | null;
  cards: Card[];
  selectedDeckId: string | null;
};

type Action = {
  setDecks: (decks: DecksData[], search?: string) => void;
  setDecksByQuery: (search: string) => void;
  removeDeck: (id: string) => void;
  addDeck: (deck: DecksData) => void;
  editDeckTitle: (id: string, title: string) => void;

  setUser: (user: User) => void;
  clearUser: () => void;

  setCards: (cards: Card[]) => void;
  removeCard: (deckId: string, cardId: string) => void;
  addCard: (card: Card) => void;
  editCardText: (
    deckId: string,
    cardId: string,
    newFront: string,
    newBack: string,
  ) => void;
  clearCards: () => void;

  setSelectedDeckId: (deckId: string) => void;
  clearSelectedDeckId: () => void;
};

const initialState: State = {
  decks: [],
  user: null,
  cards: [],
  selectedDeckId: null,
};

export const useStore = create<State & Action>()(
  immer((set, get) => ({
    ...initialState,

    setDecks: (decks) => set({ decks }),
    // setDecks: (decks, search) => {
    //   //const decksData = get().decks;

    //   if (search) {
    //     const matchedDecks = decks.filter((deck) => deck.title.match(search));
    //     set({ decks: matchedDecks });
    //   } else {
    //     set({ decks });
    //   }
      
    // },

    setDecksByQuery: (search) => {
      // const matchedDecks = get().decks.map((deck) => deck.title.match(search));
      // set({decks: matchedDecks})
      // set({
      //   decks: get().decks.filter((deck) => {
      //     return deck.title.match(search);
      //   })
      // });
      set({
        decks: get().decks.filter((deck) => {
          if (deck.title.match(search)) {
            return deck;
          }
        })
      })
    },

    removeDeck: (id) => {
      const newDecks = get().decks.filter((deck) => deck.id !== id);
      set({ decks: newDecks });
    },

    addDeck: (deck) => {
      set({ decks: [deck, ...get().decks] });
    },

    editDeckTitle: (id, newTitle) => {
      const updatedDeck = get().decks.map((deck) =>
        deck.id === id ? { ...deck, title: newTitle } : deck,
      );
      set({ decks: updatedDeck });
    },
    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),

    setCards: (cards) => set({ cards }),

    removeCard: (deckId, cardId) => {
      const newCards = get().cards.filter(
        (card) => card.id !== cardId || card.deckId !== deckId,
      );
      set({ cards: newCards });
    },

    addCard: (card) => {
      set({
        cards: [card, ...get().cards],
        decks: get().decks.map((deck) => {
          if (deck.id === card.deckId) {
            return {
              ...deck,
              numCards: deck.numCards + 1,
            };
          }
          return deck;
        }),
      });
    },

    editCardText: (deckId, cardId, newFront, newBack) => {
      set({
        cards: get().cards.map((card) => {
          if (card.id === cardId && card.deckId === deckId) {
            return {
              ...card,
              front: newFront,
              back: newBack,
            };
          }
          return card;
        }),
      });
    },

    clearCards: () => set({ cards: [] }),

    setSelectedDeckId: (deckId) => set({ selectedDeckId: deckId }),

    clearSelectedDeckId: () => set({ selectedDeckId: null }),
  })),
);
