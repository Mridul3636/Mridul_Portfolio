export const siirhamCaseStudy = {
  title: "SIIRHAM",
  fullTitle: "SIIRHAM E-Commerce & Interactive 2D Tailoring Studio",
  tagline: "High-Performance Streetwear Commerce Platform with In-Browser Customizer, Pathao Logistics & Telegram ERP",
  role: "Full-Stack Software Engineer & Lead Tech Architect",
  domain: "E-Commerce, 2D Apparel Customization, Logistics Automation, ERP & Inventory Management",
  githubUrl: "https://github.com/Mridul3636/Siirham_Website",
  liveUrl: "https://github.com/Mridul3636/Siirham_Website",
  period: "2023 - 2024",
  stats: [
    { label: "Fulfillment Speedup", value: "75%", desc: "automated consignment booking" },
    { label: "Core Web Vitals", value: "95+", desc: "sub-second page load times" },
    { label: "Active SKUs Managed", value: "500+", desc: "size-matrix inventory allocation" },
    { label: "Order Dispatch Time", value: "< 2 min", desc: "instant Telegram group webhooks" },
  ],
  executiveSummary: "Engineered a production-ready, high-performance E-Commerce platform and interactive 2D apparel tailoring studio for a premium streetwear brand in Bangladesh. Built with custom PHP (Vanilla MVC architecture), MySQL, modern Vanilla JavaScript (ES6+), and HTML5 Canvas API. The platform powers end-to-end commerce operations including interactive product customization, real-time logistics dispatch (Pathao Courier API), instant ERP notifications via Telegram Bot webhooks, role-based admin inventory management, dynamic promotion engines, and Google OAuth 2.0 social login.",
  
  narrativeFlow: {
    problem: {
      headline: "The Brick-and-Mortar Customization Bottleneck",
      description: "Custom apparel orders traditionally required endless back-and-forth messaging on social media, manual mockups by graphic designers, manual address verification, and tedious manual parcel creation on courier portals. This caused 48+ hour delays, frequent human errors in DTF print coordinates, and overselling of popular garment sizes.",
    },
    idea: {
      headline: "A Unified In-Browser Design Studio & Automated Fulfillment Pipeline",
      description: "Eliminate manual friction entirely: give customers a high-precision, in-browser 2D tailoring studio that calculates print-area pricing automatically, generates factory-ready 300 DPI print coordinates, auto-books Pathao courier dispatches via REST APIs, and pings warehouse staff instantly via Telegram bot action buttons.",
    },
    solution: {
      headline: "Zero-Bloat MVC Architecture + Hardware-Accelerated Canvas Engine",
      description: "Designed a clean PHP 8.x MVC backend paired with a Fabric.js / HTML5 Canvas customizer. Integrated multi-role RBAC inventory tracking, cascading Pathao address endpoints, and Telegram webhook push notifications with inline 1-click admin dispatch triggers.",
    },
    results: {
      headline: "Sub-Second Latency, Zero Overselling, 75% Faster Dispatch",
      description: "Reduced average order fulfillment time from 48 hours to under 12 hours. Eliminated customer ordering drop-off with a seamless interactive canvas customizer, and achieved a 95+ Core Web Vitals performance score.",
    }
  },

  modules: [
    {
      id: "canvas",
      title: "Interactive 2D Customizer & Canvas Engine",
      badge: "Core Innovation",
      description: "Hardware-accelerated browser garment personalization suite built with Fabric.js and HTML5 Canvas API.",
      features: [
        "Multi-side Garment Preview: Seamless switching between Front, Back, and Sleeves.",
        "Artwork & Typography Studio: Custom font selection, curved text, color pickers, layering (bring forward/send backward), rotation, scaling, and flip controls.",
        "Dynamic Print Scaling & Pricing: Calculates print size categories (Pocket A6, Chest A4, Giant A3/A2) and adjusts checkout price dynamically in real time.",
        "High-Resolution Factory Export: Generates 300 DPI production-ready PNG/SVG files and stores configuration coordinates for factory DTF printing.",
        "PSD Layer Parser: Integrated client-side Adobe Photoshop (`ag-psd`) binary layer parser for direct graphic imports."
      ],
      tech: ["Fabric.js", "HTML5 Canvas API", "Vanilla ES6+", "ag-psd binary parser"]
    },
    {
      id: "logistics",
      title: "Automated Pathao Courier Logistics Engine",
      badge: "Logistics Automation",
      description: "Direct Pathao Merchant REST API integration with automated Bearer Token lifecycle management.",
      features: [
        "Dynamic Cascading Address Dropdowns: City -> Zone -> Area fetched via asynchronous AJAX endpoints.",
        "1-Click Consignment Generation: Creates parcel tracking IDs and pre-fills delivery instructions, item weight, and Cash-on-Delivery (COD) amounts.",
        "Webhook Delivery Status Synchronizer: Updates local order status ('In Review' -> 'Shipped' -> 'Delivered') automatically in database."
      ],
      tech: ["Pathao Merchant REST API", "cURL Client", "AJAX Endpoints", "Webhook Synchronizer"]
    },
    {
      id: "telegram",
      title: "Real-Time Telegram ERP Bot & Instant Dispatch",
      badge: "ERP Webhooks",
      description: "Instant automated push notifications sent to Telegram private admin groups when a customer orders.",
      features: [
        "Rich Payload Formatting: Order ID, customer phone, delivery address, items list, size breakdown, custom print preview links, and COD amount.",
        "Interactive Inline Buttons: Warehouse admin can approve, reject, or mark orders as processing directly from the Telegram mobile app.",
        "Zero SMS Cost: Replaced costly third-party SMS gateways with instant, secure Telegram webhook bot communication."
      ],
      tech: ["Telegram Bot API", "Webhooks", "JSON Payloads", "Admin Action Handlers"]
    },
    {
      id: "inventory",
      title: "Role-Based Access Control (RBAC) & Inventory ERP",
      badge: "Enterprise Security",
      description: "Granular size-matrix inventory management with role-based permissions.",
      features: [
        "Multi-Role Administration: Super Admin, Stock Manager, and Fulfillment Staff permissions.",
        "Granular Size Matrix: SKU and size-level stock tracking (S, M, L, XL, 2XL, 3XL) with real-time depletion upon order checkout.",
        "Low-Stock & Out-of-Stock Triggers: Prevents overselling with automated modal warnings and back-order flags.",
        "Activity Audit Trail: Comprehensive log tracking administrative actions (price adjustments, stock replenishment, order transitions)."
      ],
      tech: ["MySQL 8.0 Normalized Schema", "RBAC Engine", "Session Security", "Audit Logging"]
    },
    {
      id: "promotions",
      title: "Dynamic Pricing, Discount & Coupon Engine",
      badge: "Growth Engine",
      description: "Intelligent checkout rules engine supporting flash sales and geographical shipping calculators.",
      features: [
        "Flash Sale System: Scheduled percentage or fixed-amount discounts per product category with countdown timers.",
        "Cart Rules & Coupon Validation: Supports minimum cart spend thresholds, single-use customer limits, expiry timestamps, and exclusion rules.",
        "Delivery Fee Calculator: Intelligent shipping rates based on geographical zones (Inside Dhaka vs. Outside Dhaka vs. Express Sub-city)."
      ],
      tech: ["PHP 8.x Business Logic", "Dynamic Cart Rules", "Coupon Expiry Engine"]
    },
    {
      id: "seo",
      title: "SEO Engine & Core Web Vitals Architecture",
      badge: "Performance",
      description: "Sub-second page rendering and rich structured search schema.",
      features: [
        "Unified Canonical Routing: Enforces 301 redirects to clean semantic URLs without exposing .php extensions via Apache .htaccess.",
        "Schema.org Structured Data: Automatic JSON-LD generation for Products, BreadcrumbLists, Store Organization, and FAQ snippets.",
        "Automated Dynamic XML Sitemap (sitemap.xml) and search crawler directives (robots.txt).",
        "Asset Optimization: Minified CSS/JS delivery, asynchronous script loading, and responsive WebP image delivery for a 95+ score."
      ],
      tech: ["Apache .htaccess Rewrite", "JSON-LD Schema", "WebP Delivery", "Brotli Compression"]
    }
  ],

  techStack: {
    backend: ["PHP 8.x (Custom MVC)", "MySQL 8.0 / MariaDB", "PDO Prepared Statements", "cURL RESTful Client"],
    frontend: ["Vanilla ES6+ JavaScript", "Fabric.js (Canvas API)", "HTML5 Canvas", "CSS3 Variables & Flexbox/Grid", "ag-psd Parser"],
    integrations: ["Pathao Courier Merchant API", "Telegram Bot Webhooks", "Google OAuth 2.0 Social Login", "Cloudinary / Google Drive CDN"],
    devops: ["Apache HTTP Server (.htaccess rewrite)", "JSON-LD Schema.org", "Git & GitHub CI/CD", "WebP Compression"]
  },

  resumeBullets: [
    "Engineered a full-stack custom streetwear e-commerce platform and 2D canvas tailoring studio utilizing PHP 8.x, MySQL, and modern Vanilla ES6+ JavaScript.",
    "Built an in-browser interactive graphic customizer using Fabric.js, supporting multi-layer rendering, PSD design parsing (ag-psd), and automated print-area pricing calculations.",
    "Integrated Pathao Courier Merchant REST API for automated consignment booking and real-time delivery tracking, reducing fulfillment processing time by 75%.",
    "Implemented real-time Telegram Bot webhooks for automated order dispatch notifications and one-touch status updates directly from mobile messaging channels.",
    "Designed a scalable role-based admin console (RBAC) with granular size-matrix inventory tracking, preventing overselling across 500+ SKUs.",
    "Optimized frontend performance and canonical routing architecture via Apache mod-rewrite and JSON-LD structured schemas, achieving 95+ Core Web Vitals score."
  ]
};
