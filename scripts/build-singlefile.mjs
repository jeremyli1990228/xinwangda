import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

let html = readFileSync(resolve(dist, 'index.html'), 'utf8')

const jsTag = html.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/)
const cssTag = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/)
if (!jsTag || !cssTag) {
  throw new Error('未在 dist/index.html 中找到构建产物引用，请先执行 npm run build')
}

const jsPath = resolve(dist, jsTag[1].replace(/^\.\//, ''))
const cssPath = resolve(dist, cssTag[1].replace(/^\.\//, ''))

let js = readFileSync(jsPath, 'utf8')
const css = readFileSync(cssPath, 'utf8')

// 将 public 下的图片资源内联为 base64，使单个 HTML 文件离线也能完整显示
const mime = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
}
for (const file of readdirSync(resolve(root, 'public'))) {
  const ext = file.slice(file.lastIndexOf('.')).toLowerCase()
  if (!mime[ext]) continue
  const data = readFileSync(resolve(root, 'public', file))
  js = js.split(file).join(`data:${mime[ext]};base64,${data.toString('base64')}`)
}

// 内联脚本中若出现 </script 会被提前闭合，需转义
if (/<\/script/i.test(js)) {
  js = js.replace(/<\/script/gi, '<\\/script')
}

html = html
  .replace(jsTag[0], () => `<script type="module">${js}</script>`)
  .replace(cssTag[0], () => `<style>${css}</style>`)

const output = resolve(root, '欣旺达首页原型.html')
writeFileSync(output, html, 'utf8')
console.log(`已生成可双击打开的单文件原型：${output}`)
