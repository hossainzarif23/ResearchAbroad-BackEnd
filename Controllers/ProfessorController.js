import db from "../Database/db.js";
import ProfessorQueries from "../Queries/ProfessorQueries.js";
import InterestQueries from "../Queries/InterestQueries.js";

const professorQueries = new ProfessorQueries();
const interestQueries = new InterestQueries();

class ProfessorController{
    getProfessor = async(req, res) => {
        let responses = {};
        const username = req.body.professorusername;
        db.query(professorQueries.getProfessorByUsername, [username], (err, data) => {
            if (err) {
                responses.responseCode = -1;
                responses.responseText = "Internal Database Error";
                responses.errorMessage = err.message;
                //console.log(err);
                return res.json(responses);
            }
            if (data.length == 1) {
                responses.responseCode = 1;
                responses.responseText = "Professor Info Fetched";
                responses.professor = data;
                //console.log(data);
                return res.json(responses);
            }
            else {
                responses.responseCode = 2;
                responses.responseText = "Empty Professor";
                return res.json(responses);
            }
        })
    }
    getCommonInterests = async(req, res) => {
        let responses = {};
        const studentusername = req.body.username;
        const professorusername = req.body.professorusername;
        db.query(interestQueries.getCommonInterestsByUserProfessor, [studentusername, professorusername], (err, data) => {
            if (err) {
                responses.responseCode = -1;
                responses.responseText = "Internal Database Error";
                responses.errorMessage = err.message;
                return res.json(responses);
            }
            responses.responseCode = 1;
            responses.responseText = "Fetching Common Interests Successful";
            responses.interests = data;
            return res.json(responses);
        })
    }
}

export default ProfessorController;