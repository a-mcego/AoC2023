import * as fs from 'fs';

function readFileLines(filename: string): string[] {
    const fileContent = fs.readFileSync(filename, 'utf-8');
    const lines = fileContent.split('\n');
    return lines;
}

const filename = '2.txt';
const lines = readFileLines(filename);

const part1_values : number[] = [12, 13, 14];
const indices : Record<string, number> = {'red': 0, 'green': 1, 'blue': 2};

var good_sum:number = 0, power_sum:number = 0;
for (const line of lines) {
    if (line.length == 0)
        continue;
    const mainparts:string[] = line.split(': ');

    var game_is_good:boolean = true;
    var maximums:number[] = [0, 0, 0];
    for(const hand of mainparts[1].split('; ')) {
        for (const handpart of hand.split(', ')) {
            const pair = handpart.split(' ');
            const num_parsed = parseFloat(pair[0]);
            const index = indices[pair[1]];
            if (part1_values[index] < num_parsed) {
                game_is_good = false;
            }
            maximums[index] = Math.max(maximums[index],num_parsed);
        }
    }
    if (game_is_good) {
        const gamenum:number = parseFloat(mainparts[0].split(' ')[1])
        good_sum += gamenum;
    }
    power_sum += maximums[0]*maximums[1]*maximums[2];
}
console.log("Part 1: " + good_sum);
console.log("Part 2: " + power_sum);
