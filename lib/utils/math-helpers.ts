import { type Point } from './helper-types';

interface NormalizeParams {
  value: number;
  min: number;
  max: number;
  scaleMin?: number;
  scaleMax?: number;
}

/**
 * This lets us translate a value from one scale to another.
 *
 * @param params - The parameters including value, min, max, scaleMin, and scaleMax
 * @returns The value on its new scale
 */
export const normalize = ({ value, min, max, scaleMin = 0, scaleMax = 1 }: NormalizeParams): number => {
  if (min === max) {
    return scaleMin;
  }

  return scaleMin + ((value - min) * (scaleMax - scaleMin)) / (max - min);
};

/**
 * The coordinate that lies at a midpoint between 2 lines, based on the radius.
 *
 * @param to - The initial point
 * @param from - The final point
 * @param radius - The distance away from the final point
 * @returns An object holding the x/y coordinates of the midpoint.
 */
export const moveTo = (to: Point, from: Point, radius: number): Point => {
  const vector = { x: to.x - from.x, y: to.y - from.y };
  const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  const unitVector = { x: vector.x / length, y: vector.y / length };

  return {
    x: from.x + unitVector.x * radius,
    y: from.y + unitVector.y * radius,
  };
};

/**
 * Simple formula derived from Pythagoras to calculate the distance between
 * 2 points on a plane.
 *
 * @param p1 - The initial point
 * @param p2 - The final point
 * @returns The distance between the points.
 */
export const getDistanceBetween = (p1: Point, p2: Point): number =>
  Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

/**
 * Figure out if the midpoint fits perfectly on a line between the two others.
 *
 * @param p1 - The initial point
 * @param p2 - The mid-point
 * @param p3 - The final point
 * @returns Whether or not p2 sits on the line between p1 and p3.
 */
export const checkForCollinearPoints = (p1: Point, p2: Point, p3: Point): boolean =>
  (p1.y - p2.y) * (p1.x - p3.x) === (p1.y - p3.y) * (p1.x - p2.x);
