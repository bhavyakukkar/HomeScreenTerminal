export default {
    meta: {
        name: "printhelp",
        version: "0.1.0",
        author: "Bhavya Kukkar, github/@bhavyakukkar",
        date: "2023-05-12",
        desc: "This program formats the usage of a program to generate its help menu",
    },
    usage: {
        modal: {
            help: { positional: { keys: {
                program: { desc: "Name of the Program for which to print help" },
                usage: { desc: "Program Usage in JSON" } } }
            }
        }
    },
    action: function({ argsRaw, argsPosix, argsUsage, usageErr, argsErr, errMessage }) {
        if(argsErr)
            return errMessage
        
        let modeStr = '<u>Usage:</u>'
        if('modal' in usage)
            for(let modeName in usage) {
                let mode = usage.modal[modeName]
            }
        else
            modeStr += `        ${programName} [OPTIONS]`

        return `
        Usage:  ${usage.modal} 
        `
    }
}