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
export declare const normalize: ({ value, min, max, scaleMin, scaleMax }: NormalizeParams) => number;
/**
 * The coordinate that lies at a midpoint between 2 lines, based on the radius.
 *
 * @param to - The initial point
 * @param from - The final point
 * @param radius - The distance away from the final point
 * @returns An object holding the x/y coordinates of the midpoint.
 */
export declare const moveTo: (to: Point, from: Point, radius: number) => Point;
/**
 * Simple formula derived from Pythagoras to calculate the distance between
 * 2 points on a plane.
 *
 * @param p1 - The initial point
 * @param p2 - The final point
 * @returns The distance between the points.
 */
export declare const getDistanceBetween: (p1: Point, p2: Point) => number;
/**
 * Figure out if the midpoint fits perfectly on a line between the two others.
 *
 * @param p1 - The initial point
 * @param p2 - The mid-point
 * @param p3 - The final point
 * @returns Whether or not p2 sits on the line between p1 and p3.
 */
export declare const checkForCollinearPoints: (p1: Point, p2: Point, p3: Point) => boolean;
export {};
