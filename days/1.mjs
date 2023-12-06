export class Day1 {
    static numberMap = {
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9,
    }

    static regexPart1 = new RegExp(/\d/g);
    static regexPart2 = new RegExp(`(?=(?<inner>${Day1.numbersString}|\\d))`, 'g');

    static get numbersString() {
        return Object.keys(Day1.numberMap).join('|');
    }

    static runPart1(input) {
        return this.run(input, false);
    }

    static runPart2(input) {
        return this.run(input, true);
    }

    static run(input, includeStringNumbers) {
        const lines = input.split("\n");
        let result = 0;
        for (const line of lines) {
            const numbers = Day1.getNumbersInLine(line, includeStringNumbers);
            const add = parseInt(numbers.first.toString() + numbers.last.toString());
            result += add;
        }
        return result;
    }

    static getNumbersInLine(line, includeStrings) {
        let regex;
        if (includeStrings) {
            regex = Day1.regexPart2;
            let digitMatches = line.matchAll(regex);
            digitMatches = [...digitMatches];
            const first = digitMatches[0].groups.inner;
            const last = digitMatches[digitMatches.length - 1].groups.inner;
            return {
                first: Day1.getNumberFromMapOrDefault(first),
                last: Day1.getNumberFromMapOrDefault(last)
            };
        } else {
            regex = Day1.regexPart1;
            const digitMatches = line.match(regex);
            const first = digitMatches[0];
            const last = digitMatches[digitMatches.length - 1];
            return {
                first: Day1.getNumberFromMapOrDefault(first),
                last: Day1.getNumberFromMapOrDefault(last)
            };
        }
    }

    static getNumberFromMapOrDefault(number) {
        if (Day1.numberMap[number]) {
            return Day1.numberMap[number];
        } else {
            return parseInt(number);
        }
    }
}
