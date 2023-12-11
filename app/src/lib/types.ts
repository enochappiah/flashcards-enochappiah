export type Deck = {
  id: string;
  title: string;
  image?: string;
  numCards: number;
};

export type Card = {
  id: string;
  front: string;
  back: string;
  deckId: string;
};

export type User = {
  id: number;
  username: string;
  displayName: string;
  avatarUrl?: string;
};

export type DeckwithCardData = Deck & { card?: Card };
export type DecksData = Deck & { user?: User };
export type CardWithDeckData = Card & { deck?: Deck };

//export type DecksData = Deck & {user?: User};
