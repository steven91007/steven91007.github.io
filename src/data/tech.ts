// Tool name → brand icon (simple-icons, inlined at build time: no external requests).
// Tools without a simple-icons logo get a monogram tile instead.
import * as si from 'simple-icons';

type SI = { title: string; hex: string; path: string };
const bySlug = (slug: string): SI | undefined => (si as Record<string, SI>)['si' + slug[0].toUpperCase() + slug.slice(1)];

const slugs: Record<string, string> = {
  Python: 'python', TypeScript: 'typescript', LangGraph: 'langgraph', LangChain: 'langchain', FastAPI: 'fastapi',
  Docker: 'docker', 'GitLab CI/CD': 'gitlab', GitLab: 'gitlab', Git: 'git', MLflow: 'mlflow', vLLM: 'vllm', Qdrant: 'qdrant',
  MinIO: 'minio', PyTest: 'pytest', 'ONNX Runtime': 'onnx', YOLO: 'yolo', 'MCP servers': 'modelcontextprotocol',
  MCP: 'modelcontextprotocol', PySide6: 'qt', 'Google Sheets API': 'googlesheets', 'LINE Messaging API': 'line',
  'Hugging Face': 'huggingface', Flask: 'flask', SQLite: 'sqlite', PaddleOCR: 'paddlepaddle', Jira: 'jira',
  Discord: 'discord', Pydantic: 'pydantic', uv: 'uv',
};

// No simple-icons logo: monogram tile in the brand colour.
const monograms: Record<string, [string, string]> = {
  'SQL Server': ['SQL', '#CC2927'], Outlook: ['O', '#1490DF'], Langfuse: ['LF', '#F5F5F5'],
  DSPy: ['DS', '#38bdf8'], OpenAI: ['AI', '#e6edf6'],
};
export const isTool = (name: string) => name in slugs || name in monograms;

export type Tech = { name: string; svg?: string; color: string; mono?: string };

// brand colours that vanish on the dark background get lifted to the foreground colour
function visible(hex: string) {
  const n = parseInt(hex, 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum < 0.28 ? '#e6edf6' : '#' + hex;
}

export function tech(name: string): Tech {
  const slug = slugs[name];
  const icon = slug ? bySlug(slug) : undefined;
  if (icon) return { name, color: visible(icon.hex), svg: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icon.path}"/></svg>` };
  if (monograms[name]) return { name, mono: monograms[name][0], color: monograms[name][1] };
  const mono = name.replace(/[^A-Za-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return { name, color: '#38bdf8', mono };
}

export const hasIcon = (name: string) => Boolean(slugs[name] && bySlug(slugs[name]));

// The tool grid on the home and about pages. Only tools that appear on the CV.
export const stack: { group: string; tools: string[] }[] = [
  { group: 'LLM & agents', tools: ['LangGraph', 'LangChain', 'DSPy', 'MCP', 'Langfuse'] },
  { group: 'MLOps & serving', tools: ['MLflow', 'vLLM', 'ONNX Runtime', 'PaddleOCR', 'YOLO', 'Qdrant'] },
  { group: 'Languages & backend', tools: ['Python', 'TypeScript', 'FastAPI', 'SQL Server', 'MinIO', 'PySide6'] },
  { group: 'Delivery', tools: ['Docker', 'GitLab CI/CD', 'Git', 'PyTest'] },
];
