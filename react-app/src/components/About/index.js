import "./About.css"


const About = () => {
    return (
        <div id="about-us-wrapper" style={{width: 85 + 'rem'}}>
            <h1>About Us</h1>

            <p>Soil Mates provides a forum for farmers, ecologists, soil scientists, and others who are interested in farming and soil to query for answers to their soil questions, recommendations for crop production, and to share expertise. </p>
            <br></br>
            <p>Soil Mates also distills data from the International Soil Research and Information Center (<a id="span-links" href="https://www.isric.org/">ISRIC</a>) to provide farmers with a snap shot of the soil at a particular latitude and longitude coordinate. This provides a quick method for our users to guage the quality and fertility of their soil. As accuracy and confidence are always a concern, Soil Mates does presume itself to be the definitive guide for soil scientists. Rather, our site provides simple and convenient soil data fetching and an opportunity to discuss and troubleshoot soil and farming concerns. These can range from effects of herbicide drift, soil nutrient deficiencies, management techniques, and many more.  </p>
            <br></br>
            <p>So come join us! Browse our forums, post your own question, or provide feedback to another user!</p>
            <br></br>
            <h1>Interpretting Soil Data</h1>
            <p>Note that data are calculated as averages of median values at depths 0-5cm, 5-15cm, 15-30cm, 30-60cm. This accounts for why the percentages do not add up to 100%. For more comprehensive data for your sample, further soil depths, or just more information about the ISRIC API, please submit the latitude and longitude coordinates for your location <a id="isric-link"  href="https://rest.isric.org/soilgrids/v2.0/docs#/default/query_layer_properties_properties_query_get">here</a>, or visit their data resource FAQs <a id="isric-link" href="https://www.isric.org/explore/soilgrids/faq-soilgrids">here</a> </p>
            <br></br>
            <div id="interpretive-table" >
                <h2>Ideal Ranges</h2>
                        <div className="ind-results">
                            <p id="interpret-table-parameter">% Sand:</p>
                            <p id="table-target-value">22-52%</p>
                        </div>
                        <div className="ind-results">
                            <p id="interpret-table-parameter">% Silt:</p>
                            <p id="table-target-value">28-50%</p>
                        </div>
                        <div className="ind-results">
                            <p id="interpret-table-parameter">% Clay:</p>
                            <p id="table-target-value">8-28%</p>
                        </div>
                        <div className="ind-results">
                            <p id="interpret-table-parameter">CEC:</p>
                            <p id="table-target-value">25-40cmol(c)/kg is considered optimal, but plants can manage 5-100cmol(c)/kg</p>
                        </div>
                        <div className="ind-results">
                            <p id="interpret-table-parameter">Bulk Density:</p>
                            <p id="table-target-value">1.0-1.4kg/dm<sup>3</sup></p>
                        </div>
                        <div className="ind-results">
                            <p id="interpret-table-parameter">Nitrogen*:</p>
                            <p id="table-target-value">25-50mg-N/kg (sandy), 50-75mg-N/kg(loam), and 75-125mg-N/kg (clay) </p>
                        </div>
                        <div className="ind-results">
                            <p id="interpret-table-parameter">Soil Organic Content:</p>
                            <p id="table-target-value"> (the more the better...)**g/kg</p>
                        </div>
                        <div className="ind-results">
                            <p id="interpret-table-parameter">pH:</p>
                            <p id="table-target-value">between 6 & 7</p>
                        </div>
            </div>
            <br></br>
            <p>*ISRIC uses mapped units of cg/kg and considers g-N/kg to be the conventional unit, however, its values are seemingly off by a power of ten compared to reasonable concentrations of N. We have, adjusted the math to reflect mg-N/kg/ </p>
            <p>**There is no standardized, ideal amount of organic material, however, the higher the number, the better.</p>
        </div>
    )
}

export default About
