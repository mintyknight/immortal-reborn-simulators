import React, { useState } from 'react';
import { Heading, Button, Text, Grid, Box } from 'grommet';

import { MAX_VALUE, NODES } from './Constants';

import { Node, NodeType } from './components';

const SCALE = 3;

export function TalentSimulator() {
  const [showAllTooltip, setShowAllTooltip] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [summary, setSummary] = useState({} as { [key: string]: number | undefined });

  const getSize = (maxValue: any) => {
    const width = maxValue.x * 20 + 20;
    const height = maxValue.y * 10 + 10;
    return { width, height, viewBox: `-10 -5 ${width} ${height}` };
  };

  const size = getSize(MAX_VALUE);

  const _nodes: NodeType[] = [];

  const getTooltip = ({
    type,
    name,
    value = 0,
    description = '',
  }: {
    type: string;
    name: string;
    value?: number;
    description?: string;
  }) => {
    if (type === 'stats') {
      return `${name}+${value >= 1 ? value : `${Math.round(value * 100)}%`}`;
    } else if (type === 'skill') {
      return `${name}\n${description}`;
    } else {
      return `${name}`;
    }
  };

  NODES.forEach(NODE => {
    const node: NodeType = {
      id: NODE.id,
      isSelected: false,
      x: NODE.x * 20,
      y: size.height - NODE.y * 10 - 20,
      point: NODE.point,
      name: NODE.name,
      value: NODE.value,
      description: NODE.description,
      tooltip: getTooltip(NODE),
      nextNodesIndexes: [],
      prevNodesIndexes: NODE.prevNodesIndexes,
    };
    node.prevNodesIndexes.forEach(nodeIndex => {
      const prevNode: NodeType = _nodes[nodeIndex];
      prevNode.nextNodesIndexes.push(node.id);
    });
    _nodes.push(node);
  });

  const [nodes, setNodes] = useState(_nodes);

  const onClick = (index: number) => {
    const _node = nodes[index];
    const _nodes = [...nodes];
    _nodes.splice(index, 1, { ..._node, isSelected: !_node.isSelected });
    // console.log('#Yuyu ', _nodes);
    setTotalPoints(totalPoints + (_node.isSelected ? -_node.point : _node.point));
    setNodes(_nodes);
    const _summary = { ...summary };
    if (_summary[_node.name] && _node.value) {
      _summary[_node.name] = (_summary[_node.name] || 0) + (_node.isSelected ? -_node.value : _node.value);
    } else {
      _summary[_node.name] = _node.value;
    }
    setSummary(_summary);
    console.log('#Yuyu ', _summary);
  };

  const clearAll = () => {
    setTotalPoints(0);
    setNodes(_nodes);
    setSummary({});
  };

  return (
    <>
      <Grid
        fill={true}
        rows={['100%']}
        columns={['50%', '50%']}
        gap="small"
        areas={[
          { name: 'nav', start: [0, 0], end: [0, 0] },
          { name: 'main', start: [1, 0], end: [1, 0] },
        ]}>
        <Box gridArea="nav" background="light-5">
          <Grid
            fill="horizontal"
            rows={['xxsmall']}
            columns={['45%', '45%']}
            gap="small"
            areas={[
              { name: 'button1', start: [0, 0], end: [0, 0] },
              { name: 'button2', start: [1, 0], end: [1, 0] },
            ]}>
            <Button
              gridArea="button1"
              primary
              label={showAllTooltip ? '全部隐藏' : '全部显示'}
              onClick={() => setShowAllTooltip(!showAllTooltip)}
            />
            <Button gridArea="button2" fill={false} primary label={'重置'} onClick={() => clearAll()} />
          </Grid>
          <Heading size="small">{totalPoints}</Heading>
          {Object.keys(summary).map(key => {
            const value = summary[key];
            if (value === undefined) {
              return <Text>{key}</Text>;
            } else if (value > 0) {
              return <Text>{`${key}+${value > 1 ? value : `${Math.round(value * 100)}%`}`}</Text>;
            }
            return null;
          })}
        </Box>
        <Box gridArea="main" background="light-2">
          <svg width={size.width * SCALE} height={size.height * SCALE} viewBox={size.viewBox}>
            <rect x={-10} y={-10} width="100%" height="100%" fill="Cyan"></rect>

            {nodes.map(node => (
              <Node
                {...node}
                onClick={() => onClick(node.id)}
                nodes={nodes}
                showTooltip={showAllTooltip}
                key={node.id}></Node>
            ))}
          </svg>
        </Box>
      </Grid>
    </>
  );
}
