import { useDispatch, useSelector, Sort  } from "react-redux"
import {  useState, useEffect } from "react"
import {Link } from "react-router-dom"
import { getSoilsThunk } from "../../store/soils"
import OpenModalButton from '../OpenModalButton'


const Soils = () => {
    const dispatch = useDispatch()
    const [hidden, setHidden] = useState()

    const soilsObj = useSelector(state => state.soils.allSoils)

    useEffect(()=>{
        dispatch(getSoilsThunk())
    }, [dispatch])

    if (!soilsObj) return (<h2>Loading...</h2>)

    return(
        <div>
            <div id="soil-samples-wrapper">
                <h1>My Soil Samples</h1>
                <br></br>
                <div id="soil-samples-list-wrapper">
                    {soilsObj && Object.values(soilsObj).map(soil=>{
                        return (
                            <div id={soil.id}>
                                <h2 id="soil-title">{soil.latitude}, {soil.longitude}</h2>
                                    <div id="single-soil-body">
                                        <ul>
                                            <li>% Sand: {soil.percent_sand}</li>
                                            <li>% Silt: {soil.percent_silt}</li>
                                            <li>% Clay: {soil.percent_clay}</li>
                                            <li>CEC: {soil.cec}</li>
                                            <li>Bulk Density: {soil.bdod}</li>
                                            <li>Nitrogen: {soil.Nitrogen}</li>
                                            <li>Soil Organic Carbon: {soil.cec}</li>
                                            <li>pH: {soil.phh2o}</li>
                                            <li>Requested at: {soil.created_at.slice(0,16)}</li>

                                        </ul>
                                    </div>
                                <br></br>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )

}

export default Soils
