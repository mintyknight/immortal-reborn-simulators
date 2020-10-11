import React, { useEffect, useRef, useState } from 'react';
import { Drop } from 'grommet';

export interface SvgTooltipProps {
  /**
   * Should be a single svg element that tooltip attaches to.
   * Currently only support child that has width and height.
   * If x, y omitted would assume x = 0 and y = 0.
   */
  children: JSX.Element;
  /** Tooltip to be displayed upon mouse hover */
  tooltip: string | JSX.Element;
  /** Force to show the tooltip without mouse over */
  forceShow?: boolean;
}

export const SvgTooltip = ({ children, tooltip, forceShow }: SvgTooltipProps) => {
  const target = useRef(null) as React.MutableRefObject<HTMLDivElement | null>;
  const [showTooltip, setShowTooltip] = useState(false);
  const [targetReady, setTargetReady] = useState(false);

  let listeners = {};
  if (!forceShow) {
    const mouseOver = () => setShowTooltip(true);
    const mouseLeave = () => setShowTooltip(false);
    listeners = {
      onMouseOver: mouseOver,
      onFocus: mouseOver,
      onMouseLeave: mouseLeave,
    };
  }

  let { x = 0, y = 0, width = 0, height = 0, cx, cy, r } = children.props;

  if (!!cx && !!cy && !!r) {
    x = cx - r;
    y = cy - r;
    width = 2 * r;
    height = 2 * r;
  }

  // To fix the issue when target ref is not ready on the first rendering
  // Rerender after target ref is ready
  // https://stackoverflow.com/questions/56541342/react-hooks-why-is-current-null-for-useref-hook
  useEffect(() => {
    setTargetReady(true);
  }, [target]);

  return (
    <>
      <svg x={x} y={y} width={width} height={height} viewBox={`${x} ${y} ${width} ${height}`} {...listeners}>
        <foreignObject x={x} y={y} width={width} height={height}>
          {/* since tooltip could not pin to svg elements, using a invisible div here to provide a placeholder for tooltip to pin to */}
          <div ref={target} style={{ width: '100%', height: '100%', visibility: 'hidden' }} />
          {/* Due to grommet limitation, using grommet component may cause error when either  */}
          {/* 1. not wrapped within an AppContainer or  */}
          {/* 2. somehow top level AppContainer is rendered after some grommet component; */}
          {/* therefore, adding a local AppContainer to workaround this potential issue */}
          {targetReady && (showTooltip || forceShow) && target.current && (
            <Drop
              align={{ bottom: 'top' }}
              target={target.current}
              // trapFocus set to false allows tabbing through
              trapFocus={false}>
              {tooltip}
            </Drop>
          )}
        </foreignObject>
        {/* target svg component needs to be at end so it would not be covered by the placeholder div */}
        {children}
      </svg>
    </>
  );
};
