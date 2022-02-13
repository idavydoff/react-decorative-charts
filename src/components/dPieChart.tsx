import * as React from "react";

interface ChartProps {
    secondaryColor?: number[];
    primaryColor?: number[];
    data: number;
    margin?: string;
    radius?: number;
}

export default ({ 
    margin, 
    radius = 25, 
    secondaryColor, 
    primaryColor, 
    data
}: ChartProps) => {
    const primaryColorConverted = (primaryColor || [134, 153, 175]).join(", ");
    const secondaryColorConverted = (secondaryColor || [190, 199, 209]).join(", ");

    return (
        <div style={{ margin }}>
            <svg width={radius * 2} height={radius * 2}>
                <circle 
                    r={radius} 
                    cx={radius} 
                    cy={radius}
                    fill={`rgb(${secondaryColorConverted})`} />
                <circle 
                    r={radius / 2}
                    cx={radius} 
                    cy={radius} 
                    fill="transparent"
                    stroke={`rgb(${primaryColorConverted})`}
                    stroke-width={radius}
                    stroke-dasharray={`calc(${data} * ((${radius} * 3.14) / 100)) 200000`}
                    transform={`rotate(-90) translate(-${radius * 2})`} />
            </svg>
        </div>
    )
}