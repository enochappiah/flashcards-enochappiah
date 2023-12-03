export type Deck = {
  id: string;
  title: string;
  image?: string;
  numberOfCards: number;
};

export type Card = {
  id: string;
  deckId: string;
};

export type User = {
  id: number;
  username: string;
  displayName: string;
  avatarUrl?: string;
};

//export type DeckwithCardData = Deck & { card?: Card };
export type DecksData = Deck & { user?: User };

//export type DecksData = Deck & {user?: User};
