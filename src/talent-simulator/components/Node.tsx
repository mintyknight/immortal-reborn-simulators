import React from 'react';
import { Text } from 'grommet';
import { withTranslation } from 'react-i18next';

import { SvgTooltip } from './SvgTooltip';

import { NodeType } from './types';

export interface NodeProps extends NodeType {
  onAdd: () => void;
  onRemove: () => void;
  nodes: any;
  showTooltip?: boolean;
  searchString?: string;
  remindPoints: number;
  t: any;
  isChinese: boolean;
}

const getTooltip = (
  { perks }: { type: string; points: number; perks: NodeType['perks'] },
  t: any,
  isChinese: boolean,
  showTooltip?: boolean
) => {
  return (
    <>
      {perks.map(({ name, value, description }) => {
        return (
          <React.Fragment key={name}>
            <Text>
              {isChinese
                ? `${t(name)}${value ? ` +${value >= 1 ? value : `${Math.round(value * 100)}%`}` : ''}`
                : `${value ? `+${value >= 1 ? value : `${Math.round(value * 100)}%`}` : ''} ${t(name)}`}
            </Text>
            {!showTooltip &&
              description &&
              t(description)
                .split('\n')
                .map((desc: string) => (
                  <React.Fragment key={`${name}-${desc}`}>{desc ? <Text>{desc}</Text> : <br />}</React.Fragment>
                ))}
          </React.Fragment>
        );
      })}
    </>
  );
};

export const Node = withTranslation('translations')(
  ({
    x,
    y,
    id,
    points,
    perks,
    additionalSearchKeywords,
    selectedPoints,
    nodes,
    linkedNodesIndexes,
    onAdd,
    onRemove,
    showTooltip,
    searchString,
    remindPoints,
    t,
    isChinese,
  }: NodeProps) => {
    const circleRadius = 2.5;
    const sideLength = circleRadius * 4;

    let isPartiallySelected = false;
    let isFullySelected = false;
    let isOpen = false;
    let isFound = false;

    const hasMorePoints = remindPoints >= points;

    if (selectedPoints === points) {
      isFullySelected = true;
    } else if (selectedPoints) {
      isPartiallySelected = true;
    } else {
      isOpen =
        hasMorePoints &&
        (id === 0 ||
          linkedNodesIndexes.find(nodeIndex => nodes[nodeIndex].selectedPoints === nodes[nodeIndex].points) !==
            undefined);
    }

    // TODO: Search should be done with special search key word string
    // so the compound node could be found correctly
    const _searchString = searchString?.toLocaleLowerCase();
    isFound =
      !!_searchString &&
      (t(additionalSearchKeywords)?.toLocaleLowerCase().includes(_searchString) ||
        perks.some(
          ({ name, type, fullNameList, description }) =>
            t(name).toLocaleLowerCase().includes(_searchString) ||
            t(type).toLocaleLowerCase().includes(_searchString) ||
            t(description)?.toLocaleLowerCase().includes(_searchString) ||
            fullNameList?.some(name => t(name).toLocaleLowerCase().includes(_searchString))
        ));

    const isAddable = isPartiallySelected || isOpen;

    // const isConnectedToStartPoint = (prevNodeIndex: number, currentNodeIndex: number) => {
    //   if
    //   nodes[currentNodeIndex].linkedNodesIndexes.
    // };

    const isRemovable =
      isPartiallySelected ||
      (isFullySelected &&
        linkedNodesIndexes.filter(nodeIndex => {
          const linkedNode = nodes[nodeIndex];
          return linkedNode.selectedPoints;
        }).length < 2);

    const nodeColor = isFullySelected ? 'blue' : isPartiallySelected || isOpen ? 'green' : 'LightGrey';

    return (
      <>
        {linkedNodesIndexes.map(nodeIndex => {
          if (nodeIndex > id) {
            const nextNode = nodes[nodeIndex];
            const color =
              (isPartiallySelected && nextNode.selectedPoints === nextNode.points) ||
              (isFullySelected && nextNode.selectedPoints)
                ? 'blue'
                : isFullySelected || nextNode.selectedPoints === nextNode.points
                ? 'green'
                : 'LightGrey';
            if (x === nextNode.x || y === nextNode.y) {
              return (
                <line
                  x1={x}
                  y1={y}
                  z={100}
                  x2={nextNode.x}
                  y2={nextNode.y}
                  stroke={color}
                  key={`${id}-${nextNode.id}`}
                />
              );
            } else {
              return (
                <React.Fragment key={`${id}-${nextNode.id}`}>
                  <line x1={x} y1={y} z={100} x2={nextNode.x} y2={y} stroke={color} />
                  <rect x={nextNode.x - 0.5} y={y - 0.5} width="1" height="1" fill={color} />
                  <line x1={nextNode.x} y1={y} z={100} x2={nextNode.x} y2={nextNode.y} stroke={color} />
                </React.Fragment>
              );
            }
          }
          return null;
        })}
        <svg
          x={x - circleRadius * 2}
          y={y - circleRadius * 2}
          width={sideLength + 5}
          height={sideLength + 5}
          viewBox={`0 0 ${sideLength + 5} ${sideLength + 5}`}>
          {isFound && <circle cx={circleRadius * 2} cy={circleRadius * 2} r={4} stroke={'red'} fillOpacity={0} />}
          {isRemovable && (
            <rect x={9} y={0} width={4} height={2} fill="red" style={{ cursor: 'pointer' }} onClick={onRemove} />
          )}
          <text x={7} y={12} fontSize={5} fill={nodeColor} style={{ cursor: 'default' }}>
            {selectedPoints}/{points}
          </text>
          <SvgTooltip tooltip={getTooltip(nodes[id], t, isChinese, showTooltip) || ''} forceShow={showTooltip}>
            <circle
              cx={circleRadius * 2}
              cy={circleRadius * 2}
              r={circleRadius}
              onClick={isAddable ? onAdd : () => {}}
              style={isAddable ? { cursor: 'pointer' } : undefined}
              fill={nodeColor}
            />
          </SvgTooltip>
        </svg>
      </>
    );
  }
);
