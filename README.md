# css-to-react-native

Converts CSS text to a React Native stylesheet object.

[Try it here](https://csstox.surge.sh)

```css
font-size: 18px;
line-height: 24px;
color: red;
```

```js
{
  fontSize: 18,
  lineHeight: 24,
  color: 'red',
}
```

Converts all number-like values to numbers, and string-like to strings.

Automatically converts indirect values to their React Native equivalents.

```css
text-shadow-offset: 10px 5px;
font-variant: small-caps;
transform: translate(10px, 5px) scale(5);
```

```js
{
  textShadowOffset: { width: 10, height: 5 },
  fontVariant: ['small-caps'],
  // Fixes backwards transform order
  transform: [
    { translateY: 5 },
    { translateX: 10 },
    { scale: 5 },
  ]
}
```

Also allows shorthand values.

```css
font: bold 14px/16px "Helvetica";
margin: 5px 7px 2px;
```

```js
{
  fontFamily: 'Helvetica',
  fontSize: 14,
  fontWeight: 'bold',
  fontStyle: 'normal',
  fontVariant: [],
  lineHeight: 16,
  marginTop: 5,
  marginRight: 7,
  marginBottom: 2,
  marginLeft: 7,
}
```

Shorthands will only accept values that are supported in React Native, so `background` will only accept a colour, `backgroundColor` will not accept an image, and `font` will not accept font-variant values that React Native does not support.

React Native's `box-shadow` and `filter` properties are passed through as
`boxShadow` and `filter`, so support depends on your React Native version.

#### Shorthand Notes

`border{Top,Right,Bottom,Left}` shorthands are not supported, because `borderStyle` cannot be applied to individual border sides.

## Supported Properties

Most React Native style properties work without a custom mapping table. Write the
React Native property name in kebab-case and this library will convert it back to
the camel-cased React Native key for you.

| CSS input | React Native output |
| --- | --- |
| `align-content` | `alignContent` |
| `background-color` | `backgroundColor` |
| `border-top-left-radius` | `borderTopLeftRadius` |
| `font-size` | `fontSize` |
| `justify-content` | `justifyContent` |
| `text-decoration-color` | `textDecorationColor` |
| `text-shadow-radius` | `textShadowRadius` |

That rule covers the standard one-to-one mappings. The library also supports the
following shorthand and special-case transforms:

| CSS input | React Native output |
| --- | --- |
| `aspect-ratio` | `aspectRatio` |
| `background` | `backgroundColor` |
| `border` | `borderWidth`, `borderColor`, `borderStyle` |
| `border-color` | `borderTopColor`, `borderRightColor`, `borderBottomColor`, `borderLeftColor` |
| `border-radius` | `borderTopLeftRadius`, `borderTopRightRadius`, `borderBottomRightRadius`, `borderBottomLeftRadius` |
| `border-width` | `borderTopWidth`, `borderRightWidth`, `borderBottomWidth`, `borderLeftWidth` |
| `flex` | `flexGrow`, `flexShrink`, `flexBasis` |
| `flex-flow` | `flexDirection`, `flexWrap` |
| `font` | `fontStyle`, `fontWeight`, `fontVariant`, `fontSize`, `lineHeight`, `fontFamily` |
| `font-family` | `fontFamily` |
| `font-variant` | `fontVariant` |
| `font-weight` | `fontWeight` |
| `margin` | `marginTop`, `marginRight`, `marginBottom`, `marginLeft` |
| `padding` | `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft` |
| `place-content` | `alignContent`, `justifyContent` |
| `shadow-offset` | `shadowOffset` |
| `text-decoration` | `textDecorationLine`, `textDecorationColor`, `textDecorationStyle` |
| `text-decoration-line` | `textDecorationLine` |
| `text-shadow` | `textShadowOffset`, `textShadowRadius`, `textShadowColor` |
| `text-shadow-offset` | `textShadowOffset` |
| `transform` | `transform` |
| `box-shadow` | `boxShadow` passthrough |
| `filter` | `filter` passthrough |

If you are unsure whether a property is available in React Native itself, check
the React Native style docs and convert the property name to kebab-case when you
write it in CSS.

# API

The API is mostly for implementors. However, the main API may be useful for non-implementors. The main API is an array of `[property, value]` tuples.

```js
import transform from 'css-to-react-native';
// or const transform = require('css-to-react-native').default;

transform([
  ['font', 'bold 14px/16px "Helvetica"'],
  ['margin', '5px 7px 2px'],
  ['border-left-width', '5px'],
]); // => { fontFamily: 'Helvetica', ... }
```

We don't provide a way to get these style tuples in this library, so you'll need to do that yourself. I expect most people will use postCSS or another CSS parser. You should try avoid getting these with `string.split`, as that has a lot of edge cases (colons and semi-colons appearing in comments etc.)

For implementors, there is also a few extra APIs available.

These are for specific use-cases, and most people should just be using the API above.

```js
import {
  getPropertyName,
  getStylesForProperty,
  transformRawValue,
} from 'css-to-react-native';

getPropertyName('border-width'); // => 'borderWidth'
getStylesForProperty('borderWidth', '1px 0px 2px 0px'); // => { borderTopWidth: 1, ... }
transformRawValue('opacity', '0.5'); // => 0.5
```

Should you wish to opt-out of transforming certain shorthands, an array of property names in camelCase can be passed as a second argument to `transform`.

```js
transform([['border-radius', '50px']], ['borderRadius']);
// { borderRadius: 50 } rather than { borderTopLeft: ... }
```

This can also be done by passing a third argument, `false` to `getStylesForProperty`.

`transformRawValue` is a lower-level helper that parses a single raw value without applying shorthand expansion.

## License

Licensed under the MIT License, Copyright © 2019 Krister Kari, Jacob Parker, and Maximilian Stoiber.

See [LICENSE.md](./LICENSE.md) for more information.
