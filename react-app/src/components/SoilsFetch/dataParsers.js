import { sampleData } from "./sampleData";

// export const test = () => console.log("testghfuishgfkdhgfhdsghfdjkghfdjkg")

// export const test = () => console.log(sampleData.properties.layers[5])
export const test = () => console.log(sampleData.properties)
export const sandParse = () => {
    const sandObjData =sampleData.properties.layers[5].depths
    // const sandObjValue =sampleData.properties.layers[5].depths[0].values["Q0.5"]
    // console.log("sand Object data", sandObjData)// [0].values["Q0.5"]
    // console.log(sandObjValue)
    // const reducedMedians = sandObjData.forEach((median) => console.log(median))//.depths[0].values["Q0.5"], 0)
    const reducedMedians = sandObjData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    // console.log("REDUCED MEDIANS", reducedMedians)
    return reducedMedians / sandObjData.length
}


export const siltParse = () => {
    const sandObjData =sampleData.properties.layers[6].depths
    // const sandObjValue =sampleData.properties.layers[5].depths[0].values["Q0.5"]
    console.log("sand Object data", sandObjData)// [0].values["Q0.5"]
    // console.log(sandObjValue)
    // const reducedMedians = sandObjData.forEach((median) => console.log(median))//.depths[0].values["Q0.5"], 0)
    const reducedMedians = sandObjData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    console.log("REDUCED MEDIANS", reducedMedians)
    return reducedMedians / sandObjData.length
}
