import db from "../Database/db.js";
import ShortListQueries from "../Queries/ShortListQueries.js";

const shortListQueries = new ShortListQueries();

class ShortListController{
    addToShortList = async(req, res) => {
        let responses = {};
        const values = [req.body.username, req.body.professorusername];
        db.query(shortListQueries.addToShortList, [values], (err, data) => {
            if (err) {
                responses.responseCode = -1;
                responses.responseText = "Internal Database Error";
                responses.errorMessage = err.message;
                return res.json(responses);
            }
            responses.responseCode = 1;
            responses.responseText = "Professor Shortlisted";
            return res.json(responses);
        })
    }
    removeFromShortList = async(req, res) => {
        let responses = {};
        db.query(shortListQueries.removeFromShortList, [req.body.username, req.body.professorusername], (err, data) => {
            if (err) {
                responses.responseCode = -1;
                responses.responseText = "Internal Database Error";
                responses.errorMessage = err.message;
                return res.json(responses);
            }
            responses.responseCode = 1;
            responses.responseText = "Professor Removed from Shortlist";
            return res.json(responses);
        })
    }
    isShortlisted = async(req, res) => {
        let responses = {};
        db.query(shortListQueries.isShortListed, [req.body.username, req.body.professorusername], (err, data) => {
            if (err) {
                responses.responseCode = -1;
                responses.responseText = "Internal Database Error";
                responses.errorMessage = err.message;
                return res.json(responses);
            }
            if (data.length === 1) {
                responses.responseCode = 1;
                responses.responseText = "Professor is ShortListed";
                return res.json(responses);
            }
            responses.responseCode = 2;
            responses.responseText = "Professor is not Shortlisted";
            return res.json(responses);
        })
    }
}

export default ShortListController;