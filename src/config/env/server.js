
//check if it is dev server or prod server
const isDev = window.location.href.includes('dev.')

module.exports = {
  BASE_URL:isDev?'https://box.dev.leader.codes/api':'https://box.leader.codes/api'
    // API_URL_BASE_CLIENT: 'https://papers.dev.leader.codes/api/',
    // API_URL_FILES:'https://files.codes/api/',
    // API_URL_PAY:'https://pay.leader.codes',
    // JWT:isDev? 'devJwt' : 'jwt',
}