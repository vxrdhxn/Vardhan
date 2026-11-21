// All site content lives here. Edit this file to change what the site says.

export type Project = {
  slug: string;
  name: string;
  // One or two words shown beside the name on the Work page.
  kind: string;
  tagline: string;
  summary: string;
  stack: string[];
  repo: string;
  // Extra places to see the project, such as a live site or a store listing.
  links?: { label: string; href: string }[];
  // Screenshots, stored in public/projects/<slug>/. The first one leads the
  // project page; the rest follow the description.
  images?: { src: string; alt: string; width: number; height: number }[];
  status?: "In progress";
  points: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const person = {
  name: "Sri Vardhan Mothukuri",
  shortName: "Vardhan",
  location: "Ibrahimpatnam, Telangana, India",
  email: "mothukuri.srivardhan@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/vxrdhxn" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sri-vardhan-mothukuri-4b946b296",
    },
    { label: "LeetCode", href: "https://leetcode.com/vxrdhxn" },
  ],
};

// Each hero line alternates between the sans and the italic serif face.
export const heroLines = [
  { text: "Cloud systems", face: "sans" },
  { text: "that deploy themselves,", face: "serif" },
  { text: "built by a developer", face: "sans" },
  { text: "who reads the logs", face: "serif" },
] as const;

export const heroNotes = [
  "From the API to the Helm chart: I build it, deploy it, and fix it when it breaks",
  "Open to cloud, software and DevOps roles. Remote, Hyderabad or Bengaluru",
];

// The intro paragraph on Home. Two markers are understood (see Intro.tsx):
// {ring}, {nodes} or {spark} drops in a small symbol, and [word] underlines.
export const intro =
  "I build automation and workflow systems: {ring} asynchronous job [pipelines], API-driven services, GitOps deployments and LLM-powered tooling. {nodes} I work hands-on with Python, TypeScript, REST APIs, Linux, Docker, [Kubernetes] and CI/CD, {spark} and I care most about the part that comes after it ships, which is [debugging] it when it breaks.";

// The "about me" paragraph on the About page. Same markers as `intro`.
export const aboutMe =
  "I'm Vardhan. {ring} I live somewhere between the [cloud] and the command line. I like working out how things run, then building my own version of them. {nodes} Away from the keyboard you'll find me playing [cricket] or football, or deep in a PC game. I'm the one who wants the new gadget on day one, just to see what it can do. {spark} I explore the tech industry the way a traveller explores a new country: [curious] about every corner of it, and set on getting very good at what I find.";

export const projects: Project[] = [
  {
    slug: "openpm",
    kind: "Project management",
    name: "OpenPM",
    tagline: "Self-hostable project management, built for Kubernetes",
    summary:
      "Most project management tools are SaaS-only, so your data sits on someone else's servers. OpenPM runs on your own infrastructure: one Docker Compose command for a small team, or a Helm chart on Kubernetes when it needs to scale.",
    stack: ["TypeScript", "Fastify", "Next.js", "PostgreSQL", "Redis", "BullMQ", "Helm", "ArgoCD"],
    repo: "https://github.com/vxrdhxn/OpenPM",
    images: [
      {
        src: "/projects/openpm/landing-dark.webp",
        alt: "OpenPM landing page: Plan closer. Ship on time. Project management you run yourself",
        width: 1919,
        height: 959,
      },
      {
        src: "/projects/openpm/signup-dark.webp",
        alt: "OpenPM create-workspace page: set up an organization and its admin account",
        width: 1919,
        height: 961,
      },
      {
        src: "/projects/openpm/board-dark.webp",
        alt: "OpenPM project board in dark mode: To Do, In Progress, In Review and Done columns of task cards",
        width: 1720,
        height: 1000,
      },
      {
        src: "/projects/openpm/dashboard-dark.webp",
        alt: "OpenPM dashboard in dark mode: open, overdue and upcoming task counts, tasks assigned to me and project progress",
        width: 1720,
        height: 1000,
      },
      {
        src: "/projects/openpm/dashboard-light.webp",
        alt: "OpenPM dashboard in light mode",
        width: 1720,
        height: 1000,
      },
      {
        src: "/projects/openpm/board-light.webp",
        alt: "OpenPM project board in light mode",
        width: 1720,
        height: 1000,
      },
      {
        src: "/projects/openpm/projects-dark.webp",
        alt: "OpenPM projects list in dark mode, with a card for each project",
        width: 1720,
        height: 1000,
      },
      {
        src: "/projects/openpm/projects-light.webp",
        alt: "OpenPM projects list in light mode",
        width: 1720,
        height: 1000,
      },
      {
        src: "/projects/openpm/task-dark.webp",
        alt: "An OpenPM task open for editing in dark mode: status, priority, assignee, due date, labels, attachments and comments",
        width: 1720,
        height: 1000,
      },
      {
        src: "/projects/openpm/task-light.webp",
        alt: "An OpenPM task open for editing in light mode",
        width: 1720,
        height: 1000,
      },
      {
        src: "/projects/openpm/activity-light.webp",
        alt: "OpenPM activity feed: everything that happened across the organization, newest first",
        width: 1720,
        height: 1000,
      },
      {
        src: "/projects/openpm/admin-light.webp",
        alt: "OpenPM admin page: members, pending invites, failed sign-ins and recent security events",
        width: 1720,
        height: 1000,
      },
      {
        src: "/projects/openpm/organization-light.webp",
        alt: "OpenPM organization settings: invite members, rename the workspace, manage members and labels",
        width: 1720,
        height: 1000,
      },
      {
        src: "/projects/openpm/login-light.webp",
        alt: "OpenPM sign-in page, with separate member and admin sign-in",
        width: 1720,
        height: 1000,
      },
    ],
    status: "In progress",
    points: [
      "Kanban boards that sync live across clients over WebSockets, with Redis Pub/Sub carrying updates between API pods.",
      "Multi-tenant by design: every query is scoped by an organization ID taken from the JWT, never from the request body.",
      "Notifications run as BullMQ background jobs on a separate worker that scales independently of the API.",
      "A Helm chart with autoscaling, a default-deny NetworkPolicy, a PodDisruptionBudget and non-root containers, deployed through ArgoCD so every release is a git commit.",
      "Prometheus metrics and a Grafana dashboard, plus a GitHub Actions pipeline that lints, builds, tests and scans with gitleaks and Trivy.",
    ],
  },
  {
    slug: "orbit",
    kind: "AI tooling",
    name: "Orbit",
    tagline: "Agentic AI coding assistant for VS Code",
    summary:
      "A VS Code extension that chats with your codebase, reviews your changes and fixes small issues in the background. It works offline with a local model, against a local inference server, or with cloud providers through your own API key.",
    stack: ["TypeScript", "VS Code API", "node-llama-cpp", "SQLite", "Git"],
    repo: "https://github.com/vxrdhxn/Orbit",
    images: [
      {
        src: "/projects/orbit/inline-review.png",
        alt: "Orbit in VS Code: a proposed edit shown inline in the file as a red and green diff, with the chat beside it",
        width: 1874,
        height: 1020,
      },
      {
        src: "/projects/orbit/chat-welcome.png",
        alt: "Orbit's chat panel on first open, offering to explain the file, find bugs, write tests or give a project overview",
        width: 535,
        height: 1023,
      },
      {
        src: "/projects/orbit/chat-done.png",
        alt: "Orbit after finishing a request: it reports the one line it added to hello.js",
        width: 525,
        height: 1024,
      },
      {
        src: "/projects/orbit/provider-picker.png",
        alt: "Orbit's provider picker, for choosing between cloud, offline and custom models",
        width: 506,
        height: 318,
      },
      {
        src: "/projects/orbit/chat-offline.png",
        alt: "Orbit working on a request with the built-in offline model",
        width: 510,
        height: 1008,
      },
    ],
    links: [
      { label: "Visit the Orbit site", href: "https://orbit-ai-landing-page-one.vercel.app/" },
      {
        label: "Install from the VS Code Marketplace",
        href: "https://marketplace.visualstudio.com/items?itemName=vxrdhxn.orbit-ai-assistant",
      },
    ],
    points: [
      "Agent-style chat where each step (reading a file, searching, running a command, editing) is shown and can be expanded.",
      "Edits appear inline as a red and green diff, and the file is saved only after you accept the change.",
      "Orbit Pilot analyzes open files in the background, reports findings to the Problems tab and can auto-fix low-risk ones.",
      "Semantic search across the workspace, and AI review of the current file, uncommitted Git changes or a pull request.",
      "A decision journal in SQLite records AI edits, and can be shared with a team through a dedicated Git branch.",
      "Safety built in: tools are restricted to the workspace folder, and terminal commands run only after you confirm them.",
      "Free and open source under the MIT license, and published on the VS Code Marketplace.",
    ],
  },
  {
    slug: "sentinel",
    kind: "Cloud security",
    name: "Sentinel",
    tagline: "Cloud-native secret discovery and governance platform",
    summary:
      "Secret scanners usually stop at reporting an exposed credential. Sentinel is being built to go further: connect findings across Git repositories, cloud accounts, Kubernetes clusters and CI/CD pipelines, then track who owns each secret, how risky it is and where it is in its lifecycle. It is a team project, developed through issues and code review.",
    stack: ["Python", "FastAPI", "PostgreSQL", "Next.js", "Docker", "Kubernetes", "Terraform"],
    repo: "https://github.com/vxrdhxn/Sentinel",
    status: "In progress",
    points: [
      "Built so far: the platform foundation, with an extensible scanner interface and database models for secrets and findings.",
      "Findings carry source context, lifecycle status, severity and confidence, so they can drive remediation later.",
      "Database migrations, backend tests and code-quality checks keep the codebase maintainable as the team grows it.",
      "On the roadmap: regex and entropy detection, AI-assisted classification, blast-radius analysis and rotation monitoring.",
    ],
  },
  {
    slug: "kontext",
    kind: "Kubernetes",
    name: "Kōntext",
    tagline: "The human context Kubernetes is missing during an incident",
    summary:
      "Kubernetes knows the state of everything and nothing about who owns it. During an incident, engineers lose time hunting for the owner, the runbook and the last deploy. Kōntext collects cluster events and attaches that context to them, in one dashboard and API.",
    stack: ["TypeScript", "Fastify", "Next.js", "PostgreSQL", "Redis", "Helm", "ArgoCD"],
    repo: "https://github.com/vxrdhxn/Kontext",
    status: "In progress",
    points: [
      "A Kubernetes agent watches cluster events and sends them to a Fastify REST API.",
      "Resources are mapped to owners, deployment history and runbooks, and assembled into an incident timeline.",
      "PostgreSQL for storage, Redis for caching, a Next.js dashboard on top, packaged with Helm.",
      "Planned next: multi-cluster support, GitHub and Prometheus integrations, and a service dependency graph.",
    ],
  },
  {
    slug: "devhive",
    kind: "Search and RAG",
    name: "DevHive",
    tagline: "Knowledge discovery and RAG platform",
    summary:
      "Team knowledge is scattered across PDFs, docs and repositories. DevHive ingests those documents, indexes them as vectors and answers questions with responses grounded in the source material.",
    stack: ["Python", "FastAPI", "Next.js", "Supabase", "pgvector", "Llama 3.1"],
    repo: "https://github.com/vxrdhxn/devhive-2",
    links: [
      {
        label: "Open the live app",
        href: "https://devhive-frontend-git-main-vardhans-projects-9e5d4469.vercel.app/",
      },
    ],
    images: [
      {
        src: "/projects/devhive/workspace.webp",
        alt: "DevHive workspace: a semantic search box with an AI-generated answer, beside a panel for uploading documents",
        width: 1919,
        height: 956,
      },
      {
        src: "/projects/devhive/overview.webp",
        alt: "DevHive system overview: counts of documents and vector embeddings above a table of ingested files",
        width: 1919,
        height: 958,
      },
    ],
    points: [
      "An ingestion pipeline that parses PDF, DOCX, PPTX, XLSX, CSV and Markdown, and skips near-duplicate content.",
      "Text extraction and embedding generation run in the background so the interface stays responsive.",
      "Semantic search on pgvector with HNSW indexing, using BAAI/bge embeddings and Llama 3.1 8B for answers.",
      "Recursive GitHub sync that indexes a whole repository, including nested directories.",
      "Role-based access for admins, managers and employees, plus an analytics dashboard for search activity.",
    ],
  },
  {
    slug: "expensepro",
    kind: "Personal finance",
    name: "ExpensePro",
    tagline: "Personal expense tracker",
    summary:
      "An earlier project: a web app for tracking personal spending against monthly budgets.",
    stack: ["Python", "Flask", "SQLite", "Tailwind CSS"],
    repo: "https://github.com/vxrdhxn/Expense-Pro",
    links: [{ label: "Open the live app", href: "https://expense-pro-orqo.onrender.com/" }],
    images: [
      {
        src: "/projects/expensepro/dashboard.webp",
        alt: "ExpensePro dashboard: monthly spending, budget progress and totals above a category chart and a daily expenses chart",
        width: 1145,
        height: 957,
      },
      {
        src: "/projects/expensepro/report.webp",
        alt: "ExpensePro monthly report: totals for the month with a daily expenses line chart and a category breakdown",
        width: 1145,
        height: 958,
      },
      {
        src: "/projects/expensepro/expenses.webp",
        alt: "ExpensePro expenses list: filters by category and date above a table of expenses with edit and delete actions",
        width: 1145,
        height: 959,
      },
      {
        src: "/projects/expensepro/home.webp",
        alt: "ExpensePro home screen: a Track Your Expenses heading with totals, monthly average and budget status",
        width: 1145,
        height: 957,
      },
    ],
    points: [
      "Accounts, expense categories and tags, and monthly budgets with overspending alerts.",
      "A dashboard with category breakdowns and monthly trends.",
      "Multi-currency support, and export to CSV and PDF.",
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    label: "Automation and integration",
    items: [
      "REST APIs",
      "Asynchronous workflows (BullMQ)",
      "GitOps (ArgoCD)",
      "CI/CD",
      "GitHub Actions",
      "LLM integration (Ollama, RAG)",
    ],
  },
  {
    label: "Infrastructure",
    items: ["Linux", "Kubernetes", "Docker", "Helm", "AWS"],
  },
  {
    label: "Programming",
    items: ["Python", "TypeScript", "JavaScript", "Java", "SQL"],
  },
  {
    label: "Databases",
    items: [
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "MongoDB",
      "Redis",
      "Supabase",
      "pgvector",
    ],
  },
  {
    label: "Frameworks and tools",
    items: ["FastAPI", "Next.js", "Node.js", "SQLAlchemy", "Git"],
  },
];

export const education = [
  {
    school: "CVR College of Engineering",
    detail: "B.Tech in Computer Science and Engineering",
    period: "Aug 2023 – May 2027",
  },
  {
    school: "Sri Chaitanya Junior Kalasala",
    detail: "Intermediate (BIE)",
    period: "2021 – 2023",
  },
];

export const awards = [
  {
    title: "Winner, Mini Hackathon",
    detail: "Data Mastery Workshop, CVR College of Engineering",
  },
  {
    title: "OCI AI Foundations Associate",
    detail: "Oracle, March 2025",
  },
  {
    title: "Databases for Developers: Foundations",
    detail: "Oracle, March 2025",
  },
];
