// Builders for the repeated blocks of the page. The markup (and its inline styles) is the one of the
// approved design; only the data comes from src/content/<lang>.mjs.

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const DEFAULT_CATEGORY = 'fonds';

export function stats(c) {
  return c.business.stats
    .map(
      (s) => `<div>
      <dt style="font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: clamp(60px, 6.6vw, 108px); line-height: 1; letter-spacing: -0.02em">${esc(s.value)}</dt>
      <dd style="margin: 22px auto 0; font-size: 17px; line-height: 1.5; max-width: 24ch">${esc(s.label)}</dd>
    </div>`,
    )
    .join('\n    ');
}

export function compareRows(c) {
  return c.business.compare
    .map(
      (r) => `<div role="row" style="display: contents">
      <div role="cell" style="padding: 26px 0; border-bottom: 1px solid rgba(11,37,69,0.14); font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: clamp(17px, 1.7vw, 26px); line-height: 1.35; color: #6B7686">${esc(r.them)}</div>
      <div role="cell" style="padding: 26px 0; border-bottom: 1px solid rgba(11,37,69,0.14); font-family: 'Montserrat', sans-serif; font-weight: 400; font-size: clamp(17px, 1.7vw, 26px); line-height: 1.35; color: #0B2545">${esc(r.us)}</div>
    </div>`,
    )
    .join('\n    ');
}

export function pillars(c) {
  return c.business.pillars
    .map(
      (p) => `<div style="border-top: 1.5px solid #E0A43A; padding-top: 28px">
      <h3 style="margin: 0 0 16px; font-family: 'Montserrat', sans-serif; font-weight: 400; font-size: clamp(24px, 2.2vw, 32px); line-height: 1.2">${esc(p.title)}</h3>
      <p style="margin: 0; font-size: 17px; line-height: 1.7; color: #4A5568">${esc(p.text)}</p>
    </div>`,
    )
    .join('\n    ');
}

// Both step lists are rendered, the inactive one is hidden; site.js swaps them with the tabs.
export function stepPanels(c) {
  const panel = (id, tab, steps, hidden) =>
    `<ol role="tabpanel" id="cp-steps-${id}" aria-labelledby="cp-tab-${id}"${hidden ? ' hidden' : ''} style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 440px), 1fr)); column-gap: clamp(40px, 7vw, 120px)">
        ${steps
          .map(
            (text, i) => `<li style="display: flex; align-items: baseline; gap: 24px; padding: clamp(22px, 2.4vw, 32px) 0; border-bottom: 1px solid rgba(245,246,248,0.55)">
          <span style="flex: none; width: 22px; font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 16px; color: #E0A43A">${i + 1}</span>
          <span style="font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: clamp(22px, 2.3vw, 34px); line-height: 1.25">${esc(text)}</span>
        </li>`,
          )
          .join('\n        ')}
      </ol>`;
  return (
    panel('sell', 'sell', c.panel.sellSteps, false) + '\n      ' + panel('buy', 'buy', c.panel.buySteps, true)
  );
}

export function services(c) {
  return c.expertise.services
    .map(
      (s, i) => `<li style="border-bottom: 1px solid rgba(245,246,248,0.55)">
            <button type="button" class="cp-item" aria-pressed="${i === 0}" aria-controls="cp-expertise-detail" data-title="${esc(s.title)}" data-desc="${esc(s.desc)}" data-ref="${esc(s.ref)}" style="width: 100%; min-height: 44px; display: flex; align-items: center; gap: 22px; padding: clamp(22px, 2.4vw, 32px) 0; background: none; border: 0; color: #F5F6F8; text-align: left; cursor: pointer; font: inherit">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#E0A43A" stroke-width="1.6" style="width: 20px; height: 20px; flex: none"><path d="M7 17L17 7M9 7h8v8"></path></svg>
              <span class="cp-item-title" style="font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: clamp(22px, 2.4vw, 36px); line-height: 1.2">${esc(s.title)}</span>
            </button>
          </li>`,
    )
    .join('\n          ');
}

export function filters(c) {
  return c.references.categories
    .map(
      (f) => `<button type="button" class="cp-filter" aria-pressed="${f.id === DEFAULT_CATEGORY}" data-filter="${esc(f.id)}" style="min-height: 48px; padding: 0 0 12px; margin-bottom: -1px; background: none; font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; cursor: pointer; display: inline-flex; align-items: flex-end; gap: 8px">${esc(f.label)}</button>`,
    )
    .join('\n    ');
}

// Every deal is in the page (indexable); site.js shows the ones of the selected category.
export function deals(c) {
  return c.references.deals
    .map(
      (d) => `<li data-cat="${esc(d.cat)}"${d.cat === DEFAULT_CATEGORY ? '' : ' hidden'} style="display: flex; flex-direction: column; gap: 14px">
        <span style="font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; color: #8C5E12">${esc(d.year)}</span>
        <span style="font-family: 'Montserrat', sans-serif; font-weight: 400; font-size: clamp(22px, 2vw, 28px); line-height: 1.25; color: #0B2545">${esc(d.op)}</span>
        <span style="font-size: 16px; line-height: 1.55; color: #4A5568">${esc(d.detail)}</span>
        <span style="align-self: flex-start; margin-top: 4px; padding-bottom: 8px; border-bottom: 1.5px solid #E0A43A; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 15px; text-transform: uppercase; letter-spacing: 0.02em; color: #0B2545">${esc(d.amount)}</span>
      </li>`,
    )
    .join('\n      ');
}

export function career(c) {
  return c.founder.career
    .map(
      (p) => `<li>
        <span style="display: block; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.04em; color: #8C5E12">${esc(p.year)}</span>
        <span style="display: block; margin-top: 16px; font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: clamp(48px, 4.8vw, 80px); line-height: 1; letter-spacing: -0.02em">${esc(p.volume)}</span>
        <span style="display: block; margin-top: 20px; font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 18px">${esc(p.firm)}</span>
        <span style="display: block; margin: 8px auto 0; font-size: 16px; line-height: 1.55; color: #4A5568; max-width: 26ch">${esc(p.what)}</span>
      </li>`,
    )
    .join('\n      ');
}

export function aiItems(c) {
  return c.ai.items
    .map(
      (i) => `<div style="border-bottom: 1px solid rgba(245,246,248,0.55); padding-bottom: 32px">
          <h3 style="margin: 0 0 18px; font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: clamp(26px, 2.6vw, 38px); line-height: 1.15">${esc(i.title)}</h3>
          <p style="margin: 0; font-size: 17px; line-height: 1.7; color: rgba(245,246,248,0.86)">${esc(i.text)}</p>
        </div>`,
    )
    .join('\n        ');
}

export function codevSteps(c) {
  return c.codev.steps
    .map(
      (s) => `<li style="border-top: 1.5px solid #0B2545; padding-top: 28px">
      <span style="display: block; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 14px; color: #8C5E12">${esc(s.n)}</span>
      <h3 style="margin: 14px 0 16px; font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: clamp(44px, 4.4vw, 68px); line-height: 1">${esc(s.title)}</h3>
      <p style="margin: 0; font-size: 17px; line-height: 1.7; color: #4A5568; max-width: 30ch">${esc(s.text)}</p>
    </li>`,
    )
    .join('\n    ');
}

export function ops(c) {
  return c.contact.operations
    .map(
      (label) =>
        `<button type="button" class="cp-op" aria-pressed="false" data-op="${esc(label)}" style="min-height: 44px; padding: 0 18px; border-radius: 999px; font: inherit; font-size: 15px; cursor: pointer">${esc(label)}</button>`,
    )
    .join('\n              ');
}

export const SLOTS = { stats, compareRows, pillars, stepPanels, services, filters, deals, career, aiItems, codevSteps, ops };
export { esc };
