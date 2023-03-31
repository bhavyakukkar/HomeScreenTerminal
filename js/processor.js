import programs from "./programs/index.js"

export function processor(program, args) {
    return new Promise((resolve, reject) => {
        console.log(program, args)
        if(Object.keys(programs).find(programName => (programName === program))) {
            const result = programs[program](program, args)
            resolve((typeof(result) === "object" ? {done: true, content: '', ...result} : {content: result, done: true}))
        }
        else
            reject({content: `Program '${program}' not found`})
    })
}