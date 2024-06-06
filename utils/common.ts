import { EasterEggs } from "../constants/common";

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomEasterEgg() {
  let totalWeight = 0;
  EasterEggs.forEach(egg => {
    totalWeight += egg.weight;
  });

  const randomWeight = getRandomInt(1, totalWeight);
  let currentWeight = 0;

  for (let i = 0; i < EasterEggs.length; i++) {
    currentWeight += EasterEggs[i].weight;
    if (randomWeight <= currentWeight) {
      return EasterEggs[i].name;
    }
  }
}