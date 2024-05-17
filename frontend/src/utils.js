export function toLocalDate(date) {
    const offset = date.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(date.getTime() - offset)).toISOString().slice(0,10);
    return localISOTime;
  }
  
  export function toLocalTime(date) {
    const offset = date.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(date.getTime() - offset)).toISOString().slice(11,19);
    return localISOTime;
  }
  