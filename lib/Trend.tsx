import { useEffect, useId, useMemo, useRef, type ComponentProps } from 'react';
import { buildLinearPath, buildSmoothPath, injectStyleTag } from '@lib/utils/dom-helpers';
import { normalize } from '@lib/utils/math-helpers';
import { generateAutoDrawCss, normalizeDataset } from '@lib/utils/trend-helpers';

export interface TrendProps extends ComponentProps<'svg'> {
  data: number[] | { value: number }[];
  smooth?: boolean;
  autoDraw?: boolean;
  autoDrawDuration?: number;
  autoDrawEasing?: string;
  width?: number;
  height?: number;
  padding?: number;
  radius?: number;
  gradient?: string[];
}

export function Trend({
  data,
  smooth,
  autoDraw = false,
  autoDrawDuration = 2000,
  autoDrawEasing = 'ease',
  width,
  height,
  padding = 8,
  radius = 10,
  gradient,
  stroke = 'black',
  strokeWidth = 1,
  ...otherProps
}: TrendProps) {
  const trendId = useId();
  const gradientId = `react-trend-vertical-gradient-${trendId}`;
  const pathRef = useRef<SVGPathElement>(null);

  if (data.length < 2) {
    throw new Error('React-Trend needs at least 2 points to draw a graph');
  }

  useEffect(() => {
    if (autoDraw && pathRef.current) {
      const lineLength = pathRef.current.getTotalLength();

      const css = generateAutoDrawCss({
        id: CSS.escape(trendId),
        lineLength,
        duration: autoDrawDuration,
        easing: autoDrawEasing,
      });

      injectStyleTag(css);
    }
  }, [trendId, autoDraw, autoDrawDuration, autoDrawEasing]);

  // `data` can either be an array of numbers:
  // [1, 2, 3]
  // or, an array of objects containing a value:
  // [ { value: 1 }, { value: 2 }, { value: 3 }]
  //
  // For now, we're just going to convert the second form to the first.
  // Later on, if/when we support tooltips, we may adjust.
  const plainValues = data.map((point) => (typeof point === 'number' ? point : point.value));

  // Our viewbox needs to be in absolute units, so we'll default to 300x75
  // Our SVG can be a %, though; this is what makes it scalable.
  // By defaulting to percentages, the SVG will grow to fill its parent
  // container, preserving a 1/4 aspect ratio.
  const viewBoxWidth = width || 300;
  const viewBoxHeight = height || 75;
  const svgWidth = width || '100%';
  const svgHeight = height || '25%';

  const normalizedValues = useMemo(
    () =>
      normalizeDataset(plainValues, {
        minX: padding,
        maxX: viewBoxWidth - padding,
        // NOTE: Because SVGs are indexed from the top left, but most data is
        // indexed from the bottom left, we're inverting the Y min/max.
        minY: viewBoxHeight - padding,
        maxY: padding,
      }),
    [plainValues, padding, viewBoxWidth, viewBoxHeight]
  );

  const path = useMemo(() => {
    return smooth ? buildSmoothPath(normalizedValues, { radius }) : buildLinearPath(normalizedValues);
  }, [smooth, radius, normalizedValues]);

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      stroke={stroke}
      strokeWidth={strokeWidth}
      {...otherProps}
    >
      {gradient && <GradientDefinition gradient={gradient} id={gradientId} />}

      <path
        ref={pathRef}
        id={`react-trend-${trendId}`}
        d={path}
        fill="none"
        stroke={gradient ? `url(#${gradientId})` : undefined}
      />
    </svg>
  );
}

function GradientDefinition({ gradient, id }: { gradient: string[]; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
        {gradient
          .slice()
          .reverse()
          .map((c, index) => (
            <stop
              key={index}
              offset={normalize({
                value: index,
                min: 0,
                // If we only supply a single color, it will try to normalize
                // between 0 and 0, which will create NaN. By making the `max`
                // at least 1, we ensure single-color "gradients" work.
                max: gradient.length - 1 || 1,
              })}
              stopColor={c}
            />
          ))}
      </linearGradient>
    </defs>
  );
}
