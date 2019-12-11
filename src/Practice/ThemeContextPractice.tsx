import { createContext, useState } from 'react';

const ThemeContextPrac = createContext<[string, (theme: string) => void]>([
    "green",
    () => {}
]);

export default ThemeContextPrac;

// telling createContext that you're taking in a string and not putting anything out