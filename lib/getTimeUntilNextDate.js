export default function getTimeUntilNextDate(date) {
  // Получаем текущую дату и время
  const now = new Date();

  // Создаем объект Date для следующего дня
  const nextDay = new Date(date || now);
  nextDay.setDate(now.getDate() + 1);
  nextDay.setHours(0, 0, 0, 0); // Устанавливаем время на начало следующего дня

  // Разница между текущим временем и началом следующего дня в миллисекундах
  const timeDifference = nextDay - now;

  // Вычисляем количество часов, минут и секунд
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}
