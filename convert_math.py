#!/usr/bin/env python3
import re, argparse
from pathlib import Path

INLINE_MATH_RE = re.compile(r'(?<!\$)\$(?!\$)(.*?)(?<!\$)\$(?!\$)')

def is_fence(line):
    s = line.strip()
    return s.startswith("```") or s.startswith("~~~")

def convert_line(line):
    if '$' not in line:
        return line
    return INLINE_MATH_RE.sub(lambda m: f'$${m.group(1)}$$', line)

def process_file(path, dry_run=False):
    original = path.read_text(encoding='utf-8')
    lines = original.splitlines(keepends=True)
    new_lines = []
    in_code = False
    changed_count = 0
    for line in lines:
        if is_fence(line):
            in_code = not in_code
            new_lines.append(line)
            continue
        if in_code:
            new_lines.append(line)
            continue
        converted = convert_line(line)
        if converted != line:
            changed_count += 1
        new_lines.append(converted)
    new_content = ''.join(new_lines)
    changed = new_content != original
    if changed and not dry_run:
        path.write_text(new_content, encoding='utf-8')
    return changed, changed_count

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true')
    parser.add_argument('--dir', default='./_posts')
    args = parser.parse_args()
    posts_dir = Path(args.dir)
    md_files = sorted(posts_dir.glob('*.md'))
    print(f'Found {len(md_files)} files')
    total = 0
    for f in md_files:
        changed, n = process_file(f, dry_run=args.dry_run)
        if changed:
            total += 1
            prefix = '[DRY RUN]' if args.dry_run else 'Modified'
            print(f'  {prefix}: {f.name} ({n} lines)')
    print(f'\nDone. {total}/{len(md_files)} files {"would be " if args.dry_run else ""}modified.')

if __name__ == '__main__':
    main()
