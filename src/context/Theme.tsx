import { createContext, useState, ReactNode } from "react";

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}> 
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;