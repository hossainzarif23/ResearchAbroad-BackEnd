import db from "../Database/db.js";

class UniversityExplorationController{
    exploreUniversities = async(req, res) => {
        let responses = {};
        let query = req.body.query;
        const country = query.country;
        const state = query.state;
        const city = query.city;
        let ranklow = query.ranklow;
        let rankhigh = query.rankhigh;
        let q = "SELECT name, link FROM university WHERE 1=1";
        if (country !== '') {
            q += ' AND country = "' + country + '"';
        }
        if (state !== '') {
            q += ' AND state = "' + state + '"';
        }
        if (city !== '') {
            q += ' AND city = "' + city + '"';
        }
        if (ranklow !== '') {
            let lowerlimit = parseInt(ranklow);
            q += ' AND ranking >= ' + lowerlimit;
        }
        if (rankhigh !== '') {
            let upperlimit = parseInt(rankhigh);
            q += ' AND ranking <= ' + upperlimit;
        }
        console.log(q);
        db.query(q, (err, data) => {
            if (err) {
                responses.responseCode = -1;
                responses.responseText = "Internal Database Error";
                responses.errorMessage = err.message;
                return res.json(responses);
            }
            responses.responseCode = 1;
            responses.responseText = "University Exploration Successful";
            responses.universities = data;
            return res.json(responses);
        })
    }
}

export default UniversityExplorationController;