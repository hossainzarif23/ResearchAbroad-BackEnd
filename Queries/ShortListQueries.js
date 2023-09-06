class ShortListQueries{
    addToShortList = "INSERT INTO shortlists (`student_username`, `professor_username`) VALUES (?)";
    removeFromShortList = "DELETE FROM shortlists WHERE student_username = ? AND professor_username = ?";
    isShortListed = "SELECT * FROM shortlists WHERE student_username = ? AND professor_username = ?";
    getShortListsByUsername = "SELECT professor.username, users.name, department.uniname, professor.personalweblink, university.link FROM shortlists inner join professor on professor.username = shortlists.professor_username inner join department on professor.deptid = department.dept_id inner join university on university.name = department.uniname inner join users on professor.username = users.username WHERE student_username = ?";
}
export default ShortListQueries;