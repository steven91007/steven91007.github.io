// Single source for CV-style content on the site.
// Source: Notion "Personal experiences → Projects (experience cards)". Only numbers from each card's
// "Confirmed metrics" are used, and each card's "Constraints" are respected (e.g. MaterialCheck: phase 1 only).
// Internal code names are left out on purpose.

export type Work = {
  title: string;
  period: string;
  status: 'Production' | 'In production (phase 1)';
  context: string;
  value: string;
  metrics: string[];
  stack: string[];    // tools — each gets a brand icon (see src/data/tech.ts)
  methods: string[];  // concepts — plain tags
};

// Stacks follow the Notion CV bullets of each card (DT1–3, MC1–7, PS1–4, VI1–5, WR1).
export const work: Work[] = [
  {
    title: 'Procurement Mail Agent',
    period: '2025 – present',
    status: 'Production',
    context: 'A LangGraph agent for 100+ engineers and procurement staff in a €7.6B division. It reads supplier mail and turns it into delivery status, so buyers can decide the next step faster.',
    value: 'Calls Outlook, SQL Server and Qdrant as tools; business rules stay in code, not in prompts, so every result can be audited. Evaluated on 100 labelled supplier threads (~350 status changes), because a status that flips too early drops a live order from the buyers’ chase list. Every LLM call is traced in self-hosted Langfuse, with MLflow as fallback.',
    metrics: ['100+ users', 'delivery-status accuracy 89.5% → 99%', '~350 labelled status changes'],
    stack: ['Python', 'LangGraph', 'Outlook', 'SQL Server', 'Qdrant', 'Langfuse', 'MLflow'],
    methods: ['tool calling', 'agent orchestration', 'LLM evaluation'],
  },
  {
    title: 'Document AI for QA Sign-off',
    period: '2025 – present',
    status: 'In production (phase 1)',
    context: 'QA document review for 200+ NPE and plant engineers in Germany, China and Taiwan. Phase 1 of a three-phase, six-month plan is live.',
    value: 'A VLM extracts material tables from drawing PDFs. Rules settle the clear-cut checks and an LLM judges only the grey zones; embedding search brings back past reviewer verdicts as few-shot examples, and independent probes re-read the source PDF to flag hallucination risk for review before sign-off. A PySide6 tool records each human decision and rewrites the report without rerunning the AI.',
    metrics: ['30 → 5 min per document', '200+ users', '3 countries'],
    stack: ['Python', 'PySide6', 'Langfuse', 'MLflow', 'Jira'],
    methods: ['VLM extraction', 'LLM-as-a-judge', 'embedding search', 'human-in-the-loop'],
  },
  {
    title: 'Production AI Services & MLOps',
    period: '2022 – present',
    status: 'Production',
    context: 'FastAPI AI services used company-wide (~100 documents/month) on air-gapped on-prem servers, owned from system design through launch, maintenance and incident response.',
    value: 'Moved a live spec-extraction service to structured LLM output, keeping the rule parser as a fallback so an LLM outage never stops users; a read-only database account means a bug can never alter production data. Runs PP-OCRv5 in ONNX Runtime on CPU-only servers. Models and services ship as layered Docker images; GitLab CI deploys to staging after code review and production releases need manual approval. PySide6 and TypeScript tools let engineers use the AI without code.',
    metrics: ['~100 documents / month', '6× faster CPU OCR (144 s → 24 s)', 'approval-gated releases'],
    stack: ['Python', 'FastAPI', 'Docker', 'GitLab CI/CD', 'MLflow', 'ONNX Runtime', 'PaddleOCR', 'MinIO', 'SQL Server', 'TypeScript', 'PySide6'],
    methods: ['structured outputs', 'rule fallback', 'code review', 'on-prem / air-gapped'],
  },
  {
    title: 'Industrial Vision Inspection & ML Tooling',
    period: '2023 – present',
    status: 'Production',
    context: 'Computer vision and VLM inspection workflows for manufacturing QA at Delta plants, with structured validation and human review for exceptions.',
    value: 'Engineers no longer check every image by hand. YOLO pipelines take data from a read-only SQL Server through training, evaluation and the MLflow model registry, with post-processing fixed from error analysis. A VLM is fine-tuned with LoRA and served on-prem with vLLM; a PySide6 tool applies human overrides without rerunning inference.',
    metrics: ['10× inspection throughput', 'detectors 84–89% mAP', '3 s per image (VLM)'],
    stack: ['Python', 'YOLO', 'vLLM', 'MLflow', 'SQL Server', 'PySide6'],
    methods: ['LoRA fine-tuning', 'error analysis', 'AI pre-labelling', 'human review'],
  },
  {
    title: 'AI-Enabled Workflow Automation',
    period: '2022 – present',
    status: 'Production',
    context: 'Process redesign with engineering and procurement teams in Germany, the Netherlands and Asia.',
    value: 'Built Python RPA schedulers and AI-enabled processes together with the teams that run them, replacing manual hand-offs.',
    metrics: ['90%+ less processing time', '100+ engineers supported'],
    stack: ['Python'],
    methods: ['RPA schedulers', 'process redesign'],
  },
];

export const experience = [
  {
    role: 'Senior AI Engineer',
    org: 'Delta Electronics',
    place: 'Taoyuan, Taiwan',
    period: 'Jan 2022 – present',
    text: 'Owns the team’s production ML systems end to end, with users in Germany and Asia: LLM agents, document AI, computer vision and the services and pipelines behind them.',
  },
  {
    role: 'AI Algorithm Engineer',
    org: 'Mirle Automation',
    place: 'Hsinchu, Taiwan',
    period: 'Jan 2021 – Jan 2022',
    text: 'Raised OCR accuracy from ~70% to over 95%, owning the pipeline from data annotation and training to production integration, and shipped a computer-vision invoice app that cut processing time by 80%.',
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'LLM & agents', items: ['LangGraph', 'LangChain', 'DSPy', 'tool calling', 'RAG', 'structured outputs', 'prompt & context engineering'] },
  { group: 'Evaluation', items: ['labelled test sets', 'regression replay', 'LLM-as-a-judge', 'error analysis', 'human-in-the-loop design'] },
  { group: 'MLOps & LLMOps', items: ['MLflow', 'Langfuse', 'vLLM serving', 'LoRA fine-tuning', 'ONNX Runtime'] },
  { group: 'Backend & data', items: ['Python', 'TypeScript', 'SQL', 'FastAPI', 'MCP servers', 'SQL Server', 'Qdrant', 'MinIO'] },
  { group: 'Delivery', items: ['Docker', 'GitLab CI/CD', 'PyTest', 'code review', 'on-prem / air-gapped deployment'] },
  { group: 'Computer vision', items: ['YOLO detection & segmentation', 'OCR', 'VLM inspection', 'data labelling'] },
];

export const education = [
  { degree: 'M.S., Computer and Communication Engineering', school: 'National Kaohsiung University of Science and Technology', period: '2018 – 2020' },
  { degree: 'B.S., Computer and Communication Engineering', school: 'National Kaohsiung University of Science and Technology', period: '2014 – 2018' },
];

export const certifications = ['Oracle Certified Professional, Java SE 6', 'DeepLearning.AI TensorFlow Developer Specialization'];
export const languages = ['English C1', 'German A1', 'Mandarin (native)'];
