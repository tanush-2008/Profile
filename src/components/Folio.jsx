import { useEffect } from 'react';
import { Link, useLocation, useNavigationType } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUpRight, Copy, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { PROFILE, SOURCES } from '@/content/profile';

const scrollPositions = new Map();
export const Page = ({ id, title, description = 'The research, development contributions and professional record of Dr. Vishweshwar Peddy, pharmaceutical solid-state scientist.', children, className = '' }) => {
  const location = useLocation();
  const navigationType = useNavigationType();
  useEffect(() => {
    const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) {
      if (target.tagName === 'DETAILS') target.open = true;
      target.closest('details')?.setAttribute('open', '');
      requestAnimationFrame(() => { target.scrollIntoView({ block: 'start' }); target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); });
    } else if (navigationType === 'POP' && scrollPositions.has(location.key)) {
      window.scrollTo(0, scrollPositions.get(location.key));
    } else if (!location.search) {
      window.scrollTo(0, 0);
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
    const save = () => scrollPositions.set(location.key, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, [location.pathname, location.hash, location.key, navigationType, location.search]);
  const site = import.meta.env.VITE_SITE_URL;
  return <main id="main-content" tabIndex={-1} className={`page ${className}`} data-testid={`page-${id}`}><Helmet><title>{title ? `${title} — ${PROFILE.name}` : `${PROFILE.name} — Solid-form science`}</title><meta name="description" content={description} /><link rel="canonical" href={`${site}${location.pathname}`} /><meta property="og:title" content={title ? `${title} — ${PROFILE.name}` : PROFILE.name} /><meta property="og:description" content={description} /><meta property="og:url" content={`${site}${location.pathname}`} /><meta property="og:image" content={`${site}/images/social-preview.jpg`} /><meta property="og:type" content="website" /><meta name="twitter:card" content="summary_large_image" />{id === 'not-found' && <meta name="robots" content="noindex" />}</Helmet>{children}</main>;
};

export const PageHeading = ({ eyebrow, title, description, children }) => <div className="page-heading" data-testid="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{description && <p className="page-description">{description}</p>}{children}</div>;
export const TextLink = ({ to, children, id, className = '' }) => <Link to={to} className={`text-link ${className}`} data-testid={id}>{children}<ArrowRight size={17} aria-hidden="true" /></Link>;
export const ButtonLink = ({ to, children, id, secondary = false }) => <Link to={to} className={`button ${secondary ? 'button-secondary' : ''}`} data-testid={id}>{children}<ArrowUpRight size={17} aria-hidden="true" /></Link>;
export const SectionLabel = ({ number, children, id }) => <h2 className="section-label" data-testid={id}><span>{number}</span>{children}</h2>;
export const SourceNote = ({ id, doc = 'annexure', pages, children, label = 'Source & context' }) => <details className="source-note" data-testid={`source-${id}`}><summary data-testid={`source-toggle-${id}`}>{label}<Plus size={13} aria-hidden="true" /></summary><div data-testid={`source-content-${id}`}>{children && <p>{children}</p>}<a href={`${SOURCES[doc]}#page=${String(pages).split(/[–, -]/)[0]}`} target="_blank" rel="noreferrer" data-testid={`source-link-${id}`}>{doc === 'cv' ? 'VP.pdf' : 'VP_Annexure.pdf'}, {String(pages).includes('–') ? 'pages' : 'page'} {pages}<ArrowUpRight size={13} /></a></div></details>;
export const CopyAction = ({ text, id, label = 'Copy citation' }) => <button className="small-action" data-testid={id} onClick={async () => {
  try { await navigator.clipboard.writeText(text); toast.success(label === 'Copy email' ? 'Email address copied' : 'Copied to clipboard'); }
  catch { toast.error('Copy isn’t available in this browser. Select and copy the visible text instead.'); }
}}><Copy size={14} aria-hidden="true" />{label}</button>;
export const ContactBand = ({ id = 'contact-band' }) => <section className="contact-band wrap" data-testid={id}><div><span className="eyebrow">Continuing the conversation</span><p>Good science begins<br />with a good question.</p></div><ButtonLink to="/contact" id={`${id}-link`}>Get in touch</ButtonLink></section>;