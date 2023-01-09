import { generateRandomWords } from "."

const testRandomWordGenerator = () => {
    const testStartAt = Date.now()
    console.log("Test started")
    const totalRuns = 1000000;
    console.log("Runs planned: ", totalRuns)
    let runs = 0
    let words = [];
    let matchFound = false
    let matchAtRun;
    let matchWord;

    for (let i = 0; i < totalRuns; i++) {
        runs++;
        console.log("Current run: ", i)
        const cWord = generateRandomWords(4);
        // const cWord = generateWordRepeating();
        // console.log("cWord: ", cWord)
        for (let k = 0; k < words.length; k++) {
            if (words[k] == cWord) {
                matchFound = true;
                matchAtRun = i;
                matchWord = cWord
            }
        }
        if (matchFound) break;
        else words.push(cWord)
    }
    console.log("Test run ended: ")
    console.log("Lasted for (min) ", (Date.now() - testStartAt)/60000)
    console.log("runs: ", runs)
    console.log("matched run: ", matchAtRun)
    console.log("matched word: ", matchWord)
}

// const generateWordRepeating =()=>{
//     const r = Math.round(Math.random());
//     if(r == 1) return "nice mahagoni tree wine"
//     else return "different set of words"
// }

