import React, { useEffect, useState } from 'react';
import { Heading, Button, Text, Grid, Box, TextInput, DropButton } from 'grommet';
import { withTranslation } from 'react-i18next';
import { Configure, Bug } from 'grommet-icons';

import { MAX_VALUE, NODES } from './components/Constants';

import { Node, NodeType, PerkType } from './components';

const credits = ['creator', 'englishTranslator'];

const AppBar = (props: any) => (
  <Box
    height="xxsmall"
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="medium"
    style={{ zIndex: '1' }}
    {...props}
  />
);

// const SCALE = 4;
const buildSeparator = '-';
const urlSeparator = '?';
const startingTowerLevel = 0;

type SummaryType = { [key: string]: { [key: string]: number | undefined } };

export const TalentSimulator = withTranslation()(({ pageSize, t, i18n }: { pageSize: string; t: any; i18n: any }) => {
  const [showAllTooltip, setShowAllTooltip] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [summary, setSummary] = useState({} as SummaryType);
  const [searchString, setsearchString] = useState('');
  const [imporBuildString, setImportBuildString] = useState('');
  const [towerLevel, setTowerLevel] = useState(startingTowerLevel);
  const [showSidebar, setShowSidebar] = useState(false);
  const [reportBug, setReportBug] = useState(false);
  const [showCredit, setShowCredit] = useState(false);

  const isSmallPage = pageSize === 'small';
  const isChinese = i18n.language === 'cn';

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

  NODES.forEach(NODE => {
    const node: NodeType = {
      id: NODE.id,
      isSelected: false,
      x: NODE.x * 20,
      y: size.height - NODE.y * 10 - 20,
      points: NODE.points,
      perks: NODE.perks,
      additionalSearchKeywords: NODE.additionalSearchKeywords,
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

  const addToSummary = ({ isSelected, perks }: NodeType, summary: any) => {
    const _summary = { ...summary };
    perks.forEach(({ name, fullNameList, type, value = 0 }: PerkType) => {
      if (!_summary[type]) {
        _summary[type] = {};
      }

      // perks with fullNameList are Base Stats
      if (!!fullNameList) {
        fullNameList.forEach(fullname => {
          _summary[type][fullname] = (_summary[type][fullname] || 0) + (isSelected ? -value : value);
        });
      } else if (type.toLocaleLowerCase().includes('stats')) {
        _summary[type][name] = (_summary[type][name] || 0) + (isSelected ? -value : value);
      } else {
        _summary[type][name] = !isSelected;
      }
    });
    return _summary;
  };

  const onClick = (index: number) => {
    const _node = nodes[index];
    const _nodes = [...nodes];
    _nodes.splice(index, 1, { ..._node, isSelected: !_node.isSelected });
    setTotalPoints(totalPoints + (_node.isSelected ? -_node.points : _node.points));
    setNodes(_nodes);
    const _summary = addToSummary(_node, summary);
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
    let _summary: SummaryType = {};
    (buildString || imporBuildString).split(buildSeparator).forEach(indexString => {
      const index = parseInt(indexString);
      if (!isNaN(index) && index < _nodes.length) {
        const _node = _nodes[index];
        _nodes.splice(index, 1, { ..._node, isSelected: !_node.isSelected });
        _totalPoints = _totalPoints + (_node.isSelected ? -_node.points : _node.points);
        _summary = addToSummary(_node, _summary);
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

  const statusPanel = (
    <Box gridArea="stats" pad={'10px'}>
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
          { name: 'searchBar', start: [0, 3], end: [1, 3] },
          { name: 'towerText', start: [2, 3], end: [2, 3] },
          { name: 'towerLevel', start: [3, 3], end: [3, 3] },
        ]}>
        <Button
          gridArea="showAll"
          primary
          label={showAllTooltip ? t('hideAll') : t('showAll')}
          onClick={() => setShowAllTooltip(!showAllTooltip)}
        />
        <Button gridArea="resetAll" fill={false} primary label={t('resetBuild')} onClick={() => clearAll()} />
        <Box gridArea="importString">
          <TextInput
            placeholder={t('loadBuild')}
            value={imporBuildString}
            onChange={event => {
              setImportBuildString(event.target.value);
            }}
          />
        </Box>
        <Button gridArea="importButton" fill={false} primary label={t('load')} onClick={() => importBuild()} />
        <Box gridArea="currentBuild">
          <TextInput disabled placeholder={t('currentBuild')} value={getBuild()} />
        </Box>
        <Button
          gridArea="exportButton"
          fill={false}
          primary
          label={t('share')}
          onClick={() => {
            const link = `${window.location.href}${urlSeparator}${getBuild()}`;
            navigator.clipboard.writeText(link).then(() => alert(t('buildCopied', { link })));
          }}
        />
        <Box gridArea="searchBar">
          <TextInput
            placeholder={t('search4Perk')}
            value={searchString}
            onChange={event => setsearchString(event.target.value)}
          />
        </Box>
        <Box gridArea="towerText" alignContent="end" justify="center">
          <Text size="large">{t('tower')}</Text>
        </Box>
        <Box gridArea="towerLevel">
          <TextInput
            placeholder={t('towerLvl')}
            type="number"
            value={towerLevel}
            onChange={event => setTowerLevel(parseInt(event.target.value))}
          />
        </Box>
      </Grid>

      <Heading size="none">
        {towerLevel
          ? t('remainPoints', { points: towerLevel + 5 - totalPoints })
          : t('reqiredPoints', { totalPoints, towerLevels: Math.max(totalPoints - 5, 0) })}
      </Heading>
      <Grid
        fill="vertical"
        rows={['medium', 'small']}
        columns={['32%', '32%', '32%']}
        gap="small"
        areas={[
          { name: 'offensiveStats', start: [0, 0], end: [0, 0] },
          { name: 'defensiveStats', start: [1, 0], end: [1, 0] },
          { name: 'skills', start: [2, 0], end: [2, 0] },
          { name: 'baseStats', start: [0, 1], end: [0, 1] },
          { name: 'skillLvlStats', start: [1, 1], end: [1, 1] },
          { name: 'special', start: [2, 1], end: [2, 1] },
        ]}>
        {['offensiveStats', 'defensiveStats', 'baseStats', 'skillLvlStats', 'skills', 'special'].map((type, index) => {
          return (
            <Box gridArea={type} background="light-5" key={type}>
              <Heading size="small" level={3} margin="xsmall">
                {t(type)}
              </Heading>
              {summary[type] && (
                <Box overflow="auto">
                  {Object.keys(summary[type]).map(name => {
                    const value = summary[type][name];
                    let string = '';
                    if (typeof value === 'boolean') {
                      string = value ? t(name) : '';
                    } else {
                      if (isChinese) {
                        string = value ? `${t(name)} +${value > 1 ? value : `${Math.round(value * 100)}%`}` : '';
                      } else {
                        string = value ? `+${value > 1 ? value : `${Math.round(value * 100)}%`} ${t(name)}` : '';
                      }
                    }

                    return (
                      string !== '' && (
                        // <Box key={key}>
                        <Text key={name}>{string}</Text>
                      )
                    );
                  })}
                </Box>
              )}
            </Box>
          );
        })}
      </Grid>
    </Box>
  );

  const repoProvider = window.location.href.includes('github') ? 'github' : 'gitee';

  return (
    <>
      <AppBar>
        <Heading level="3" margin="none">
          {t('title')}
        </Heading>
        <Box direction="row">
          <Button
            label={t('language')}
            plain={true}
            margin="10px"
            onClick={() => i18n.changeLanguage(isChinese ? 'en' : 'cn')}
          />
          <DropButton
            icon={<Bug />}
            open={reportBug}
            onOpen={() => setReportBug(true)}
            onClose={() => setReportBug(false)}
            dropContent={
              <Button
                label={t('bugReport', { repoProvider })}
                onClick={() =>
                  window.open(`https://${repoProvider}.com/mintyknight/immortal-reborn-simulators/issues`, '_blank')
                }
              />
            }
            dropProps={{ align: { top: 'bottom', right: 'right' } }}
          />
          <DropButton
            label={t('credit')}
            plain={true}
            margin="10px"
            open={showCredit}
            onOpen={() => setShowCredit(true)}
            onClose={() => setShowCredit(false)}
            dropContent={
              <>
                {credits.map(credit => (
                  <Text key={credit}>{t(credit)}</Text>
                ))}
              </>
            }
            dropProps={{ align: { top: 'bottom', right: 'right' } }}
          />
          {isSmallPage && (
            <DropButton
              icon={<Configure />}
              open={showSidebar}
              onOpen={() => setShowSidebar(true)}
              onClose={() => setShowSidebar(false)}
              dropContent={statusPanel}
              dropProps={{ align: { top: 'bottom', right: 'right' } }}
            />
          )}
        </Box>
      </AppBar>
      <Box overflow={{ horizontal: 'hidden' }}>
        <Grid
          fill={true}
          rows={['200%']}
          columns={isSmallPage ? ['100%'] : ['50%', '50%']}
          gap="small"
          areas={
            isSmallPage
              ? [{ name: 'starMap', start: [0, 0], end: [0, 0] }]
              : [
                  { name: 'stats', start: [0, 0], end: [0, 0] },
                  { name: 'starMap', start: [1, 0], end: [1, 0] },
                ]
          }>
          {!isSmallPage && statusPanel}

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
                  remindPoints={towerLevel ? towerLevel + 5 - totalPoints : 999}
                  key={node.id}
                  isChinese={isChinese}
                />
              ))}
            </svg>
          </Box>
        </Grid>
      </Box>
    </>
  );
});
