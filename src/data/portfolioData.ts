import type { CapabilityCategory, ExperienceItem, ArsenalSkill, ProjectItem } from '../types';

export const personalInfo = {
  name: "Md. Minhazur Rahaman",
  nickname: "Mridul",
  role: "Software Engineer & Intelligent Systems Specialist",
  statement: "I build robust web applications, autonomous agent workflows, responsive UI architectures, and intelligent deep learning systems.",
  address: "House-20, Lane-21, Block-A, Mirpur-10, Dhaka-1216, Bangladesh",
  location: "Mirpur-10, Dhaka, Bangladesh",
  phone: "+880 1688800831",
  coordinates: "23.8103° N, 90.4125° E",
  status: "Available for Software Engineering & Intelligent Systems Roles",
  email: "mridul.mrj36@gmail.com",
  github: "https://github.com/Mridul3636",
  linkedin: "https://www.linkedin.com/in/md-minhazur-rahaman-006435299/",
  facebook: "https://www.facebook.com/mridul3636/",
  telegram: "https://t.me/Mridul3636",
  portfolioUrl: "https://mdminhazurrahaman.netlify.app/",
  cvUrl: "/Mridul_CV.pdf",
  university: "Green University of Bangladesh",
  degree: "B.Sc. in Computer Science & Engineering",
  cgpa: "3.28 / 4.00",
  graduationYear: "2026",
  languages: ["German (A1)", "English (Fluent)", "Bengali (Native)"],
  thesis: [
    "Pothole Detection using YOLOv11 and Deep Learning Model With Custom Dataset",
    "Probabilistic IoT Intrusion Detection System Using CNN-GRU with Blockchain-Based Security for Smart Environments"
  ],
  stats: [
    { label: "Production Projects Built", value: "12+" },
    { label: "Academic CGPA", value: "3.28" },
    { label: "Git Commits & Contributions", value: "1,200+" },
    { label: "Core Web Vitals Avg Score", value: "95+" }
  ],
  interests: [
    "Full-Stack Web Development (React, Node, Next.js)",
    "Agentic Coding & Autonomous AI Pipelines",
    "Deep Learning & Computer Vision (YOLOv11)",
    "SQA Automation & Manual Regression Testing",
    "2D Canvas Customization Engines (Fabric.js)",
    "Traveling, Cinema & Audio"
  ]
};

export const capabilityCategories: CapabilityCategory[] = [
  {
    id: "agentic-ai",
    number: "01",
    title: "Agentic Coding & Autonomous AI",
    tagline: "Multi-Agent Swarms, Tool Calling & Self-Healing Pipelines",
    description: "Architecting autonomous AI agent swarms using Antigravity, LLM function routing, vector memory (pgvector), and neural tool-calling workflows to achieve 10x engineering velocity.",
    techList: ["Antigravity AI", "Multi-Agent Swarms", "Tool Calling / RAG", "Python / FastAPI", "TypeScript"],
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accentColor: "#f59e0b",
    iconName: "Cpu",
    demoType: "ai",
    metrics: [
      { label: "Dev Velocity", value: "10x Faster" },
      { label: "Autonomous Accuracy", value: "99.4%" }
    ]
  },
  {
    id: "web-apps",
    number: "02",
    title: "Web Applications",
    tagline: "High-Performance Full-Stack Web Platforms",
    description: "Architecting responsive, lightning-fast web applications with clean separation of concerns, robust state machines, sub-second latency, and pixel-perfect design systems.",
    techList: ["React", "TypeScript", "PHP 8.x MVC", "Node.js", "Tailwind CSS"],
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    accentColor: "#ff6426",
    iconName: "Globe",
    demoType: "webApp",
    metrics: [
      { label: "Lighthouse Score", value: "98/100" },
      { label: "State Hydration", value: "< 80ms" }
    ]
  },
  {
    id: "ecommerce",
    number: "03",
    title: "E-Commerce & Retail Engines",
    tagline: "Custom Storefronts, Cart Rules & Checkout Pipelines",
    description: "Building production e-commerce platforms with dynamic coupon engines, geographic shipping calculators, multi-attribute variations, and real-time inventory locking.",
    techList: ["MySQL 8.0", "PHP MVC", "Fabric.js", "REST APIs", "OAuth 2.0"],
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    accentColor: "#f59e0b",
    iconName: "ShoppingBag",
    demoType: "ecommerce",
    metrics: [
      { label: "Order Conversion", value: "+34%" },
      { label: "Checkout Drop-off", value: "-45%" }
    ]
  },
  {
    id: "admin-erp",
    number: "04",
    title: "Admin Dashboards & ERP Systems",
    tagline: "Role-Based Matrix, Inventory SKU Allocation & Audit Logs",
    description: "Designing enterprise administrative consoles featuring granular Role-Based Access Control (RBAC), multi-location stock tracking, low-inventory triggers, and immutable activity trails.",
    techList: ["MySQL / MariaDB", "RBAC Architecture", "Chart.js", "Audit Trails"],
    gradient: "from-yellow-500/20 via-sky-500/10 to-transparent",
    accentColor: "#eab308",
    iconName: "LayoutDashboard",
    demoType: "adminErp",
    metrics: [
      { label: "Overselling Rate", value: "0.0%" },
      { label: "SKU Tracking", value: "500+ items" }
    ]
  },
  {
    id: "apis-backend",
    number: "05",
    title: "APIs & Backend Systems",
    tagline: "Microservices, Webhooks & Automated Courier Dispatches",
    description: "Developing resilient RESTful APIs, asynchronous webhook consumers, Telegram ERP bots, and direct courier dispatch pipelines with zero third-party framework overhead.",
    techList: ["cURL REST Client", "Pathao Merchant API", "Telegram Bot Webhooks", "PDO Prepared"],
    gradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
    accentColor: "#38bdf8",
    iconName: "Cpu",
    demoType: "api",
    metrics: [
      { label: "Dispatch Time", value: "< 2 min" },
      { label: "API Uptime", value: "99.9%" }
    ]
  },
  {
    id: "canvas-customizer",
    number: "06",
    title: "Interactive Experiences & Canvas Engines",
    tagline: "In-Browser 2D Tailoring & Hardware-Accelerated Design",
    description: "Engineering browser-based graphic customization suites using Fabric.js and HTML5 Canvas API with multi-layer rendering, PSD layer parsing, and automated 300 DPI factory export.",
    techList: ["Fabric.js", "HTML5 Canvas API", "ag-psd Parser", "Vector Math"],
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    accentColor: "#ec4899",
    iconName: "Sparkles",
    demoType: "canvas",
    metrics: [
      { label: "Export DPI", value: "300 DPI" },
      { label: "Layer Controls", value: "Multi-side" }
    ]
  },
  {
    id: "ai-ml-testing",
    number: "07",
    title: "Machine Learning & SQA Automation",
    tagline: "Predictive Models, Automated Regression & Test Suites",
    description: "Combining software quality assurance testing methodologies, automated regression suites (Postman, Selenium), and predictive machine learning models in Python for intelligent features.",
    techList: ["Python", "Scikit-learn", "Postman", "Jest", "SQA Lifecycle"],
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    accentColor: "#a855f7",
    iconName: "ShieldCheck",
    demoType: "ai",
    metrics: [
      { label: "Test Coverage", value: "92%" },
      { label: "Regression Bugs", value: "Reduced 80%" }
    ]
  }
];

export const signatureProjects: ProjectItem[] = [
  {
    id: "siirham",
    title: "SIIRHAM Studio",
    subtitle: "Custom Streetwear Studio & E-Commerce",
    category: "Client E-Commerce & Canvas Studio",
    isCrownJewel: true,
    featuredYear: "2024",
    description: "A production E-Commerce web platform & 2D canvas tailoring studio for a premium streetwear brand in Bangladesh. Features Pathao courier REST automation and Telegram Bot ERP webhooks.",
    tags: ["PHP 8.x MVC", "Fabric.js", "MySQL 8.0", "Pathao API", "Telegram Bot API", "HTML5 Canvas"],
    githubUrl: "https://github.com/Mridul3636/Siirham_Website",
    liveUrl: "https://github.com/Mridul3636/Siirham_Website",
    accent: "#ff6426",
    glowColor: "rgba(255, 100, 38, 0.4)",
    languagesBreakdown: [
      { name: "PHP", percent: 48, color: "#4f5b93" },
      { name: "JavaScript", percent: 34, color: "#f7df1e" },
      { name: "MySQL", percent: 18, color: "#00758f" }
    ],
    metrics: [
      { label: "Fulfillment Speedup", val: "75%" },
      { label: "Core Web Vitals", val: "95+" },
      { label: "SKUs Managed", val: "500+" }
    ]
  },
  {
    id: "agentic-swarm",
    title: "Agentic Swarm Engine",
    subtitle: "Autonomous Multi-Agent AI & Tool-Use Hub",
    category: "Agentic AI & Swarms",
    featuredYear: "2024",
    description: "Autonomous multi-agent orchestration framework integrating Antigravity AI, vector memory (pgvector), neural tool-use schema routing, and automated self-healing test suites for 10x velocity.",
    tags: ["Antigravity AI", "FastAPI", "Python", "TypeScript", "pgvector", "Tool Calling"],
    githubUrl: "https://github.com/Mridul3636",
    liveUrl: "https://github.com/Mridul3636",
    accent: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.4)",
    languagesBreakdown: [
      { name: "TypeScript", percent: 55, color: "#3178c6" },
      { name: "Python", percent: 35, color: "#3572A5" },
      { name: "SQL", percent: 10, color: "#e38c00" }
    ],
    metrics: [
      { label: "Engineering Velocity", val: "10x" },
      { label: "Swarm Accuracy", val: "99.4%" }
    ]
  },
  {
    id: "nexus-erp",
    title: "Nexus ERP Suite",
    subtitle: "Multi-Location Warehouse & RBAC Management Console",
    category: "Admin Dashboards & ERP",
    featuredYear: "2024",
    description: "Enterprise resource planning system with granular Role-Based Access Control (RBAC), multi-tier size matrix stock depletion, transactional audit trails, and automated purchase orders.",
    tags: ["PHP MVC", "MySQL", "JavaScript ES6+", "RBAC", "Chart.js", "Tailwind"],
    githubUrl: "https://github.com/Mridul3636",
    liveUrl: "https://github.com/Mridul3636",
    accent: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    languagesBreakdown: [
      { name: "PHP", percent: 52, color: "#4f5b93" },
      { name: "SQL", percent: 28, color: "#00758f" },
      { name: "JavaScript", percent: 20, color: "#f7df1e" }
    ],
    metrics: [
      { label: "Active Roles", val: "4 Tiers" },
      { label: "Audit Accuracy", val: "100%" }
    ]
  },
  {
    id: "devpulse-qa",
    title: "DevPulse SQA Automation",
    subtitle: "End-to-End API & UI Regression Testing Framework",
    category: "Testing & SQA Automation",
    featuredYear: "2023",
    description: "Automated test suite framework built during SQA specialization at QA Harbor. Includes automated REST API regression collections, load performance monitoring, and bug tracking.",
    tags: ["Postman", "Selenium", "JavaScript", "Jest", "SQA Lifecycle", "Jira"],
    githubUrl: "https://github.com/Mridul3636",
    liveUrl: "https://github.com/Mridul3636",
    accent: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.4)",
    languagesBreakdown: [
      { name: "JavaScript", percent: 68, color: "#f7df1e" },
      { name: "JSON", percent: 32, color: "#292929" }
    ],
    metrics: [
      { label: "Test Scenarios", val: "120+" },
      { label: "Execution Time", val: "< 3 min" }
    ]
  },
  {
    id: "aura-ai",
    title: "Aura AI Classifier",
    subtitle: "Intelligent Customer Affinity & Churn Prediction",
    category: "Machine Learning & AI",
    featuredYear: "2023",
    description: "Machine learning classifier predicting customer retention patterns using Python Scikit-learn, served through a lightweight FastAPI REST microservice with interactive React visualization.",
    tags: ["Python", "Scikit-Learn", "Pandas", "FastAPI", "React", "Chart.js"],
    githubUrl: "https://github.com/Mridul3636",
    liveUrl: "https://github.com/Mridul3636",
    accent: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.4)",
    languagesBreakdown: [
      { name: "Python", percent: 62, color: "#3572A5" },
      { name: "TypeScript", percent: 38, color: "#3178c6" }
    ],
    metrics: [
      { label: "Model Accuracy", val: "91.4%" },
      { label: "Inference Latency", val: "24ms" }
    ]
  }
];

export const experienceTimeline: ExperienceItem[] = [
  {
    id: "exp-sohub",
    company: "Solution Hub Technologies (Sohub)",
    role: "Software Engineering Intern",
    period: "Jan 2026 - Mar 2026",
    location: "Katasur Road, Mohammadpur, Dhaka",
    type: "Software Engineering & Full-Stack Development",
    badge: "Recent Experience",
    accentColor: "#38bdf8",
    responsibilities: [
      "Contributed to rebuilding and improving the Sohub website and Sohub Connect website for superior performance and user experience.",
      "Handled major improvements for the EMP (Employee Max Portal) by resolving user observation issues, fixing system problems, and rolling out new functionality.",
      "Participated in Omama client meetings for technical requirement analysis, architectural discussions, and cross-functional project coordination.",
      "Engineered frontend, backend, database management, and cloud services using React.js, Node.js, PHP, MySQL, Supabase, Firebase, Bootstrap, and REST APIs."
    ],
    technologies: ["React.js", "Node.js", "PHP", "MySQL", "Supabase", "Firebase", "REST APIs", "Bootstrap"],
    impact: "Significantly enhanced portal stability, eliminated observation bottlenecks, and elevated client satisfaction.",
    highlightStat: "EMP Portal & Multi-Site Rebuild"
  },
  {
    id: "exp-qaharbor",
    company: "QA Harbor",
    role: "SQA Intern (Software Quality Assurance)",
    period: "Oct 2025 - Dec 2025",
    location: "Mohakhali DOHS, Dhaka",
    type: "Software Quality Assurance & Test Automation",
    badge: "Quality Assurance",
    accentColor: "#10b981",
    responsibilities: [
      "Authored comprehensive test cases, executed manual functional and boundary testing, and tracked defects throughout the STLC life cycle.",
      "Worked in close coordination with development teams to verify bug fixes and guarantee high-standard product quality prior to deployment.",
      "Gained deep hands-on expertise in QA processes, regression testing suites, and automated API testing with Postman."
    ],
    technologies: ["STLC", "Manual Testing", "Regression Testing", "API Testing (Postman)", "Bug Reporting", "Jira"],
    impact: "Discovered and documented critical bugs early in the release cycle, ensuring flawless web application reliability.",
    highlightStat: "End-to-End QA & API Testing"
  },
  {
    id: "exp-siirham",
    company: "SIIRHAM",
    role: "Lead Full-Stack Developer & Tech Operations",
    period: "2024 - 2025",
    location: "Mirpur, Dhaka, Bangladesh",
    type: "Full-Stack Development & E-Commerce",
    badge: "Flagship Production System",
    accentColor: "#ff6426",
    responsibilities: [
      "Architected and deployed custom apparel storefront (siirham.com) featuring personalized in-browser design customizer and instant order checkout.",
      "Integrated Supabase and MySQL for secure user authentication, inventory locking, and real-time order tracking.",
      "Implemented Pathao Courier Merchant REST API for automated 1-click parcel dispatch and Telegram Bot ERP push alerts."
    ],
    technologies: ["React.js", "Fabric.js", "Supabase", "MySQL", "PHP MVC", "Pathao API", "Telegram Bot API"],
    impact: "Built a 24/7 automated e-commerce & personalization platform serving real customers.",
    highlightStat: "75% Faster Order Dispatch"
  }
];

export const arsenalSkills: ArsenalSkill[] = [
  // Agentic AI & Intelligence
  {
    name: "Agentic Coding & Autonomous AI",
    category: "AI / ML",
    level: 98,
    iconTag: "AI",
    howUsed: "Architecting autonomous agent networks (Antigravity AI, Claude, Codex, ChatGPT, Amazon Q), tool-calling routing, and self-healing pipelines.",
    projectsUsedIn: ["Agentic Swarm Engine", "Antigravity Pipelines", "Intelligent Systems"],
    tags: ["Antigravity", "Multi-Agent Swarms", "Tool Calling", "Claude / ChatGPT", "Amazon Q"]
  },
  {
    name: "Deep Learning & Computer Vision (YOLOv11)",
    category: "AI / ML",
    level: 90,
    iconTag: "DL",
    howUsed: "Designing and training deep learning models including Pothole Detection with custom datasets in YOLOv11 and IoT Intrusion Detection with CNN-GRU.",
    projectsUsedIn: ["YOLOv11 Pothole Detection", "IoT CNN-GRU Intruder Classifier"],
    tags: ["YOLOv11", "CNN-GRU", "Computer Vision", "Deep Learning", "PyTorch"]
  },

  // Frontend
  {
    name: "React.js & Next.js",
    category: "Frontend",
    level: 95,
    iconTag: "React",
    howUsed: "Building modular, state-driven user interfaces, interactive web apps, dynamic design customizers, and responsive client platforms.",
    projectsUsedIn: ["SIIRHAM Website", "Sohub Platforms", "Portfolio 2.0"],
    tags: ["React Hooks", "Next.js", "SPA", "Component Architecture"]
  },
  {
    name: "JavaScript & TypeScript",
    category: "Frontend",
    level: 96,
    iconTag: "JS",
    howUsed: "Writing clean, typed, high-performance logic with modern ES6+, asynchronous Fetch APIs, and strict interface safety.",
    projectsUsedIn: ["All Production Codebases", "Interactive Customizer"],
    tags: ["TypeScript", "ES6+", "Async/Await", "Strict Typing"]
  },
  {
    name: "Tailwind CSS & CSS3 / Bootstrap",
    category: "Frontend",
    level: 94,
    iconTag: "CSS",
    howUsed: "Crafting bespoke dark mode digital universes, glowing aurora effects, glassmorphic panels, responsive grids, and micro-interactions.",
    projectsUsedIn: ["SIIRHAM", "EMP Employee Portal", "Sohub Connect"],
    tags: ["Tailwind CSS", "Bootstrap", "Responsive Design", "Glassmorphism"]
  },

  // Backend
  {
    name: "Node.js & Express",
    category: "Backend",
    level: 90,
    iconTag: "Node",
    howUsed: "Building lightweight REST microservices, serverless handlers, backend routes, authentication logic, and webhook gateways.",
    projectsUsedIn: ["Sohub Backend", "PulseChat Gateway", "REST APIs"],
    tags: ["Node.js", "Express", "REST Microservices", "Async Handlers"]
  },
  {
    name: "PHP (Custom MVC)",
    category: "Backend",
    level: 92,
    iconTag: "PHP",
    howUsed: "Developing modular backend REST APIs, PDO prepared database operations, secure session handling, and MVC controllers.",
    projectsUsedIn: ["SIIRHAM Backend", "Nexus ERP", "Sohub EMP Portal"],
    tags: ["PHP 8.x", "MVC Architecture", "PDO", "Zero Bloat"]
  },

  // Database
  {
    name: "MySQL & Supabase / Firebase",
    category: "Database",
    level: 94,
    iconTag: "DB",
    howUsed: "Designing relational schemas, cloud database architectures, Supabase Auth & Storage, and real-time Firebase listeners.",
    projectsUsedIn: ["SIIRHAM Database", "Sohub Web Platforms", "EMP Database"],
    tags: ["MySQL", "Supabase", "Firebase", "ACID", "Relational Schema"]
  },

  // Testing & QA
  {
    name: "SQA Methodology & Manual / API Testing",
    category: "Testing & QA",
    level: 92,
    iconTag: "QA",
    howUsed: "Software Testing Life Cycle (STLC), test case design, boundary value analysis, regression testing suites, and Postman API automation.",
    projectsUsedIn: ["QA Harbor Test Suites", "DevPulse Framework", "SIIRHAM QA"],
    tags: ["STLC", "Postman", "Regression Testing", "Jira", "Boundary Value"]
  },

  // DevOps & Tools
  {
    name: "Git, GitHub & Vercel / cPanel",
    category: "DevOps & Tools",
    level: 95,
    iconTag: "DevOps",
    howUsed: "GitFlow version control, CI/CD automated deployments on Vercel, cPanel web server administration, and production domain routing.",
    projectsUsedIn: ["All Repositories (1,200+ commits)", "Production Hosting"],
    tags: ["Git", "GitHub", "Vercel", "cPanel", "Figma"]
  }
];

export const githubRepositories = [
  {
    name: "Siirham_Website",
    url: "https://github.com/Mridul3636/Siirham_Website",
    description: "Production E-Commerce & 2D Customization Store with Supabase, Pathao Courier & Telegram Bot ERP webhooks.",
    language: "React / JavaScript / Supabase",
    stars: 28,
    forks: 6,
    isPrimary: true,
    languagesBreakdown: [
      { name: "JavaScript / React", percent: 52, color: "#f7df1e" },
      { name: "PHP / SQL", percent: 30, color: "#4f5b93" },
      { name: "CSS3 / HTML5", percent: 18, color: "#e34f26" }
    ]
  },
  {
    name: "YOLOv11-Pothole-Detection",
    url: "https://github.com/Mridul3636",
    description: "Deep learning computer vision model for real-time road hazard & pothole detection using custom dataset.",
    language: "Python / PyTorch",
    stars: 24,
    forks: 5,
    languagesBreakdown: [
      { name: "Python", percent: 85, color: "#3572A5" },
      { name: "Jupyter", percent: 15, color: "#da5b0b" }
    ]
  },
  {
    name: "IoT-Intrusion-Detection-CNN-GRU",
    url: "https://github.com/Mridul3636",
    description: "Probabilistic IoT Intrusion Detection System using CNN-GRU with Blockchain-based security architecture.",
    language: "Python / TensorFlow",
    stars: 18,
    forks: 4,
    languagesBreakdown: [
      { name: "Python", percent: 75, color: "#3572A5" },
      { name: "Smart Contracts", percent: 25, color: "#aa6746" }
    ]
  },
  {
    name: "DevPulse-SQA-Framework",
    url: "https://github.com/Mridul3636",
    description: "Automated API regression test framework and Postman runner collections developed during SQA residency.",
    language: "JavaScript / Postman",
    stars: 14,
    forks: 3,
    languagesBreakdown: [
      { name: "JavaScript", percent: 70, color: "#f7df1e" },
      { name: "JSON", percent: 30, color: "#292929" }
    ]
  }
];

export const educationInfo = {
  institution: "Green University of Bangladesh",
  degree: "Bachelor of Science in Computer Science & Engineering (B.Sc. in CSE)",
  period: "Graduated in 2026",
  cgpa: "3.28 out of 4.00",
  location: "Dhaka, Bangladesh",
  academicRecords: [
    {
      level: "B.Sc. in Computer Science & Engineering",
      institution: "Green University of Bangladesh",
      year: "Graduated in 2026",
      result: "CGPA: 3.28 / 4.00",
      icon: "Graduation"
    },
    {
      level: "Higher Secondary Certificate (HSC)",
      institution: "BCIC College",
      year: "2020",
      result: "GPA: 5.00 / 5.00",
      icon: "College"
    },
    {
      level: "Secondary School Certificate (SSC)",
      institution: "Mirpur Bangla Higher Secondary School",
      year: "2018",
      result: "GPA: 5.00 / 5.00",
      icon: "School"
    }
  ],
  thesis: [
    {
      title: "Pothole Detection using YOLOv11 and Deep Learning Model With Custom Dataset",
      status: "Present / Research Paper",
      area: "Computer Vision & Deep Learning"
    },
    {
      title: "Probabilistic IoT Intrusion Detection System Using CNN-GRU with Blockchain-Based Security for Smart Environments",
      status: "Present / Research Paper",
      area: "IoT Security & Deep Learning"
    }
  ],
  cvUrl: "/Mridul_CV.pdf"
};
