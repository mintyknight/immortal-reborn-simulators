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
  type: 'basic' | 'notable' | 'keystone' | 'startPoint';
  /** Expended name for stats summary, use name if no fullNameList */
  perks: PerksType;
  /** Additional search keywords other than the name */
  additionalSearchKeywords?: string;
  linkedNodesIndexes: number[];
};

export type NODESType = NODEType[];

export interface NodeType extends NODEType {
  selectedPoints: number;
}
