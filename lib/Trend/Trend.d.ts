import { ComponentProps } from 'react';
export interface TrendProps extends ComponentProps<'svg'> {
    data: number[] | {
        value: number;
    }[];
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
export declare function Trend({ data, smooth, autoDraw, autoDrawDuration, autoDrawEasing, width, height, padding, radius, gradient, stroke, strokeWidth, ...otherProps }: TrendProps): import("react/jsx-runtime").JSX.Element | null;
