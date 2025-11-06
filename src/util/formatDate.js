function pad2(n) {
  return n < 10 ? "0" + n : String(n);
}

export function formatDate(dateInput, formatStr = "d/m/y") {
  if (!dateInput) return "";
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "";

  const Y = String(date.getFullYear());
  const M = pad2(date.getMonth() + 1);
  const D = pad2(date.getDate());

  // Replace runs of y/m/d with the desired value.
  // y+, m+, d+ all map to full-year, zero-padded month and day respectively.
  return String(formatStr)
    .replace(/y+/g, Y)
    .replace(/m+/g, M)
    .replace(/d+/g, D);
}

export default formatDate;
