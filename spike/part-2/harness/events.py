#!/usr/bin/env python3
import json,sys,os
for p in sys.argv[1:]:
    out=[]
    for l in open(p):
        try:o=json.loads(l)
        except: continue
        t=o.get('type'); it=o.get('item') or {}
        if t in('thread.started','turn.started'): out.append(f"- {t}")
        elif t=='item.completed' and it.get('type')=='agent_message': out.append("- agent: "+it.get('text','').replace('\n',' '))
        elif t=='item.completed' and it.get('type')=='command_execution':
            out.append(f"- command (exit {it.get('exit_code')}): {it.get('command','')[:220]}")
        elif t=='item.completed' and it.get('type')=='file_change':
            out.append("- file change: "+", ".join(f"{c.get('kind')} {os.path.basename(c.get('path',''))}" for c in it.get('changes',[])))
        elif t=='turn.completed': out.append(f"- turn.completed usage={o.get('usage')}")
    open(os.path.join(os.path.dirname(p),'events.md'),'w').write("\n".join(out)+"\n")
