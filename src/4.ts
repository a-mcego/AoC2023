import * as fs from 'fs';

function readFileLines(filename: string): string[] {
    const fileContent = fs.readFileSync(filename, 'utf-8');
    const lines = fileContent.split('\n');
    return lines;
}

const filename = '4.txt';
const lines = readFileLines(filename);

var card_amounts:Array<number> = [1];
var total_points=0;
var current_index=0;
for (const line of lines) {
    if (line.length == 0)
        continue;
    const mainparts:string[] = line.replaceAll('  ',' 0').split(': ');
    const cardpair:string[] = mainparts[1].split(' | ');

    const leftnumbers:string[] = cardpair[0].split(' ');
    const rightnumbers:string[] = cardpair[1].split(' ');

    if (card_amounts.length <= current_index) {
        card_amounts.push(1);
    }

    let winning_numbers = new Set<string>();
    leftnumbers.forEach(element => {
        winning_numbers.add(element);
    });

    var correct_cards=0;
    for (let num of rightnumbers) {
        if (winning_numbers.has(num)) {
            correct_cards += 1;
        }
    }
    if (correct_cards >= 1)
        total_points += Math.pow(2, correct_cards-1);

    for(let d=1; d<=correct_cards; d+=1) {
        let added_index = current_index+d;
        if (card_amounts.length <= added_index) {
            card_amounts.push(1);
        }
        card_amounts[added_index] += card_amounts[current_index];
    }
    current_index += 1;
}
const sum: number = card_amounts.reduce((acc, curr) => acc + curr, 0);

console.log("Part 1: " + total_points);
console.log("Part 2: " + sum);
