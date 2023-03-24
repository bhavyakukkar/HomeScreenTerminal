import programs from "./programs/index.js"

export function processor(program, args) {
    return new Promise((resolve, reject) => {
        if(Object.keys(programs).find(programName => (programName === program))) {
            const result = programs[program](args)
            resolve((typeof(result) === "object" ? result : {content: result}))
        }
        else
            reject({content: `Program '${program}' not found`})
    })
}