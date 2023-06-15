const GET_SOILS = 'soils/GET_SOILS'
const CREATE_SOIL = 'soils/CREATE_SOIL'
const DELETE_SOIL = 'soils/DELETE_SOIL'

const getSoils = (soils) => ({
    type: GET_SOILS,
    soils
})

const createSoil = (soil) => ({
    type: CREATE_SOIL,
    soil
})

const deleteSoil = (soilId) => ({
    type: CREATE_SOIL,
    soilId
})


//let's get those thunks

//get user's soil requests
export const getSoilsThunk = () => async (dispatch) => {
    try {
        const response = await fetch('/api/soils')
        const data = await response.json()
        dispatch(getSoils(data))
        return data
    }catch(e){
        console.log("here go the errors", e)
        return e
    }
}

//let's post a new one
export const createSoilThunk = (soil) => async (dispatch) => {
    let response
    console.log(soil)
    try{
        response = await fetch("/api/soils/new", {
            method: 'POST',
            body: soil
        })
        const data = await response.json()
        console.log("DATA IN THUNK",data)
        dispatch(createSoil(data))
        return data
    } catch(e){
        const data = await response.json()
        if(data.errors){
            return data.errors
        } else {
            return ["An error has occurred. Please try again."]
        }
    }
}





//how about that reducer...?
const initialState = {allSoils: {}}

export default function soilsReducer (state = initialState, action){
    switch (action.type){
        case GET_SOILS:
            const newState = { allSoils: {} }
            console.log("action soils",action.soils)
            if (action.soils.length){
                action.soils.forEach((soil)=> {
                    newState.allSoils[soil.id] = soil
                })
            }
            return newState
        default:
            return state
    }
}
