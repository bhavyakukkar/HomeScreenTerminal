const programs = {
    start: function(args) {
        clearStdout()
        return {
            content: 'Logged into home terminal...',
            type: '#'
        }
    },

    hey: function(args) {
        if(args.join(' ') == "u suck")
            return 'and u swallow'
        return 'hiya'
    }
}


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