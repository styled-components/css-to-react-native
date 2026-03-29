let propertiesWithoutUnits: string[] | undefined
if (process.env.NODE_ENV !== 'production') {
  propertiesWithoutUnits = [
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
  propertiesWithoutUnits != null
    ? new RegExp(propertiesWithoutUnits.join('|'))
    : null

const devPropertiesWithoutUnitsRegExp: RegExp | null =
  devPropertiesWithUnitsRegExp

export default devPropertiesWithoutUnitsRegExp
