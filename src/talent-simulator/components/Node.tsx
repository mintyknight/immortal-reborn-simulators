import React from 'react';

import { SvgTooltip } from './SvgTooltip';

import { NodeType } from './types';

export interface NodeProps extends Omit<NodeType, 'id'> {
  onClick: () => void;
  showTooltip?: boolean;
  [otherProp: string]: any;
}

export const Node = ({
  x,
  y,
  id,
  point,
  isSelected,
  nodes,
  prevNodesIndexes,
  nextNodesIndexes,
  onClick,
  tooltip,
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
  if (searchString && tooltip?.includes(searchString)) {
    isFound = true;
  }

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
        <SvgTooltip tooltip={tooltip || ''} forceShow={showTooltip}>
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
