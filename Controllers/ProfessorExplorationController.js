import db from "../Database/db.js";
import InterestQueries from "../Queries/InterestQueries.js";

const interestQueries = new InterestQueries();

class ProfessorExplorationController{
    exploreProfessor = async(req, res) => {
        let responses = {};
        let query = req.body.query;
        const country = query.country;
        const state = query.state;
        const city = query.city;
        const program = query.program;
        const field = query.field;
        const department = query.department;
        const ranklow = query.ranklow;
        const rankhigh = query.rankhigh;
        const studentInterests = query.studentInterests;
        let q = "SELECT DISTINCT users.username, users.name, uniname, professor.personalweblink, university.link FROM university inner join department on university.name = department.uniname inner join professor on department.dept_id = professor.deptid inner join users on professor.username = users.username inner join interests on professor.username = interests.username WHERE 1=1";
        if (country !== '') {
            q += ' AND university.country = "' + country + '"';
        }
        if (state !== '') {
            q += ' AND university.state = "' + state + '"';
        }
        if (city !== '') {
            q += ' AND university.city = "' + city + '"';
        }
        if (department !== '') {
            q += ' AND department.deptname = "' + department + '"';
        }
        if (ranklow !== '') {
            let lowerlimit = parseInt(ranklow);
            q += ' AND university.ranking >= ' + lowerlimit;
        }
        if (rankhigh !== '') {
            let upperlimit = parseInt(rankhigh);
            q += ' AND university.ranking <= ' + upperlimit;
        }
        if (studentInterests.length !== 0) {
            let interestString = '(';
            for (let i = 0; i < studentInterests.length - 1; i++) {
                interestString += "'" + studentInterests[i] + "', ";
            }
            interestString += "'" + studentInterests[studentInterests.length - 1] + "')";
            q += ' AND interests.interestfield IN ' + interestString;
        }
        //console.log(q);
        db.query(q, (err, data) => {
            if (err) {
                responses.responseCode = -1;
                responses.responseText = "Internal Database Error";
                responses.errorMessage = err.message;
                return res.json(responses);
            }
            responses.responseCode = 1;
            responses.responseText = "Professor Exploration Successful";
            responses.tuples = data;
            return res.json(responses);
        })
    }
    fetchAllInterests = async(req, res) => {
        let responses = {};
        db.query(interestQueries.getInterests, (err, data) => {
            if (err) {
                responses.responseCode = -1;
                responses.responseText = "Internal Database Error";
                responses.errorMessage = err.message;
                return res.json(responses);
            }
            responses.responseCode = 1;
            responses.responseText = "Fetching Interests Successful";
            responses.interests = data;
            return res.json(responses);
        })
    }
}

export default ProfessorExplorationController;