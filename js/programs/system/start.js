import { updateWidth, clearStdout } from '../../ui.js'

export default function() {
    document.querySelector("#stdin input").addEventListener('input', e => updateWidth(e.target))
    setInterval(() => document.querySelector("#stdin input").focus(), 100)
    clearStdout()
    return {
        content: 'Logged into home terminal...',
        type: '#'
    }
}