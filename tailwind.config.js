/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '1.08rem': '1.08rem',
        '0.7rem': '0.7rem',
      },
      fontSize: {
        '1.8rem': '1.8rem',
        '1.6rem': '1.6rem',
        '2.2rem': '2.2rem',
      },
      width: {
        '101%': '101%',
      },
      margin: {
        '-0.5%': '-0.5%',
      },
      animation: {
        'shimmer': 'shimmer 2.5s linear infinite',
        'borderGlow': 'borderGlow 2s ease-in-out infinite',
        'progressShimmer': 'progressShimmer 2s linear infinite',
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
      },
      keyframes: {
        shimmer: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '50%': { opacity: '0.1' },
          '100%': { opacity: '0', transform: 'translateY(-100%)' }
        },
        borderGlow: {
          '0%, 100%': { 
            borderColor: 'rgba(96, 165, 250, 0.2)',
            boxShadow: '0 0 10px rgba(96, 165, 250, 0.1)'
          },
          '50%': { 
            borderColor: 'rgba(96, 165, 250, 0.3)',
            boxShadow: '0 0 20px rgba(96, 165, 250, 0.2)'
          }
        },
        progressShimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
      }
    },
  },
  plugins: [],
}