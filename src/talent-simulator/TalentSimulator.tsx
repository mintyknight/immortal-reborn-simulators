import React, { useEffect, useState } from 'react';
import { Heading, Button, Text, Grid, Box, TextInput, DropButton } from 'grommet';
import { withTranslation } from 'react-i18next';
import { Configure } from 'grommet-icons';

import { MAX_VALUE, NODES } from './components/Constants';

import { Node, NodeType, PerkType } from './components';

const credits = ['creator', 'dataProvider'];

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
const defaultPoints = 3;

type SummaryType = { [key: string]: { [key: string]: number | undefined | { [key: string]: number } } };

export const TalentSimulator = withTranslation()(({ pageSize, t, i18n }: { pageSize: string; t: any; i18n: any }) => {
  const [initialNodes, setInitialNodes] = useState<NodeType[]>([]);
  const [nodes, setNodes] = useState(initialNodes);
  // const [showAllTooltip, setShowAllTooltip] = useState(false);
  const [showAllTooltip] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [summary, setSummary] = useState({} as SummaryType);
  const [searchString, setsearchString] = useState('');
  const [imporBuildString, setImportBuildString] = useState('');
  const [level, setLevel] = useState<number>();
  const [currentX, setCurrentX] = useState(-1200);
  const [currentZoom, setCurrentZoom] = useState(1);
  // const [isMouseHold, setIsMouseHold] = useState(false);

  const isChinese = i18n.language === 'cn';

  useEffect(() => {
    setCurrentZoom(pageSize === 'small' ? 1 : 0.6);
  }, [pageSize]);

  useEffect(() => {
    const nodes = NODES.map(NODE => {
      NODE.linkedNodesIndexes.forEach(index => {
        if (!NODES[index].linkedNodesIndexes.includes(NODE.id)) {
          console.error(`#Error: missing link from node ${index} to node ${NODE.id}`);
        }
      });
      return {
        id: NODE.id,
        selectedPoints: 0,
        x: NODE.x * 20,
        y: size.height - NODE.y * 20 - 15,
        points: NODE.points,
        type: NODE.type,
        perks: NODE.perks,
        additionalSearchKeywords: NODE.additionalSearchKeywords,
        linkedNodesIndexes: NODE.linkedNodesIndexes,
      };
    });
    setInitialNodes(nodes);
    setNodes(nodes);

    const pathParts = window.location.href.split(urlSeparator);
    const buildString = pathParts[1];
    if (buildString) {
      importBuild(buildString, nodes);
      window.history.pushState('some state', 'some title', pathParts[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (pageSize === 'small') {
  //     setShowAllTooltip(true);
  //   }
  // }, [pageSize]);

  const getSize = (maxValue: any) => {
    const width = maxValue.x * 20 + 40;
    const height = maxValue.y * 20 + 20;
    return { width, height, viewBox: `-10 -5 ${width} ${height}` };
  };

  const size = getSize(MAX_VALUE);

  const updateSummary = ({ perks }: NodeType, summary: any, isAdd: boolean, selectedPoints = 1) => {
    const _summary = { ...summary };
    perks.forEach(({ name, fullNameList, type, value = 0, minValue = 0, maxValue = 0 }: PerkType) => {
      if (!_summary[type]) {
        _summary[type] = {};
      }

      // perks with fullNameList are Base Stats
      if (!!fullNameList) {
        fullNameList.forEach(fullname => {
          _summary[type][fullname] = (_summary[type][fullname] || 0) + (isAdd ? value : -value) * selectedPoints;
        });
      } else if (type.toLocaleLowerCase().includes('stats')) {
        if (value) {
          _summary[type][name] = (_summary[type][name] || 0) + (isAdd ? value : -value) * selectedPoints;
        } else {
          if (!_summary[type][name]) {
            _summary[type][name] = {};
          }
          _summary[type][name].min = (_summary[type][name].min || 0) + (isAdd ? minValue : -minValue) * selectedPoints;
          _summary[type][name].max = (_summary[type][name].max || 0) + (isAdd ? maxValue : -maxValue) * selectedPoints;
        }
      } else {
        _summary[type][name] = isAdd;
      }
    });
    return _summary;
  };

  const onUpdate = (index: number, isAdd: boolean, selectedPoints: number = 1) => {
    const _node = nodes[index];
    const _nodes = [...nodes];
    _nodes.splice(index, 1, {
      ..._node,
      selectedPoints: _node.selectedPoints + (isAdd ? selectedPoints : -selectedPoints),
    });
    setTotalPoints(totalPoints + (isAdd ? selectedPoints : -selectedPoints));
    setNodes(_nodes);
    const _summary = updateSummary(_node, summary, isAdd, selectedPoints);
    setSummary(_summary);
  };

  const clearAll = () => {
    setTotalPoints(0);
    setNodes(initialNodes);
    setSummary({});
  };

  const importBuild = (buildString?: string, nodes?: NodeType[]) => {
    const _nodes = initialNodes.length ? [...initialNodes] : nodes || [];
    let _totalPoints = 0;
    let _summary: SummaryType = {};
    (buildString || imporBuildString).split(buildSeparator).forEach(indexStr => {
      const [indexString, selectedPointsString] = indexStr.split('.');
      const index = parseInt(indexString);
      if (!isNaN(index) && index < _nodes.length) {
        const _node = _nodes[index];
        const selectedPoints = parseInt(selectedPointsString) || _node.points;
        _nodes.splice(index, 1, { ..._node, selectedPoints: selectedPoints });
        _totalPoints = _totalPoints + selectedPoints;
        _summary = updateSummary(_node, _summary, true, selectedPoints);
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
      if (node.selectedPoints) {
        buildString += buildString
          ? `${buildSeparator}${node.id}${node.selectedPoints !== node.points ? `.${node.selectedPoints}` : ''}`
          : node.id;
      }
    });
    return buildString;
  };

  const statusPanel = (
    <Box pad={'10px'}>
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
          { name: 'levelText', start: [2, 3], end: [2, 3] },
          { name: 'level', start: [3, 3], end: [3, 3] },
        ]}>
        {/* <Button
          gridArea="showAll"
          primary
          label={showAllTooltip ? t('hideAll') : t('showAll')}
          onClick={() => setShowAllTooltip(!showAllTooltip)}
        /> */}
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
        <Box gridArea="levelText" alignContent="end" justify="center">
          <Text size="large">{t('level')}</Text>
        </Box>
        <Box gridArea="level">
          <TextInput
            placeholder={t('currentLevel')}
            type="number"
            value={level}
            onChange={event => setLevel(parseInt(event.target.value))}
          />
        </Box>
      </Grid>

      <Heading size="small">
        {level
          ? t('remainPoints', { points: level + defaultPoints - totalPoints })
          : t('reqiredPoints', { totalPoints, Levels: Math.max(totalPoints - defaultPoints, 0) })}
      </Heading>
      <Grid
        fill="vertical"
        rows={['medium', 'small']}
        columns={['32%', '32%', '32%']}
        gap="small"
        areas={[
          { name: 'offensiveStats', start: [0, 0], end: [0, 0] },
          { name: 'defensiveStats', start: [1, 0], end: [1, 0] },
          { name: 'passive', start: [2, 0], end: [2, 0] },
          { name: 'baseStats', start: [0, 1], end: [0, 1] },
          { name: 'skillLvlStats', start: [1, 1], end: [1, 1] },
          { name: 'specialStats', start: [2, 1], end: [2, 1] },
        ]}>
        {['offensiveStats', 'defensiveStats', 'baseStats', 'skillLvlStats', 'passive', 'specialStats'].map(type => {
          return (
            <Box gridArea={type} background="light-5" key={type}>
              <Heading size="small" margin="xsmall">
                {t(type)}
              </Heading>
              {summary[type] && (
                <Box overflow="auto">
                  {Object.keys(summary[type]).map(name => {
                    const value = summary[type][name];
                    let string = '';
                    if (typeof value === 'boolean') {
                      string = value ? t(name) : '';
                    } else if (typeof value === 'object') {
                      const { min, max } = value;
                      if (min || max) {
                        if (isChinese) {
                          string = `${t(name)} +${min}~${max}`;
                        } else {
                          string = `+${min}~${max} ${t(name)}`;
                        }
                      } else {
                        string = '';
                      }
                    } else {
                      if (isChinese) {
                        string = value
                          ? `${t(name)} +${value > 1 ? value : `${Math.round(value * 10000) / 100}%`}`
                          : '';
                      } else {
                        string = value
                          ? `+${value > 1 ? value : `${Math.round(value * 10000) / 100}%`} ${t(name)}`
                          : '';
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

  // const listeners = {
  //   onMouseMove: (e: any) => {
  //     if (isMouseHold) {
  //       // if (e.touches) { e = e.touches[0]; }
  //       // return {
  //       //   x: (e.clientX - CTM.e) / CTM.a,
  //       //   y: (e.clientY - CTM.f) / CTM.d
  //       // };
  //       // console.log('#Yuyu ', e);
  //       setCurrentX(currentX + 10);
  //     }
  //   },
  //   onMouseDown: (e: any) => {
  //     console.log('#Yuyu ', 'down');
  //     setIsMouseHold(true);
  //   },
  //   onMouseUp: (e: any) => {
  //     console.log('#Yuyu ', 'up');
  //     setIsMouseHold(false);
  //   },
  //   onMouseLeave: (e: any) => {
  //     console.log('#Yuyu ', 'leave');
  //     setIsMouseHold(false);
  //   },
  // };

  const moveStarMap = (isLeft: boolean) => {
    if ((isLeft && currentX < 100) || (!isLeft && currentX > -2500)) {
      setCurrentX(currentX + 200 * currentZoom * (isLeft ? 1 : -1));
    }
  };

  const zoomStarMap = (isZoomIn: boolean) => {
    if ((isZoomIn && currentZoom < 2) || (!isZoomIn && currentZoom > 0.4)) {
      setCurrentZoom(currentZoom + (isZoomIn ? 0.1 : -0.1));
    }
  };

  return (
    <>
      <AppBar>
        <Heading level="3" margin="none">
          {t('title')}
        </Heading>
        <Box direction="row">
          <DropButton
            icon={<Configure />}
            dropContent={statusPanel}
            dropProps={{ align: { top: 'bottom', right: 'right' } }}
          />
          <Button label={t('language')} onClick={() => i18n.changeLanguage(isChinese ? 'en' : 'cn')} />
          <DropButton
            label={t('askForUpdate')}
            dropContent={
              <>
                <Button
                  label={t('forum')}
                  onClick={() => window.open(`https://www.taptap.com/topic/15451647`, '_blank')}
                />
                <Button
                  label={t('bugReport', { repoProvider })}
                  onClick={() =>
                    window.open(`https://${repoProvider}.com/mintyknight/immortal-reborn-simulators/issues`, '_blank')
                  }
                />
              </>
            }
            dropProps={{ align: { top: 'bottom', right: 'right' } }}
          />
          <DropButton
            label={t('credit')}
            dropContent={
              <>
                {credits.map(credit => (
                  <Text key={credit}>{t(credit)}</Text>
                ))}
              </>
            }
            dropProps={{ align: { top: 'bottom', right: 'right' } }}
          />
        </Box>
      </AppBar>
      <Box overflow={{ horizontal: 'hidden' }}>
        <Grid
          fill={true}
          rows={['200%']}
          columns={['99%']}
          gap="small"
          areas={[{ name: 'starMap', start: [0, 0], end: [0, 0] }]}>
          <Box gridArea="starMap" background="light-2">
            <Grid
              rows={['100%']}
              columns={['22%', '4%', '22%', '4%', '22%', '4%', '22%']}
              areas={[
                { name: 'left', start: [0, 0], end: [0, 0] },
                { name: 'midLeft', start: [2, 0], end: [2, 0] },
                { name: 'midRight', start: [4, 0], end: [4, 0] },
                { name: 'right', start: [6, 0], end: [6, 0] },
              ]}>
              <Button gridArea="left" primary label="<" onClick={() => moveStarMap(true)} />
              <Button gridArea="right" primary label=">" onClick={() => moveStarMap(false)} />
              <Button gridArea="midLeft" primary label="+" onClick={() => zoomStarMap(true)} />
              <Button gridArea="midRight" primary label="-" onClick={() => zoomStarMap(false)} />
            </Grid>
            <svg width={'100%'} viewBox={`0 0 ${500 / currentZoom} ${700 * (currentZoom > 1 ? 1 : currentZoom)}`}>
              <rect x={0} y={0} width="100%" height="100%" fill="Gray" />
              <svg x={currentX} width={'3000'} viewBox={size.viewBox}>
                {nodes.map(node => (
                  <Node
                    {...node}
                    onAdd={(selectedPoints?: number) => onUpdate(node.id, true, selectedPoints)}
                    onRemove={(selectedPoints?: number) => onUpdate(node.id, false, selectedPoints)}
                    nodes={nodes}
                    showTooltip={showAllTooltip}
                    searchString={searchString}
                    remindPoints={level ? level + defaultPoints - totalPoints : 999}
                    key={node.id}
                    isChinese={isChinese}
                  />
                ))}
              </svg>
            </svg>
          </Box>
        </Grid>
      </Box>
    </>
  );
});
