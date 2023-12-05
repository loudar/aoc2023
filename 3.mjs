import fs from "fs";

export class Day3 {
    static run(input) {
        const rows = this.getRows(input);
        let matchedNumbers = [];
        for (let i = 0; i < rows.length; i++) {
            let adjacentRows = [rows[i]];
            if (i > 0) {
                adjacentRows.push(rows[i - 1]);
            }
            if (i < rows.length - 1) {
                adjacentRows.push(rows[i + 1]);
            }
            for (let adjacentRow of adjacentRows) {
                for (let n of rows[i].numbers) {
                    for (let s of adjacentRow.symbols) {
                        if (s.index >= n.startIndex - 1 && s.index <= n.endIndex + 1) {
                            matchedNumbers.push(n.number);
                        }
                    }
                }
            }
        }
        const result = matchedNumbers.reduce((a, n) => a + n, 0);
        console.log(`Result is ${result}`);
    }

    static getRows(input) {
        const lines = input.split("\n");
        const symbolsRegex = new RegExp(/[^.0-9]/gd);
        const numbersRegex = new RegExp(/[0-9]+/gd);
        const rows = [];
        for (const line of lines) {
            let numbers = [...line.matchAll(numbersRegex)];
            numbers = numbers
                .map(n => {
                    const startIndex = n.index;
                    return {
                        number: parseInt(n.toString()),
                        startIndex,
                        endIndex: startIndex + n.toString().length - 1
                    };
                });
            console.log(numbers, line);
            const matchedSymbols = [...line.matchAll(symbolsRegex)];
            let symbols = [];
            if (matchedSymbols) {
                let i = -1;
                symbols = matchedSymbols.map(s => {
                    i++;
                    return {
                        symbol: s.toString(),
                        index: s.index,
                    };
                });
            }
            rows.push({numbers, symbols});
        }
        return rows;
    }
}

const fileContent = fs.readFileSync(`inputs/3.txt`);
const input = fileContent.toString();

Day3.run(`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`);
Day3.run(input);