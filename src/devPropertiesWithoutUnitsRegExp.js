let propertiesWitouthUnits
if (process.env.NODE_ENV !== 'production') {
  propertiesWitouthUnits = [
    'aspectRatio',
    'elevation',
    'flexGrow',
    'flexShrink',
    'opacity',
    'shadowOpacity',
    'zIndex',
  ]
}

const devPropertiesWithUnitsRegExp =
  propertiesWitouthUnits != null
    ? new RegExp(propertiesWitouthUnits.join('|'))
    : null

export default devPropertiesWithUnitsRegExp
