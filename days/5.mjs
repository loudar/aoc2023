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
        const parts = input.split("\n\n");
        const seedInfo = this.getSeedsLine(parts.shift());
        let iterationMap = this.getSeedsFromInfo(seedInfo);
        for (const part of parts) {
            const partMap = this.getMap(part);
            //console.log(`--- NEW PART: ${partMap.origin} to ${partMap.target} (${iterationMap.length} items) ---`);
            let nextMap = [];
            let percentageDone = 0, k = 0;
            for (const iterationMapItem of iterationMap) {
                k++;
                const progress = k / iterationMap.length;
                if (progress % 0.1 === 0) {
                    percentageDone = progress * 100;
                    //console.log(`${percentageDone}%`);
                }
                let result = this.smartPartSearch(iterationMapItem, partMap, nextMap);
                nextMap = result.result;
                if (result.remaining > 0) {
                    while (result.remaining > 0) {
                        const lastItem = nextMap[nextMap.length - 1];
                        const newSearch = {
                            start: iterationMapItem.start + lastItem.length + 1,
                            length: result.remaining - 1
                        };
                        console.log({newSearch});
                        result = this.smartPartSearch(newSearch, partMap, nextMap);
                        nextMap = result.result;
                    }
                }
            }
            console.log(nextMap);
            iterationMap = nextMap;
        }
        console.log(`Final map: `, iterationMap);
        const result = Math.min(...iterationMap.map(e => e.start));
        //console.log(`Result is ${result}`);
        return result;
    }

    static smartPartSearch(iterationMap, partMap, existingParts) {
        const startLookup = iterationMap.start;
        const partEntry = partMap.content.find(i => startLookup >= i.originStart && startLookup <= i.originStart + i.rangeLength);

        if (!partEntry) {
            return {
                result: [
                    ...existingParts,
                    iterationMap
                ],
                remaining: 0
            };
        }

        const offset = iterationMap.start - partEntry.originStart;
        const availableLength = partEntry.rangeLength - offset;
        const remainingLength = availableLength - iterationMap.length;
        if (remainingLength >= 0) {
            console.log({
                start: partEntry.targetStart + offset,
                length: iterationMap.length
            });
            return {
                result: [
                    ...existingParts,
                    {
                        start: partEntry.targetStart + offset,
                        length: iterationMap.length
                    }
                ],
                remaining: 0
            };
        } else {
            console.log(iterationMap.start + offset, partEntry.targetStart + partEntry.rangeLength, remainingLength);
            return {
                result: [
                    ...existingParts,
                    {
                        start: partEntry.targetStart + offset,
                        length: availableLength
                    }
                ],
                remaining: iterationMap.length - availableLength
            }
        }
    }

    static getSeedsLine(line) {
        return line.split(":")[1].split(" ").filter(s => s !== '').map(s => parseInt(s));
    }

    static getSeedsFromInfo(info) {
        const seeds = [];
        let i = 0;
        while (i < info.length) {
            const start = info[i];
            const length = info[i + 1];
            seeds.push({ start, length });
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
console.log(Day5.runPart2(`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`));