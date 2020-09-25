import React, { useState } from "react";
import IntlMessageFormat from "intl-messageformat";

interface Context {
  code: string;
  translate: (key: string) => string;
  translateValue: (key: string, value: number) => string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

export const I18nContext = React.createContext<Context>({
  code: "en",
  translate: () => "",
  translateValue: () => "",
  setCode: () => undefined,
});

const messages: { [key: string]: { [key: string]: string } } = {
  de: {
    settings: "Einstellungen",
    photos: `Du hast {value, plural,
        =0 {kein Foto.}
        =1 {ein Foto.}
        other {# Fotos.}
      }`,
  },
  en: {
    settings: "Settings",
    photos: `You have {value, plural,
        =0 {no photos.}
        =1 {one photo.}
        other {# photos.}
      }`,
  },
};

export const I18nProvider: React.FunctionComponent = (
  props
): React.ReactElement => {
  const [code, setCode] = useState("en");

  // translate pure string
  const translate = (key: string): string => {
    const message = messages[code][key];
    return new IntlMessageFormat(message, code).format() as string;
  };

  // translate string with additional value
  const translateValue = (key: string, value: number): string => {
    const message = messages[code][key];
    return new IntlMessageFormat(message, code).format({ value }) as string;
  };

  const i18n = {
    code,
    translate,
    translateValue,
    setCode,
  };
  return (
    <I18nContext.Provider value={i18n}>{props.children}</I18nContext.Provider>
  );
};
