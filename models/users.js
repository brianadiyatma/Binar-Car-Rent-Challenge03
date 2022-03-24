const bycypt = require('bcrypt')
const User = {
    id: 1,
    username: 'brian.adiyatma.151200@gmail.com',
    password: bycypt.hashSync('brianganteng69', 10),
    login: false
}

module.exports = User