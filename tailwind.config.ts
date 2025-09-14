import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				playfair: ['Playfair Display', 'serif'],
				inter: ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				/* LYLOO Brand color palette */
				anthracite: 'hsl(var(--anthracite))',
				'vert-eau': 'hsl(var(--vert-eau))',
				'vert-pale': 'hsl(var(--vert-pale))',
				'beige-lyloo': 'hsl(var(--beige-lyloo))',
				'terracotta-lyloo': 'hsl(var(--terracotta-lyloo))',
				'marron-chaud': 'hsl(var(--marron-chaud))',
				'dore-clair': 'hsl(var(--dore-clair))',
				'orange-lyloo': 'hsl(var(--orange-lyloo))',
				
				/* Legacy wellness colors for compatibility */
				sage: {
					DEFAULT: 'hsl(var(--sage))',
					light: 'hsl(var(--sage-light))',
					dark: 'hsl(var(--sage-dark))'
				},
				terracotta: {
					DEFAULT: 'hsl(var(--terracotta))',
					light: 'hsl(var(--terracotta-light))'
				},
				cream: 'hsl(var(--cream))',
				'night-blue': 'hsl(var(--night-blue))',
				/* Difficulty level colors */
				difficulty: {
					beginner: {
						DEFAULT: 'hsl(var(--difficulty-beginner))',
						bg: 'hsl(var(--difficulty-beginner-bg))',
						foreground: 'hsl(var(--difficulty-beginner-foreground))'
					},
					intermediate: {
						DEFAULT: 'hsl(var(--difficulty-intermediate))',
						bg: 'hsl(var(--difficulty-intermediate-bg))',
						foreground: 'hsl(var(--difficulty-intermediate-foreground))'
					},
					advanced: {
						DEFAULT: 'hsl(var(--difficulty-advanced))',
						bg: 'hsl(var(--difficulty-advanced-bg))',
						foreground: 'hsl(var(--difficulty-advanced-foreground))'
					}
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
