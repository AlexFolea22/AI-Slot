// slotLogic.ts

export const symbolWeights = {
    crown: 0.01,
    hourglass: 0.03,
    ring: 0.04,
    goblet: 0.05,
    redGem: 0.08,
    purpleGem: 0.1,
    yellowGem: 0.12,
    greenGem: 0.15,
    blueGem: 0.18,
    zeus: 0.005,
};

export const payoutTable = {
    crown: { 8: 20, 9: 20, 10: 50, 11: 50, 12: 100, 13: 100, 14: 100, 15: 100 },
    hourglass: { 8: 5, 9: 5, 10: 20, 11: 20, 12: 50, 13: 50, 14: 50, 15: 50 },
    ring: { 8: 4, 9: 4, 10: 10, 11: 10, 12: 30, 13: 30, 14: 30, 15: 30 },
    goblet: { 8: 3, 9: 3, 10: 4, 11: 4, 12: 24, 13: 24, 14: 24, 15: 24 },
    redGem: { 8: 2, 9: 2, 10: 3, 11: 3, 12: 20, 13: 20, 14: 20, 15: 20 },
    purpleGem: { 8: 1.6, 9: 1.6, 10: 2.4, 11: 2.4, 12: 16, 13: 16, 14: 16, 15: 16 },
    yellowGem: { 8: 1, 9: 1, 10: 2, 11: 2, 12: 10, 13: 10, 14: 10, 15: 10 },
    greenGem: { 8: 0.8, 9: 0.8, 10: 1.8, 11: 1.8, 12: 8, 13: 8, 14: 8, 15: 8 },
    blueGem: { 8: 0.5, 9: 0.5, 10: 1.5, 11: 1.5, 12: 4, 13: 4, 14: 4, 15: 4 },
    zeus: { 4: 1000, 5: 2000, 6: 3000 }, // pana fac speciala
};

export const symbols = ['crown', 'hourglass', 'ring', 'goblet', 'redGem', 'purpleGem', 'yellowGem', 'greenGem', 'blueGem', 'zeus'];

export function generateReelStops(): string[] {
    const stops: string[] = [];
    for (let i = 0; i < 30; i++) { 
        let random = Math.random();
        let selectedSymbol: string | null = null; 
        let cumulativeProbability = 0;

        for (const symbol of symbols) {
            cumulativeProbability += symbolWeights[symbol];
            if (random < cumulativeProbability) {
                selectedSymbol = symbol;
                break;
            }
        }

        if (selectedSymbol) {
            stops.push(selectedSymbol);
        } else {
            // daca nu am gasit un simbol alegem unul random
            stops.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }
    }
    console.log("generateReelStops: Generated symbols length: ", stops.length);
    return stops;
}

export function calculatePayout(reelStops: string[]) {
    let totalPayout = 0;
    const symbolCounts: { [key: string]: number } = {};

    reelStops.forEach(symbol => {
        symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
    });

    for (const symbol in symbolCounts) {
        if (symbol !== 'zeus' && symbolCounts[symbol] >= 8) {
            totalPayout += payoutTable[symbol][symbolCounts[symbol]] || 0;
        } else if (symbol === 'zeus' && symbolCounts[symbol] >= 4) {
            totalPayout += payoutTable[symbol][symbolCounts[symbol]] || 0;
        }
        // aici trebuie sa fac optiunea de speciala mai tzarziu
    }

    return totalPayout;
}

export function triggerFreeSpins(reelStops: string[]) {
    const scatterCount = reelStops.filter(s => s === 'zeus').length;
    if (scatterCount >= 4) {
        return true;
    }
    return false;
}