export const fontSizeOptions = Array.from({ length: 60 }, (_, i) => {
  const px = 8 + i
  return { value: `${px}px`, name: `${px}px` }
})
