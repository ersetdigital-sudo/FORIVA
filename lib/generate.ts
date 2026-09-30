export function randomInvoice(): string {
  return `#FOR-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function randomSerialNumber(): string {
  return `SN${Math.floor(100000000000 + Math.random() * 900000000000)}`;
}

export function randomPlnToken(): string {
  return Array.from({ length: 4 }, () =>
    String(Math.floor(1000 + Math.random() * 9000)),
  ).join("-");
}
