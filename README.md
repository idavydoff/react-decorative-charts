# React Decorative Charts
Library for creation decorative svg charts. 
Designed in order to emphasize the design of the app.

[![npm version](https://img.shields.io/npm/v/react-decorative-charts.svg?style=flat-square)](https://www.npmjs.com/package/react-decorative-charts)

[![](https://i.imgur.com/kYgCNcI.png)](https://i.imgur.com/kYgCNcI.png)

**All colors must be specified in rgb format**

## Line chart
`import { DLineChart } from "react-decorative-charts"`

#### Props
	data: {
		color?: number[]; // Default = [134, 153, 175]
		points: number[];
		withSmoothing?: boolean // Default = true
		strokeWidth?: number // Default = 3
		withDots?: boolean // Default = false
		withShadow?: boolean // Default = true
	}[];
	margin?: string; // Default = undefined
	width?: number; // Default = 100
	height?: number; // Default = 100

#### Example
	<DLineChart
		data={[
			{
				points: [1, 8, 7, 19],
				color: [133, 223, 183]
			}
		]}
	/>

## Bar chart
`import { DBarChart } from "react-decorative-charts"`

#### Props
	color?: number[]; // Default = [134, 153, 175]
	data: number[];
	margin?: string; // Default = undefined
	width?: number; // Default = 100
	height?: number; // Default = 100
	rounded?: boolean; // Default = true
	withGradient?: boolean; // Default = false
	gap?: number // Default = 5

#### Example
	<DBarChart
		data={[5, 11, 3, 8, 9]}
		width={200}
	/>
## Pie chart 
`import { DPieChart } from "react-decorative-charts"`

#### Props
	secondaryColor?: number[]; // Default = [190, 199, 209]
	primaryColor?: number[]; // Default = [134, 153, 175]
	data: number; // Number of percents
	margin?: string; // Default = undefined
	radius?: number; // Default = 25

#### Example
	<DPieChart
		data={45}
		radius={50}
	/>