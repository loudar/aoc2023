import fs from "fs";

export class Day5 {
    static runPart1(input) {
        const parts = input.split("\r\n\r\n");
        const seeds = this.getSeeds(parts.shift());
        const lastValues = {};
        for (const part of parts) {
            const map = this.getMap(part);
            for (const seed of seeds) {
                const lookup = lastValues[seed];
                let value = map.content[lookup];
                if (!value) {
                    value = lookup;
                }
                lastValues[seed] = value;
            }
        }
        const result = Math.min(...Object.values(lastValues));
        console.log(`Result is ${result}`);
        return result;
    }

    static getSeeds(line) {
        return line.split(":")[1].split(" ").filter(s => s !== '').map(s => parseInt(s));
    }

    static getMap(part) {
        const mapParts = part.split(":");
        const nameParts = mapParts[0].split("-");
        const origin = nameParts[0];
        const target = nameParts[2];
        const content = this.getMapContent(mapParts[1]);
        return {
            origin,
            target,
            content
        }
    }

    static getMapContent(part) {
        const lines = part.trim().split("\n");
        const mapContent = new Map();
        for (const line of lines) {
            const [targetStart, originStart, rangeLength] = line
                .split(" ")
                .map(p => parseInt(p));
            for (let i = 0; i < rangeLength; i++) {
                const index = originStart + i;
                mapContent[index] = targetStart + i;
            }
        }
        return mapContent;
    }
}

const fileContent = fs.readFileSync(`../inputs/5.txt`);
const input = fileContent.toString();
Day5.runPart1(input);