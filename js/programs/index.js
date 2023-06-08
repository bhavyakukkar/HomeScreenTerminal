//SYSTEM PROGRAMS
import start from './system/start.js'
import clear from './system/clear.js'
import exit from './system/exit.js'
import list from './system/list.js'
import help from './system/help.js'
import setbg from './system/setbg.js'

//USER PROGRAMS
import hey from './user/hey.js'
import greet from './user/greet.js'

const programs = {
    //SYSTEM PROGRAMS - global access
    start,
    clear,
    exit,
    list,
    help,
    setbg,

    //USER PROGRAMS - isolated access
    _user: {
        hey: { hey },
        greet: { greet }
    }
}
export default programs