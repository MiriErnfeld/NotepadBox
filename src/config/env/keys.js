import local from './local'
import server from './server'

let isDevOrLocal = window.location.href.includes('dev') ? window.location.href.includes('dev') : window.location.href.includes('localhost') ? window.location.href.includes('localhost') : null
const keys = isDevOrLocal ? local : server;


export default keys;
