abstract class DateUtils {
  /**
   * Função responsável por receber um horário por string (ex: 14:30) e retornar em minutos
   * @param hourString horário em formato de string
   * @returns minutos convertidos da hora recebida
   */
  static convertHourStringToMinutes(hourString: string) {
    const [hours, minutes] = hourString.split(":").map(Number);

    const minutesAmount = hours * 60 + minutes;
    return minutesAmount;
  }

  /**
   * Função responsável por receber um horário por string (ex: 14:30) e retornar em minutos
   * @param hourString horário em formato de string
   * @returns minutos convertidos da hora recebida
   */
  static convertMinutesToHourString(minutes: number) {
    const hourString = String(Math.floor(minutes / 60)).padStart(2, "0");
    const minutesString = String(minutes % 60).padStart(2, "0");

    return `${hourString}:${minutesString}`;
  }
}

export default DateUtils;