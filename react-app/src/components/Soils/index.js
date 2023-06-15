import { useDispatch, useSelector, Sort  } from "react-redux"
import {  useState, useEffect } from "react"
import {Link } from "react-router-dom"
import { getSoilsThunk } from "../../store/soils"
import OpenModalButton from '../OpenModalButton'


const Soils = () => {
    const dispatch = useDispatch()
    const [hidden, setHidden] = useState(true)

    const soilsObj = useSelector(state => state.soils.allSoils)

    useEffect(()=>{
        dispatch(getSoilsThunk())
    }, [dispatch])

    if (!soilsObj) return (<h2>Loading...</h2>)

    return(
        <div>
            <div id="soil-samples-wrapper">
                <div id="soils-header-wrapper">
                    <h1>My Soil Samples</h1>
                    <div id="new-post">
                        <Link exact to ={`/soils/new`}>Request Soil Sample</Link>
                            <div id="new-sample-wrapper">
                                

                            </div>
                        {/* make this also like a dropdown...? */}
                    </div>
                </div>
                <br></br>
                <div id="soil-samples-list-wrapper">
                    {soilsObj && Object.values(soilsObj).map(soil=>{
                        return (
                            <div key={soil.id} id="single-soil-wrapper">
                                {/* onClick = setHidden(true) ...? This causes infinite re-renders */}
                                <h2 id="soil-title" >{soil.latitude}, {soil.longitude}</h2>
                                    {hidden && (
                                    <div id="single-soil-body">
                                        <ul>
                                            <li>Requested: {soil.created_at.slice(0,16)}</li>
                                            <li>% Sand: {soil.percent_sand}</li>
                                            <li>% Silt: {soil.percent_silt}</li>
                                            <li>% Clay: {soil.percent_clay}</li>
                                            <li>CEC: {soil.cec}</li>
                                            <li>Bulk Density: {soil.bdod}</li>
                                            <li>Nitrogen: {soil.Nitrogen}</li>
                                            <li>Soil Organic Carbon: {soil.cec}</li>
                                            <li>pH: {soil.phh2o}</li>

                                        </ul>
                                    </div>)}
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