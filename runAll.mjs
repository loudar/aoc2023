import fs from "fs";
import {Day1} from "./days/1.mjs";
import {Day2} from "./days/2.mjs";
import {Day3} from "./days/3.mjs";
import {Day4} from "./days/4.mjs";
import {Util} from "./Util.mjs";
import {Day5} from "./days/5.mjs";
import {Day6} from "./days/6.mjs";

export class DayRunner {
    static getInputList() {
        const list = [];
        list.push(this.getInputForDay(1));
        list.push(this.getInputForDay(2));
        list.push(this.getInputForDay(3));
        list.push(this.getInputForDay(4));
        list.push(this.getInputForDay(5));
        list.push(this.getInputForDay(6));
        return list;
    }

    static getInputForDay(day) {
        const fileContent = fs.readFileSync(`inputs/${day}.txt`);
        return fileContent.toString();
    }

    static async runDay(day, inputMap) {
        const input = inputMap[day - 1];
        const startTime = new Date();
        let endTime1, endTime2;
        let result1, result2;
        let dayClass;

        switch (day) {
            case 1:
                dayClass = Day1;
                break;
            case 2:
                dayClass = Day2;
                break;
            case 3:
                dayClass = Day3;
                break;
            case 4:
                dayClass = Day4;
                break;
            case 5:
                dayClass = Day5;
                break;
            case 6:
                dayClass = Day6;
                break;
        }

        result1 = await dayClass.runPart1(input);
        endTime1 = new Date();
        result2 = await dayClass.runPart2(input);
        endTime2 = new Date();

        const diff1 = endTime1 - startTime;
        const diff2 = endTime2 - startTime;
        return {
            one: {
                diff: diff1,
                result: result1
            },
            two: {
                diff: diff2,
                result: result2
            }
        }
    }

    static async runDayContinuously(day, times, inputMap) {
        let allResults = [];
        let results;
        for (let i = 0; i < times; i++) {
            const result = await this.runDay(day, inputMap);
            if (!results) {
                results = result;
            }
            allResults.push(result);
        }
        const averages = {
            one: allResults.map(r => r.one.diff).reduce((a, d) => a + d, 0) / allResults.length,
            two: allResults.map(r => r.two.diff).reduce((a, d) => a + d, 0) / allResults.length,
        };
        console.log(`Day ${day}, Part 1: ${Util.formatTime(averages.one)} (average over ${times} runs): ${results.one.result}`);
        console.log(`Day ${day}, Part 2: ${Util.formatTime(averages.two)} (average over ${times} runs): ${results.two.result}`);
    }

    static async runAllContinuously(startDay, endDay, times) {
        const inputMap = DayRunner.getInputList();
        for (let i = startDay; i < endDay + 1; i++) {
            await this.runDayContinuously(i, times, inputMap);
        }
    }
}

await DayRunner.runAllContinuously(6, 6, 1000);