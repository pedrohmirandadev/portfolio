export const profile = {
  name: "Pedro Oliveira",
  fullName: "Pedro Henrique Miranda de Oliveira",
  email: "pedrohmirandadev@gmail.com",
  linkedin: "https://www.linkedin.com/in/pedro-h-miranda/",
  github: "https://github.com/pedrohmirandadev",
  location: "Guarulhos, São Paulo, Brazil",
  resume: "/pedro-oliveira-resume.pdf",
};

export type CaseStudy = {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  context: string;
  challenge: string;
  approach: string;
  outcome: string;
  stack: string[];
  note: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "performance", number: "01", category: "AUTOMOTIVE · BACKEND PERFORMANCE",
    title: "Less waiting. More moving.",
    description: "A critical endpoint. A fresh approach. 98% less waiting.",
    context: "BMW Group TechWorks Brazil, powered by act digital · March 2026–present",
    challenge: "A critical endpoint took 26 seconds to respond. Unnecessary downstream requests added work and latency across the service boundary.",
    approach: "I investigated the request flow, refactored the endpoint, and eliminated unnecessary downstream requests. My broader work on the program includes Java microservices, automated tests, code reviews, and resilient cloud-native integrations.",
    outcome: "Response time dropped from 26 seconds to 500 milliseconds—approximately 98% less latency, or a 52× improvement.",
    stack: ["Java", "Quarkus", "Spring Boot", "Microservices"],
    note: "Professional contribution. Client code and internal architecture are confidential; the visual is an illustrative comparison of the reported timings.",
  },
  {
    id: "industry", number: "02", category: "INDUSTRY · LEGACY MODERNIZATION",
    title: "Connecting the factory floor.",
    description: "Making sales, planning, and production speak the same language.",
    context: "Metadil · February 2024–January 2026",
    challenge: "Critical business applications—a sales CRM, production scheduling solution, factory portal, and internal ERP—needed to evolve while supporting everyday operations.",
    approach: "I led restructuring and modernization using Clean Architecture, DDD, TDD, and RabbitMQ integrations. I connected applications with TOTVS Protheus to synchronize sales, support, administrative, and factory data, and worked with management on technical decisions.",
    outcome: "Delivered APIs supporting hundreds of concurrent users and high transaction volumes across operational systems, with integrated data flows between business applications.",
    stack: ["TypeScript", "NestJS", "Vue 3", "RabbitMQ", "Protheus"],
    note: "Professional contribution. The diagram represents the business domains described in my resume, rather than an internal production architecture.",
  },
  {
    id: "integration", number: "03", category: "ENTERPRISE · DISTRIBUTED SYSTEMS",
    title: "Built for the bigger picture.",
    description: "High-concurrency services with architecture that can keep up.",
    context: "Inmetrics · January–March 2026",
    challenge: "Enterprise services needed to accommodate high-concurrency workloads and asynchronous integration patterns while evolving an existing codebase.",
    approach: "I modernized Java services using Clean and Hexagonal Architecture, DDD, and TDD. I developed high-performance APIs and asynchronous messaging flows using the team's Java, Spring, Quarkus, Kafka, and RabbitMQ stack.",
    outcome: "Contributed API and messaging improvements focused on performance, scalability, and maintainability. No measured benchmark is claimed for this work.",
    stack: ["Java", "Kafka", "RabbitMQ", "PostgreSQL", "AWS"],
    note: "Professional contribution. The visualization is a conceptual representation of asynchronous event flow.",
  },
];

export const experience = [
  { dates: "MAR 2026 — NOW", company: "BMW Group TechWorks Brazil", partner: "powered by act digital", role: "Java Full Stack Developer", description: "Building resilient services for an international automotive program.", current: true },
  { dates: "JAN — MAR 2026", company: "Inmetrics", role: "Mid-Level Software Engineer", description: "Evolving enterprise APIs and asynchronous integrations.", current: false },
  { dates: "FEB 2024 — JAN 2026", company: "Metadil", role: "Mid-Level Full-Stack Developer", description: "Connecting business software with real-world industrial operations.", current: false },
  { dates: "SEP 2022 — FEB 2024", company: "SQAD Technology", role: "Backend Developer", description: "Building Python services and improving existing applications.", current: false },
];

export const capabilities = [
  { name: "The engine", description: "APIs & backend", technologies: ["Java", "Spring Boot", "Quarkus", "Kotlin", "TypeScript", "NestJS", "Python"] },
  { name: "The connections", description: "Data & distributed systems", technologies: ["Kafka", "RabbitMQ", "PostgreSQL", "MySQL", "Microservices", "REST APIs"] },
  { name: "The foundation", description: "Architecture & delivery", technologies: ["DDD", "Clean Architecture", "TDD", "AWS", "Azure", "Docker", "Kubernetes"] },
  { name: "The experience", description: "Interfaces & full-stack", technologies: ["Vue.js", "Vue 3", "Next.js", "TypeScript", "CI/CD", "Code review"] },
];
