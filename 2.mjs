import fs from "fs";

export class Day2 {
    static configurations = {
        first: {
            red: 12,
            green: 13,
            blue: 14
        }
    }

    static runPart1(input) {
        const configuration = Day2.configurations.first;
        const lines = input.split("\n");
        let games = [], impossible = [];
        for (const line of lines) {
            const game = this.getGameInfo(line);
            games.push(game);
            for (const set of game.cubeSets) {
                if (set.some(c => c.count > configuration[c.color]) && !impossible.includes(game)) {
                    impossible.push(game);
                }
            }
        }
        const result = games.reduce((a, g) => {
            if (impossible.includes(g)) {
                return a;
            }
            return a + g.id;
        }, 0);
        console.log(`Result part 1: ${result}`);
    }

    static runPart2(input) {
        const lines = input.split("\n");
        let powers = [];
        for (const line of lines) {
            const game = this.getGameInfo(line);
            const minimumSet = this.getMinimumSetFromGame(game);
            const power = Object.keys(minimumSet).reduce((a, k) => {
                return a * minimumSet[k];
            }, 1);
            powers.push(power);
        }
        const result = powers.reduce((a, p) => {
            return a + p;
        }, 0);
        console.log(`Result part 2: ${result}`);
    }

    static getMinimumSetFromGame(game) {
        return game.cubeSets.reduce((a, s) => {
            for (let cube of s) {
                if (cube.count > a[cube.color]) {
                    a[cube.color] = cube.count;
                }
            }
            return a;
        }, {red: 0, blue: 0, green: 0});
    }

    static getGameInfo(line) {
        const game = line.split(":")[0];
        const id = parseInt(game.split("Game ")[1]);
        const cubeSetsParts = line.split(":")[1].split(";");
        let cubeSets = [];
        for (let part of cubeSetsParts) {
            let cubes = this.extractCubesFromSetPart(part);
            cubeSets.push(cubes);
        }
        return {
            id,
            cubeSets
        }
    }

    static extractCubesFromSetPart(part) {
        let cubes = [];
        const cubeParts = part.split(",").map(c => c.trim());
        for (let cubePart of cubeParts) {
            const cube = {
                count: parseInt(cubePart.split(" ")[0]),
                color: cubePart.split(" ")[1],
            };
            cubes.push(cube);
        }
        return cubes;
    }
}

const fileContent = fs.readFileSync(`inputs/2.txt`);
const input = fileContent.toString();

Day2.runPart1(input);
Day2.runPart2(input);