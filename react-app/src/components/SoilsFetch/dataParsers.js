import { sampleData } from "./sampleData";

// export const test = () => console.log("testghfuishgfkdhgfhdsghfdjkghfdjkg")
// export const test = () => console.log(sampleData.properties.layers[5])

//collect soil data

//lat and long string-interpolated. THIS ACTUALLY WORKS!!!
export const getSoilData = async (longitude, latitude) => {
    const response = await fetch(`https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=bdod&property=cec&property=clay&property=nitrogen&property=phh2o&property=sand&property=silt&property=soc&depth=0-5cm&depth=0-30cm&depth=5-15cm&depth=15-30cm&depth=30-60cm&value=Q0.5&value=mean&value=uncertainty`)
    const data = await response.json()
    return data
}







// this gives you the whole data object parsed to the specific elements/properties - is an array (note the keying in of "layers")
export const dataProperties = sampleData.properties

// free free to comment/uncomment things
export const sandParse = (data) => {
    const objData =data.properties.layers[5].depths
    // const sandObjValue =data.properties.layers[5].depths[0].values["Q0.5"]
    // console.log("sand Object data", objData)// [0].values["Q0.5"]
    // console.log(sandObjValue)
    // const reducedMedians = objData.forEach((median) => console.log(median))//.depths[0].values["Q0.5"], 0)
    const reducedMedians = objData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    // console.log("REDUCED MEDIANS", reducedMedians)
    return (reducedMedians / objData.length)/10
}
// needs to be divided by 10 to convert from mapped unites to conventional units


// The rest of this is plug and chug: keys differ, but same mechanics. Math may differ based on mapped to conventional unit conversion.

export const siltParse = (data) => {
    const objData =data.properties.layers[6].depths
    const reducedMedians = objData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    return (reducedMedians / objData.length) / 10
}


export const clayParse = (data) => {
    const objData =data.properties.layers[2].depths
    const reducedMedians = objData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    return (reducedMedians / objData.length) / 10
}


export const cecParse = (data) => {
    const objData =data.properties.layers[2].depths
    const reducedMedians = objData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    return (reducedMedians / objData.length) / 10
}

export const bdodParse = (data) => {
    const objData =data.properties.layers[0].depths
    const reducedMedians = objData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    return (reducedMedians / objData.length) / 100
}

export const nitrogenParse = (data) => {
    const objData =data.properties.layers[3].depths
    const reducedMedians = objData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    return (reducedMedians / objData.length) / 100
}

export const socParse = (data) => {
    const objData =data.properties.layers[7].depths
    const reducedMedians = objData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    return (reducedMedians / objData.length) / 10
}

export const pph2oParse = (data) => {
    const objData =data.properties.layers[4].depths
    const reducedMedians = objData.reduce((acc, median) => acc + median.values["Q0.5"], 0)
    return (reducedMedians / objData.length) / 10
}
