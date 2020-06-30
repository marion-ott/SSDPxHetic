const getDateStr = (date) => {
  return date.toISOString().slice(0, 10)
}

export { getDateStr }
