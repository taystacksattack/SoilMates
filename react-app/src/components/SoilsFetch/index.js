import { useDispatch } from "react-redux";
import { useState,useEffect } from 'react';
import { createSoilThunk } from '../../store/soils'
import { createPostThunk } from "../../store/posts";
import { useHistory } from 'react-router-dom';
import { sampleData } from "./sampleData";
import { getSoilData, sandParse, siltParse, clayParse, cecParse, bdodParse, nitrogenParse, socParse, phh2oParse } from "./dataParsers";
import CreateSoilModal from "../CreateSoilModal";
import OpenModalButton from "../OpenModalButton";
import './SoilsFetch.css'


const SoilsFetch = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [sand, setSand] = useState("")
    const [silt, setSilt] = useState("")
    const [clay, setClay] = useState("")
    const [cec, setCec] = useState("")
    const [bdod, setBdod] = useState("")
    const [nitrogen, setNitrogen] = useState("")
    const [soc, setSoc] = useState("")
    const [phh2o, setPhh2o] = useState("")
    const [soilData, setSoilData] = useState({})


    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [disabled, setDisabled]= useState(false)
    const [added, setAdded] = useState(false)

    const [display, setDisplay]= useState(false)
    const [success, setSuccess]= useState(false)
    const [showPost, setShowPost] = useState(false)
    const [emptyData, setEmptyData] = useState(false)


    const submitSoil = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        // console.log("latitude",latitude)
        // console.log("longitude",longitude)

        //these are here for when the data is undefined: the useEffect was not cooperating
        const errors = {}
        if(latitude === "" ||latitude.length > 11 || latitude.length < 9 ) errors['latitude']="Please provide a latitude to six decimal places"
        if(longitude === ""||longitude.length > 11 || longitude.length < 9) errors['longitude']="Please provide a longitude to six decimal places"
        setValidationErrors(errors)


        if(Object.values(validationErrors).length) {
            console.log(validationErrors)
            return
        }

        //sample data for testing purposes (so you're not doing API calls everytime)
        // const data = sampleData

        //actual data collection IRL. Uncomment when you're ready...
        const data = await getSoilData(longitude, latitude)

        // this gives you the whole data object parsed to the specific elements/properties - is an array (note the keying in of "layers")
        console.log("WHOLE DATA SHEBANG", data.properties)

        //gets it ready to be sent to the add title modal when user wants to save the soil data
        const newSoil = {
            latitude,
            longitude,
            "sand": sandParse(data),
            "silt": siltParse(data),
            "clay": clayParse(data),
            "cec": cecParse(data),
            "bdod": bdodParse(data),
            "nitrogen": nitrogenParse(data),
            "soc": socParse(data),
            "phh2o": phh2oParse(data)
        }

        setSoilData(newSoil)

        //good data
        setSand(newSoil.sand)
        setSilt(newSoil.silt)
        setClay(newSoil.clay)
        setCec(newSoil.cec)
        setBdod(newSoil.bdod)
        setNitrogen(newSoil.nitrogen)
        setSoc(newSoil.soc)
        setPhh2o(newSoil.phh2o)

        //handles bad data
        if (!newSoil.sand) {
            // console.log("where is the sand", sand)
            setEmptyData(true)
            return
        }
        //gets rid of banner when good data comes in.
        if (newSoil.sand) {
            setEmptyData(false)
        }


        setDisplay(true)
        setHasSubmitted(false)
        // setLatitude('')
        // setLongitude('')
        // history.push('/soils')
    }

    const saveSoil = async (e) =>{
        e.preventDefault()
        // FORM STUFF WHEN READY TO GO TO BACKEND
        const soilFormData= new FormData()
        soilFormData.append("latitude", latitude)
        soilFormData.append("longitude", longitude)
        soilFormData.append("percent_sand", sand)
        soilFormData.append("percent_silt", silt)
        soilFormData.append("percent_clay", clay)
        soilFormData.append("cec", cec)
        soilFormData.append("bdod", bdod)
        soilFormData.append("nitrogen", nitrogen)
        soilFormData.append("soc", soc)
        soilFormData.append("phh2o", phh2o)

        const result = await dispatch(createSoilThunk(soilFormData))
        setAdded(true)
        setSuccess(true)
    }

    //gets the post form ready with the data
    const postSoil = async (e) => {
        e.preventDefault()
        //need to save to db  ONLY IF it hasn't already been saved.
        if (!added)saveSoil(e)

        // set the default body to have the soil data
        setShowPost(true)
        setBody(`% Sand: ${sand}% \n% Silt: ${silt}% \n% Clay: ${clay}% \nCEC: ${cec}\nBulk Density: ${bdod}kg/dm3\nNitrogen: ${nitrogen}g/kg\nSoil Organic Content: ${soc}g/kg\npH: ${phh2o}`)

    }

    //actually handles the soil submission
    const submitPost = async (e) => {
        e.preventDefault()

        setHasSubmitted(true)

        if(Object.values(validationErrors).length) {
            return
        }

        const formData= new FormData()
        formData.append("title", title)
        formData.append("body", body)

        const result = await dispatch(createPostThunk(formData))

        setHasSubmitted(false)
        setTitle('')
        setBody('')
        history.push('/posts')
    }

    useEffect(()=>{
        const errors = {}
        if(latitude.length > 11 || latitude.length < 9 ) errors['latitude']="Please provide a latitude to six decimal places"
        if(longitude.length > 11 || longitude.length < 9) errors['longitude']="Please provide a longitude to six decimal places"
        setValidationErrors(errors)
        // console.log(validationErrors)
    }, [latitude, longitude])


    useEffect(()=>{
        const errors = {}
        if(title.length < 5 || title.length >=100) errors['title']="Please provide a title between 5 and 100 characters"
        if(body.length < 5 || body.length >=2000) errors['body']="Please provide a post between 5 and 2000 characters"
        setValidationErrors(errors)
    }, [title, body])

    const errorLength = Object.values(validationErrors).length

    useEffect(()=>{
        errorLength  && hasSubmitted ? setDisabled(true): setDisabled(false)
    },[errorLength, hasSubmitted])

    // console.log(latitude)
    // console.log(longitude)
    // console.log(validationErrors)

    return (
        <div id='whole-new-soil-wrapper'>
            <div id="new-soil-header">
                <h1>Soil Data Requests</h1>
                <h3>For accuracy, please make sure you submit latitude and longitude coordinates up to six decimal places. </h3>
            </div>

            <div id="input-results-wrapper">
                <form onSubmit ={(e)=> submitSoil(e)}>
                    <div id='soil-form-wrapper'>
                        {hasSubmitted && validationErrors.latitude && (
                            <div className="errors-info">
                                <p>{validationErrors.latitude}</p>
                            </div>
                        )}
                        <label>
                            <input
                                placeholder = "Latitude"
                                id="latitude-input"
                                type= "number"
                                value={latitude}
                                onChange={e=> setLatitude(e.target.value)}
                            >
                            </input>
                        </label>

                        {hasSubmitted && validationErrors.longitude && (
                            <div className="errors-info">
                                <p>{validationErrors.longitude}</p>
                            </div>
                        )}
                        <label>
                            <input
                                placeholder = "Longitude"
                                id="longitude-input"
                                type= "number"
                                value={longitude}
                                onChange={e=> setLongitude(e.target.value)}
                            >
                            </input>
                        </label>


                        <div>
                            <button disabled={disabled} id="soil-submit-button" type='submit'>Get soil data*</button>
                        </div>
                    </div>
                {emptyData && (
                    <h3 className="errors-info">Unfortunately, we do not have data for this location.</h3>
                )}
                </form>


                {display && (
                    <div id="results-wrapper">
                        <h2>Results</h2>
                        <div className="ind-results">
                            <p>% Sand:</p>
                            <p id="data-point">{sand} %</p>
                        </div>
                        <div className="ind-results">
                            <p>% Silt:</p>
                            <p id="data-point">{silt} %</p>
                        </div>
                        <div className="ind-results">
                            <p>% Clay:</p>
                            <p id="data-point">{clay} %</p>
                        </div>
                        <div className="ind-results">
                            <p>CEC:</p>
                            <p id="data-point">{cec} cmol(c)/kg</p>
                        </div>
                        <div className="ind-results">
                            <p>Bulk Density:</p>
                            <p id="data-point">{bdod} kg/dm<sup>3</sup></p>
                        </div>
                        <div className="ind-results">
                            <p>Nitrogen:</p>
                            <p id="data-point">{nitrogen} g/kg</p>
                        </div>
                        <div className="ind-results">
                            <p>Soil Organic Content:</p>
                            <p id="data-point">{soc} g/kg</p>
                        </div>
                        <div className="ind-results">
                            <p>pH:</p>
                            <p id="data-point">{phh2o}</p>
                        </div>

                        {/* <button onClick={e => saveSoil(e)}>Save data</button> */}
                        <div id="soil-buttons-wrappers" onClick={e=>setAdded(true)}>

                            <OpenModalButton
                            buttonText ="Add to my soils"
                            modalComponent ={<CreateSoilModal soilData={soilData}/>}
                            />
                            <button onClick={e => postSoil(e)}>Post with data</button>
                        </div>
                    </div>
                )}
            </div>
            {(success && (added)) &&   (
                <div>
                    <h2 id="save-success-b4-post">Soil saved successfully!</h2>
                </div>
            )}

            <div>
                {showPost &&(
                    <div id='soil-post-form-wrapper'>
                        <form onSubmit ={(e)=> submitPost(e)} id="soil-post-form-elements">
                            {hasSubmitted && validationErrors.title && (
                                <div className="errors-info">
                                    <p>{validationErrors.title}</p>
                                </div>
                            )}
                            <label>
                                <input
                                    placeholder = "Post Title"
                                    id="soil-title-input"
                                    type= "textarea"
                                    value={title}
                                    onChange={e=> setTitle(e.target.value)}
                                >
                                </input>
                            </label>

                            {hasSubmitted && validationErrors.body && (
                                <div className="errors-info">
                                    <p>{validationErrors.body}</p>
                                </div>
                            )}
                            <label>
                                <textarea
                                    placeholder = "Body"
                                    id="soil-post-form-body-input"
                                    type= "textarea"
                                    value={body}
                                    onChange={e=> setBody(e.target.value)}
                                >
                                </textarea>
                            </label>


                            <div id="submit-button-wrapper">
                                <button disabled={disabled} id="submit-button" type='submit'>Post!</button>
                            </div>
                        </form>
                    </div>
                )}
                <br></br>
                <p>*Note that data are calculated as averages of median values at depths 0-5cm, 5-15cm, 15-30cm, 30-60cm. This accounts for why the percentages do not add up to 100%. For more comprehensive data for your sample, further soil depths, or just more information about the ISRIC API, please submit the latitude and longitude coordinates for your location <a href="https://rest.isric.org/soilgrids/v2.0/docs#/default/query_layer_properties_properties_query_get">here</a>, or visit their data resource FAQs <a href="https://www.isric.org/explore/soilgrids/faq-soilgrids">here</a>.</p>
            </div>
        </div>
    )
}

export default SoilsFetch
