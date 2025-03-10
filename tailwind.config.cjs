/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          
          light: {
            bg: '#f3f4f6',
            text: '#1f2937',
            border: '#d1d5db',
          },
        
          dark: {
            bg: '#1f2937',
            text: '#f3f4f6',
            border: '#4b5563',
        },
      },
    },
    plugins: [],
    darkMode: 'class',
  },
}