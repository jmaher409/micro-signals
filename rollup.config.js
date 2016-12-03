import typescript from 'rollup-plugin-typescript';

export default {
	entry: './src/index.ts',
	format: 'es',
	dest: 'dist/micro-signals.js',
	// moduleName: 'MicroSignals',
	plugins: [
		typescript({ typescript: require('typescript') })
	]
}
