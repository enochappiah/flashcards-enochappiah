import { DecksData, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  decks: DecksData[];
  user: User | null;
};

type Action = {
  setDecks: (decks: DecksData[]) => void;
  removeDeck: (id: string) => void;
  addDeck: (deck: DecksData) => void;
  editDeckTitle: (id: string, title: string) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const initialState: State = {
  decks: [],
  user: null,
};

export const useStore = create<State & Action>()(
  immer((set, get) => ({
    ...initialState,

    setDecks: (decks) => set({ decks }),

    removeDeck: (id) => {
      const newDecks = get().decks.filter((deck) => deck.id !== id);
      set({ decks: newDecks });
    },
    // addDeck: (deck) => {
    //   const newDeck: DecksData = {
    //     ...deck,
    //   };
    //   const newDecks = [...get().decks, newDeck];
    //   set({ decks: newDecks });
    // },

    addDeck: (deck) => {
      set({ decks: [deck, ...get().decks] });
    },

    // editDeckTitle: (id, newTitle) => {
    //   const decks = get().decks.map((deck) => {
    //     if (deck.id === id) {
    //       return {
    //         ...deck,
    //         title: newTitle,
    //       };
    //     }
    //     return deck;
    //   });

    //   set({ decks });
    // },
    editDeckTitle: (id, newTitle) => {
      const updatedDeck = get().decks.map((deck) =>
        deck.id === id ? { ...deck, title: newTitle } : deck,
      );
      set({ decks: updatedDeck });
    },
    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),
  })),
);
