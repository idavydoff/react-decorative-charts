import * as React from "react";
import { useMemo } from "react";
import { getMaxOfArray, getPathTransform, getSvgPath } from "../utils";

interface DLineChartProps {
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

export default ({ 
    data, 
    margin, 
    width = 100, 
    height = 100
}: DLineChartProps) => {
    const defaultColor = [134, 153, 175];
    const chartId = Math.random() + ""
    const defaultStokeWidth = 3

    const pathPoints = useMemo(() => {
        const extractedPoints = data.map((d) => d.points)
        let res = []
        const max = getMaxOfArray(extractedPoints.reduce((prev, cur) => [...prev, ...cur], []));
        for (let k = 0; k < extractedPoints.length; k++) {
            const covertedStrokeWidth = (typeof(data[k].strokeWidth) === "undefined" ? defaultStokeWidth : data[k].strokeWidth) as number;
            const dotsRadius = covertedStrokeWidth + (covertedStrokeWidth / 2)
            const maxWidth = (width - (dotsRadius * 2));
            const maxHeight = (height - (data[k].withDots ? (dotsRadius * 4) :  0));
            const step = maxWidth / (extractedPoints[k].length - 1)
    
            let resOne: number[][] = []
            for (let i = 0; i < extractedPoints[k].length; i++) {
                const x = !i ? 0 : i === extractedPoints[k].length - 1 ? maxWidth : i * step;
                const y = maxHeight - ((extractedPoints[k][i] / max) * maxHeight)
                resOne.push([x, y])
            }
            res.push(resOne)
        }
        return res
    }, [data])

    return (
        <div style={{ margin }}>
            <svg width={width} height={height}>
                <defs>
                    {data.map((d, i) => {
                        const color = (d.color || defaultColor).join(", ");
                        return (
                            <linearGradient key={`SvgGradient-${chartId}-${i}`} id={`SvgGradient-${chartId}-${i}`} x1="0" x2="0" y1="0" y2="1">
                                <stop stopColor={`rgba(${color}, .4)`} offset="0%"/>
                                <stop stopColor={`rgba(${color}, 0)`} offset="100%"/>
                            </linearGradient>
                        );
                    })}
                </defs>
                <g transform={getPathTransform(pathPoints, height, width)}>
                    {pathPoints.map((pt, i) => {
                        const color = (data[i].color || defaultColor).join(", ")
                        const { withSmoothing, strokeWidth, withDots, withShadow } = data[i];
                        const smoothing = typeof(withSmoothing) === "undefined" || withSmoothing ? 0.2 : 0;
                        const covertedStrokeWidth = typeof(strokeWidth) === "undefined" ? defaultStokeWidth : strokeWidth;
                        const covertedWithShadow = typeof(withShadow) === "undefined" ? true : withShadow;
                        const dotsRadius = covertedStrokeWidth + (covertedStrokeWidth / 2);
                        const maxHeight = (height - (data[i].withDots ? (dotsRadius * 4) :  0));
                        return (
                            <g key={i}>
                                <path
                                    d={getSvgPath(pt, smoothing, 0)} 
                                    stroke={`rgb(${color}, .5)`} 
                                    strokeWidth={covertedStrokeWidth}
                                    strokeLinecap={smoothing ? "round": "square"} 
                                    fill="transparent"  />
                                {withDots && pt.map((p, k) => (
                                    <ellipse 
                                        key={k}
                                        cx={p[0]} 
                                        cy={p[1]} 
                                        rx={dotsRadius} 
                                        fill={`rgb(${color})`}>
                                    </ellipse>
                                ))}
                                {covertedWithShadow && (
                                    <path 
                                        d={getSvgPath([...pt, [pt[pt.length - 1][0], maxHeight], [pt[0][0], maxHeight], pt[0]], smoothing, 3)}
                                        fill={`url(#${`SvgGradient-${chartId}-${i}`})`}
                                    />
                                )}
                            </g>
                        )
                    })}
                </g>
            </svg>
        </div>
    )
}