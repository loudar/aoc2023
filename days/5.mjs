export class Day5 {
    static runPart1(input) {
        const parts = input.split("\r\n\r\n");
        const seeds = this.getSeeds(parts.shift());
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

    static getSeeds(line) {
        return line.split(":")[1].split(" ").filter(s => s !== '').map(s => parseInt(s));
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
