import { parseInput } from '../../mechanics.js'


export default {
    //program metadata
    meta: {
        //program name
        name: "greet",
    
        //program version
        version: "0.1.0",
        
        //program author
        author: "Bhavya Kukkar, github/@bhavyakukkar",

        //release date
        date: "2023-03-24",

        //program description
        desc: "This program greets a person.",
    },


    //program command-line usage
    usage: {
        modal: {
            //mode 'at' requires 3 positional arguments 'name', 'at' & 'time'
            in: {
                positional: {
                    wrap: false,
                    keys: {
                        name: {
                            desc: "Name of the person to greet",
                            accept: null, /* will match any text */
                        },
                        at: {
                            desc: "Indicator for 'at' mode",
                            accept: /^at$/i
                        },
                        time: {
                            desc: "Time at which person is to be greeted",
                            accept: /^\d+ (seconds|minutes|hours)$/,
                            eg: "5 seconds" /* used when generating printhelp */
                        }
                    }
                },
                /* defined attributes not requiring customizations can be set as null. they can also be omitted as seen in the next mode 'now' */
                named: null
            },

            //mode 'now' requires 1 position argument 'name'
            now: {
                positional: {
                    wrap: true, /* this will join all space-separated arguments and insert into single key 'name' */
                    keys: {
                        name: {
                            desc: "Name of the person to greet",
                            accept: /\d*/
                        }
                    }
                }
            },

            //mode 'later' requires no arguments
            askmyname: null, /* null tells the parser that all proceeding children fields are empty */
        },
    
        optional: {
            //todo: add another optional arg to demonstrate specific modes
            //optional argument 'how' can be used with all modes
            how: {
                modes: 'all',
                short: null,
                desc: "How you want the person to be greeted",
                eg: "Hello there, <>, how are you?"
            },
            help: {
                modes: 'all',
                short: 'h',
                desc: null,
                eg: null
            }
        }
    },


    //program source code
    action: function({ argsRaw, argsPosix, argsUsage, usageErr, argsErr, errMessage }) {
        if(argsErr)
            return ('Problem in arguments entered:\n' + errMessage)
        if(argsErr || ('help' in parsed.optional))
            return parseInput('printhelp greet ' + JSON.stringify(this.usage))
        
        if(_main.length == 0)
            return {
                content: "What's your name?",
    
                //'done: false' indicates execution not over, next command will call this program
                done: false
            }
        return {
            content: `Hello, ${_main.join(' ')}`,
            done: true
        }
    }
}