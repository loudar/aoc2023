export class Day6 {
    static async runPart1(input) {
        const lines = input.split("\n").map(l => l.trim());
        const numbersRegex = new RegExp(/\d+/g);
        const times = [...lines[0].matchAll(numbersRegex)].map(t => parseInt(t));
        const distances = [...lines[1].matchAll(numbersRegex)].map(d => parseInt(d));
        let promises = times.map((time, index) => this.getTimesToBeatDistance(time, distances[index]));
        return Promise.all(promises)
            .then(results => results.reduce((total, curr) => total * curr, 1));
    }

    static async runPart2(input) {
        return await this.runPart1(input.replaceAll(" ", ""));
    }

    static getTimesToBeatDistance(time, wonDistance) {
        const timeForWonDistance = Math.floor(this.inverseFunction(time, wonDistance)) + 1;
        return (time + 1) - (timeForWonDistance * 2);
    }

    static inverseFunction(totalTime, result) {
        return (totalTime - Math.sqrt(totalTime ** 2 - 4 * result)) / 2;
    }
}
