import { Localization } from './localization';

export interface CreateContentArgs {
  iconProps: {
    url: string;
    width: string;
    height: string;
  };
  titleProps: {
    cssClassList: string[];
    innerHtml: Localization[keyof Localization];
  };
}
