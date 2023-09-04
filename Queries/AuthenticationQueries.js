class AuthenticationQueries{
    loginUserQuery = "SELECT * FROM users WHERE username = ? AND password = ?";
    checkStudentQuery = "SELECT * FROM students WHERE username = ?";
    checkProfessorQuery = "SELECT * FROM professors WHERE username = ?";
}
export default AuthenticationQueries;