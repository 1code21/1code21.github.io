/* =====================================================================
   SITE CONTENT — edit this file to update your portfolio.
   Everything on the page is rendered from this object.
   ===================================================================== */
window.SITE = {
  name: "Ajay Babu Dhanyasi",
  role: "Senior Data Platform Engineer",
  tagline:
    "I design cloud-native data platforms — real-time pipelines, modern warehouses and AI/LLM solutions — that are fast, reliable and cheaper to run.",
  location: "Bangalore, India",
  email: "ajayexams7@gmail.com",
  phone: "+91 63024 25628",
  resume: "assets/Ajay_Dhanyasi_Resume.pdf",
  avatar: "assets/avatar.jpg",

  links: {
    github: "https://github.com/1code21",
    linkedin: "https://www.linkedin.com/in/ajay-dhanyasi/",
    medium: "https://medium.com/@ajayexams7",
  },

  // Impact tiles — Action + System + Result. kind: "reduction" draws a before→after bar.
  impact: [
    { value: 1, suffix: "M+", label: "records/day, <10-min SLA", context: "Engineered a Kafka + Debezium CDC pipeline that streams 1M+ records a day into analytics inside a 10-minute SLA.", where: "Saltmine" },
    { value: 95, suffix: "%", kind: "reduction", label: "lower reporting latency", context: "Replaced batch reporting with the real-time CDC stream, turning next-day reports into near-live analytics.", where: "Saltmine" },
    { value: 85, suffix: "%", kind: "reduction", label: "lower BigQuery query cost", context: "Re-partitioned and clustered BigQuery tables around real query patterns — queries also ran 65% faster.", where: "Castlight Health" },
    { value: 1, suffix: "TB", label: "files, 90% faster dedup", context: "Designed duplicate-file detection for inputs up to 1 TB, cutting detection time by 90%.", where: "Castlight Health" },
    { value: 60, suffix: "%", kind: "reduction", label: "less pipeline memory", context: "Rewrote legacy Python loops and Pandas transforms in Polars, cutting memory use by 60%.", where: "Castlight Health" },
    { value: 30, suffix: "%", kind: "reduction", label: "lower cloud billing", context: "Migrated a data-losing Pub/Sub pipeline to Airflow on Kubernetes with minimal code changes, cutting resource use by 30%.", where: "Castlight Health" },
    { value: 20, suffix: "%", kind: "reduction", label: "lower infra cost", context: "Built a pod-metrics sidecar feeding Prometheus + Thanos and Grafana dashboards to right-size Airflow's Kubernetes clusters.", where: "Castlight Health" },
    { value: 4, suffix: "×", label: "GATE qualified", context: "Qualified the Data Science & AI paper in 2021, 2022, 2024 and 2025.", where: "Achievement" },
  ],

  about: [
    "I'm a Senior Data Platform Engineer with 5+ years building scalable, cloud-native data infrastructure on AWS and GCP. I work across Python, SQL, PySpark, Apache Airflow, Kafka and Terraform.",
    "My focus areas are real-time data pipelines, modern data warehousing (BigQuery, Snowflake, Databricks), infrastructure cost optimisation, data quality, and AI/LLM solutions with Claude and Vertex AI.",
    "Outside work I write about real-world engineering on Medium and contribute to open-source projects like Apache Airflow and Google APIs.",
  ],

  skills: [
    { group: "Languages & Frameworks", items: ["Python", "SQL", "PySpark", "Polars", "Django", "REST APIs"] },
    { group: "Orchestration & Streaming", items: ["Apache Airflow", "Kafka", "Debezium / CDC", "Pub/Sub", "SQS", "Dataflow"] },
    { group: "Warehouses & Lakehouse", items: ["BigQuery", "Snowflake", "Databricks", "Redshift", "Unity Catalog", "Apache Hudi", "Data Lake"] },
    { group: "Cloud", items: ["AWS", "GCP", "Glue", "Lambda", "Data Fusion", "S3"] },
    { group: "Infra & DevOps", items: ["Terraform", "Docker", "Kubernetes", "Jenkins", "CI/CD", "Git", "Linux", "Grafana", "Prometheus", "Thanos"] },
    { group: "AI & LLMs", items: ["Claude", "Vertex AI", "LangChain", "RAG", "MCP", "AI Agents"] },
    { group: "Data Practices", items: ["ETL / ELT / ETLT", "Data Modelling", "Data Quality", "Cost Optimisation"] },
  ],

  experience: [
    {
      title: "Senior Data Platform Engineer",
      company: "Saltmine",
      start: "Jun 2026",
      end: "Present",
      location: "Bengaluru, India · Hybrid",
      points: [
        "Architected a real-time data ingestion pipeline with Kafka and Debezium, delivering 1M+ records a day within a 10-minute SLA — enabling real-time analytics and cutting reporting latency by 95%.",
        "Refactored PySpark DataFrame operations and complex SQL transformations using the Catalyst optimizer, reducing stage count by 40% and file processing time by 30% on enterprise-scale pipelines.",
        "Reduced Terraform infrastructure drift and migrated production services from AWS Singapore (ap-southeast-1) to Mumbai (ap-south-1), lowering AWS costs by 20%.",
      ],
      tags: ["Kafka", "Debezium", "PySpark", "SQL", "Terraform", "AWS", "Python"],
    },
    {
      title: "Senior Data Engineer",
      company: "Castlight Health",
      start: "Jun 2024",
      end: "Mar 2026",
      location: "Hyderabad, India · On-site",
      points: [
        "Optimised BigQuery tables with partitioning and clustering tailored to query patterns — 65% faster queries and 85% lower query costs.",
        "Led the migration of a data-losing Pub/Sub project to Airflow on Kubernetes with minimal code changes, cutting resource usage and billing by 30%.",
        "Built Grafana dashboards for real-time monitoring of Airflow's Kubernetes clusters, helping the team right-size resource allocation and cut infrastructure costs by 20%.",
        "Implemented a sidecar pattern to capture requested vs. actual CPU and memory for every Kubernetes pod, storing the metrics in Prometheus and Thanos to detect over-provisioned and under-utilised pods.",
        "Architected a fully automated Airflow job-monitoring and termination framework using XComs and the Airflow ORM to detect and recover jobs stuck by platform or infrastructure failures.",
        "Built a dynamic ETL batch-processing framework that replaced static batching with ML-driven optimisation (BigQuery ML) based on resource consumption and runtime metrics.",
        "Designed duplicate-file detection for files up to 1 TB, reducing detection time by 90% and improving pipeline reliability.",
        "Automated a formulary file-processing pipeline for files up to 100 GB, cutting manual intervention by 80%.",
        "Refactored pipeline queries to handle growing complexity, reducing file processing time by 45% and increasing throughput.",
        "Replaced legacy Python loops and Pandas with Polars, cutting memory usage by 60% and making pipelines fully reliable.",
      ],
      tags: ["BigQuery", "BigQuery ML", "Airflow", "Kubernetes", "Grafana", "Prometheus", "Thanos", "GCP", "Polars", "Python"],
    },
    {
      title: "Data Engineer",
      company: "Roboxautomation",
      start: "Sep 2022",
      end: "Jun 2024",
      location: "Hyderabad, India · On-site",
      points: [
        "Set up databases and designed ER models, managing ETL operations that became the data foundation for multiple projects.",
        "Automated data cleansing, speeding up processing by 30% and reducing code complexity by 40% while improving data accuracy.",
        "Built an ERP system with Django and MySQL tailored to the fashion industry to streamline data management and operations.",
        "Delivered sales tracking and advanced analysis with Python and Power BI, giving leadership actionable insights.",
      ],
      tags: ["ETL", "SQL", "Django", "MySQL", "Power BI", "Python"],
    },
    {
      title: "Data Engineer",
      company: "Tata Consultancy Services",
      start: "Aug 2021",
      end: "Aug 2022",
      location: "Hyderabad, India",
      points: [
        "Wrote Python scripts to streamline critical modules, reducing manual processes by 40%.",
        "Analysed Excel datasets in Python to surface key trends for decision-making, and automated routine tasks.",
        "Led data-cleansing efforts to ensure high-quality datasets for accurate analytics.",
      ],
      tags: ["Python", "Data Analysis", "SCADA"],
    },
  ],

  achievements: [
    { title: "GATE — Data Science & AI", detail: "Qualified GATE in 2021, 2022, 2024 and 2025 (Data Science & Artificial Intelligence paper)." },
    { title: "Technical writer · Medium", detail: "Voluntary knowledge sharing through articles with real-world engineering insights." },
    { title: "Open-source contributor · GitHub", detail: "Contributions to projects such as Apache Airflow and Google APIs." },
  ],

  certifications: [
    { title: "Claude with Vertex AI & Bedrock", issuer: "Anthropic" },
    { title: "Data Science", issuer: "Fractal Analytics · Coursera" },
  ],

  education: [
    { degree: "B.Tech, Electronics & Communication Engineering", school: "Jawaharlal Nehru Technological University", start: "2017", end: "2021" },
  ],

  // Featured projects. arch = 2-sentence architecture note; flow = data path.
  projects: [
    {
      name: "Real-time CDC ingestion platform",
      desc: "Streams database changes into analytics in near real time — 1M+ records a day inside a 10-minute SLA, cutting reporting latency by 95%.",
      flow: "Source DB → Debezium → Kafka → PySpark → Warehouse → BI",
      arch: "Debezium captures row-level changes from the source database and publishes them to Kafka topics. PySpark jobs, tuned with the Catalyst optimizer, transform and load them for real-time dashboards.",
      tags: ["Kafka", "Debezium", "PySpark", "AWS"],
    },
    {
      name: "Self-healing Airflow on Kubernetes",
      desc: "Replaced a lossy Pub/Sub pipeline with Airflow on Kubernetes that detects and recovers its own stuck jobs — 30% lower billing.",
      flow: "Scheduler → K8s pods → sidecar metrics → Prometheus/Thanos → Grafana",
      arch: "A monitor built on XComs and the Airflow ORM finds hung tasks and terminates or retries them automatically. A sidecar in each pod exports requested vs. used CPU/memory to Prometheus and Thanos, visualised in Grafana to right-size resources.",
      tags: ["Airflow", "Kubernetes", "Prometheus", "Grafana"],
      demo: "https://medium.com/@ajayexams7/building-a-self-reliant-self-healing-apache-airflow-never-lose-a-pipeline-again-89657d1510ed",
    },
    {
      name: "ML-driven adaptive batch sizing",
      desc: "Swapped static ETL batches for batch sizes predicted by a BigQuery ML model, so small loads stop wasting resources and big loads stop bottlenecking.",
      flow: "Raw → Stage → Golden · BigQuery ML picks the batch tier",
      arch: "A logistic-regression model in BigQuery ML classifies each incoming load into small, standard or heavy tiers from volume and past runtime metrics. The orchestrator then sets parallelism for that tier across the Medallion layers.",
      tags: ["BigQuery ML", "Medallion", "ETL"],
      demo: "https://medium.com/@ajayexams7/ml-driven-adaptive-batch-sizing-in-medallion-architecture-0ba03f90f5b8",
    },
    {
      name: "terraform-drift",
      desc: "Open-source Python tool that detects drift between Terraform state and live cloud infrastructure, taken from MVP to production-grade.",
      flow: "Terraform state ↔ cloud APIs → drift report → CI",
      arch: "Compares resources in Terraform state against what actually exists in the cloud provider and reports differences. Ships with CI/CD, documentation and a security policy.",
      tags: ["Python", "Terraform", "IaC", "Open Source"],
      repo: "https://github.com/1code21",   // TODO: exact repo URL
      demo: "https://medium.com/@ajayexams7/elevating-terraform-drift-from-mvp-to-production-grade-47b712565a58",
    },
    {
      name: "AI GitHub issue triage (n8n)",
      desc: "An AI workflow that fetches, analyses, categorises and routes GitHub issues across repositories automatically.",
      flow: "GitHub API → n8n → LLM classify → label & route",
      arch: "n8n pulls new issues from the GitHub API and sends them to an LLM for classification and summarisation. Results are written back as labels and routed to the right owners.",
      tags: ["n8n", "LLM", "Automation"],
      demo: "https://medium.com/@ajayexams7/designing-an-ai-workflow-in-n8n-for-github-issue-management-ef135d35f9c5",
    },
  ],
  githubUser: "1code21",
  githubHideForks: true,
  githubExclude: ["1code21.github.io"],

  // Articles. source: "medium" | "linkedin"
  articles: [
    {
      source: "medium",
      title: "Elevating terraform-drift: From MVP to Production-Grade",
      url: "https://medium.com/@ajayexams7/elevating-terraform-drift-from-mvp-to-production-grade-47b712565a58",
      date: "2026-09-14",
      summary: "Turning an infra tool into a production-grade project: CI/CD, docs, security policies and community practices.",
      tags: ["Terraform", "Python", "Open Source"],
    },
    {
      source: "medium",
      title: "Migrating From Docker to Podman: The Pros, the Cons, and a Step-by-Step Process",
      url: "https://medium.com/@ajayexams7/migrating-from-docker-to-podman-the-pros-the-cons-and-a-step-by-step-process-2d5ee6f52bde",
      date: "2026-08-03",
      summary: "Podman's daemonless architecture, practical migration steps, and when to choose it over Docker.",
      tags: ["Podman", "Docker", "Kubernetes"],
    },
    {
      source: "medium",
      title: "Architecting a Multi-Engine Cloud Lakehouse with Apache Iceberg and BigLake",
      url: "https://medium.com/@ajayexams7/architecting-a-multi-engine-cloud-lakehouse-with-apache-iceberg-and-biglake-c2c6823fe4a9",
      date: "2026-06-28",
      summary: "Building an open lakehouse on Iceberg with multi-engine queries and cost optimisation.",
      tags: ["Iceberg", "Spark", "Big Data"],
    },
    {
      source: "medium",
      title: "AWS S3 Explained: The Complete Beginner's Guide to Simple Storage Service",
      url: "https://medium.com/@ajayexams7/aws-s3-explained-the-complete-beginners-guide-to-simple-storage-service-b5b1cac77af7",
      date: "2026-06-20",
      summary: "Buckets, storage classes, versioning, lifecycle policies and static website hosting.",
      tags: ["AWS", "S3", "Beginner"],
    },
    {
      source: "medium",
      title: "Designing an AI Workflow in n8n for GitHub Issue Management",
      url: "https://medium.com/@ajayexams7/designing-an-ai-workflow-in-n8n-for-github-issue-management-ef135d35f9c5",
      date: "2026-05-24",
      summary: "An AI-powered n8n workflow that fetches, analyses, categorises and routes GitHub issues.",
      tags: ["n8n", "AI", "Automation"],
    },
    {
      source: "medium",
      title: "How I Reduced BigQuery Storage Cost by 50% and Query Cost by 70% (Real-World Banking Data)",
      url: "https://medium.com/@ajayexams7/how-i-reduced-big-query-storage-cost-by-50-and-query-cost-by-70-real-world-banking-data-eeef965ca1c9",
      date: "2026-04-25",
      summary: "Cost-optimisation strategies for large-scale banking data on BigQuery.",
      tags: ["BigQuery", "Cost Optimisation", "GCP"],
    },
    {
      source: "medium",
      title: "Prompt Evolution: How Iterative Prompt Design Improved My Multi-Agent System Performance by 30%",
      url: "https://medium.com/@ajayexams7/prompt-evolution-how-iterative-prompt-design-improved-my-multi-agent-system-performance-by-30-1ae0cce1c7a6",
      date: "2026-04-18",
      summary: "Refining AI workflows through systematic, iterative prompt engineering.",
      tags: ["LLM", "AI Agents", "Prompt Engineering"],
    },
    {
      source: "medium",
      title: "How I Refactored a 250 if-else Apache Beam XML Parser Using a Multi-Agent Copilot Workflow",
      url: "https://medium.com/@ajayexams7/how-i-refactored-a-250-if-else-apache-beam-xml-parser-using-a-multi-agent-copilot-workflow-6e11d43938e1",
      date: "2026-04-12",
      summary: "Treating AI assistants as an engineering team, not a chatbot, to untangle legacy code.",
      tags: ["Apache Beam", "AI Agents", "Refactoring"],
    },
    {
      source: "medium",
      title: "How I Reduced BigQuery Pipeline Failures from 20 per Day to Zero Using Exponential Retries",
      url: "https://medium.com/@ajayexams7/how-i-reduced-bigquery-pipeline-failures-from-20-per-day-to-zero-using-exponential-retries-f45bbfb9e650",
      date: "2026-03-22",
      summary: "Making cloud data pipelines reliable with exponential backoff and retries.",
      tags: ["BigQuery", "Reliability", "Python"],
    },
    {
      source: "medium",
      title: "Building a Self-Reliant & Self-Healing Apache Airflow: Never Lose a Pipeline Again",
      url: "https://medium.com/@ajayexams7/building-a-self-reliant-self-healing-apache-airflow-never-lose-a-pipeline-again-89657d1510ed",
      date: "2026-02-15",
      summary: "Automated recovery for pipelines interrupted by platform and infrastructure failures.",
      tags: ["Airflow", "Kubernetes", "Reliability"],
    },
    {
      source: "medium",
      title: "ML-Driven Adaptive Batch Sizing in Medallion Architecture",
      url: "https://medium.com/@ajayexams7/ml-driven-adaptive-batch-sizing-in-medallion-architecture-0ba03f90f5b8",
      date: "2026-01-25",
      summary: "Replacing static batching with BigQuery ML predictions of optimal parallelism across Raw → Stage → Golden layers.",
      tags: ["BigQuery ML", "Medallion", "ETL"],
    },
    // Add LinkedIn articles like this:
    // { source: "linkedin", title: "...", url: "https://www.linkedin.com/pulse/...", date: "2026-01-01", summary: "...", tags: [] },
  ],
};
