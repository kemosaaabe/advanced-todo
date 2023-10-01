const normalizeDate = (date: Date) => {
  const newDate = new Date(date);

  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const days = newDate.getDate();
  const hours =
    newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
  const minutes =
    newDate.getMinutes() < 10
      ? "0" + newDate.getMinutes()
      : newDate.getMinutes();
  const seconds =
    newDate.getSeconds() < 10
      ? "0" + newDate.getSeconds()
      : newDate.getSeconds();

  return `${year}-${month}-${days} ${hours}:${minutes}:${seconds}`;
};

export default normalizeDate;
