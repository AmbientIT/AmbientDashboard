export default (...styles) => {
  return process.env.CLIENT
    ? styles
    : styles.reduce((next, base) => Object.assign(base, next), {})
}
