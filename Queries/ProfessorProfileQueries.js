class ProfessorProfileQueries{
    getProfessorByUsername = "SELECT professor.username FROM users inner join professor on users.username = professor.username WHERE professor.name = ?";
}