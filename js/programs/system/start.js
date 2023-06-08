import { updateWidth, clearStdout } from '../../ui.js'
import { getPrefBackground } from '../../storage.js'

export default function() {
    document.querySelector("#stdin input").addEventListener('input', e => updateWidth(e.target))
    setInterval(() => document.querySelector("#stdin input").focus(), 100)
    //parseInput(`setbg ${getPrefBackground()}`)
    this.setbg("setbg", [getPrefBackground()])
    clearStdout()
    return {
        content: 'Logged into home terminal...',
        type: '#',
        done: true
    }
}