import * as React from "react";
import { useMemo } from "react";
import { getMaxOfArray, getPathTransform } from "../utils";

interface DBarChartProps {
    color?: number[];
    data: number[];
    margin?: string;
    width?: number;
    height?: number;
    rounded?: boolean;
    withGradient?: boolean;
    gap?: number
}

export default ({ 
    data, 
    margin, 
    width = 100, 
    height = 100, 
    color, 
    rounded = true, 
    withGradient, 
    gap = 5 
}: DBarChartProps) => {
    const chartId = Math.random() + "";
    const colorConverted = (color || [134, 153, 175]).join(", ");

    const pathPoints = useMemo(() => {
        let res = []
        const max = getMaxOfArray(data);
        const maxWidth = width;
        const step = maxWidth / (data.length);

        const xSeparators = ".".repeat(data.length + 1).split("").map((p, i) => !i ? 0 : i * step)
        const xSeparatorsConverted = []
        for (let i = 0; i < xSeparators.length - 1; i++) {
            xSeparatorsConverted.push([
                xSeparators[i], 
                xSeparators[i + 1] - gap
            ])
        }

        for (let i = 0; i < data.length; i++) {
            const highestBarPoint = height - ((data[i] / max) * height);

            res.push({
                x: xSeparatorsConverted[i][0],
                y: highestBarPoint,
                width: xSeparatorsConverted[i][1] - xSeparatorsConverted[i][0],
                height: height - highestBarPoint,
                points: [
                    [xSeparatorsConverted[i][0], height],
                    [xSeparatorsConverted[i][0], highestBarPoint],
                    [xSeparatorsConverted[i][1], highestBarPoint],
                    [xSeparatorsConverted[i][1], height],
                ]
            })
        }
        return res
    }, [data])

    return (
        <div style={{ margin }}>
            <svg width={width} height={height}>
                <defs>
                    <linearGradient id={`SvgGradient-${chartId}`} x1="0" x2="0" y1="0" y2="1">
                        <stop stopColor={`rgba(${colorConverted}, 0.9)`} offset="0%"/>
                        <stop stopColor={`rgba(${colorConverted}, 0)`} offset="100%"/>
                    </linearGradient>
                </defs>
                <g 
                    transform={getPathTransform(pathPoints.map((pt) => pt.points), height, width)}
                >
                    {pathPoints.map((pt, i) => (
                        <g key={i}>
                            {rounded && (
                                <rect 
                                    x={pt.x}
                                    y={pt.y}
                                    width={pt.width}
                                    height={pt.height}
                                    rx={2.5}
                                    ry={2.5}
                                    fill={withGradient ? `url(#${`SvgGradient-${chartId}`})` : `rgb(${colorConverted})`}
                                />
                            )}
                            {!(rounded && withGradient) && (
                                <rect 
                                    x={pt.x}
                                    y={pt.y + (rounded ? 2.5 : 0)}
                                    width={pt.width}
                                    height={pt.height - (rounded ? 2.5 : 0)}
                                    fill={withGradient ? `url(#${`SvgGradient-${chartId}`})` : `rgb(${colorConverted})`}
                                />
                            )}
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    )
}