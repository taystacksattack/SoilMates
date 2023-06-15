import { useDispatch } from "react-redux";
import { useState,useEffect } from 'react';
// import { createPostThunk } from '../../store/posts'
import { useHistory } from 'react-router-dom';
import { dataProperties, sandParse, siltParse, clayParse, cecParse, bdodParse, nitrogenParse, socParse, pph2oParse } from "./dataParsers";


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
    const [pph2o, setPph2o] = useState('')

    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [disabled, setDisabled]= useState(false)
    const [display, setDisplay]= useState(false)


    const submitSoil = async (e) => {
        e.preventDefault()

        setHasSubmitted(true)

        if(Object.values(validationErrors).length) {
            return
        }
        //lat and long string-interpolated THIS ACTUALLY WORKS - COMMENT BACK IN WHEN READY
        // const response = await fetch(`https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=bdod&property=cec&property=clay&property=nitrogen&property=phh2o&property=sand&property=silt&property=soc&depth=0-5cm&depth=0-30cm&depth=5-15cm&depth=15-30cm&depth=30-60cm&value=Q0.5&value=mean&value=uncertainty`)
        // const data = await response.json()
        // console.log("here is the jsonified data", data)

        // console.log("SAMPLE DATA S@#%SHOW", sampleData)
        console.log("data data data", dataProperties)
        setSand(sandParse())
        setSilt(siltParse())
        setClay(clayParse())
        setCec(cecParse())
        setBdod(bdodParse())
        setNitrogen(nitrogenParse())
        setSoc(siltParse())
        setPph2o(pph2oParse())



        // FORM STUFF WHEN READY TO GO TO BACKEND
        // const formData= new FormData()
        // formData.append("title", title)
        // formData.append("body", body)

        // const result = await dispatch(createPostThunk(formData))

        setDisplay(true)
        // setHasSubmitted(false)
        // setLatitude('')
        // setLongitude('')
        // history.push('/soils')
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
                        <button disabled={disabled} id="submit-button" type='submit'>Post!</button>
                    </div>
                </form>

                {display && (
                    <div id="results-wrapper">
                        <p>% Sand: {sand}</p>
                        <p>% Silt: {silt}</p>
                        <p>% Clay: {clay}</p>
                        <p>CEC: {cec}</p>
                        <p>Bulk Density: {silt}</p>
                        <p>Nitrogen: {nitrogen}</p>
                        <p>Soil Organic Content: {soc}</p>
                        <p>pH: {pph2o}</p>
                    </div>
                )}
                <p>*Note that data are calculated as averages of median values at depths 0-5cm, 5-15cm, 15-30cm, 30-60cm. This accounts for why the percentages do not add up to 100%. For more comprehensive data for your sample, further soil depths, or just more information about the ISRIC API, please submit the latitude and longitude coordinates for your location <a href="https://rest.isric.org/soilgrids/v2.0/docs#/default/query_layer_properties_properties_query_get">here</a>, or visit their data resource FAQs at <a href="https://www.isric.org/explore/soilgrids/faq-soilgrids">here</a>.</p>
            </div>
        </div>
    )
}

export default SoilsFetch
