declare module 'camelize' {
  export default function camelizeStyleName(value: string): string
}

declare module 'css-color-keywords' {
  const cssColorKeywords: Record<string, string>
  export default cssColorKeywords
}

declare module 'postcss-value-parser' {
  export interface Node {
    type: string
    value: string
    nodes?: Node[]
  }

  export interface ParsedValue {
    nodes: Node[]
  }

  export default function parse(value: string): ParsedValue
  export function stringify(node: Node): string
}
