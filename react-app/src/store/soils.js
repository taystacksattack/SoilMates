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
