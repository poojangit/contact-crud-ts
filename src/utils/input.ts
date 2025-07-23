import readlineSync from "readline-sync"

export function getInput(prompt : string) : string {
    return readlineSync.question(prompt)
}