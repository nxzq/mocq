import dts from 'bun-plugin-dts'

await Bun.build({
  entrypoints: ['./index.ts'],
  outdir: './dist',
  // minify: true, TODO: open PR with bun (produces bug)
  plugins: [dts()]
})