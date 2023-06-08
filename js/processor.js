import programs from "./programs/index.js"
import { parseArgs, verifyArgsWithUsageExps } from "./utility.js"

export function processor(program, argString) {
    console.log(program, argString)
    return new Promise((resolve, reject) => {
        let programObj

        if(Object.keys(programs).find(programName => (programName === program)))
            programObj = programs[program]
        else if(Object.keys(programs._user).find(programName => (programName === program)))
            programObj = programs._user[program][program]
        else {
            reject({content: `Program '${program}' not found`})
            return
        }
        
        parseArgs(argString).then(args => {
            verifyArgsWithUsageExps(args, programObj.usageExps,
                //callback: successful, proceed execution
                args => resolve({done: true, content: '', ...programObj.execute(program, args)}),

                //callback: warning, proceed execution
                warning => {
                    const result = programObj.execute(program, args)
                    resolve({done: true, ...result, content: `${warning}${result.content ? ('\n'+result.content) : ''}`})
                },

                //callback: usage error, abort execution
                usageErr => reject({content: usageErr}),
                
                //callback: syntax error, abort execution
                syntaxErr => reject({content: syntaxErr})
            )
        })
    })
}