import re
from typing import List, Dict

# Helper function to summarize long definitions
from textwrap import shorten

def summarize(text, max_words=200):
    words = text.split()
    if len(words) <= max_words:
        return text
    # Simple summary: take the first max_words and add ellipsis
    return ' '.join(words[:max_words]) + '...'

terms: List[Dict[str, str]] = []

with open('extracted_dictionary.txt', 'r', encoding='utf-8') as f:
    content = f.read()

print('First 500 characters of input:')
print(content[:500])

# Improved regex: match lines that start with a word (term) followed by a colon
pattern = re.compile(r'^(\w[\w\- ]+):', re.MULTILINE)

matches = list(pattern.finditer(content))
print(f"Found {len(matches)} terms.")
print('First 5 matches:')
for m in matches[:5]:
    print(f"Term: {m.group(1)} at position {m.start()}-{m.end()}")

for i, match in enumerate(matches):
    term = match.group(1).strip()
    start = match.end()
    end = matches[i+1].start() if i+1 < len(matches) else len(content)
    definition = content[start:end].strip().replace('\n', ' ')
    definition = re.sub(r'\s+', ' ', definition)
    definition = summarize(definition)
    if term and definition:
        terms.append({'term': term, 'definition': definition})

print(f"Parsed {len(terms)} terms. Writing to LEGAL_TERMS.ts...")
with open('LEGAL_TERMS.ts', 'w', encoding='utf-8') as out:
    out.write('export const LEGAL_TERMS = [\n')
    for entry in terms:
        out.write('  {{ term: "{}", definition: "{}" }},\n'.format(entry["term"].replace('"', '\\"'), entry["definition"].replace('"', '\\"')))
    out.write('];\n')
print("Done writing LEGAL_TERMS.ts.") 