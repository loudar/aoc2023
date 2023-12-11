import fs from "fs";

export class Day7 {
    static cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    static handValues = ['five', 'four', 'full', 'three', 'two', 'one', 'high'];

    static runPart1(input) {
        const lines = input.split('\r\n');
        let hands = [];
        for (const line of lines) {
            hands.push(Day7.getHandFromLine(line));
        }
        hands = hands.sort(Day7.handSortFunction);
        let sum = 0;
        for (let i = 0; i < hands.length; i++) {
            sum += hands[i].bidAmount * (hands.length - i);
        }
        return sum;
    }

    static handSortFunction(a, b) {
        const index1 = Day7.handValues.indexOf(a.type);
        const index2 = Day7.handValues.indexOf(b.type);
        if (index1 === index2) {
            for (let i = 0; i < a.cards.length; i++) {
                if (a.cards[i] !== b.cards[i]) {
                    return Day7.cardValues.indexOf(b.cards[i]) - Day7.cardValues.indexOf(a.cards[i]);
                }
            }
        } else {
            return index1 - index2;
        }
    }

    static getHandFromLine(line) {
        const parts = line.split(" ");
        const cards = parts[0];
        const bidAmount = parts[1];
        const type = Day7.getHandType(cards);
        console.log(line, type);
        return {
            cards,
            bidAmount,
            type
        }
    }

    static getHandType(cards) {
        const cardCounts = Day7.getCardCounts(cards);
        if (cardCounts.some(e => e.count === 5)) {
            return 'five';
        }
        if (cardCounts.some(e => e.count === 4)) {
            return 'four';
        }
        if (cardCounts.some(e => e.count === 3)) {
            if (cardCounts.some(e => e.count === 2)) {
                return 'full';
            }
            return 'three';
        }
        const pairs = [...cardCounts].filter(e => e.count === 2);
        if (pairs.length === 2) {
            return 'two';
        } else if (pairs.length === 1) {
            return 'one';
        }
        return 'high';
    }

    static getCardCounts(cards) {
        let counts = [];
        for (let letter of cards) {
            const existingEntry = counts.find(e => e.letter === letter);
            if (existingEntry) {
                existingEntry.count++;
            } else {
                counts.push({ letter, count: 1 });
            }
        }
        return counts;
    }
}

const fileContent = fs.readFileSync('../inputs/7.txt');
const input = fileContent.toString();
console.log(Day7.runPart1(input));