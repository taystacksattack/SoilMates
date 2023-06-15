import { useDispatch } from "react-redux";
import { useState,useEffect } from 'react';
import { createSoilThunk } from '../../store/soils'
import { useHistory } from 'react-router-dom';
import { sampleData } from "./sampleData";
import { getSoilData, dataProperties, sandParse, siltParse, clayParse, cecParse, bdodParse, nitrogenParse, socParse, phh2oParse } from "./dataParsers";


const SoilsFetch = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [sand, setSand] = useState('')
    const [silt, setSilt] = useState('')
    const [clay, setClay] = useState('')
    const [cec, setCec] = useState('')
    const [bdod, setBdod] = useState('')
    const [nitrogen, setNitrogen] = useState('')
    const [soc, setSoc] = useState('')
    const [phh2o, setPhh2o] = useState('')

    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [disabled, setDisabled]= useState(false)
    const [display, setDisplay]= useState(false)
    const [success, setSuccess]= useState(false)


    const submitSoil = async (e) => {
        e.preventDefault()

        setHasSubmitted(true)

        if(Object.values(validationErrors).length) {
            return
        }

        //sample data for testing purposes (so you're not doing API calls everytime)
        const data = sampleData

        //actual data collection IRL. Uncomment when you're ready...
        // const data = await getSoilData(longitude, latitude)

        // this gives you the whole data object parsed to the specific elements/properties - is an array (note the keying in of "layers")
        console.log("WHOLE DATA SHEBANG", data.properties)

        setSand(sandParse(data))
        setSilt(siltParse(data))
        setClay(clayParse(data))
        setCec(cecParse(data))
        setBdod(bdodParse(data))
        setNitrogen(nitrogenParse(data))
        setSoc(socParse(data))
        setPhh2o(phh2oParse(data))


        setDisplay(true)
        setHasSubmitted(false)
        // setLatitude('')
        // setLongitude('')
        // history.push('/soils')
    }

    const saveSoil = async (e) =>{
        e.preventDefault()
        // FORM STUFF WHEN READY TO GO TO BACKEND
        const formData= new FormData()
        formData.append("latitude", latitude)
        formData.append("longitude", longitude)
        formData.append("percent_sand", sand)
        formData.append("percent_silt", silt)
        formData.append("percent_clay", clay)
        formData.append("cec", cec)
        formData.append("bdod", bdod)
        formData.append("nitrogen", nitrogen)
        formData.append("soc", soc)
        formData.append("phh2o", phh2o)



        const result = await dispatch(createSoilThunk(formData))

        setSuccess(true)
    }

    const postSoil = async (e) => {
        e.preventDefault()
        //need to save to db first
        saveSoil(e)

    }

    useEffect(()=>{
        const errors = {}
        if(latitude.length > 12 || latitude.length < 9) errors['latitude']="Please provide a latitude to six decimal places"
        if(longitude.length > 12 || longitude.length < 9) errors['longitude']="Please provide a longitude to six decimal places"
        setValidationErrors(errors)
        console.log("LATITUDE FLATITUDE",latitude)
        console.log("LONGITUDE FLONGITUDE",longitude)
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
                        <button onClick={e => saveSoil(e)}>Save data</button>
                        <button onClick={e => postSoil(e)}>Make post with data</button>
                        {success && (
                            <p id="save-success">Saved Successfully!</p>
                        )}
                    </div>
                )}
                <br></br>
                <p>*Note that data are calculated as averages of median values at depths 0-5cm, 5-15cm, 15-30cm, 30-60cm. This accounts for why the percentages do not add up to 100%. For more comprehensive data for your sample, further soil depths, or just more information about the ISRIC API, please submit the latitude and longitude coordinates for your location <a href="https://rest.isric.org/soilgrids/v2.0/docs#/default/query_layer_properties_properties_query_get">here</a>, or visit their data resource FAQs <a href="https://www.isric.org/explore/soilgrids/faq-soilgrids">here</a>.</p>
            </div>
        </div>
    )
}

export default SoilsFetch
