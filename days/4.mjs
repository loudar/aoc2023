export class Day4 {
    static runPart1(input) {
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
        return result;
    }

    static runPart2(input) {
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
            let cardsToGet = [...cardIds].filter(id => id > checkId && id <= checkId + cardToCheck.toAdd);
            cardsToGet.forEach(id => toCheck.set(id, toCheck.get(id) + copies));
            totalCount += cardsToGet.length * copies;
        }
        return totalCount;
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
