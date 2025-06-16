export function formatToEuro(amount: number): string {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export function convertEuroToCents(priceInEuro: number): number {
  if (isNaN(priceInEuro) || priceInEuro < 0) {
    throw new Error('Invalid price: Please provide a non-negative number.');
  }

  return Math.round(priceInEuro * 100);
}
