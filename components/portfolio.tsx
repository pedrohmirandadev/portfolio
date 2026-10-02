"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { Asterisk, ArrowDown, ArrowUpRight, Check, Copy, Download, FileText, Menu, Moon, Pause, Play, Plus, Sun, X } from "lucide-react";
import { profile, type CaseStudy } from "@/lib/content";
import { localizedContent, translations, type Copy as SiteCopy, type Locale } from "@/lib/translations";
import { usePreferences } from "@/lib/preferences";
import SystemSculpture from "./system-sculpture";

const ease = [0.22, 1, 0.36, 1] as const;
const narrowQuery = "(max-width: 650px)";
function subscribeViewport(listener: () => void) {
  const query = window.matchMedia(narrowQuery);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}
const narrowSnapshot = () => window.matchMedia(narrowQuery).matches;
const serverViewport = () => false;

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.7, delay, ease }}>{children}</motion.div>;
}

function Dialog({ open, label, onClose, children, className = "" }: { open: boolean; label: string; onClose: () => void; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { dialog.close(); document.body.style.overflow = overflow; previous?.focus({ preventScroll: true }); };
  }, [open]);
  return <dialog ref={ref} className={`editorial-dialog ${className}`} aria-label={label} onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>{children}</dialog>;
}

function CaseDialog({ study, onClose, t }: { study: CaseStudy | null; onClose: () => void; t: SiteCopy }) {
  return <Dialog open={!!study} label={study?.title ?? t.fieldNote} onClose={onClose}>
    {study && <div className="dialog-content">
      <div className="dialog-top"><span className="eyebrow">{t.fieldNote} / {study.number}</span><button className="icon-button" onClick={onClose} aria-label={t.closeStudy}><X size={20} /></button></div>
      <p className="eyebrow accent-text">{study.category}</p><h2>{study.title}</h2><p className="case-context">{study.context}</p>
      {study.id === "performance" && <div className="dialog-metric"><span>26s</span><ArrowUpRight aria-hidden="true" /><strong>500ms</strong><small>52× {t.faster}</small></div>}
      {[{ title: t.challenge, text: study.challenge }, { title: t.approach, text: study.approach }, { title: t.outcome, text: study.outcome }].map((section) => <div className="case-detail" key={section.title}><h3>{section.title}</h3><p>{section.text}</p></div>)}
      <div className="tags">{study.stack.map((item) => <span key={item}>{item}</span>)}</div><p className="case-note">{study.note}</p>
    </div>}
  </Dialog>;
}

function ResumeDialog({ open, onClose, t, locale }: { open: boolean; onClose: () => void; t: SiteCopy; locale: Locale }) {
  const jobs = localizedContent[locale].experience;
  return <Dialog open={open} label={t.resumeDialogLabel} onClose={onClose} className="resume-dialog">
    <div className="dialog-content">
      <div className="dialog-top"><span className="eyebrow">{t.resume} / PEDRO OLIVEIRA</span><button className="icon-button" onClick={onClose} aria-label={t.closeResume}><X size={20} /></button></div>
      <div className="resume-profile"><div className="resume-monogram" aria-hidden="true">p/o<span>.</span></div><div><h2>Pedro<br />Oliveira<span className="accent-text">.</span></h2><p>{t.resumeRole}</p><span className="mono">Guarulhos · São Paulo · BR</span></div></div>
      <p className="resume-summary">{t.resumeSummary}</p>
      <a className="primary-link resume-download" href={profile.resume} download="Pedro_Oliveira_Resume.pdf"><span>{t.download}<small>{t.resumeFile}</small></span><Download size={20} /></a>
      <div className="resume-columns"><div><h3 className="eyebrow resume-section-title">{t.experienceLabel}</h3>{jobs.map((job) => <div className="resume-job" key={job.company}><span className="mono">{job.dates}</span><h4>{job.company}</h4>{job.partner && <small>{job.partner}</small>}<p>{job.role}</p></div>)}</div><div><h3 className="eyebrow resume-section-title">{t.educationLabel}</h3><div className="resume-job"><h4>{t.education1}</h4><p>{t.education1Date}</p></div><div className="resume-job"><h4>{t.education2}</h4><p>{t.education2Date}</p></div><h3 className="eyebrow resume-section-title">{t.languagesLabel}</h3><p className="resume-languages">{t.languages}</p><a className="inline-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} /></a></div></div>
    </div>
  </Dialog>;
}

function PerformanceVisual({ t }: { t: SiteCopy }) {
  const [optimized, setOptimized] = useState(true);
  const reduced = useReducedMotion();
  return <div className="performance-visual">
    <div className="visual-header"><span className="eyebrow">{t.responseTime}</span><div className="segmented" aria-label={t.comparison}><button aria-pressed={!optimized} onClick={() => setOptimized(false)}>{t.before}</button><button aria-pressed={optimized} onClick={() => setOptimized(true)}>{t.after}</button></div></div>
    <div className="performance-value" aria-live="polite"><AnimatePresence mode="wait" initial={false}><motion.div key={String(optimized)} initial={{ opacity: 0, y: reduced ? 0 : 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -15 }} transition={{ duration: 0.2 }}>{optimized ? "500" : "26"}<span>{optimized ? "ms" : "s"}</span></motion.div></AnimatePresence></div>
    <div className="latency-comparison"><div className="latency-reference"><span>26s</span><div /></div><div className="latency-current"><span>{optimized ? "500ms" : "26s"}</span><div className="latency-track"><motion.div animate={{ scaleX: optimized ? 0.01923 : 1 }} transition={{ duration: reduced ? 0 : 0.8, ease }} /></div></div></div>
    <div className="visual-foot"><span>{optimized ? t.responseCaption : t.beforeCaption}</span><strong>{optimized ? "−98%" : "26s"}</strong></div>
  </div>;
}

function FactoryVisual({ t }: { t: SiteCopy }) {
  return <div className="factory-visual" role="img" aria-label={t.factoryLabel}><span className="eyebrow">{t.operations}</span><div className="factory-grid"><div className="factory-node"><span>01</span>{t.sales}</div><div className="factory-node"><span>02</span>{t.planning}</div><div className="factory-center">Protheus<span className="mono">{t.integration}</span></div><div className="factory-node"><span>03</span>{t.factory}</div><div className="factory-node"><span>04</span>ERP</div></div><span className="visual-caption">{t.factoryCaption}</span></div>;
}

function EventsVisual({ t }: { t: SiteCopy }) {
  return <div className="events-visual" role="img" aria-label={t.eventsLabel}><span className="eyebrow">{t.eventTitle}</span><div className="event-orbits"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><span className="event-core">E</span><span className="event-tag event-tag-one">{t.produce}</span><span className="event-tag event-tag-two">{t.consume}</span><span className="event-particle particle-one" /><span className="event-particle particle-two" /></div><span className="visual-caption">{t.eventsCaption}</span></div>;
}

export default function Portfolio() {
  const reduced = useReducedMotion();
  const { theme, locale, setTheme, setLocale } = usePreferences();
  const narrow = useSyncExternalStore(subscribeViewport, narrowSnapshot, serverViewport);
  const t = translations[locale];
  const content = localizedContent[locale];
  const [paused, setPaused] = useState(false);
  const [organized, setOrganized] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeWork, setActiveWork] = useState(0);
  const [activeCase, setActiveCase] = useState<number | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(0);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const study = content.studies[activeWork];

  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [theme, locale]);
  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event: globalThis.KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); menuRef.current?.focus(); } };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [menuOpen]);

  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopyState("copied"); }
    catch { setCopyState("error"); }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState("idle"), 3500);
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (["ArrowDown", "ArrowRight"].includes(event.key)) next = (index + 1) % 3;
    else if (["ArrowUp", "ArrowLeft"].includes(event.key)) next = (index + 2) % 3;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 2;
    else return;
    event.preventDefault(); setActiveWork(next); tabs.current[next]?.focus();
  }

  return <MotionConfig reducedMotion="user" transition={{ ease, duration: 0.5 }}>
    <title>{locale === "pt" ? "Pedro Oliveira — Ordem na complexidade" : "Pedro Oliveira — Order from complexity"}</title>
    <div className={`site ${paused || reduced ? "motion-paused" : ""}`} data-locale={locale}>
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className="header page-shell">
        <a href="#" className="wordmark" aria-label={`Pedro Oliveira — ${t.backTop}`}>p<span>/</span>o<span className="wordmark-dot">.</span></a><span className="header-name">Pedro Oliveira<span>{t.role}</span></span>
        <nav className="desktop-nav" aria-label={t.navigation}><a href="#work">{t.work}<span>03</span></a><a href="#about">{t.about}</a><button onClick={() => setResumeOpen(true)}>{t.resume}<ArrowUpRight size={14} /></button></nav>
        <div className="header-controls"><div className="language-switch" role="group" aria-label={t.language}><button lang="en" aria-label="English" aria-pressed={locale === "en"} onClick={() => setLocale("en")}>EN</button><button lang="pt-BR" aria-label="Português" aria-pressed={locale === "pt"} onClick={() => setLocale("pt")}>PT</button></div><button className="theme-switch" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={theme === "dark" ? t.lightTheme : t.darkTheme}>{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button><button ref={menuRef} className="mobile-menu-button theme-switch" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? t.closeMenu : t.openMenu}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
      </header>
      <AnimatePresence>{menuOpen && <motion.nav id="mobile-navigation" className="mobile-navigation" aria-label={t.navigation} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>{[[t.work, "#work"], [t.about, "#about"], [t.contact, "#contact"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={20} /></a>)}<button onClick={() => { setMenuOpen(false); menuRef.current?.focus(); setResumeOpen(true); }}>{t.resume}<FileText size={18} /></button></motion.nav>}</AnimatePresence>

      <main id="main">
        <section className="hero page-shell" aria-labelledby="hero-title">
          <div className="hero-meta"><span className="eyebrow"><span className="small-cross">+</span>{t.role}</span><span className="eyebrow hero-edition">{t.edition}</span></div>
          <div className="hero-stage">
            <div className="hero-art"><span className="art-cross cross-one" aria-hidden="true">+</span><span className="art-cross cross-two" aria-hidden="true">+</span><div className="art-orbit" aria-hidden="true" /><SystemSculpture paused={paused} organized={organized} reducedMotion={!!reduced} theme={theme} label={organized ? t.sculptureConnected : t.sculptureScattered} /><span className="art-index mono">FIG. 01 / {t.systemLabel}</span></div>
            <div className="hero-copy"><motion.h1 id="hero-title" aria-label={`${t.heroFirst} ${t.heroJoin} ${t.heroLast}`} initial={reduced ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}><span>{t.heroFirst}</span><span className="hero-second">{t.heroJoin} <em>{t.heroLast}</em></span></motion.h1><motion.div initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease }}><p className="hero-intro">{t.intro}</p><div className="hero-actions"><a href="#work" className="primary-link">{t.explore}<ArrowDown size={17} /></a><button className="quiet-link" onClick={() => setResumeOpen(true)}>{t.resume}<ArrowUpRight size={16} /></button></div></motion.div></div>
            <div className="system-controls"><div><span className="eyebrow">{organized ? t.systemConnected : t.systemScattered}</span><span className="system-hint">{t.systemHint}</span></div><div className="system-buttons"><button className="unravel-button" onClick={() => setOrganized(!organized)} aria-pressed={!organized}><span className={`connection-symbol ${organized ? "connected" : ""}`} aria-hidden="true"><i /><i /><i /></span>{organized ? t.unravel : t.connect}</button><button className="motion-control" disabled={!!reduced} onClick={() => setPaused(!paused)} aria-label={reduced ? t.reduced : paused ? t.play : t.pause} aria-pressed={paused || !!reduced}>{paused || reduced ? <Play size={14} /> : <Pause size={14} />}</button></div></div>
          </div>
          <div className="hero-bottom"><span className="eyebrow">↳ {t.heroLocation}</span><a href="#work" className="hero-proof"><span className="proof-before">26s</span><span className="proof-line" aria-hidden="true" /><strong>500ms</strong><span className="mono">52× {t.faster}</span></a><span className="eyebrow hero-scroll">{t.scroll}<ArrowDown size={13} /></span></div>
        </section>

        <section id="work" className="work-section page-shell" aria-labelledby="work-title"><Reveal className="section-heading"><div><span className="eyebrow section-kicker">{t.workKicker}</span><h2 id="work-title">{t.workTitle}<br /><em>{t.workTitleAccent}</em></h2></div><p>{t.workIntro}</p></Reveal>
          <Reveal className="work-explorer"><div className="work-index" role="tablist" aria-label={t.workTabLabel} aria-orientation={narrow ? "horizontal" : "vertical"}>{content.studies.map((item, index) => <button ref={(node) => { tabs.current[index] = node; }} key={item.id} id={`work-tab-${index}`} role="tab" aria-selected={activeWork === index} aria-controls="work-panel" tabIndex={activeWork === index ? 0 : -1} onClick={() => setActiveWork(index)} onKeyDown={(event) => onTabKey(event, index)}><span className="mono work-number">0{index + 1}</span><span className="work-tab-copy"><strong>{t.contexts[index]}</strong><small>{t.domains[index]}</small></span><ArrowUpRight size={18} /></button>)}</div>
            <div className={`work-panel work-panel-${activeWork}`} id="work-panel" role="tabpanel" aria-labelledby={`work-tab-${activeWork}`} tabIndex={0}><motion.div className="work-visual" key={study.id} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>{activeWork === 0 ? <PerformanceVisual t={t} /> : activeWork === 1 ? <FactoryVisual t={t} /> : <EventsVisual t={t} />}</motion.div><div className="work-description"><span className="eyebrow">{study.category}</span><h3>{study.title}</h3><p>{study.description}</p><div className="work-panel-bottom"><span className="mono">{activeWork === 0 ? "BMW / act digital" : activeWork === 1 ? "Metadil" : "Inmetrics"}</span><button className="inline-link" onClick={() => setActiveCase(activeWork)}>{t.readStudy}<ArrowUpRight size={17} /></button></div></div></div>
          </Reveal><p className="work-footnote"><span aria-hidden="true">+</span>{t.workNote}</p>
        </section>

        <section id="about" className="about-section page-shell" aria-labelledby="about-title"><Reveal className="about-heading"><span className="eyebrow section-kicker">{t.aboutKicker}</span><h2 id="about-title">{t.aboutTitle}<br /><em>{t.aboutAccent}</em></h2></Reveal><div className="about-grid"><Reveal className="about-story"><div className="about-lead"><Asterisk className="asterisk" aria-hidden="true" strokeWidth={1.2} /><p>{t.aboutLead}<span>{t.aboutLeadAccent}</span></p></div><p>{t.aboutBody}</p><p>{t.aboutNow}</p><div className="about-signature"><span className="signature">Pedro.</span><div><span className="mono">04+ / {t.heroYears}</span><span>{t.aboutLocation}</span></div></div></Reveal><Reveal className="experience-list" delay={0.1}><div className="experience-heading"><span className="eyebrow">{t.journey}</span><span className="mono">2022—{t.today}</span></div>{content.experience.map((job, index) => <div className={`experience-item ${expanded === index ? "expanded" : ""}`} key={job.company}><button aria-expanded={expanded === index} aria-controls={`experience-${index}`} onClick={() => setExpanded(expanded === index ? null : index)}><span className="experience-number mono">0{index + 1}</span><span className="experience-title"><span className="mono experience-dates">{job.dates}</span><strong>{job.company}</strong></span><Plus className="experience-plus" size={18} /></button><div id={`experience-${index}`} hidden={expanded !== index} className="experience-detail">{job.partner && <small>{job.partner}</small>}<span>{job.role}</span><p>{job.description}</p>{job.current && <span className="current-label mono">{t.current}</span>}</div></div>)}</Reveal></div></section>

        <section className="toolkit-section" aria-labelledby="toolkit-title"><div className="page-shell"><Reveal className="section-heading"><div><span className="eyebrow section-kicker">{t.toolkitKicker}</span><h2 id="toolkit-title">{t.toolkitTitle}<br /><em>{t.toolkitAccent}</em></h2></div><p>{t.toolkitIntro}</p></Reveal><div className="capability-grid">{content.capabilities.map((item, index) => <Reveal className="capability" key={index} delay={index * 0.06}><span className="capability-number mono">0{index + 1} /</span><h3>{item.name}</h3><p>{item.description}</p><div className="capability-tags">{item.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></Reveal>)}</div><span className="toolkit-footer eyebrow">{t.toolkitFoot}</span></div></section>

        <section className="resume-section page-shell"><Reveal><button className="resume-pass" onClick={() => setResumeOpen(true)} aria-label={t.viewResume}><span className="resume-pass-spine mono">PEDRO OLIVEIRA / {t.resume.toUpperCase()}</span><span className="resume-pass-content"><span className="eyebrow">{t.resumeKicker}</span><span className="resume-pass-title">{t.resumeTitle}<br /><em>{t.resumeAccent}</em></span><span className="resume-pass-description">{t.resumeIntro}</span></span><span className="resume-pass-action"><span className="resume-pass-icon"><ArrowUpRight size={32} /></span><span className="mono">{t.viewResume}</span><span className="resume-barcode" aria-hidden="true" /></span></button></Reveal></section>

        <section id="contact" className="contact-section page-shell" aria-labelledby="contact-title"><Reveal><span className="eyebrow section-kicker">{t.contactKicker}</span><div className="contact-heading"><h2 id="contact-title">{t.contactFirst}<br /><em>{t.contactLast}</em></h2><Asterisk className="contact-spark" aria-hidden="true" strokeWidth={1} /></div><div className="contact-bottom"><div><p>{t.contactDescription}</p><a className="contact-email" href={`mailto:${profile.email}`}>{t.sayHello}<ArrowUpRight size={24} /></a><div className="email-row"><span>{profile.email}</span><button className="copy-button" onClick={copyEmail} aria-label={t.copyEmail}>{copyState === "copied" ? <Check size={16} /> : <Copy size={16} />}</button></div><span className="copy-status" role="status">{copyState === "copied" ? t.copied : copyState === "error" ? t.emailFallback : ""}</span></div><div className="social-links"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={17} /></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub<ArrowUpRight size={17} /></a><button onClick={() => setResumeOpen(true)}>{t.resume}<FileText size={17} /></button></div></div></Reveal></section>
      </main>
      <footer className="footer page-shell"><a href="#" className="wordmark" aria-label={t.backTop}>p<span>/</span>o<span className="wordmark-dot">.</span></a><span className="mono">© 2026 PEDRO OLIVEIRA</span><span className="mono footer-note">{t.footerLine}</span><a className="back-to-top mono" href="#">{t.backTop}<ArrowUpRight size={15} /></a></footer>
      <CaseDialog study={activeCase === null ? null : content.studies[activeCase]} onClose={() => setActiveCase(null)} t={t} /><ResumeDialog open={resumeOpen} onClose={() => setResumeOpen(false)} t={t} locale={locale} />
    </div>
  </MotionConfig>;
}
