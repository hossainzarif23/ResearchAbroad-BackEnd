import db from "../Database/db.js";
import AuthenticationQueries from "../Queries/AuthenticationQueries.js";

const authenticationQueries = new AuthenticationQueries();

class AuthenticationController{
    login = async(req, res) => {
        let user = req.body;
        let responses = {};
        
        const username = user.username;
        const password = user.password;

        db.query(authenticationQueries.loginUserQuery, [username, password], (err, data) => {
            if (err) {
                responses.responseCode = -1;
                responses.responseText = "Internal Database Error";
                responses.errorMessage = err.message;
                return res.json(responses);
            }
            if (data.length == 1) {
                db.query(authenticationQueries.checkStudentQuery, [username], (err, data) => {
                    if (data.length == 1) {
                        //console.log(data[0]);
                        responses.responseCode = 1;
                        responses.responseText = "Login Successful";
                        responses.username = username;
                        responses.type = 'student';
                        return res.json(responses);
                    }
                    else {
                        db.query(authenticationQueries.checkProfessorQuery, [username], (err, data) => {
                            if (data.length == 1) {
                                responses.responseCode = 1;
                                responses.responseText = "Login Successful";
                                responses.username = username;
                                responses.type = 'professor';
                                return res.json(responses);
                            }
                        })
                    }
                })
            }
            else {
                responses.responseCode = 2;
                responses.responseText = "Credential Mismatch";
                return res.json(responses);
            }
        })
    }
}

export default AuthenticationController;