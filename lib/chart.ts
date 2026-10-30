// Deterministic sample series so server and client render the same chart.
export function series(length: number, start: number, volatility: number, drift: number, seed: number) {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const out: number[] = [];
  let v = start;
  for (let i = 0; i < length; i++) {
    v += (rand() - 0.5) * volatility + drift;
    out.push(v);
  }
  return out;
}

export function toPath(values: number[], width: number, height: number, pad = 8) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = pad + (1 - (v - min) / span) * (height - pad * 2);
      return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}
