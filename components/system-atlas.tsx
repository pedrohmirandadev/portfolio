"use client";

import { useState } from "react";
import { ArrowUpRight, Braces, Database, Layers, Monitor } from "lucide-react";
import { localizedContent, type Copy, type Locale } from "@/lib/translations";

const icons = [Braces, Database, Layers, Monitor];

export default function SystemAtlas({ t, locale }: { t: Copy; locale: Locale }) {
  const [active, setActive] = useState(0);
  const items = localizedContent[locale].capabilities;
  const item = items[active];

  return <div className="system-atlas">
    <div className="atlas-stage">
      <div className="atlas-map">
        <div className="atlas-map-heading"><span className="eyebrow">{t.atlasTitle}</span><span className="mono">FIG. 02</span></div>
        <div className="atlas-topology">
          <svg viewBox="0 0 480 360" fill="none" aria-hidden="true">
            <circle cx="240" cy="180" r="131" className="atlas-orbit" />
            <circle cx="240" cy="180" r="91" className="atlas-orbit inner" />
            <path d="M240 0V360M0 180H480" className="atlas-axis" />
            {["M240 180V55H110", "M240 180H390", "M240 180V305H110", "M240 180H90"].map((path, index) => <path key={path} d={path} className={`atlas-route ${active === index ? "active" : ""}`} />)}
            <circle cx="240" cy="180" r="49" className="atlas-core-ring" />
          </svg>
          <div className="atlas-core" aria-hidden="true">p<span>/</span>o<span>.</span></div>
          {items.map((layer, index) => {
            const Icon = icons[index];
            return <button key={layer.name} className={`atlas-node atlas-node-${index}`} aria-label={`${t.atlasSelect}: ${layer.name}`} aria-pressed={active === index} onClick={() => setActive(index)}><Icon size={18} strokeWidth={1.5} /><span className="mono">0{index + 1}</span></button>;
          })}
          <span className="atlas-coordinate mono" aria-hidden="true">x / y / z</span>
        </div>
        <span className="atlas-map-caption mono">{t.atlasCaption}</span>
      </div>
      <div className="atlas-detail" aria-live="polite" aria-atomic="true">
        <div className="atlas-detail-top"><span className="eyebrow">{t.atlasLayer} / 0{active + 1}</span><ArrowUpRight size={22} aria-hidden="true" /></div>
        <span className="atlas-detail-number" aria-hidden="true">0{active + 1}<span> / 04</span></span>
        <h3>{item.name}<span>.</span></h3>
        <p className="atlas-detail-domain mono">{item.description}</p>
        <p className="atlas-detail-copy">{t.atlasDescriptions[active]}</p>
        <div className="capability-tags">{item.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
      </div>
    </div>
    <div className="atlas-selector" role="group" aria-label={t.atlasSelect}>
      {items.map((layer, index) => <button key={layer.name} aria-pressed={active === index} onClick={() => setActive(index)}><span className="mono">0{index + 1}</span><span><strong>{layer.name}</strong><small>{layer.description}</small></span><ArrowUpRight size={17} aria-hidden="true" /></button>)}
    </div>
  </div>;
}
