export function formatJobPublishTime(time?: string | null) {
  if (!time) return "";

  const publishedAt = new Date(time).getTime();
  if (Number.isNaN(publishedAt)) return "";

  const diffMs = Date.now() - publishedAt;
  const oneHour = 60 * 60 * 1000;
  const oneDay = 24 * oneHour;

  if (diffMs < oneDay) {
    const hours = Math.max(1, Math.floor(diffMs / oneHour));
    return `发布${hours}个小时`;
  }

  const days = Math.floor(diffMs / oneDay);
  if (days <= 3) {
    return `${days}天前`;
  }

  const date = new Date(time);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}
