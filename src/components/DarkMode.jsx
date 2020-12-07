import { useEffect, useState } from "react";
import styles from './DarkMode.module.css';

export default function DarkModeToggle() {
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

  function updateViewMode() {
    localStorage.setItem('darkMode', !dark);
    setDark(!dark);
  }

  return (
    <label className={ styles.label }>
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
      <input type="checkbox" checked={ dark } onChange={ updateViewMode } />
      Escuro
    </label>
  );
}