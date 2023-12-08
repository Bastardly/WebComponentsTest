import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	base: '/',
	publicDir: 'public',
	resolve: {
		alias: {
			'@app/': `${path.resolve(__dirname, 'src')}/`,
			'@test/': `${path.resolve(__dirname, 'test')}/`
		}
	},
	build: {
		rollupOptions: {
			input: {
				testpage: path.resolve(__dirname, 'testpage.html'),
			},
		},
	},
})