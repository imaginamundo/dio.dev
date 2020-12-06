import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext(false);

export default function DarkModeToggle() {
  const [ dark, setDark ] = useContext(DarkModeContext);

  function updateViewMode() {
    localStorage.setItem('darkMode', !dark);
    setDark(!dark);
  }

  return (
    <div>
      <label>
        <input type="checkbox" checked={ dark } onChange={ updateViewMode } />
        Modo noturno
      </label>
    </div>
  );
}

export function DarkModeHoc({ children }) {
  const [ dark, setDark ] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode) {
      const dark = darkMode === 'true';
      setDark(dark);
    } else if (
      window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDark(true);
      localStorage.setItem('darkMode', true);
    }
  }, []);

  let className = null;
  if (dark) className = 'dark-mode';

  return (
    <DarkModeContext.Provider value={ [ dark, setDark ] }>
      <div className={ className }>{ children }</div>
    </DarkModeContext.Provider>
  );
}