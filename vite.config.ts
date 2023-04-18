import { resolve } from "path"

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
export default defineConfig(async ({ mode, command }) => {
	return {
		resolve: {
			alias: {
				"~": resolve(__dirname, "./src"),
			},
		},
		plugins: [
			react(),
		],
	}
})
