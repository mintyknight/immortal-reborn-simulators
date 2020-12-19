import React from 'react';
import { Text } from 'grommet';
import { withTranslation } from 'react-i18next';

import { SvgTooltip } from './SvgTooltip';

import { NodeType } from './types';

export interface NodeProps extends NodeType {
  onClick: () => void;
  nodes: any;
  showTooltip?: boolean;
  searchString?: string;
  remindPoints: number;
  t: any;
  isChinese: boolean;
}

const getTooltip = (
  { type, points, perks }: { type: string; points: number; perks: NodeType['perks'] },
  t: any,
  isChinese: boolean,
  showTooltip?: boolean
) => {
  return (
    <>
      {perks.map(({ name, type, value, description }, index) => {
        return (
          <>
            <Text key={name}>
              {isChinese
                ? `${t(name)}${value ? ` +${value >= 1 ? value : `${Math.round(value * 100)}%`}` : ''}${
                    index === 0 && !showTooltip ? ` (${t('points', { points })})` : ''
                  }`
                : `${value ? `+${value >= 1 ? value : `${Math.round(value * 100)}%`}` : ''} ${t(name)}${
                    index === 0 && !showTooltip ? ` (${t('points', { points })})` : ''
                  }`}
            </Text>
            {!showTooltip &&
              description &&
              t(description)
                .split('\n')
                .map((desc: string, index: number) =>
                  desc ? <Text key={`${name}-desc-${index}`}>{desc}</Text> : <br />
                )}
          </>
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
    isSelected,
    nodes,
    prevNodesIndexes,
    nextNodesIndexes,
    onClick,
    showTooltip,
    searchString,
    remindPoints,
    t,
    isChinese,
  }: NodeProps) => {
    const circleRadius = 2.5;
    const sideLength = circleRadius * 4;

    let isOpen = false;
    let isFound = false;

    const hasMorePoints = remindPoints >= points;

    if (!isSelected) {
      isOpen =
        hasMorePoints &&
        (id === 0 ||
          prevNodesIndexes.find(nodeIndex => nodes[nodeIndex].isSelected) !== undefined ||
          nextNodesIndexes.find(nodeIndex => nodes[nodeIndex].isSelected) !== undefined);
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
          {isFound && <circle cx={circleRadius * 2} cy={circleRadius * 2} r={4} stroke={'red'} fillOpacity={0} />}
          <SvgTooltip tooltip={getTooltip(nodes[id], t, isChinese, showTooltip) || ''} forceShow={showTooltip}>
            <circle
              cx={circleRadius * 2}
              cy={circleRadius * 2}
              r={circleRadius}
              fill={isSelected ? 'blue' : isOpen ? 'green' : 'LightGrey'}
            />
          </SvgTooltip>
        </svg>
        <svg></svg>
      </>
    );
  }
);
