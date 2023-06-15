import { sampleData } from "./sampleData";

// export const test = () => console.log("testghfuishgfkdhgfhdsghfdjkghfdjkg")
// export const test = () => console.log(sampleData.properties.layers[5])

// this gives you the whole data object parsed to the specific elements/properties - is an array (note the keying in of "layers")
export const dataProperties = sampleData.properties

// free free to comment/uncomment things
export const sandParse = () => {
    const sandObjData =sampleData.properties.layers[5].depths
    // const sandObjValue =sampleData.properties.layers[5].depths[0].values["Q0.5"]
    // console.log("sand Object data", sandObjData)// [0].values["Q0.5"]
    // console.log(sandObjValue)
    // const reducedMedians = sandObjData.forEach((median) => console.log(median))//.depths[0].values["Q0.5"], 0)
    const reducedMedians = sandObjData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    // console.log("REDUCED MEDIANS", reducedMedians)
    return (reducedMedians / sandObjData.length)/10
}
// needs to be divided by 10 to convert from mapped unites to conventional units


// The rest of this is plug and chug: keys differ, but same mechanics. Math may differ based on mapped to conventional unit conversion.

export const siltParse = () => {
    const sandObjData =sampleData.properties.layers[6].depths
    const reducedMedians = sandObjData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    return (reducedMedians / sandObjData.length) / 10
}


export const clayParse = () => {
    const sandObjData =sampleData.properties.layers[2].depths
    const reducedMedians = sandObjData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    return (reducedMedians / sandObjData.length) / 10
}


export const cecParse = () => {
    const sandObjData =sampleData.properties.layers[2].depths
    const reducedMedians = sandObjData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    return (reducedMedians / sandObjData.length) / 10
}

export const bdodParse = () => {
    const sandObjData =sampleData.properties.layers[0].depths
    const reducedMedians = sandObjData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    return (reducedMedians / sandObjData.length) / 100
}

export const nitrogenParse = () => {
    const sandObjData =sampleData.properties.layers[3].depths
    const reducedMedians = sandObjData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    return (reducedMedians / sandObjData.length) / 100
}

export const socParse = () => {
    const sandObjData =sampleData.properties.layers[7].depths
    const reducedMedians = sandObjData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    return (reducedMedians / sandObjData.length) / 10
}

export const pph2oParse = () => {
    const sandObjData =sampleData.properties.layers[4].depths
    const reducedMedians = sandObjData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    return (reducedMedians / sandObjData.length) / 10
}
