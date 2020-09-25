import React, { useContext, useState } from "react";
import { I18nProvider, I18nContext } from "./context";

function Select() {
  const i18n = useContext(I18nContext);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.setCode(event.target.value);
  };

  return (
    <select value={i18n.code} onChange={onChange}>
      <option value="de">Deutsch</option>
      <option value="en">English</option>
    </select>
  );
}

function App() {
  const i18n = useContext(I18nContext);

  const [value, setValue] = useState(0);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.valueAsNumber);
  };

  return (
    <div>
      <p>Hello enterJS 2020!</p>
      <Select />
      <div>
        <input type="number" value={value} onChange={onChange} />
      </div>
      <p>{i18n.translate("settings")}</p>
      <p>{i18n.translateValue("photos", value)}</p>
    </div>
  );
}

function Main() {
  return (
    <I18nProvider>
      <App />
    </I18nProvider>
  );
}

export default Main;
