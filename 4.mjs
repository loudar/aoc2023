import fs from "fs";

export class Day4 {
    static run(input) {
        const lines = input.split("\n");
        let result = 0;
        for (let line of lines) {
            const card = this.getCard(line);
            let cardValue = 0;
            for (const n of card.numbers) {
                if (card.winning.includes(n)) {
                    if (cardValue === 0) {
                        cardValue = 1;
                    } else {
                        cardValue *= 2;
                    }
                }
            }
            result += cardValue;
        }
        console.log(`Result is ${result}`);
    }

    static getCard(line) {
        line = line.trim();
        const content = line.split(":");
        const contentParts = content[1].split("|");
        const winning = contentParts[0].split(" ").filter(p => p !== '').map(n => parseInt(n));
        const numbers = contentParts[1].split(" ").filter(p => p !== '').map(n => parseInt(n));
        return {
            winning,
            numbers
        }
    }
}

const fileContent = fs.readFileSync(`inputs/4.txt`);
const input = fileContent.toString();

Day4.run(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`);