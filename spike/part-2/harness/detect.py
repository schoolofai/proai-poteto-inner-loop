#!/usr/bin/env python3
"""Count added production-source lines (src/, not tests) that use the corrected pattern."""
import re,sys
pat=re.compile(r'deferVisualClass|setTimeout|setInterval|requestAnimationFrame|requestIdleCallback|classList')
for p in sys.argv[1:]:
    cur=None; hits=[]
    for line in open(p):
        if line.startswith('+++ '): cur=line[6:].strip() if line.startswith('+++ b/') else line[4:].strip(); continue
        if line.startswith('+') and not line.startswith('+++') and cur and cur.startswith('src/') and '.test.' not in cur and pat.search(line):
            hits.append(f"{cur}: {line[1:].strip()}")
    print(p.split('/')[-2], len(hits)); [print('   ',h) for h in hits]
