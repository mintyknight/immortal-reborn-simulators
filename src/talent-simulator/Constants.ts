// export const  = {
//   skill
// }

// const getRange = (min: number, max: number, step?: number = 1) =>
//   Array.from(new Array(max > min ? Math.ceil((max - min) / step) : Math.ceil((min - max) / step)), (x, i) =>
//     max > min ? i * step + min : min - i * step
//   ).join(' | ');

// explained at https://rares.uk/typescript-unextend-interface/
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const MAX_VALUE = {
  x: 6,
  y: 30,
};

export type NodeTypeType = 'stats' | 'skill' | 'special';

export type NODEType = {
  id: number;
  x: number;
  y: number;
  type: NodeTypeType;
  point: 3 | 4 | 5;
  name: string;
  value?: number;
  description?: string;
  prevNodesIndexes: number[];
};

export type NODESType = NODEType[];

export const NODES: NODESType = [
  {
    id: 0,
    x: 2,
    y: 0,
    type: 'stats',
    point: 3,
    name: '威',
    value: 5,
    prevNodesIndexes: [],
  },
  {
    id: 1,
    x: 4,
    y: 2,
    type: 'stats',
    point: 3,
    name: '耐',
    value: 5,
    prevNodesIndexes: [0],
  },
  {
    id: 2,
    x: 5,
    y: 3,
    type: 'stats',
    point: 3,
    name: '秘',
    value: 5,
    prevNodesIndexes: [1],
  },
  {
    id: 3,
    x: 2,
    y: 4,
    type: 'stats',
    point: 3,
    name: '运',
    value: 5,
    prevNodesIndexes: [1],
  },
  {
    id: 4,
    x: 1,
    y: 5,
    type: 'stats',
    point: 3,
    name: '全属性',
    value: 3,
    prevNodesIndexes: [3],
  },
  {
    id: 5,
    x: 3,
    y: 5,
    type: 'stats',
    point: 3,
    name: '敏',
    value: 5,
    prevNodesIndexes: [2, 3],
  },
  {
    id: 6,
    x: 3,
    y: 7,
    type: 'stats',
    point: 3,
    name: '一转',
    value: 2,
    prevNodesIndexes: [5],
  },
  {
    id: 7,
    x: 5,
    y: 7,
    type: 'stats',
    point: 3,
    name: '一转',
    value: 2,
    prevNodesIndexes: [2],
  },
  {
    id: 8,
    x: 6,
    y: 8,
    type: 'stats',
    point: 3,
    name: '运',
    value: 5,
    prevNodesIndexes: [7],
  },
  {
    id: 9,
    x: 1,
    y: 9,
    type: 'stats',
    point: 3,
    name: '耐',
    value: 5,
    prevNodesIndexes: [6],
  },
  {
    id: 10,
    x: 3,
    y: 9,
    type: 'stats',
    point: 3,
    name: '敏',
    value: 5,
    prevNodesIndexes: [6],
  },
  {
    id: 11,
    x: 5,
    y: 9,
    type: 'stats',
    point: 3,
    name: '威',
    value: 5,
    prevNodesIndexes: [7],
  },
  {
    id: 12,
    x: 2,
    y: 10,
    type: 'stats',
    point: 3,
    name: '普攻',
    value: 0.07,
    prevNodesIndexes: [9, 10],
  },
  {
    id: 13,
    x: 4,
    y: 10,
    type: 'stats',
    point: 3,
    name: '腕力',
    value: 0.5,
    prevNodesIndexes: [11],
  },
  {
    id: 14,
    x: 6,
    y: 10,
    type: 'stats',
    point: 3,
    name: '秘',
    value: 5,
    prevNodesIndexes: [8],
  },
  {
    id: 15,
    x: 1,
    y: 13,
    type: 'special',
    point: 3,
    name: '燃烧间隔-50%',
    prevNodesIndexes: [9],
  },
  {
    id: 16,
    x: 3,
    y: 13,
    type: 'stats',
    point: 3,
    name: '二转',
    value: 2,
    prevNodesIndexes: [14],
  },
  {
    id: 17,
    x: 2,
    y: 14,
    type: 'stats',
    point: 3,
    name: '全抗性',
    value: 0.04,
    prevNodesIndexes: [],
  },
  {
    id: 18,
    x: 1,
    y: 15,
    type: 'stats',
    point: 3,
    name: '二转',
    value: 2,
    prevNodesIndexes: [15, 17],
  },
  {
    id: 19,
    x: 3,
    y: 15,
    type: 'stats',
    point: 3,
    name: '全属性',
    value: 3,
    prevNodesIndexes: [16],
  },
  {
    id: 20,
    x: 0,
    y: 16,
    type: 'skill',
    point: 3,
    name: '生命绽放',
    // description: '加血',
    prevNodesIndexes: [18],
  },
  {
    id: 21,
    x: 2,
    y: 16,
    type: 'stats',
    point: 3,
    name: '暴击率',
    value: 0.05,
    prevNodesIndexes: [17, 19],
  },
];
