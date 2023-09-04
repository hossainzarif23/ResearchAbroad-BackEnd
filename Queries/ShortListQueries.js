class ShortListQueries{
    addToShortList = "INSERT INTO shortlists (`student_username`, `professor_username`) VALUES (?)";
    removeFromShortList = "DELETE FROM shortlists WHERE student_username = ? AND professor_username = ?";
    isShortListed = "SELECT * FROM shortlists WHERE student_username = ? AND professor_username = ?";
}
export default ShortListQueries;