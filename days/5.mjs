import fs from "fs";

export class Day5 {
    static runPart1(input) {
        const parts = input.split("\r\n\r\n");
        const seeds = this.getSeedsLine(parts.shift());
        const lastValues = {};
        for (const seed of seeds) {
            lastValues[seed] = seed;
        }
        for (const part of parts) {
            const map = this.getMap(part);
            for (const seed of seeds) {
                const lookup = lastValues[seed];
                const entry = map.content.find(i => lookup >= i.originStart && lookup <= i.originStart + i.rangeLength);
                let value;
                if (!entry) {
                    value = lookup;
                } else {
                    const difference = lookup - entry.originStart;
                    value = entry.targetStart + difference;
                }
                lastValues[seed] = value;
            }
        }
        return Math.min(...Object.values(lastValues));
    }

    static runPart2(input) {
        const parts = input.split("\r\n\r\n");
        const seedInfo = this.getSeedsLine(parts.shift());
        let iterationMap = this.getSeedsFromInfo(seedInfo);
        for (const part of parts) {
            const partMap = this.getMap(part);
            console.log(`--- NEW PART: ${partMap.origin} to ${partMap.target} (${iterationMap.length} items) ---`);
            let nextMap = [];
            let previousValue = -1, currentStart = 0, percentageDone = 0, k = 0;
            for (const iterationMapItem of iterationMap) {
                k++;
                if ((k / 5) % 0.1 === 0) {
                    percentageDone = (k / iterationMap.length) * 100;
                    console.log(`${percentageDone}%`);
                }
                for (let i = 0; i < iterationMapItem.length; i++) {
                    const lookup = iterationMapItem.targetStart + i;
                    const entry = partMap.content.find(i => lookup >= i.originStart && lookup <= i.originStart + i.rangeLength);
                    let value;
                    if (!entry) {
                        value = lookup;
                    } else {
                        const difference = lookup - entry.originStart;
                        value = entry.targetStart + difference;
                    }

                    const continuationValue = previousValue + 1;
                    if (value > continuationValue || value < continuationValue) {
                        nextMap.push({ originStart: iterationMapItem.originStart + i, targetStart: value, length: 1 });
                        currentStart = value;
                    } else {
                        nextMap.find(i => i.targetStart === currentStart).length += 1;
                    }

                    previousValue = value;
                }
            }
            iterationMap = nextMap;
        }
        console.log(`Final map: `, iterationMap);
        const result = Math.min(...iterationMap.map(e => e.targetStart));
        console.log(`Result is ${result}`);
        return result;
    }

    static getSeedsLine(line) {
        return line.split(":")[1].split(" ").filter(s => s !== '').map(s => parseInt(s));
    }

    static getSeedsFromInfo(info) {
        const seeds = [];
        let i = 0;
        while (i < info.length / 2) {
            const start = info[i];
            const length = info[i + 1];
            seeds.push({ targetStart: start, originStart: start, length });
            i += 2;
        }
        return seeds;
    }

    static getMap(part) {
        const mapParts = part.split(":");
        const nameParts = mapParts[0].split("-");
        return {
            origin: nameParts[0],
            target: nameParts[2],
            content: this.getMapContent(mapParts[1])
        }
    }

    static getMapContent(part) {
        const lines = part.trim().split("\n");
        const mapContent = [];
        for (const line of lines) {
            const [targetStart, originStart, rangeLength] = line
                .split(" ")
                .map(p => parseInt(p));
            mapContent.push({ targetStart, originStart, rangeLength });
        }
        return mapContent;
    }
}

const fileContent = fs.readFileSync(`../inputs/5.txt`);
const input = fileContent.toString();
Day5.runPart2(input);