const currentCommand = {command: '', time: 0}
const sessionHistory = [currentCommand]

export function addToSessionHistory(command) {
    sessionHistory.shift()
    sessionHistory.unshift({command, time: Date.now()})
    sessionHistory.unshift(currentCommand)
}

export function getFromSessionHistory(index) {
    if(index >= sessionHistory.length || index < 0)
        return null
    return sessionHistory[index]
}

export function getPrefBackground() {
    return localStorage.getItem("prefBackground")
}
export function setPrefBackground(prefBackground) {
    localStorage.setItem("prefBackground", JSON.stringify(prefBackground))
}