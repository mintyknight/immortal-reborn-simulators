// explained at https://rares.uk/typescript-unextend-interface/
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type NodeTypeType = '属性' | '进攻属性' | '防御属性' | '技能等级属性' | '技能' | '特殊';

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
  point: 1 | 2 | 3 | 4 | 5;
  /** Expended name for stats summary, use name if no fullNameList */
  perks: PerksType;
  /** Additional search keywords other than the name */
  AdditionalSearchKeywords?: string;
  prevNodesIndexes: number[];
};

export type NODESType = NODEType[];

export type NodeType = {
  id: number;
  x: number;
  y: number;
  isSelected: boolean;
  point: 1 | 2 | 3 | 4 | 5;
  perks: PerksType;
  AdditionalSearchKeywords?: string;
  nextNodesIndexes: number[];
  prevNodesIndexes: number[];
};
