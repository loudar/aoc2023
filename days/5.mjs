export class Day5 {
    static runPart1(input) {
        const info = this.getMaps(input);
        const result = this.shortestFinal(info);
        console.log(`Result is: ${result}`);
        return result;
    }

    static shortestFinal(info) {
        const values = [];
        for (const seed of info.seeds) {
            let valueMap = new Map();
            const firstOrigin = info.maps[0].origin;
            valueMap.set(firstOrigin, seed);
            let lookup = seed;
            for (const map of info.maps) {
                lookup = map.content.get(lookup);
            }
            values.push(lookup);
        }
        return Math.min(...values);
    }

    static getMaps(input) {
        const parts = input.split("\n\n");
        const maps = [];
        const seeds = this.getSeeds(parts.shift());
        let maxMapLength = 0;
        for (const part of parts) {
            const map = this.getMap(part);
            if (map.content.size > maxMapLength) {
                maxMapLength = map.content.size;
            }
            maps.push(map);
        }
        for (const map of maps) {
            map.content = this.fillMapUntilIndex(map.content, maxMapLength);
        }
        return {
            seeds,
            maps
        };
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
            this.fillMapUntilIndex(mapContent, originStart);
            for (let i = 0; i < rangeLength; i++) {
                const index = originStart + i;
                const targetIndex = targetStart + i;
                mapContent.set(index, targetIndex);
            }
        }
        return mapContent;
    }

    static fillMapUntilIndex(map, stopIndex) {
        for (let i = 0; i < stopIndex; i++) {
            if (!map.has(i)) {
                map.set(i, i);
            }
        }
        return map;
    }
}

Day5.runPart1(`seeds: 79 14 55 13

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
56 93 4`);