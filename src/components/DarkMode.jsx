import { createContext, useContext, useEffect, useState } from "react";
import styles from './DarkMode.module.css';

const DarkModeContext = createContext(false);

export default function DarkModeToggle() {
  const [ dark, setDark ] = useContext(DarkModeContext);

  function updateViewMode() {
    localStorage.setItem('darkMode', !dark);
    setDark(!dark);
  }

  return (
    <label className={ styles.label }>
      <input type="checkbox" checked={ dark } onChange={ updateViewMode } />
      Escuro
    </label>
  );
}

export function DarkModeHoc({ children }) {
  const [ dark, setDark ] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode) {
      const dark = darkMode === 'true';
      setDark(dark);
    } else if (window?.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDark(true);
      localStorage.setItem('darkMode', true);
    }
  }, []);

  let className = null;
  if (dark) className = 'dark-mode';

  return (
    <DarkModeContext.Provider value={ [ dark, setDark ] }>
      {
        dark &&
        <style global jsx>
          { `
            body {
              background: #000;
              box-shadow: 0 0 0 1em #000;
              color: #fff;
            }
            a {
              color: #a4f4ff;
            }
            a:visited {
              color: #d19de4;
            }
          `}
        </style>
      }
      { children }
    </DarkModeContext.Provider>
  );
}