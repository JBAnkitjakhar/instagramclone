// // tailwind.config.js
// export default {
//   darkMode: ["class"],
//   content: [
//     './pages/**/*.{js,jsx}',
//     './components/**/*.{js,jsx}',
//     './app/**/*.{js,jsx}',
//     './src/**/*.{js,jsx}',
//   ],
//   prefix: "",
//   theme: {
//     container: {
//       center: true,
//       padding: "2rem",
//       screens: {
//         "2xl": "1400px",
//       },
//     },
//     extend: {
//       keyframes: {
//         "accordion-down": {
//           from: { height: "0" },
//           to: { height: "var(--radix-accordion-content-height)" },
//         },
//         "accordion-up": {
//           from: { height: "var(--radix-accordion-content-height)" },
//           to: { height: "0" },
//         },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// }


// tailwind.config.js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'pink': {
//           500: '#ff385c',
//         },
//         'red': {
//           500: '#ff5a5f',
//         },
//       },
//       animation: {
//         'gradient-x': 'gradient-x 15s ease infinite',
//         'gradient-y': 'gradient-y 15s ease infinite',
//         'gradient-xy': 'gradient-xy 15s ease infinite',
//       },
//       keyframes: {
//         'gradient-y': {
//           '0%, 100%': {
//             'background-size': '400% 400%',
//             'background-position': 'center top'
//           },
//           '50%': {
//             'background-size': '200% 200%',
//             'background-position': 'center center'
//           }
//         },
//         'gradient-x': {
//           '0%, 100%': {
//             'background-size': '200% 200%',
//             'background-position': 'left center'
//           },
//           '50%': {
//             'background-size': '200% 200%',
//             'background-position': 'right center'
//           }
//         },
//         'gradient-xy': {
//           '0%, 100%': {
//             'background-size': '400% 400%',
//             'background-position': 'left center'
//           },
//           '50%': {
//             'background-size': '200% 200%',
//             'background-position': 'right center'
//           }
//         }
//       },
//     },
//   },
//   plugins: [],
// }



export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink': {
          500: '#ff385c',
        },
        'red': {
          500: '#ff5a5f',
        },
        'instagram': {
          blue: '#0095f6',
          red: '#ed4956',
          lightgray: '#efefef',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
    },
  },
  plugins: [],
}