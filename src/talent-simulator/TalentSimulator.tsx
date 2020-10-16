import React, { useEffect, useState } from 'react';
import { Heading, Button, Text, Grid, Box, TextInput } from 'grommet';

import { MAX_VALUE, NODES } from './Constants';

import { Node, NodeType } from './components';

// const SCALE = 4;
const buildSeparator = '-';
const urlSeparator = '?';

export function TalentSimulator() {
  const [showAllTooltip, setShowAllTooltip] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [summary, setSummary] = useState({} as { [key: string]: number | undefined });
  const [searchString, setsearchString] = useState('');
  const [imporBuildString, setImportBuildString] = useState('');

  useEffect(() => {
    const pathParts = window.location.href.split(urlSeparator);
    const buildString = pathParts[1];
    if (buildString) {
      importBuild(buildString);
      window.history.pushState('some state', 'some title', pathParts[0]);
    }
  });

  const getSize = (maxValue: any) => {
    const width = maxValue.x * 20 + 20;
    const height = maxValue.y * 10 + 10;
    return { width, height, viewBox: `-10 -5 ${width} ${height}` };
  };

  const size = getSize(MAX_VALUE);

  const initialNodes: NodeType[] = [];

  const getTooltip = ({
    type,
    name,
    point,
    value = 0,
    description = '',
  }: {
    type: string;
    name: string;
    point: number;
    value?: number;
    description?: string;
  }) => {
    if (type === 'stats') {
      return `${name}+${value >= 1 ? value : `${Math.round(value * 100)}%`}: ${point}点`;
    } else if (type === 'skill') {
      return `${name}: ${point}点`;
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
      const prevNode: NodeType = initialNodes[nodeIndex];
      prevNode.nextNodesIndexes.push(node.id);
    });
    initialNodes.push(node);
  });

  const [nodes, setNodes] = useState(initialNodes);

  const onClick = (index: number) => {
    const _node = nodes[index];
    const _nodes = [...nodes];
    _nodes.splice(index, 1, { ..._node, isSelected: !_node.isSelected });
    setTotalPoints(totalPoints + (_node.isSelected ? -_node.point : _node.point));
    setNodes(_nodes);
    const _summary = { ...summary };
    if (_summary[_node.name] && _node.value) {
      _summary[_node.name] = (_summary[_node.name] || 0) + (_node.isSelected ? -_node.value : _node.value);
    } else {
      _summary[_node.name] = _node.value;
    }
    setSummary(_summary);
  };

  const clearAll = () => {
    setTotalPoints(0);
    setNodes(initialNodes);
    setSummary({});
  };

  const importBuild = (buildString?: string) => {
    const _nodes = [...initialNodes];
    let _totalPoints = 0;
    const _summary: { [key: string]: number | undefined } = {};
    (buildString || imporBuildString).split(buildSeparator).forEach(indexString => {
      const index = parseInt(indexString);
      if (!isNaN(index) && index < _nodes.length) {
        const _node = _nodes[index];
        _nodes.splice(index, 1, { ..._node, isSelected: !_node.isSelected });
        _totalPoints = _totalPoints + (_node.isSelected ? -_node.point : _node.point);
        if (_summary[_node.name] && _node.value) {
          _summary[_node.name] = (_summary[_node.name] || 0) + (_node.isSelected ? -_node.value : _node.value);
        } else {
          _summary[_node.name] = _node.value;
        }
      }
    });
    setTotalPoints(_totalPoints);
    setNodes(_nodes);
    setSummary(_summary);
    setImportBuildString('');
  };

  const getBuild = () => {
    let buildString = '';
    nodes.forEach(node => {
      if (node.isSelected) {
        buildString += node.id === 0 ? node.id : `${buildSeparator}${node.id}`;
      }
    });
    return buildString;
  };

  return (
    <>
      <Grid
        fill={true}
        rows={['100%']}
        columns={['50%', '50%']}
        gap="small"
        areas={[
          { name: 'stats', start: [0, 0], end: [0, 0] },
          { name: 'starMap', start: [1, 0], end: [1, 0] },
        ]}>
        <Box gridArea="stats" pad={'10px'} background="light-5">
          <Grid
            fill="horizontal"
            rows={['xxsmall', 'xxsmall', 'xxsmall', 'xxsmall']}
            columns={['22%', '22%', '22%', '22%']}
            gap="small"
            areas={[
              { name: 'showAll', start: [2, 0], end: [2, 0] },
              { name: 'resetAll', start: [3, 0], end: [3, 0] },
              { name: 'importString', start: [0, 1], end: [2, 1] },
              { name: 'importButton', start: [3, 1], end: [3, 1] },
              { name: 'currentBuild', start: [0, 2], end: [2, 2] },
              { name: 'exportButton', start: [3, 2], end: [3, 2] },
              { name: 'searchBar', start: [0, 3], end: [3, 3] },
            ]}>
            <Button
              gridArea="showAll"
              primary
              label={showAllTooltip ? '全部隐藏' : '全部显示'}
              onClick={() => setShowAllTooltip(!showAllTooltip)}
            />
            <Button gridArea="resetAll" fill={false} primary label={'重置'} onClick={() => clearAll()} />
            <Box gridArea="importString" background="light-5">
              <TextInput
                placeholder="导入BD的星图点"
                value={imporBuildString}
                onChange={event => {
                  setImportBuildString(event.target.value);
                }}
              />
            </Box>
            <Button gridArea="importButton" fill={false} primary label={'导入'} onClick={() => importBuild()} />
            <Box gridArea="currentBuild" background="light-5">
              <TextInput disabled placeholder="现在的星图点" value={getBuild()} />
            </Box>
            <Button
              gridArea="exportButton"
              fill={false}
              primary
              label={'导出链接'}
              onClick={() => {
                const link = `${window.location.href}${urlSeparator}${getBuild()}`;
                navigator.clipboard.writeText(link).then(() => alert(`链接已复制到剪贴板，请粘贴使用\n${link}`));
              }}
            />
            <Box gridArea="searchBar" background="light-5">
              <TextInput
                placeholder="搜索星图"
                value={searchString}
                onChange={event => setsearchString(event.target.value)}
              />
            </Box>
          </Grid>

          <Heading size="none">{`需要：${totalPoints}星图点`}</Heading>
          {Object.keys(summary).map(key => {
            const value = summary[key];
            if (value === undefined) {
              return <Text key={key}>{key}</Text>;
            } else if (value > 0) {
              return <Text key={key}>{`${key}+${value > 1 ? value : `${Math.round(value * 100)}%`}`}</Text>;
            }
            return null;
          })}
        </Box>
        <Box gridArea="starMap" background="light-2">
          <svg width={'100%'} viewBox={size.viewBox}>
            <rect x={-10} y={-5} width="100%" height="100%" fill="Cyan"></rect>

            {nodes.map(node => (
              <Node
                {...node}
                onClick={() => onClick(node.id)}
                nodes={nodes}
                showTooltip={showAllTooltip}
                searchString={searchString}
                key={node.id}></Node>
            ))}
          </svg>
        </Box>
      </Grid>
    </>
  );
}
