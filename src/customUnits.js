const customUnitRe = unit =>
  new RegExp(`^([+-]?(?:\\d*\\.)?\\d+(?:e[+-]?\\d+)?)${unit}?$`, 'i')

// Contains all the units registered via 'declareCustomUnit'
const customUnits = []

// Add a custom unit to registry
export const declareCustomUnit = (unit, scaleValue) => {
  customUnits.push({
    suffix: unit,
    regex: customUnitRe(unit),
    scaleValue,
  })
}

// Check if the value matches against any declared units
export const matchesCustomUnit = token => {
  for (let i = 0; i < customUnits.length; i += 1) {
    const unit = customUnits[i]

    // Check if string matches RegEx
    const customUnitMatch = token.match(unit.regex)
    if (customUnitMatch !== null) {
      // Get number value from match result
      const value = Number(customUnitMatch[1])

      // Apply scale factor to number
      if (typeof unit.scaleValue === 'function') {
        return unit.scaleValue(value)
      }
      return value * unit.scaleValue
    }
  }

  return null
}
