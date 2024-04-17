import { type Point } from './helper-types';
export declare const buildLinearPath: (data: Point[]) => string;
export declare const buildSmoothPath: (data: Point[], { radius }: {
    radius: number;
}) => string;
export declare const injectStyleTag: (cssContents: string) => void;
