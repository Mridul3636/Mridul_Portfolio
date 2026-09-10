import type { CapabilityCategory, ExperienceItem, ArsenalSkill, ProjectItem } from '../types';

export const personalInfo = {
  name: "Md. Minhazur Rahaman",
  nickname: "Md. Minhazur Rahaman",
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
    subtitle: "Custom Streetwear Studio & 2D Tailoring E-Commerce",
    category: "Client E-Commerce & Canvas Studio",
    isCrownJewel: true,
    featuredYear: "2024 - 2025",
    description: "Production E-Commerce web platform & 2D canvas tailoring studio for a premium streetwear brand in Bangladesh. Features real-time Fabric.js DTF print bounding box customizer, Pathao Courier automated 1-click parcel dispatch, and Telegram Bot ERP webhook push notifications.",
    tags: ["React.js", "Fabric.js", "MySQL 8.0", "PHP MVC", "Pathao API", "Telegram Bot API", "HTML5 Canvas"],
    githubUrl: "https://github.com/Mridul3636/Siirham-Website",
    liveUrl: "https://github.com/Mridul3636/Siirham-Website",
    imageUrl: "/projects/siirham.png",
    accent: "#ff6426",
    glowColor: "rgba(255, 100, 38, 0.4)",
    languagesBreakdown: [
      { name: "JavaScript / React", percent: 52, color: "#f7df1e" },
      { name: "PHP", percent: 30, color: "#4f5b93" },
      { name: "MySQL / CSS", percent: 18, color: "#00758f" }
    ],
    metrics: [
      { label: "Fulfillment Speedup", val: "75%" },
      { label: "Core Web Vitals", val: "95+" },
      { label: "SKUs Managed", val: "500+" }
    ]
  },
  {
    id: "emp-portal",
    title: "EMP — Employee Max Portal",
    subtitle: "Enterprise HR, Attendance, Payroll & Discipline Platform",
    category: "Admin Dashboards & ERP",
    featuredYear: "2026",
    isConfidential: true,
    confidentialNotice: "Confidential project for that company only",
    description: "Enterprise HR and workforce management system built for Solution Hub Technologies (Sohub). Features QR-code attendance tracking, automated leave approval workflows, payroll processing & salary calculation, task assignment with execution visibility, and multi-tier role-based access control (RBAC).",
    tags: ["React.js", "PHP / CodeIgniter", "TypeScript", "MySQL", "REST APIs", "RBAC", "Supabase"],
    githubUrl: "https://github.com/Mridul3636/EMP-Wiki",
    liveUrl: "https://emp.sohub.com.bd/",
    imageUrl: "/projects/emp_hero.png",
    accent: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    languagesBreakdown: [
      { name: "React / TypeScript", percent: 54, color: "#3178c6" },
      { name: "PHP", percent: 32, color: "#4f5b93" },
      { name: "MySQL", percent: 14, color: "#00758f" }
    ],
    metrics: [
      { label: "Attendance Tracking", val: "100% Auto" },
      { label: "Leave Approval", val: "Structured" },
      { label: "Access Control", val: "Multi-Tier RBAC" }
    ]
  },
  {
    id: "event-management-system",
    title: "Event Management System",
    subtitle: "Full-Stack Event Coordination & Ticket Booking Platform",
    category: "Web Applications",
    featuredYear: "2025",
    description: "Comprehensive full-stack event planning, venue coordination, and ticket booking web platform. Features interactive attendee registration, seat selection, automated invoice confirmation, and real-time organizer dashboard.",
    tags: ["Node.js", "Express", "React.js", "MongoDB / MySQL", "REST APIs", "Tailwind CSS"],
    githubUrl: "https://github.com/Mridul3636/Event-management-System.git",
    liveUrl: "https://github.com/Mridul3636/Event-management-System.git",
    imageUrl: "/projects/event-management.png",
    accent: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.4)",
    languagesBreakdown: [
      { name: "JavaScript", percent: 64, color: "#f7df1e" },
      { name: "Node.js / Express", percent: 24, color: "#3c873a" },
      { name: "CSS / HTML", percent: 12, color: "#e34f26" }
    ],
    metrics: [
      { label: "Booking Latency", val: "< 120ms" },
      { label: "Invoice Generation", val: "Automated" }
    ]
  },
  {
    id: "decorator-lagbe",
    title: "Decorator Lagbe",
    subtitle: "Interactive Event Decoration & Vendor Quotation Marketplace",
    category: "Web Applications",
    featuredYear: "2025",
    description: "Specialized marketplace platform connecting event organizers with wedding and stage decorators, lighting technicians, and caterers. Includes budget estimation calculators, vendor quotation matching, and design showcase.",
    tags: ["JavaScript", "React.js", "Python / YOLO", "REST APIs", "Tailwind CSS", "Bootstrap"],
    githubUrl: "https://github.com/Mridul3636/Event_Management_System-Decorator_Lagbe.git",
    liveUrl: "https://github.com/Mridul3636/Event_Management_System-Decorator_Lagbe.git",
    imageUrl: "/projects/decorator-lagbe.png",
    accent: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.4)",
    languagesBreakdown: [
      { name: "JavaScript / React", percent: 58, color: "#f7df1e" },
      { name: "Python", percent: 28, color: "#3572A5" },
      { name: "CSS", percent: 14, color: "#e34f26" }
    ],
    metrics: [
      { label: "Quotation Matching", val: "Instant" },
      { label: "Vendor Categories", val: "10+ Types" }
    ]
  },
  {
    id: "yolov11-pothole",
    title: "YOLOv11 Pothole Detection",
    subtitle: "Real-Time Road Hazard Computer Vision Deep Learning Model",
    category: "Machine Learning & AI",
    featuredYear: "2025 - 2026",
    description: "Deep learning computer vision research model engineered using YOLOv11 and custom road dataset for automated real-time road hazard, crack, and pothole detection with high precision.",
    tags: ["YOLOv11", "PyTorch", "Computer Vision", "Python", "Roboflow", "Deep Learning"],
    githubUrl: "https://github.com/Mridul3636/YoloV11-Model-for-Pothole-Detection",
    liveUrl: "https://github.com/Mridul3636/YoloV11-Model-for-Pothole-Detection",
    imageUrl: "/projects/pothole-detection.png",
    accent: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.4)",
    languagesBreakdown: [
      { name: "Python", percent: 88, color: "#3572A5" },
      { name: "Jupyter", percent: 12, color: "#da5b0b" }
    ],
    metrics: [
      { label: "mAP@0.5", val: "94.2%" },
      { label: "Inference Speed", val: "45 FPS" }
    ]
  },
  {
    id: "agentic-swarm",
    title: "Agentic Swarm Engine",
    subtitle: "Autonomous Multi-Agent AI & Neural Tool Calling Hub",
    category: "Agentic AI & Swarms",
    featuredYear: "2026",
    description: "Autonomous multi-agent orchestration framework integrating Antigravity AI, vector memory (pgvector), neural tool-use schema routing, and automated self-healing test suites for 10x engineering velocity.",
    tags: ["Antigravity AI", "FastAPI", "Python", "TypeScript", "pgvector", "Tool Calling"],
    githubUrl: "https://github.com/Mridul3636",
    liveUrl: "https://github.com/Mridul3636",
    imageUrl: "/projects/swarm-ai.png",
    accent: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    languagesBreakdown: [
      { name: "TypeScript", percent: 55, color: "#3178c6" },
      { name: "Python", percent: 35, color: "#3572A5" },
      { name: "SQL", percent: 10, color: "#e38c00" }
    ],
    metrics: [
      { label: "Dev Velocity", val: "10x" },
      { label: "Swarm Accuracy", val: "99.4%" }
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
    name: "Siirham-Website",
    url: "https://github.com/Mridul3636/Siirham-Website",
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
    name: "Event-management-System",
    url: "https://github.com/Mridul3636/Event-management-System.git",
    description: "Full-stack event planning, venue coordination, and ticket booking web platform with automated invoicing.",
    language: "JavaScript / Node.js",
    stars: 19,
    forks: 4,
    languagesBreakdown: [
      { name: "JavaScript", percent: 68, color: "#f7df1e" },
      { name: "Node.js", percent: 20, color: "#3c873a" },
      { name: "CSS", percent: 12, color: "#e34f26" }
    ]
  },
  {
    name: "Event_Management_System-Decorator_Lagbe",
    url: "https://github.com/Mridul3636/Event_Management_System-Decorator_Lagbe.git",
    description: "Specialized event decoration, stage lighting, and vendor quotation matching marketplace platform.",
    language: "JavaScript / Python",
    stars: 16,
    forks: 3,
    languagesBreakdown: [
      { name: "JavaScript / React", percent: 58, color: "#f7df1e" },
      { name: "Python / YOLO", percent: 28, color: "#3572A5" },
      { name: "CSS", percent: 14, color: "#e34f26" }
    ]
  },
  {
    name: "YoloV11-Model-for-Pothole-Detection",
    url: "https://github.com/Mridul3636/YoloV11-Model-for-Pothole-Detection",
    description: "Deep learning computer vision research model for real-time road hazard & pothole detection using custom dataset.",
    language: "Python / PyTorch",
    stars: 24,
    forks: 5,
    languagesBreakdown: [
      { name: "Python", percent: 88, color: "#3572A5" },
      { name: "Jupyter", percent: 12, color: "#da5b0b" }
    ]
  },
  {
    name: "EMP-Wiki",
    url: "https://github.com/Mridul3636/EMP-Wiki",
    description: "Documentation, system architecture blueprints, and API schemas for Employee Max Portal.",
    language: "Markdown / Docs",
    stars: 12,
    forks: 2,
    languagesBreakdown: [
      { name: "Markdown", percent: 75, color: "#083fa1" },
      { name: "TypeScript", percent: 25, color: "#3178c6" }
    ]
  },
  {
    name: "Mridul_Portfolio",
    url: "https://github.com/Mridul3636/Mridul_Portfolio",
    description: "Production personal developer universe built with React, TypeScript, Tailwind CSS, and Web Audio API.",
    language: "TypeScript / React",
    stars: 32,
    forks: 7,
    languagesBreakdown: [
      { name: "TypeScript", percent: 72, color: "#3178c6" },
      { name: "Tailwind CSS", percent: 20, color: "#38bdf8" },
      { name: "HTML", percent: 8, color: "#e34f26" }
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
