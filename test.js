var users = yield User.findAll({
    'where': {
        'id': {
            '$eq': 1, // id = 1
            '$ne': 2, // id != 2

            '$gt': 6, // id > 6
            '$gte': 6, // id >= 6

            '$lt': 10, // id < 10
            '$lte': 10, // id <= 10

            '$between': [6, 10], // id BETWEEN 6 AND 10
            '$notBetween': [11, 15], // id NOT BETWEEN 11 AND 15

            '$in': [1, 2], // id IN (1, 2)
            '$notIn': [3, 4] // id NOT IN (3, 4)
        },
        'nick': {
            '$like': '%a%', // nick LIKE '%a%'
            '$notLike': '%a' // nick NOT LIKE '%a'
        },
        'updated_at': {
            '$eq': null, // updated_at IS NULL
            '$ne': null // created_at IS NOT NULL
        }
    }
});