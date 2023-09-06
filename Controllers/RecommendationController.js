import db from "../Database/db.js";
import RecommendationQueries from "../Queries/RecommendationQueries.js";

const recommendationQueries = new RecommendationQueries();

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function arrayEquals(a, b) {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
}

class RecommendationController{
    recommend = async(req, res) => {
        let responses = {};
        let query = req.body.query;
        const username = query.username;
        const interests = query.interests;
        const country = query.country;
        const state = query.state;
        const city = query.city;
        const program = query.program;
        const field = query.field;
        const department = query.department;
        const ranklow = query.ranklow;
        const rankhigh = query.rankhigh;
        const studentInterests = query.studentInterests;
        let q = "SELECT DISTINCT users.username, users.name, uniname, professor.personalweblink, university.link, department.deptname FROM university inner join department on university.name = department.uniname inner join professor on department.dept_id = professor.deptid inner join users on professor.username = users.username inner join interests on professor.username = interests.username WHERE 1=1";
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
        if (studentInterests.length === 0) {
            q += ' AND interests.interestfield IN (SELECT interestfield FROM interests WHERE username = "' + username + '")';
        }
        else {
            let interestString = '(';
            for (let i = 0; i < studentInterests.length - 1; i++) {
                interestString += "'" + studentInterests[i] + "', ";
            }
            interestString += "'" + studentInterests[studentInterests.length - 1] + "')";
            q += ' AND interests.interestfield IN ' + interestString;
        }
        db.query(q, [username], (err, data) => {
            if (err) {
                responses.responseCode = -1;
                responses.responseText = "Internal Database Error";
                responses.errorMessage = err.message;
                return res.json(responses);
            }
            responses.responseCode = 1;
            responses.responseText = "Recommendation Successful";
            for (let i = 0; i < data.length; i++) {
                let x = Math.floor((Math.random() * 50) + 50);
                data[i].matching = x;
            }
            data.sort(function(a, b){return b.matching - a.matching});
            responses.tuples = data;
            return res.json(responses);
        })
    }
    fetchInterests = async(req, res) => {
        let responses = {};
        let query = req.body.query;
        const username = query.username;
        db.query(recommendationQueries.getInterestsByUsername, [username], (err, data) => {
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

export default RecommendationController;