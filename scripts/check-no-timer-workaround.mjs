#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const srcDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src')
const forbidden = /\b(setTimeout|setInterval|requestAnimationFrame|requestIdleCallback)\b/
const isTest = (name) => name.endsWith('.test.ts') || name.endsWith('.test.tsx')

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else if (/\.[cm]?[jt]sx?$/.test(entry.name) && !isTest(entry.name)) out.push(full)
  }
  return out
}

const hits = []
for (const file of await walk(srcDir)) {
  const text = await readFile(file, 'utf8')
  if (forbidden.test(text)) {
    hits.push(path.relative(path.join(srcDir, '..'), file))
  }
}

if (hits.length > 0) {
  console.error('Inner-loop check failed: delayed timers in production source:')
  for (const hit of hits) console.error(`  ${hit}`)
  process.exit(1)
}

console.log(
  'Inner-loop check passed: no setTimeout, setInterval, requestAnimationFrame, or requestIdleCallback in production src.',
)
