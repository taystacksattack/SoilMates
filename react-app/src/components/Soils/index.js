import { useDispatch, useSelector, Sort  } from "react-redux"
import {  useState, useEffect } from "react"
import {Link, NavLink } from "react-router-dom"
import { getSoilsThunk, editSoilThunk } from "../../store/soils"
import OpenModalButton from '../OpenModalButton'
import DeleteSoilModal from "../DeleteSoilModal"
import CreatePostModal from '../CreatePostModal'
import CreateSoilModal from "../CreateSoilModal"
import EditSoilTitleModal from '../EditSoilTitleModal'
import'./Soils.css'

const Soils = () => {
    const dispatch = useDispatch()
    const [hidden, setHidden] = useState(true)

    const [soils, setSoils] = useState([])
    const [sortType, setSortType] = useState("created_at")
    const [soil, setSoil] = useState('')
    const [title, setTitle] = useState(soil?.title)
    const [success, setSuccess]= useState(false)
    const [showForm, setShowForm] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [disabled, setDisabled]= useState(false)

    // const [singleSoil, setSingleSoil] = useState(null)

    const soilsObj = useSelector(state => state.soils.allSoils)
    const singleSoil = useSelector(state => state.soils.singleSoil)

    let soilsArr =[]
    if (soilsObj) soilsArr = Object.values(soilsObj)
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
    }, [sortType, soilsArr.length])


    useEffect(()=>{
        dispatch(getSoilsThunk())
    }, [dispatch, ])


    //need to send all info to the backend including the new title
    const saveSoil = async (e) => {
        e.preventDefault();

        setHasSubmitted(true)
        if(Object.values(validationErrors).length) {
            return
        }

        // console.log("soilData in modal", soilData)

        const updatedSoil = {
            title: title,
            latitude: soil.latitude,
            longitude: soil.longitude,
            percent_sand: soil.percent_sand,
            percent_silt: soil.percent_silt,
            percent_clay: soil.percent_clay,
            cec: soil.cec,
            bdod: soil.bdod,
            nitrogen: soil.nitrogen,
            soc: soil.soc,
            phh2o: soil.phh2o,
        }

        console.log("new soil stuff", updatedSoil)
        await dispatch(editSoilThunk(soil.id, updatedSoil))
        setSuccess(true)
        dispatch(getSoilsThunk())
        // closeModal()
    }

    useEffect(()=>{
        const errors = {}
        if (title){
            if(title.length < 5 || title.length >=100) errors['title']="Please provide a title between 5 and 100 characters"
        }
        setValidationErrors(errors)
    }, [title])

    const errorLength = Object.values(validationErrors).length

    useEffect(()=>{
    //     console.log(hasSubmitted)
        errorLength  && hasSubmitted ? setDisabled(true): setDisabled(false)
    },[errorLength, hasSubmitted])

    console.log(singleSoil)

    if (!soilsObj) return (<h2>Loading...</h2>)

    return(
        <div id="whole-soil-samples-wrapper">
            <div id="soil-samples-wrapper">

                <div id="soils-header-wrapper">
                    <h1 id="soil-page-title">My Soil Samples*</h1>
                    <div id="right-header-wrapper">
                        <div id="new-soil-wrapper">
                            <Link exact to ={`/soils/new`} id="new-soil">Request Soil Sample</Link>
                                <div id="new-sample-wrapper">
                                    <form>

                                    </form>

                                </div>
                            {/* make this also like a dropdown...? */}
                        </div>
                        <div id="sort-wrapper">
                            <h3>Sort by:</h3>
                            <div id="sort-buttons-wrapper">
                                <button onClick={(e)=>setSortType("title")} className={sortType === 'title' ? "sort-button": "not-sorted"}>Title</button>
                                <button onClick={e=>setSortType("created_at")} className={sortType === 'created_at' ? "sort-button": "not-sorted"}>Most Recent</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div id="soil-samples-list-wrapper">
                    {soilsObj && soils.map(soil=>{
                        return (
                            <div key={soil.id} id="single-soil-wrapper">

                                {/* onClick = setHidden(true) ...? This causes infinite re-renders */}
                                <h2 id="soil-title" >{soil.title}</h2>
                                <div>

                                </div>
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
                                    <div id="add-soil-to-post">
                                        <OpenModalButton
                                        id="something"
                                        buttonText ="Add Soil to Post"
                                        modalComponent ={<CreatePostModal soil={soil}/>}
                                        />
                                    </div>

                                    <OpenModalButton
                                    buttonText ="Delete Soil"
                                    modalComponent ={<DeleteSoilModal soil={soil}/>}
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
