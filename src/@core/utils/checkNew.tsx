export const checkNew = ({ date }: { date: string }) => {
  const checkDate = new Date(date);
  const isNew = checkDate.getFullYear() === 2025;
  return isNew;
};
