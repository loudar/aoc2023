import fs from "fs";

export class Day4 {
    static run(input) {
        const lines = input.split("\n");
        const cards = [];
        for (let line of lines) {
            cards.push(this.getCard(line));
        }
        const cardIds = cards.map(c => c.id);
        const toCheck = new Map();
        cardIds.forEach(id => toCheck.set(id, 1));
        let totalCount = cards.length;
        for (let i = 0; i < cardIds.length; i++) {
            const checkId = i + 1;
            const cardToCheck = cards.find(c => c.id === checkId);
            const copies = toCheck.get(checkId);
            console.log(`Checking ${checkId} (${copies} copies)`);
            let cardsToGet = [...cardIds].filter(id => id > checkId && id <= checkId + cardToCheck.toAdd);
            cardsToGet.forEach(id => toCheck.set(id, toCheck.get(id) + copies));
            totalCount += cardsToGet.length * copies;
        }
        console.log(`Result is ${totalCount}`);
    }

    static getCard(line) {
        line = line.trim();
        const content = line.split(":");
        const contentParts = content[1].split("|");
        const winning = contentParts[0].split(" ").filter(p => p !== '').map(n => parseInt(n));
        const numbers = contentParts[1].split(" ").filter(p => p !== '').map(n => parseInt(n));
        let cardValue = 0, toAdd = 0;
        for (const n of numbers) {
            if (winning.includes(n)) {
                toAdd++;
                if (cardValue === 0) {
                    cardValue = 1;
                } else {
                    cardValue *= 2;
                }
            }
        }
        const idParts = content[0].split(" ");
        const id = parseInt(idParts[idParts.length - 1]);
        if (!id) {
            console.log(id);
        }
        return {
            id,
            winning,
            numbers,
            value: cardValue,
            toAdd
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
Day4.run(input);