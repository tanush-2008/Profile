import { TextLink } from '@/components/Folio';

const STEPS = [
  ['01', 'Discover & select', 'Investigate polymorphs, salts, cocrystals and amorphous forms in their development context.', '/research#polymorphism', 'Solid-form selection'],
  ['02', 'Establish the evidence', 'Connect crystallography, orthogonal characterization and stability studies.', '/research#characterisation', 'Structural & material evidence'],
  ['03', 'Develop & control', 'Bring crystallization, particle attributes, PAT and scale-up into the same conversation.', '/research#crystallisation', 'Crystallization & particles'],
];
export const Framework = ({ id = 'framework' }) => <div data-testid={id}><div className="framework">{STEPS.map(([n,title,text,to,label]) => <div className="framework-item" key={n} data-testid={`${id}-${n}`}><span className="eyebrow">{n} / Scientific activity</span><h3>{title}</h3><p>{text}</p><TextLink to={to} id={`${id}-link-${n}`}>{label}</TextLink></div>)}</div><p className="framework-caption">A conceptual framework, not a fixed sequence. Stability, IP evaluation and regulatory documentation inform decisions throughout development.</p></div>;