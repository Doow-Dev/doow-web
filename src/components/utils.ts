import styled from "styled-components";

export interface CustomTextProps {
  readonly color?: string;
  readonly margin?: number | string;
  readonly padding?: number;
  readonly title?: boolean;
  readonly subheading?: boolean;
  readonly large?: boolean;
  readonly medium?: boolean;
  readonly small?: boolean;
  readonly tiny?: boolean;
  readonly size?: number;
  readonly extraTiny?: boolean;
  readonly light?: boolean;
  readonly heavy?: boolean;
  readonly bold?: boolean;
  readonly center?: boolean;
  readonly right?: boolean;
}

export const Text = styled.p<CustomTextProps>`
  color: ${({ color }) => color ?? "#dbdbdb"};
  margin: ${(props) => props.margin ?? 0};
  padding: ${(props) => props.padding ?? 0};
  /* Font Size */
  ${({ title, subheading, large, medium, small, tiny, extraTiny, size }) => {
    switch (true) {
      case title:
        return `font-size: 32px;`;
      case subheading:
        return `font-size: 24px;`;
      case large:
        return `font-size: 18px;`;
      case medium:
        return `font-size: 15px;`;
      case small:
        return `font-size: 11px;`;
      case tiny:
        return `font-size: 10px;`;
      case extraTiny:
        return `font-size: 9px;`;
      default:
        return "font-size: 13px;";
    }
  }}

  font-size: ${(props) => props.size}px;
  /* Font Weight */
  ${({ light, bold, heavy }) => {
    switch (true) {
      case light:
        return `font-weight: 400;`;
      case bold:
        return `font-weight: 600;`;
      case heavy:
        return `font-weight: 800;`;
      default:
        return `font-weight: 500;`;
    }
  }}

  /* Alignment */

  ${({ center, right }) => {
    switch (true) {
      case center:
        return `text-align: center;`;
      case right:
        return `text-align: right;`;
      default:
        return `text-align: left`;
    }
  }}
`;
