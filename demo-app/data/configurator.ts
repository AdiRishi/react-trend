import { SVGProps } from 'react';

export type GradientKey = keyof typeof GRADIENT_DATA;

export const GRADIENT_DATA = {
  monochrome: ['#222'],
  skyBlue: ['#42b3f4'],
  sunset: ['red', 'orange', 'yellow'],
  deepPurple: ['purple', 'violet'],
  rainbow: ['#00c6ff', '#F0F', '#FF0'],
  tropical: ['#f72047', '#ffd200', '#1feaea'],
};

export type ConfiguratorConfig = {
  gradient: GradientKey;
  width: number;
  radius: number;
  strokeLinecap: SVGProps<SVGPathElement>['strokeLinecap'];
};
export const DEFAULT_CONFIG: ConfiguratorConfig = {
  gradient: 'rainbow',
  width: 2,
  radius: 10,
  strokeLinecap: 'butt',
};

export const STROKE_LINECAPS = ['butt', 'round', 'square'];
