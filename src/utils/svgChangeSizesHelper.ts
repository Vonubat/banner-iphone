export const svgChangeSizesHelper = (svg: SVGSVGElement, boxWidth: string, boxHeight: string): void => {
  svg.setAttributeNS(null, 'width', `${boxWidth}`);
  svg.setAttributeNS(null, 'height', `${boxHeight}`);
};
