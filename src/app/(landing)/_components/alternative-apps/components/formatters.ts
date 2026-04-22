const usdFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 0,
  style: "currency",
});

export function formatCurrencyUsd(value: number) {
  return usdFormatter.format(value);
}

export function formatAnnualUsd(value: number) {
  return `${formatCurrencyUsd(value)}/yr`;
}

export function formatMonthlyUsd(value: number) {
  return `${formatCurrencyUsd(value)}/month`;
}

export function formatSeatCount(value: number) {
  return `${value} seats`;
}

export function formatRating(value: number) {
  return value.toFixed(1);
}
