import type { Config } from "tailwindcss";

import plugin from "tailwindcss/plugin";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		screens: {
  			DEFAULT: '1280px'
  		},
  		padding: {
  			DEFAULT: '2rem'
  		}
  	},
  	extend: {
  		fontFamily: {
  			manrope: [
  				'Manrope',
  				'sans-serif'
  			],
  			inter: [
  				'Inter',
  				'sans-serif'
  			],
			lato: [
				'Lato',
				'sans-serif'
			]
  		},
  		spacing: {},
  		colors: {
  			doow_primary: '#22A262',
			doow_dark_green: '#193228',
			doow_light_green: '#dbebe8',
  			doow_grey: '#757677',
			doow_zinc: '#3f3f46',
  			doow_offwhite: '#f9f8f6',
			doow_card: '#efefef',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
			// Sheet
			"slide-in-from-right": {
				"0%": { transform: "translateX(100%)" },
				"100%": { transform: "translateX(0)" },
			  },
			  "slide-out-to-right": {
				"0%": { transform: "translateX(0)" },
				"100%": { transform: "translateX(100%)" },
			  },
  		},
  		animation: {
			// Sheet
			"slide-in-from-right": "slide-in-from-right 0.2s ease",
			"slide-out-to-right": "slide-out-to-right 0.2s ease",
			// accordion
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate"), 
	plugin(function ({ addBase, theme }) {
		return addBase({
			'.text-heading': {
				fontSize: theme('fontSize.4xl'),
				fontWeight: theme('fontWeight.bold'),
				lineHeight: '1.4',
				letterSpacing: theme('letterSpacing.tighter'), 
				'@screen md':{
					fontSize: theme('fontSize.6xl'),
				}
			},
			'.text-riding': {
				fontSize: theme('fontSize.lg'),
				fontWeight: theme('fontWeight.medium'),
				letterSpacing: theme('letterSpacing.normal'),
				'@screen md':{
					fontSize: theme('fontSize.lg'),
				}
			},
			'.text-sub-heading': {
				fontSize: theme('fontSize.2xl'),
				fontWeight: theme('fontWeight.bold'),
				letterSpacing: theme('letterSpacing.tighter'),
				'@screen md':{
					fontSize: theme('fontSize.3xl'),
				}
			},
			'.text-caption': {
				fontSize: theme('fontSize.sm'),
				fontWeight: theme('fontWeight.bold'),
				'@screen md':{
					fontSize: theme('fontSize.lg'),
				}
			},
			'.text-body': {
				fontSize: theme('fontSize.sm'),
				fontWeight: theme('fontWeight.medium'),
				// '@screen md':{
				// 	fontSize: theme('fontSize.lg'),
				// }
			},
			'.text-button':{
				fontSize: theme('fontSize.sm'),
				fontWeight: theme('fontWeight.bold'),
				// '@screen md':{
				// 	fontSize: theme('fontSize.lg'),
				// }
			},
			'.text-input': {
				fontSize: theme('fontSize.sm'),
				fontWeight: theme('fontWeight.bold'),
				'@screen md':{
					fontSize: theme('fontSize.lg'),
				}
			},
		})
	}),
 ],
} satisfies Config;
