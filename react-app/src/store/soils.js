const GET_SOILS = 'soils/GET_SOILS'
const CREATE_SOIL = 'soils/CREATE_SOIL'
const DELETE_SOIL = 'soils/DELETE_SOIL'
const EDIT_SOIL = 'soils/EDIT_SOIL'
const CLEAR_SOILS = 'soils/CLEAR_SOILS'

const getSoils = (soils) => ({
    type: GET_SOILS,
    soils
})

const createSoil = (soil) => ({
    type: CREATE_SOIL,
    soil
})

const deleteSoil = (soilId) => ({
    type: DELETE_SOIL,
    soilId
})

const editSoil = (soil) => ({
    type: EDIT_SOIL,
    soil
})


export const clearSoils = () => ({
    type: CLEAR_SOILS
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


export const editSoilThunk = (soilId, soil) => async (dispatch) => {
     try {
        console.log("IN THE THUNK",soilId)
        console.log("in the thunk ", soil)
        const response = await fetch(`/api/soils/${soilId}/edit`,{
            method: 'PUT',
            headers: {"Content-Type": "application/json"}, // need to stringify here so that the form validator is happy
            body: JSON.stringify(soil)
        })
        const result = await response.json()
        console.log("result in thunk", result)
        dispatch(editSoil(result))
        return
    }catch(e){
        return e
    }
}



export const deleteSoilThunk = (soilId) => async (dispatch) => {
    try {
        const response = await fetch (`/api/soils/${soilId}/delete`, {
            method: "DELETE"
        })
        const result = await response.json()
        dispatch(deleteSoil(soilId))
        return result
    }catch(e){
        return e
    }
}




//how about that reducer...?
const initialState = {allSoils: {}, singleSoil:{}}

export default function soilsReducer (state = initialState, action){
    switch (action.type){
        case GET_SOILS:
            const newState = {...state, allSoils: {...state.allSoils}, singleSoil:{...state.singleSoil} }
            console.log("action soils",action.soils)
            if (action.soils.length){
                action.soils.forEach((soil)=> {
                    newState.allSoils[soil.id] = soil
                })
            }
            return newState
        case EDIT_SOIL:
            console.log("id in reducer",action.soil.id)
            const editState = {...state, allSoils: {...state.allSoils} , singleSoil:{...state.singleSoil}}
            editState.allSoils[action.soil.id] = action.soil
            editState.singleSoil[action.soil.id] = action.soil
            console.log("edit state in reducer", editState)
            return editState
        case DELETE_SOIL:
            const deleteState = {...state, allSoils:{...state.allSoils}}
            console.log("deleteState before deletion",deleteState)
            delete deleteState.allSoils[action.soilId]
            console.log("deleteState after deletion",deleteState)
            return deleteState
        case CLEAR_SOILS:
            return {allsoils:{}}
        default:
            return state
    }
}
