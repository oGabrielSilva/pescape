import displayStrings from '@PescaPE/resources/strs';

export declare global {
  type GlobalDisplayLang = typeof displayStrings.pt;

  interface InterfaceThemeElementStructure {
    value: string;
    name: string;
  }

  interface InterfaceThemeStructure {
    bg: InterfaceThemeElementStructure;
    text: InterfaceThemeElementStructure;
    title: InterfaceThemeElementStructure;
    variant: InterfaceThemeElementStructure;
    bgVariant: InterfaceThemeElementStructure;
    name: 'light' | 'dark';
  }
}
