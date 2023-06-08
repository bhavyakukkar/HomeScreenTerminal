import { makeInput, parseInput } from './mechanics.js'

function main() {
    makeInput()
    parseInput('start')
}

(document.readyState !== 'loading') ? main() : document.addEventListener('DOMContentLoaded', main)