import fs from 'node:fs'
import path from 'node:path'

const summaryPath = path.resolve('coverage', 'coverage-summary.json')

if (!fs.existsSync(summaryPath)) {
  console.error(`Coverage summary not found at ${summaryPath}`)
  process.exitCode = 1
  process.exit()
}

const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'))
const total = summary.total ?? summary

function format(metric) {
  const data = total[metric]
  const pct = typeof data.pct === 'number' ? data.pct.toFixed(2) : '0.00'
  return `${metric[0].toUpperCase()}${metric.slice(1)}   : ${pct}% ( ${data.covered}/${data.total} )`
}

console.log('')
console.log('=============================== Coverage summary ===============================')
console.log(format('statements'))
console.log(format('branches'))
console.log(format('functions'))
console.log(format('lines'))
console.log('================================================================================')
