let propertiesWithoutUnits
if (process.env.NODE_ENV !== 'production') {
  propertiesWithoutUnits = [
    'aspectRatio',
    'elevation',
    'flexGrow',
    'flexShrink',
    'lineHeight',
    'opacity',
    'shadowOpacity',
    'zIndex',
  ]
}

const devPropertiesWithUnitsRegExp =
  propertiesWithoutUnits != null
    ? new RegExp(propertiesWithoutUnits.join('|'))
    : null

export default devPropertiesWithUnitsRegExp
