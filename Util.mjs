export class Util {
    static formatTime(amount) {
        if (amount < 1000) {
            return `${amount}ms`;
        }
        const seconds = Math.floor(amount / 1000);
        const milliseconds = amount % 1000;
        return `${seconds}.${milliseconds}s`;
    }
}