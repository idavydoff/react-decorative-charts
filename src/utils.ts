const line = (pointA: number[], pointB: number[]) => {
    const lengthX = pointB[0] - pointA[0]
    const lengthY = pointB[1] - pointA[1]
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX)
    }
  }

const controlPoint = (
    current: number[], 
    previous: number[], 
    next: number[] | undefined, 
    reverse: boolean, 
    smoothing: number
) => {
    const p = previous || current
    const n = next || current
  
    const o = line(p, n)
  
    const angle = o.angle + (reverse ? Math.PI : 0)
    const length = o.length * smoothing
  
    const x = current[0] + Math.cos(angle) * length
    const y = current[1] + Math.sin(angle) * length
    return [x, y]
  }

const bezierCommand = (
    point: number[], 
    i: number, 
    a: number[][], 
    smoothing: number, 
    smoothTill: number
) => {
    const cps = controlPoint(a[i - 1], a[i - 2], point, false, smoothing)
    const cpe = controlPoint(point, a[i - 1], a[i + 1], true, i >= smoothTill ? 0 : smoothing)
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`
  }

export const getSvgPath = (points: number[][], smoothing: number, notSmooth: number) => {
    const smoothTill = (points.length) - notSmooth;
    return points.reduce((acc, point, i, a) => {
        const pointSmoothing = !notSmooth ? smoothing : i < smoothTill ? smoothing : 0
        if (i === 0) return `M ${point[0]},${point[1]}`
        return `${acc} ${bezierCommand(point, i, a, pointSmoothing, smoothTill - 1)}`
    }
    , '')
}

export const getPathMaxMin = (points: number[][], type: string) => {
    const arr = points.map((p) => p[type === "y" ? 1: 0])
    let min = getMinOfArray(arr);
    let max = getMaxOfArray(arr);
    return {
        max, min
    }
}

const getPathGroupSize = (points: number[][][], type: string) => {
    let min = 1000000;
    let max = 0;
    for (let i = 0; i < points.length; i++) {
        const pathMaxMins = getPathMaxMin(points[i], type)
        if (pathMaxMins.max > max) {
            max = pathMaxMins.max
        }
        if (pathMaxMins.min < min) {
            min = pathMaxMins.min
        }
    }
    return max - min
}

export const getPathTransform = (
    points: number[][][], 
    height: number, 
    width: number
) => {
    const pathHeight = getPathGroupSize(points, "y");
    const pathWidth = getPathGroupSize(points, "x");
    const diffHeight = (height - pathHeight) / 2;
    const diffWidth = (width - pathWidth) / 2;

    return `translate(${diffWidth}, ${(diffHeight)})`
}


export const getMaxOfArray = (numArray: number[]) => {
    return Math.max.apply(null, numArray);
}

export const getMinOfArray = (numArray: number[]) => {
    return Math.min.apply(null, numArray);
}