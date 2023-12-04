import fs from "fs";

export class Day2 {
    static configurations = {
        first: {
            red: 12,
            green: 13,
            blue: 14
        }
    }

    static run(input, configuration) {
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
        console.log(`Result: ${result}`);
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

Day2.run(input, Day2.configurations.first);