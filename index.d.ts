import * as React from 'react';

export interface DBarChartProps {
    color?: number[];
    data: number[];
    margin?: string;
    width?: number;
    height?: number;
    rounded?: boolean;
    withGradient?: boolean;
    gap?: number
}

declare class DBarChart extends React.Component<DBarChartProps, any> {}

export interface DLineChartProps {
    data: {
        color?: number[];
        points: number[];
        withSmoothing?: boolean
        strokeWidth?: number
        withDots?: boolean
        withShadow?: boolean
    }[];
    margin?: string;
    width?: number;
    height?: number;
}

declare class DLineChart extends React.Component<DLineChartProps, any> {}

export interface DPieChartProps {
    secondaryColor?: number[];
    primaryColor?: number[];
    data: number;
    margin?: string;
    radius?: number;
}

declare class DPieChart extends React.Component<DPieChartProps, any> {}

declare module 'react-decorative-charts' {}

export { DBarChart, DLineChart, DPieChart };