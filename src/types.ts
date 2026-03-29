export type StylePrimitive = string | number | boolean | null | undefined

export interface TransformStyleValue {
  [key: string]: string | number
}

export type StyleValue =
  | StylePrimitive
  | ShadowOffset
  | string[]
  | TransformStyleValue[]

export interface Style {
  [key: string]: StyleValue
}

export interface ShadowOffset {
  width: string | number
  height: string | number
}

export interface ParsedShadow {
  offset: ShadowOffset
  radius: string | number
  color: string
}

export type StyleTuple = [propertyName: string, value: string]
