import { useDispatch, useSelector, Sort  } from "react-redux"
import {  useState, useEffect } from "react"
import {Link, NavLink } from "react-router-dom"
import { getSoilsThunk } from "../../store/soils"
import OpenModalButton from '../OpenModalButton'
import DeleteSoilModal from "../DeleteSoilModal"
import CreatePostModal from '../CreatePostModal'


const Soils = () => {
    const dispatch = useDispatch()
    const [hidden, setHidden] = useState(true)

    const [soils, setSoils] = useState([])
    const [sortType, setSortType] = useState("created_at")

    const soilsObj = useSelector(state => state.soils.allSoils)

    const soilsArr = Object.values(soilsObj)
    useEffect(()=>{
        const sortedSoils = type =>{
            const sorted = soilsArr.sort((a,b)=>{
                if (type !== "title"){
                    return new Date(b[type]) - new Date(a[type])
                } else{
                    return a.title.localeCompare(b.title)
                }
            })
            setSoils(sorted)
        }
        sortedSoils(sortType)
    }, [sortType, soilsArr.length ])


    useEffect(()=>{
        dispatch(getSoilsThunk())
    }, [dispatch, soilsObj.length])

    if (!soilsObj) return (<h2>Loading...</h2>)

    return(
        <div>
            <div id="soil-samples-wrapper">
                <div id="soils-header-wrapper">
                    <h1>My Soil Samples*</h1>
                    <div id="new-post">
                        <Link exact to ={`/soils/new`}>Request Soil Sample</Link>
                            <div id="new-sample-wrapper">
                                <form>

                                </form>

                            </div>
                        {/* make this also like a dropdown...? */}
                    </div>
                        <h3>Sort by:</h3>
                        <button onClick={(e)=>setSortType("title")}>Title</button>
                        <button onClick={e=>setSortType("created_at")}>Most Recent</button>
                </div>
                <br></br>
                <div id="soil-samples-list-wrapper">
                    {soilsObj && soils.map(soil=>{
                        return (
                            <div key={soil.id} id="single-soil-wrapper">
                                {/* onClick = setHidden(true) ...? This causes infinite re-renders */}
                                <h2 id="soil-title" >{soil.title}</h2>
                                    {hidden && (
                                    <div id="single-soil-body">
                                        <ul>
                                            <li>Latitude: {soil.latitude}, Longitude: {soil.longitude}</li>
                                            <li>Requested: {soil.created_at.slice(0,16)}</li>
                                            <li>% Sand: {soil.percent_sand}%</li>
                                            <li>% Silt: {soil.percent_silt}%</li>
                                            <li>% Clay: {soil.percent_clay}%</li>
                                            <li>CEC: {soil.cec} cmol(c)/kg</li>
                                            <li>Bulk Density: {soil.bdod} kg/dm<sup>3</sup></li>
                                            <li>Nitrogen: {soil.nitrogen} g/kg</li>
                                            <li>Soil Organic Carbon: {soil.cec} g/kg</li>
                                            <li>pH: {soil.phh2o}</li>

                                        </ul>
                                    </div>)}
                                <div id="buttons-wrappers">
                                    <OpenModalButton
                                    buttonText ="Delete Soil"
                                    modalComponent ={<DeleteSoilModal soil={soil}/>}
                                    />

                                    <OpenModalButton
                                    buttonText ="Add Soil to Post"
                                    modalComponent ={<CreatePostModal soil={soil}/>}
                                    />
                                    {/* <NavLink exact to={{
                                        pathname:`/posts/new`,
                                        soilProps:{
                                            name: soil
                                        }
                                        }}>Add Soil to Post</NavLink> */}


                                </div>
                                <br></br>
                            </div>
                        )
                    })}
                </div>
                <p>*Note that data are calculated as averages of median values at depths 0-5cm, 5-15cm, 15-30cm, 30-60cm. For more comprehensive data for your sample, further soil depths, or just more information about the ISRIC API, please submit the latitude and longitude coordinates for your location <a href="https://rest.isric.org/soilgrids/v2.0/docs#/default/query_layer_properties_properties_query_get">here</a>, or visit their data resource FAQs at <a href="https://www.isric.org/explore/soilgrids/faq-soilgrids">here</a>.</p>

            </div>
        </div>
    )

}

export default Soils
