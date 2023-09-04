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
        let q = "SELECT DISTINCT users.username, users.name, uniname FROM university inner join department on university.name = department.uniname inner join professor on department.dept_id = professor.deptid inner join users on professor.username = users.username inner join interests on professor.username = interests.username WHERE 1=1";
        if (country !== '') {
            q += ' AND university.country = "' + country + '"';
        }
        if (state !== '') {
            q += ' AND university.state = "' + state + '"';
        }
        if (city !== '') {
            q += ' AND university.city = "' + city + '"';
        }
        if (field === '') {
            q += ' AND interests.interestfield IN (SELECT interestfield FROM interests WHERE username = "' + username + '")';
        }
        else {
            q += ' AND interests.interestfield = "' + field + '"';
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
            shuffleArray(data);
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