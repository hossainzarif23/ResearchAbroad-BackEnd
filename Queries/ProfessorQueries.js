class ProfessorQueries{
    getProfessorByUsername = "SELECT deptname, tutionfee FROM professor inner join department ON professor.deptid = department.dept_id WHERE username = ?";
}

export default ProfessorQueries