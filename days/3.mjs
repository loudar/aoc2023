export class Day3 {
    static runPart1(input) {
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
        return matchedNumbers.reduce((a, n) => a + n, 0);
    }

    static runPart2(input) {
        const rows = this.getRows(input);
        let multiplicationResults = [];
        for (let i = 0; i < rows.length; i++) {
            let adjacentRows = [rows[i]];
            if (i > 0) {
                adjacentRows.push(rows[i - 1]);
            }
            if (i < rows.length - 1) {
                adjacentRows.push(rows[i + 1]);
            }
            for (let s of rows[i].symbols) {
                let matchingNumbers = [];
                if (s.symbol !== '*') {
                    continue;
                }
                for (let adjacentRow of adjacentRows) {
                    for (let n of adjacentRow.numbers) {
                        if (s.index >= n.startIndex - 1 && s.index <= n.endIndex + 1) {
                            matchingNumbers.push(n.number);
                        }
                    }
                }
                if (matchingNumbers.length > 1) {
                    const partResult = matchingNumbers.reduce((a, n) => a * n, 1);
                    multiplicationResults.push(partResult);
                }
            }
        }
        return multiplicationResults.reduce((a, n) => a + n, 0);
    }

    static getRows(input) {
        const lines = input.split("\n");
        const symbolsRegex = new RegExp(/[^.0-9]/gd);
        const numbersRegex = new RegExp(/[0-9]+/gd);
        const rows = [];
        for (let line of lines) {
            line = line.trim();
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
