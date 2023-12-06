import { Card, DecksData, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  decks: DecksData[];
  user: User | null;
  cards: Card[],
  selectedDeckId: string | null;
};

type Action = {
  setDecks: (decks: DecksData[]) => void;
  removeDeck: (id: string) => void;
  addDeck: (deck: DecksData) => void;
  editDeckTitle: (id: string, title: string) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  setCards: (cards: Card[]) => void;
  removeCard: (deckId: string, cardId: string) => void;
  addCard: (card: Card) => void;
  editCard: (deckId: string, cardId: string, newFront: string, newBack: string) => void;
  clearCards: () => void;
  setSelectedDeckId: (id: string) => void;
  clearSelctedDeckId: () => void;
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
      const newCards = get().cards.filter((card) => {
        card.id === cardId && card.deckId === deckId;
      })
      set({ cards: newCards });
    },

    addCard: (card) => {
      set({
        cards: [card, ...get().cards],
        decks: get().decks.map((deck) => {
          if (deck.id === card.deckId) {
            return {
              ...deck,
              numberOfCards: deck.numberOfCards + 1,
            };
          }
          return deck;
        }),
      });
    },

    editCard: (deckId, cardId, newFront, newBack) => {
      get().cards.map((card) => {
        if ((card.id === cardId) && (card.deckId === deckId)) {
          return {
            ...card,
            front: newFront,
            back: newBack
          };
        }
        return card;
      })
    },

    clearCards: () => set({ cards: [] }) ,

    setSelectedDeckId: (id) => set({ selectedDeckId: id }),

    clearSelctedDeckId: () => set({ selectedDeckId: null }),


  })),
);
