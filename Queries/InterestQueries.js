class InterestQueries{
    getInterests = "SELECT * FROM interestfield"
    getCommonInterestsByUserProfessor = "SELECT interestfield FROM interests WHERE username = ? INTERSECT SELECT interestfield FROM interests WHERE username = ?"
}

export default InterestQueries;