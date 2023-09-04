class RecommendationQueries{
    recommendUniProfQuery = "SELECT DISTINCT users.username, users.name, uniname FROM department inner join professor on department.dept_id = professor.deptid inner join users on professor.username = users.username inner join interests on professor.username = interests.username WHERE interests.interestfield IN (SELECT interestfield FROM interests WHERE username = ?)";
    getInterestsByUsername = "SELECT interestfield FROM interests WHERE username = ?";
}
export default RecommendationQueries;