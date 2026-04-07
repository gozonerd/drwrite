import fs from 'node:fs';

export function readFileContent(filePath: string): { content: string } | { error: string } {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return { content };
  } catch (err) {
    return { error: String(err) };
  }
}

export function writeFileContent(
  filePath: string,
  content: string,
): { success: true } | { success: false; error: string } {
  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}
