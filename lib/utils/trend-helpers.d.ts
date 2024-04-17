import { type Point } from './helper-types';
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
export declare const normalizeDataset: (data: number[], { minX, maxX, minY, maxY }: DatasetBoundaries) => Point[];
/**
 * Generates CSS for auto-draw animation of a line.
 *
 * @param params - The parameters for the auto-draw CSS.
 * @returns The CSS for the auto-draw animation.
 */
export declare const generateAutoDrawCss: ({ id, lineLength, duration, easing }: AutoDrawCssParams) => string;
export {};
