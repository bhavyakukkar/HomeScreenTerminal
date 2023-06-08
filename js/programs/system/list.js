export default function(name, args) {
    if(args[0] == 'programs') {
        const systemPrograms = Object.keys(this).filter(program => program != '_user').join(', ') + '.'
        const userPrograms = Object.keys(this._user).join(', ') + '.'
        return {
            content: `System:\t${systemPrograms}\nUser:\t${userPrograms}`,
            done: true
        }
    }
    return {
        content: 'no arguments found',
        done: true
    }
}