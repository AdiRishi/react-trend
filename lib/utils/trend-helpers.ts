import { type Point } from './helper-types';
import { normalize } from './math-helpers';

interface DatasetBoundaries {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

interface AutoDrawCssParams {
  id: string;
  lineLength: number;
  duration: number;
  easing: string;
}

/**
 * Normalizes the dataset values between specified boundaries.
 *
 * @param data - The array of data points (numbers) to normalize.
 * @param boundaries - The boundaries for normalization.
 * @returns An array of points with normalized x and y values.
 */
export const normalizeDataset = (data: number[], { minX, maxX, minY, maxY }: DatasetBoundaries): Point[] => {
  // For the X axis, we want to normalize it based on its index in the array.
  // For the Y axis, we want to normalize it based on the element's value.
  //
  // X axis is easy: just evenly-space each item in the array.
  // For the Y axis, we first need to find the min and max of our array,
  // and then normalize those values between 0 and 1.
  const boundariesX = { min: 0, max: data.length - 1 };
  const boundariesY = { min: Math.min(...data), max: Math.max(...data) };

  const normalizedData = data.map((point, index) => ({
    x: normalize({
      value: index,
      min: boundariesX.min,
      max: boundariesX.max,
      scaleMin: minX,
      scaleMax: maxX,
    }),
    y: normalize({
      value: point,
      min: boundariesY.min,
      max: boundariesY.max,
      scaleMin: minY,
      scaleMax: maxY,
    }),
  }));

  // According to the SVG spec, paths with a height/width of `0` can't have
  // linear gradients applied. This means that our lines are invisible when
  // the dataset is flat (eg. [0, 0, 0, 0]).
  //
  // The hacky solution is to apply a very slight offset to the first point of
  // the dataset. As ugly as it is, it's the best solution we can find (there
  // are ways within the SVG spec of changing it, but not without causing
  // breaking changes).
  if (boundariesY.min === boundariesY.max) {
    normalizedData[0].y += 0.0001;
  }

  return normalizedData;
};

/**
 * Generates CSS for auto-draw animation of a line.
 *
 * @param params - The parameters for the auto-draw CSS.
 * @returns The CSS for the auto-draw animation.
 */
export const generateAutoDrawCss = ({ id, lineLength, duration, easing }: AutoDrawCssParams): string => {
  // We do the animation using the dash array/offset trick
  // https://css-tricks.com/svg-line-animation-works/
  const autodrawKeyframeAnimation = `
    @keyframes react-trend-autodraw-${id} {
      0% {
        stroke-dasharray: ${lineLength};
        stroke-dashoffset: ${lineLength};
      }
      100% {
        stroke-dasharray: ${lineLength};
        stroke-dashoffset: 0;
      }
    }
  `;

  // One unfortunate side-effect of the auto-draw is that the line is
  // actually 1 big dash, the same length as the line itself. If the
  // line length changes (eg. radius change, new data), that dash won't
  // be the same length anymore. We can fix that by removing those
  // properties once the auto-draw is completed.
  const cleanupKeyframeAnimation = `
    @keyframes react-trend-autodraw-cleanup-${id} {
      to {
        stroke-dasharray: '';
        stroke-dashoffset: '';
      }
    }
  `;

  return `
    ${autodrawKeyframeAnimation}

    ${cleanupKeyframeAnimation}

    #react-trend-${id} {
      animation:
        react-trend-autodraw-${id} ${duration}ms ${easing},
        react-trend-autodraw-cleanup-${id} 1ms ${duration}ms;
    }
  `;
};
