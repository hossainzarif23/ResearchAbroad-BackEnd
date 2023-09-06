class UniversityQueries{
    getUniversityByName = "SELECT name, link, oncampuscost, offcampuscost, ranking FROM university WHERE name = ?";
}

export default UniversityQueries;