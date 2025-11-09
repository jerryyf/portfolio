import { readFileSync } from 'fs';
import path from 'path';

export default function Page() {
  const filePath = path.resolve(process.cwd(), 'app', 'admin', 'wecanseeyou.txt');
  const content = readFileSync(filePath, 'utf-8');
  return (
    <div>
      <pre>{content}</pre>
    </div>
  );
}
