export const fontSizeOptions = Array.from({ length: 53 }, (_, i) => {
  const px = 8 + i
  return { value: `${px}px`, name: `${px}px` }
})

const families = ['Arial', 'Cursive', 'Helvetica', 'Times New Roman', 'Verdana']

export const fontFamilyOptions = Array.from(families, (e) => {
  return { value: e, name: e }
})
