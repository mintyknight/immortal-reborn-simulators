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
  isSelected,
  nodes,
  prevNodesIndexes,
  nextNodesIndexes,
  onClick,
  tooltip,
  showTooltip,
}: NodeProps) => {
  const circleRadius = 2.5;
  const sideLength = circleRadius * 2;

  let isOpen = false;

  if (!isSelected) {
    isOpen =
      id === 0 ||
      prevNodesIndexes.find(nodeIndex => nodes[nodeIndex].isSelected) !== undefined ||
      nextNodesIndexes.find(nodeIndex => nodes[nodeIndex].isSelected) !== undefined;
  }

  const isClickable = isSelected || isOpen;

  // if (isOpen) {
  //   o
  // }
  // console.log('#Yuyu ', id, prevNodesIndexes, nextNodesIndexes);
  // console.log('#Yuyu ', id, nodes[id]);
  // console.log('#Yuyu nodes', nodes);

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
            stroke={isSelected && nextNode.isSelected ? 'blue' : 'black'}
            key={`${id}-${nextNode.id}`}></line>
        );
      })}
      <svg
        x={x - circleRadius}
        y={y - circleRadius}
        width={sideLength}
        height={sideLength}
        viewBox={`0 0 ${sideLength} ${sideLength}`}
        onClick={isClickable ? onClick : () => {}}
        style={isClickable ? { cursor: 'pointer' } : undefined}>
        <SvgTooltip tooltip={tooltip || ''} forceShow={showTooltip}>
          <circle
            cx={circleRadius}
            cy={circleRadius}
            r={circleRadius}
            fill={isSelected ? 'blue' : isOpen ? 'green' : 'gray'}></circle>
        </SvgTooltip>
      </svg>
    </>
  );
};
