import { useDispatch, useSelector, Sort  } from "react-redux"
import { useEffect } from "react"
import {Link } from "react-router-dom"
// import { getSoilsThunk } from "../../store/soils"
import OpenModalButton from '../OpenModalButton'


const Soils = () => {
    const dispatch = useDispatch()

    // const soilsObj = useSelector(state => state.soils.allSoils)

    // useEffect(()=>{
    //     dispatch(getSoilsThunk())
    // }, [dispatch])

    // if (!soilsObj) return (<h2>Loading...</h2>)

    return(
        <h2>howdy</h2>
    )

}

export default Soils
