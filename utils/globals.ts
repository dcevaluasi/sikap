export const generatedYears = (): number[] => {
  const years = Array.from(
    { length: 6 },
    (_, i) => new Date().getFullYear() - i,
  )
  return years
}
