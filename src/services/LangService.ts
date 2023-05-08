import displayStrings from '@PescaPE/resources/strs';

export default class LangService {
  public readonly languagesSupported = Object.keys(displayStrings);
  private readonly KEY = '@key=platform-language';
  private readonly strings = Object(displayStrings);

  public getSavedLang() {
    const current = localStorage.getItem(this.KEY);
    return this.getLang(current!);
  }

  public getLang(lang = 'pt'): GlobalDisplayLang {
    return this.langExist(lang) ? this.strings[lang] : this.strings[this.languagesSupported[0]];
  }

  public defineDisplayLang(lang: string) {
    const l = this.getLang(lang);
    localStorage.setItem(this.KEY, l.displaySelect.key);
    return l;
  }

  public langExist(lang: string) {
    return !!this.strings[lang];
  }
}
