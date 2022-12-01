export interface HTMLElementProps {
  cssClassList?: string[];
  attributes?: [string, string][];
  innerHtml?: string;
  id?: string;
}

export interface SVGElementProps {
  cssClassList?: string[];
  boxWidth?: string;
  boxHeight?: string;
  attributes?: [string, string][];
  color?: string;
  id?: string;
}
