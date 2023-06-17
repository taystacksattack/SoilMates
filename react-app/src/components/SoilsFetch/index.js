import { useDispatch } from "react-redux";
import { useState,useEffect } from 'react';
import { createSoilThunk } from '../../store/soils'
import { createPostThunk } from "../../store/posts";
import { useHistory } from 'react-router-dom';
import { sampleData } from "./sampleData";
import { getSoilData, sandParse, siltParse, clayParse, cecParse, bdodParse, nitrogenParse, socParse, phh2oParse } from "./dataParsers";
import CreateSoilModal from "../CreateSoilModal";
import OpenModalButton from "../OpenModalButton";


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

    const [display, setDisplay]= useState(false)
    const [success, setSuccess]= useState(false)
    const [showPost, setShowPost] = useState(false)
    const [emptyData, setEmptyData] = useState(false)

// TESTESTESTESING this is just to be able to make the pull request


    const submitSoil = async (e) => {
        e.preventDefault()

        setHasSubmitted(true)

        if(Object.values(validationErrors).length) {
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
            console.log("wtf where is the sand", sand)
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

        setSuccess(true)
    }

    const postSoil = async (e) => {
        e.preventDefault()
        //need to save to db  ONLY IF it hasn't already been saved.
        saveSoil(e)

        // set the default body to have the soil data
        setShowPost(true)
        setBody(`% Sand: ${sand}\n% Silt: ${silt}\n% Clay: ${clay} \nCEC: ${cec}\nBulk Density: ${bdod}\nNitrogen: ${nitrogen}\nSoil Organic Content: ${soc}\npH: ${phh2o}`)

    }

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
        if(latitude.length > 12 || latitude.length < 9) errors['latitude']="Please provide a latitude to six decimal places"
        if(longitude.length > 12 || longitude.length < 9) errors['longitude']="Please provide a longitude to six decimal places"
        setValidationErrors(errors)
        // console.log("LATITUDE FLATITUDE",latitude)
        // console.log("LONGITUDE FLONGITUDE",longitude)
    }, [latitude, longitude])

    const errorLength = Object.values(validationErrors).length

    useEffect(()=>{
    //     console.log(hasSubmitted)
        errorLength  && hasSubmitted ? setDisabled(true): setDisabled(false)
    },[errorLength, hasSubmitted])



    return (
        <div id='whole-new-soil-wrapper'>
            <div id='soil-form-wrapper'>
                <form onSubmit ={(e)=> submitSoil(e)}>
                    {hasSubmitted && validationErrors.latitude && (
                        <div className="errors-info">
                            <p>{validationErrors.latitude}</p>
                        </div>
                    )}
                    <label>
                        <input
                            placeholder = "Latitude"
                            id="latitude-input"
                            type= "textarea"
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
                            type= "textarea"
                            value={longitude}
                            onChange={e=> setLongitude(e.target.value)}
                        >
                        </input>
                    </label>

                    <br></br>
                    <div>
                        <button disabled={disabled} id="submit-button" type='submit'>Fetch!</button>
                    </div>
                </form>
                {emptyData && (
                    <h3>Unfortunately, we do not have data for this location.</h3>
                )}


                {display && (
                    <div id="results-wrapper">
                        <p>% Sand: {sand}</p>
                        <p>% Silt: {silt}</p>
                        <p>% Clay: {clay}</p>
                        <p>CEC: {cec}</p>
                        <p>Bulk Density: {bdod}</p>
                        <p>Nitrogen: {nitrogen}</p>
                        <p>Soil Organic Content: {soc}</p>
                        <p>pH: {phh2o}</p>
                        {/* <button onClick={e => saveSoil(e)}>Save data</button> */}
                        <div id="buttons-wrappers">
                            <OpenModalButton
                            buttonText ="Add Soil"
                            modalComponent ={<CreateSoilModal soilData={soilData}/>}
                            />
                        </div>
                        <button onClick={e => postSoil(e)}>Make post with data</button>
                    </div>
                )}

                {success && (
                    <div>
                        <h2 id="save-success">Saved Successfully!</h2>
                    </div>
                )}
                {showPost &&(
                    <div id='form-wrapper'>
                <form onSubmit ={(e)=> submitPost(e)}>
                    {hasSubmitted && validationErrors.title && (
                        <div className="errors-info">
                            <p>{validationErrors.title}</p>
                        </div>
                    )}
                    <label>
                        <input
                            placeholder = "Title"
                            id="title-input"
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
                            id="body-input"
                            type= "textarea"
                            value={body}
                            onChange={e=> setBody(e.target.value)}
                        >
                        </textarea>
                    </label>

                    <br></br>
                    <div>
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
