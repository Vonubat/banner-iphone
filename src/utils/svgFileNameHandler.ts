export const svgFileNameHandler = (url: string): string => {
  try {
    const regexp = /[^/]+(?=.svg$)/;
    const id: RegExpMatchArray | null = url.match(regexp);

    if (!id) {
      throw new Error('Cant extract id from URL');
    }

    return `${url}#${id[0]}`;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return '';
};
