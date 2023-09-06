import db from "../Database/db.js";
import UniversityQueries from "../Queries/UniversityQueries.js";

const universityQueries = new UniversityQueries();

class UniversityController{
    getUniversity = async(req, res) => {
        let responses = {};
        const name = req.body.name;
        //console.log(name);
        db.query(universityQueries.getUniversityByName, [name], (err, data) => {
            if (err) {
                responses.responseCode = -1;
                responses.responseText = "Internal Database Error";
                responses.errorMessage = err.message;
                console.log(err);
                return res.json(responses);
            }
            if (data.length == 1) {
                responses.responseCode = 1;
                responses.responseText = "University Info Fetched";
                responses.university = data;
                //console.log(data);
                return res.json(responses);
            }
            else {
                responses.responseCode = 2;
                responses.responseText = "Empty University";
                return res.json(responses);
            }
        })
    }
}
export default UniversityController;