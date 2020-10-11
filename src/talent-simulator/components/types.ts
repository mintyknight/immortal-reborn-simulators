export type NodeType = {
  id: number;
  x: number;
  y: number;
  isSelected: boolean;
  point: 3 | 4 | 5;
  name: string;
  value?: number;
  description?: string;
  tooltip?: string;
  nextNodesIndexes: number[];
  prevNodesIndexes: number[];
};
