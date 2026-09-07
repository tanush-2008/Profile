import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';

export const normalize = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
export const useArchiveQuery = () => {
  const [params, setParams] = useSearchParams();
  const update = (key,value) => {
    const next = new URLSearchParams(params);
    value && value !== 'all' ? next.set(key,value) : next.delete(key);
    setParams(next, { replace: key === 'q', preventScrollReset: true });
  };
  return { params, update, reset: () => setParams({}, { preventScrollReset: true }) };
};

export const ArchiveControls = ({ id, params, update, reset, fields, guide }) => {
  const [open, setOpen] = useState(false);
  const active = [...params.entries()].filter(([key,val]) => key !== 'q' && val !== 'all').length;
  return <aside className="archive-controls" data-testid={`${id}-controls`}><div className="archive-controls-top"><div><label htmlFor={`${id}-search`} className="archive-search-label">Search the archive</label><div className="search-box"><Search size={16} aria-hidden="true" /><input type="search" id={`${id}-search`} data-testid={`${id}-search`} placeholder={id === 'pub' ? 'Title, author, DOI…' : 'Title, inventor, identifier…'} value={params.get('q') || ''} onChange={e => update('q',e.target.value)} /></div></div><button className="filter-toggle" aria-expanded={open} aria-controls={`${id}-filter-fields`} onClick={() => setOpen(v=>!v)} data-testid={`${id}-filter-toggle`}><SlidersHorizontal size={16} />Filters{active ? ` (${active})` : ''}</button></div><div className={`filter-fields ${open ? 'is-open' : ''}`} id={`${id}-filter-fields`}>{fields.map(field => <label key={field.key} htmlFor={`${id}-${field.key}`}>{field.label}<select id={`${id}-${field.key}`} data-testid={`${id}-filter-${field.key}`} value={params.get(field.key) || 'all'} onChange={e => update(field.key,e.target.value)}><option value="all">{field.defaultLabel || `All ${field.label.toLowerCase()}`}</option>{field.options.map(o => <option key={typeof o === 'object' ? o.value : o} value={typeof o === 'object' ? o.value : o}>{typeof o === 'object' ? o.label : o}</option>)}</select></label>)}</div>{params.size > 0 && <button className="clear-filters" data-testid={`${id}-clear-filters`} onClick={reset}>Clear all filters</button>}<p className="archive-guide">{guide}</p></aside>;
};