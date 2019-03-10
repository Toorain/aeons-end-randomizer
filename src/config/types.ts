// DATA

export interface ICreature {
  expansion: string;
  name: string;
  id: string;
}

export type CardType = "Gem" | "Relic" | "Spell" | "EMPTY"

export interface ICard {
  type: CardType;
  expansion: string;
  name: string;
  id: string;
  cost: number;
}

export type ExpansionType = "standalone" | "mini" | "promo"

export type EntityType = "nemeses" | "mages" | "cards"
export type Entity = ICard | ICreature

export interface IExpansion {
  id: string;
  name: string;
  type: ExpansionType;
  nemeses: Array<ICreature>;
  mages: Array<ICreature>;
  cards: Array<ICard>;
}

export interface IExpansionData {
  [key: string]: IExpansion;
}

// Market

export type MarketType = "official" | "custom"
export type Operation =
  "<"
  | ">"
  | "="
  | "<="
  | ">="
  | "ANY"
  | "OR"
  | "NoOp"

export interface IBluePrint {
  type: CardType;
  operation: Operation;
  threshold?: number;
  values?: Array<number>;
}

export interface IEmptyBluePrint extends IBluePrint {
  type: "EMPTY";
  operation: "NoOp";
}
export type Slot = IBluePrint | IEmptyBluePrint

export interface IMarketSetup {
  id: string;
  name: string;
  type: MarketType;
  tiles: Array<Slot>;
}

export interface IMarketSetups {
  [key: string]: IMarketSetup
}

// TurnOrder

export type Player =
  "Player 1"
  | "Player 2"
  | "Player 3"
  | "Player 4"
  | "Nemesis"
  | "Wild"
  | "Maelstrom Assault"

export interface ITurnOrderCard {
  id: string;
  name: Player;
  cssClass: string;
}

export interface ITurnOrderSetup {
  id: string;
  name: string;
  turnOrderCards: Array<ITurnOrderCard>
}

export interface ITurnOrderSetups {
  [key: string]: ITurnOrderSetup
}

export const isCard = (card: ICard | Slot): card is ICard => {
  return (<ICard>card).name !== undefined
}
