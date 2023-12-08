export class Day6 {
    static runPart1(input) {
        const lines = input.split("\n").map(l => l.trim());
        const numbersRegex = new RegExp(/\d+/g);
        const times = [...lines[0].matchAll(numbersRegex)].map(t => parseInt(t));
        const distances = [...lines[1].matchAll(numbersRegex)].map(d => parseInt(d));
        let result = 1;
        for (let i = 0; i < times.length; i++) {
            result *= this.getTimesToBeatDistance(times[i], distances[i]);
            console.log(this.getWinningCount(times[i], distances[i]));
        }
        return result;
    }

    static runPart2(input) {
        return this.runPart1(input.replaceAll(" ", ""));
    }

    static getWinningCount(time, wonDistance) {
        let shorterHoldDistance = Infinity;
        let resultCount = 0;
        for (let i = 0; i < time; i++) {
            shorterHoldDistance = (time - i) * i;
            if (shorterHoldDistance > wonDistance) {
                resultCount++;
            }
        }
        return resultCount;
    }

    static getTimesToBeatDistance(time, wonDistance) {
        const bestTime = Math.floor(time / 2);
        const bestDistance = (time - bestTime) * bestTime;
        const countHalf = (bestDistance - wonDistance);
        console.log(countHalf * 2);
        return countHalf * 2;
    }
}
