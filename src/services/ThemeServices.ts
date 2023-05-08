import colors from '@PescaPE/resources/colors.json';

interface ThemesObject {
  light: InterfaceThemeStructure;
  dark: InterfaceThemeStructure;
}

export default class ThemeServices {
  private readonly KEY = '@key=platform-theme';
  private readonly themes: ThemesObject = {
    light: colors.light as InterfaceThemeStructure,
    dark: colors.dark as InterfaceThemeStructure,
  };

  public getTheme(theme: 'light' | 'dark') {
    return this.themes[theme];
  }

  public toggleTheme() {
    const current = this.getCurrentTheme();
    if (current.name === 'dark') return this.setCurrentTheme('light');
    this.setCurrentTheme('dark');
  }

  public setCurrentTheme(theme: 'light' | 'dark') {
    if (!!Object.values(this.themes).find((t) => t.name === theme)) {
      localStorage.setItem(this.KEY, theme);
      this.updateTheme(theme);
      return this.getTheme(theme);
    }
    this.updateTheme();
    return this.getCurrentTheme();
  }

  public updateTheme(theme?: 'light' | 'dark') {
    const current = theme ? this.getTheme(theme) : this.getCurrentTheme();
    Object.values(current).forEach((v: InterfaceThemeElementStructure) =>
      v.name ? document.documentElement.style.setProperty(v.name, v.value) : void 0
    );
  }

  public getCurrentTheme(): InterfaceThemeStructure {
    const theme = localStorage.getItem(this.KEY);
    if (!theme) localStorage.setItem(this.KEY, this.themes.light.name);
    return theme ? Object(this.themes)[theme] : this.themes.light;
  }

  public getCurrentThemeName() {
    return this.getCurrentTheme().name;
  }
}
