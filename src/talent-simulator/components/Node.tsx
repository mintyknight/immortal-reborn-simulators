import React from 'react';
import { Text } from 'grommet';

import { SvgTooltip } from './SvgTooltip';

import { NodeType } from './types';

export interface NodeProps extends NodeType {
  onClick: () => void;
  nodes: any;
  showTooltip?: boolean;
  searchString?: string;
  remindPoints: number;
}

const getTooltip = (
  { type, point, perks }: { type: string; point: number; perks: NodeType['perks'] },
  showTooltip?: boolean
) => {
  return (
    <>
      {perks.map(({ name, type, value }, index) => {
        return (
          <Text key={name}>
            {`${name}${value ? `+${value >= 1 ? value : `${Math.round(value * 100)}%`}` : ''}${
              index === 0 && !showTooltip ? `  (${point}点)` : ''
            }`}
          </Text>
        );
      })}
    </>
  );
};

export const Node = ({
  x,
  y,
  id,
  point,
  perks,
  AdditionalSearchKeywords,
  isSelected,
  nodes,
  prevNodesIndexes,
  nextNodesIndexes,
  onClick,
  showTooltip,
  searchString,
  remindPoints,
}: NodeProps) => {
  const circleRadius = 2.5;
  const sideLength = circleRadius * 4;

  let isOpen = false;
  let isFound = false;

  const hasMorePoints = remindPoints >= point;

  if (!isSelected) {
    isOpen =
      hasMorePoints &&
      (id === 0 ||
        prevNodesIndexes.find(nodeIndex => nodes[nodeIndex].isSelected) !== undefined ||
        nextNodesIndexes.find(nodeIndex => nodes[nodeIndex].isSelected) !== undefined);
  }

  // TODO: Search should be done with special search key word string
  // so the compound node could be found correctly

  isFound =
    !!searchString &&
    (AdditionalSearchKeywords?.includes(searchString) ||
      perks.some(
        ({ name, fullNameList, description }) =>
          name.includes(searchString) ||
          description?.includes(searchString) ||
          fullNameList?.some(name => name.includes(searchString))
      ));

  const isClickable = isSelected || isOpen;

  return (
    <>
      {nextNodesIndexes.map(nodeIndex => {
        const nextNode = nodes[nodeIndex];
        return (
          <line
            x1={x}
            y1={y}
            z={100}
            x2={nextNode.x}
            y2={nextNode.y}
            stroke={isSelected && nextNode.isSelected ? 'blue' : 'LightGrey'}
            key={`${id}-${nextNode.id}`}></line>
        );
      })}
      <svg
        x={x - circleRadius * 2}
        y={y - circleRadius * 2}
        width={sideLength}
        height={sideLength}
        viewBox={`0 0 ${sideLength} ${sideLength}`}
        onClick={isClickable ? onClick : () => {}}
        style={isClickable ? { cursor: 'pointer' } : undefined}>
        {isFound && <circle cx={circleRadius * 2} cy={circleRadius * 2} r={4} stroke={'red'} fillOpacity={0}></circle>}
        <SvgTooltip tooltip={getTooltip(nodes[id], showTooltip) || ''} forceShow={showTooltip}>
          <circle
            cx={circleRadius * 2}
            cy={circleRadius * 2}
            r={circleRadius}
            fill={isSelected ? 'blue' : isOpen ? 'green' : 'LightGrey'}></circle>
        </SvgTooltip>
      </svg>
      <svg></svg>
    </>
  );
};
