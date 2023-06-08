/**
 * 
 * @param {string} query Space-separated input command-line arguments 
 * @returns {object} Parsed associative-array listing (&lt;flag&gt;:&lt;argument&gt;) pairs & (_main:[&lt;arguments&gt;])
 */
function parseArgs(query) {
    return new Promise((resolve, reject) => {
        const error = (block, reason) => (`Error parsing part of query: --> ${block} <--\nReason: ${reason}`)
        const args = {_main: []}
        const blocklist = [...query.split(" ")]
        if(blocklist.length <= 2)
            resolve(args)
        
        let flagOpen = false
        let quotedBlock = false
        blocklist.forEach(block => {
            if(block === null && flagOpen !== false)
                args[flagOpen] = true
            else if(block.match(/^--[a-zA-Z]+$/) /* --uwu */ || block.match(/^-[a-zA-Z]$/) /* -u */) {
                if(flagOpen !== false)
                    args[flagOpen] = true
                flagOpen = block.replaceAll('-', '')
            }
            else if(block.match(/^-[a-zA-Z][a-zA-Z]+$/)) /* -uvw */ {
                if(flagOpen !== false)
                    args[flagOpen] = true
                Array.from(block.replaceAll('-', '')).forEach(flag => (!(flag in args) && (args[flag] = true)))
                flagOpen = false
            }
            else if(block == '"') /* " */ {
                if(quotedBlock == false) /* (...) " */
                    quotedBlock = ''
                else  /* (... "open ...) " <or> (... " ...) " */ {
                    quotedBlock += ' '
                    if(flagOpen !== false)
                        args[flagOpen] = quotedBlock
                    else
                        args._main.push(quotedBlock)
                    flagOpen = false
                    quotedBlock = false
                }
            }
            else if(block.match(/^"[^"]+$/)) /* "some */ {
                if(quotedBlock === false) /* (...) "some */
                    quotedBlock = block.replaceAll('"', '')
                else /* (... " ...) "some <error> <or> (... "open ...) "some <error> */
                    reject(error(block, 'Improper spacing after quoted argument'))
            }
            else if(block.match(/^[^ "]*$/)) /* text */ {
                if(quotedBlock === false) /* (...) text */ {
                    if(flagOpen !== false) /* (... -u) text <or> (... --unit) text */
                        args[flagOpen] = block
                    else /* (program) text <or> (program -d 0) text <or> (program -df) text */
                        args._main.push(block)
                    flagOpen = false
                }
                else /* (... "open ...) text (... close" ...) <or> (... " ...) text (... " ...) <or> etc. */
                    quotedBlock += ' ' + block.replaceAll('"', '')
            }
            else if(block.match(/^.*"$/)) /* found" */ {
                if(quotedBlock === false) /* (...) found" <error> */
                    reject(error(block, 'Improper spacing before quoted argument'))
                else /* (... "open ...) found <or> (... " ...) found " */ {
                    quotedBlock += (' ' + block.replaceAll('"', ''))
                    if(flagOpen !== false)
                        args[flagOpen] = quotedBlock
                    else
                        args._main.push(quotedBlock)
                    flagOpen = false
                    quotedBlock = false
                }
            }
        })
        if(flagOpen !== false || quotedBlock !== false)
            reject('Error: Incomplete Query')
        resolve(args)
        /*({satisfied, warning} = verifyUsage(args, usage))
        satisfied ? resolve(args, warning) : reject('Invalid Usage')*/  
    })
}

/**
 * 
 * @param {object} args Associative-array of arguments to program
 * @param {any[][]} usage Collection of modes for program to be called as, each mode is [flag, long-flag, example value]
 * @param {(args: object) => any} success Callback if query parsed and matched succesfully
 * @param {(args: object) => any} warning Callback if excess flags/arguments supplied in query during matching
 * @param {(usageErr: string) => any} usageErr Callback if insufficient flags/arguments supplied in query during matching
 * @param {(syntaxErr: string) => any} syntaxErr Callback if error in syntax of query
 */
function verifyArgsWithUsageArr(args, usage, success, warning, usageErr, syntaxErr) {
    let warningArgs = ['Ignoring additional arguments:', '<none>']
    let warningFlags = ['Ignoring additional flags:','<none>']
    let flagsSupplied = Object.keys(args).filter(key => key !== '_main').length
    let flagsRequired

    for(let mode of usage) {
        flagsRequired = mode.filter(key => key !== '_main').length
        let satisfied = true
        let warn = false
        let primArgsRequired = mode.find(flag => typeof(flag) === 'number')
        if(primArgsRequired !== undefined && args._main.length < primArgsRequired)
            satisfied = false
        else if (mode.length < flagsSupplied) {
            Object.keys(args).forEach(key => {
                if(key == '_main') {
                    const mainReq = mode.find(flag => typeof(flag) === 'number')
                    if(mainReq === undefined || mainReq < args._main.length)
                        warn = true
                    else
                        satisfied = false
                }
                else if(!mode.find(flag => flag == key))
                    satisfied = false
            })
        }
        else {
            mode.forEach(flag => {
                if(typeof(flag) == 'number') {
                    flag < args._main.length && ((warn = true) && (warningArgs += args._main.split(flag)))
                    flag > args._main.length && (satisfied = false)
                }
                else {

                }
            })
        }
        if(satisfied)
            break
    }
    return [satisfied, warn && 'Ignoring additional arguments: ']
}

/*parseArgs(`hey "bhavya " -l file --file "twenty three.txt" -abc`)
    .then(args => console.log(args, '\n'))
    .catch(msg => console.log(msg, '\n'))
parseArgs("--uwv there").then(args => console.log(args))*/