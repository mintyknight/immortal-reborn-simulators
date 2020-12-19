// explained at https://rares.uk/typescript-unextend-interface/
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type NodeTypeType = 'baseStats' | 'offensiveStats' | 'defensiveStats' | 'skillLvlStats' | 'skills' | 'special';

export type PerkType = {
  name: string;
  type: NodeTypeType;
  fullNameList?: string[];
  value?: number;
  description?: string;
};
type PerksType = PerkType[];

export type NODEType = {
  id: number;
  x: number;
  y: number;
  points: 1 | 2 | 3 | 4 | 5;
  /** Expended name for stats summary, use name if no fullNameList */
  perks: PerksType;
  /** Additional search keywords other than the name */
  additionalSearchKeywords?: string;
  prevNodesIndexes: number[];
};

export type NODESType = NODEType[];

export type NodeType = {
  id: number;
  x: number;
  y: number;
  isSelected: boolean;
  points: 1 | 2 | 3 | 4 | 5;
  perks: PerksType;
  additionalSearchKeywords?: string;
  nextNodesIndexes: number[];
  prevNodesIndexes: number[];
};
