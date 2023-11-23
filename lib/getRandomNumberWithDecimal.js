export function getRandomNumberWithDecimal(min, max, prev) {
  if (min >= max) {
    throw new Error("Минимальное значение должно быть меньше максимального");
  }

  const randomNumber = (Math.random() * (max - min) + min + prev).toFixed(2);
  return parseFloat(randomNumber);
}
