(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))p(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const h of a.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&p(h)}).observe(document,{childList:!0,subtree:!0});function g(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function p(n){if(n.ep)return;n.ep=!0;const a=g(n);fetch(n.href,a)}})();(()=>{const p="no_overflowing_text,no_overlapping_text,slide_sized_text",n=m=>String(m).padStart(2,"0"),a=`
    :host {
      position: fixed;
      inset: 0;
      display: block;
      background: #000;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      overflow: hidden;
    }

    .stage {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .canvas {
      position: relative;
      transform-origin: center center;
      flex-shrink: 0;
      background: #fff;
      will-change: transform;
    }

    /* Slides live in light DOM (via <slot>) so authored CSS still applies.
       We absolutely position each slotted child to stack them. */
    ::slotted(*) {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box !important;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }
    ::slotted([data-deck-active]) {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }

    /* Tap zones for mobile — back/forward thirds like Stories.
       Transparent, no visible UI, don't block the overlay. */
    .tapzones {
      position: fixed;
      inset: 0;
      display: flex;
      z-index: 2147482000;
      pointer-events: none;
    }
    .tapzone {
      flex: 1;
      pointer-events: auto;
      -webkit-tap-highlight-color: transparent;
    }
    /* Only activate tap zones on coarse pointers (touch devices). */
    @media (hover: hover) and (pointer: fine) {
      .tapzones { display: none; }
    }

    .overlay {
      position: fixed;
      left: 50%;
      bottom: 22px;
      transform: translate(-50%, 6px) scale(0.92);
      filter: blur(6px);
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px;
      background: #000;
      color: #fff;
      border-radius: 999px;
      font-size: 12px;
      font-feature-settings: "tnum" 1;
      letter-spacing: 0.01em;
      opacity: 0;
      pointer-events: none;
      transition: opacity 260ms ease, transform 260ms cubic-bezier(.2,.8,.2,1), filter 260ms ease;
      transform-origin: center bottom;
      z-index: 2147483000;
      user-select: none;
    }
    .overlay[data-visible] {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, 0) scale(1);
      filter: blur(0);
    }

    .btn {
      appearance: none;
      -webkit-appearance: none;
      background: transparent;
      border: 0;
      margin: 0;
      padding: 0;
      color: inherit;
      font: inherit;
      cursor: default;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      min-width: 28px;
      border-radius: 999px;
      color: rgba(255,255,255,0.72);
      transition: background 140ms ease, color 140ms ease;
      -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
    .btn:active { background: rgba(255,255,255,0.18); }
    .btn:focus { outline: none; }
    .btn:focus-visible { outline: none; }
    .btn::-moz-focus-inner { border: 0; }
    .btn svg { width: 14px; height: 14px; display: block; }
    .btn.reset {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.02em;
      padding: 0 10px 0 12px;
      gap: 6px;
      color: rgba(255,255,255,0.72);
    }
    .btn.reset .kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
      font-size: 10px;
      line-height: 1;
      color: rgba(255,255,255,0.88);
      background: rgba(255,255,255,0.12);
      border-radius: 4px;
    }

    .count {
      font-variant-numeric: tabular-nums;
      color: #fff;
      font-weight: 500;
      padding: 0 8px;
      min-width: 42px;
      text-align: center;
      font-size: 12px;
    }
    .count .sep { color: rgba(255,255,255,0.45); margin: 0 3px; font-weight: 400; }
    .count .total { color: rgba(255,255,255,0.55); }

    .divider {
      width: 1px;
      height: 14px;
      background: rgba(255,255,255,0.18);
      margin: 0 2px;
    }

    /* ── Print: one page per slide, no chrome ────────────────────────────
       The screen layout stacks every slide at inset:0 inside a scaled
       canvas; for print we want them in document flow at the authored
       design size so the browser paginates one slide per sheet. The
       @page size is set from the width/height attributes via the inline
       <style id="deck-stage-print-page"> that connectedCallback injects
       into <head> (the @page at-rule has no effect inside shadow DOM). */
    @media print {
      :host {
        position: static;
        inset: auto;
        background: none;
        overflow: visible;
        color: inherit;
      }
      .stage { position: static; display: block; }
      .canvas {
        transform: none !important;
        width: auto !important;
        height: auto !important;
        background: none;
        will-change: auto;
      }
      ::slotted(*) {
        position: relative !important;
        inset: auto !important;
        width: var(--deck-design-w) !important;
        height: var(--deck-design-h) !important;
        box-sizing: border-box !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto;
        break-after: page;
        page-break-after: always;
        break-inside: avoid;
        overflow: hidden;
      }
      ::slotted(*:last-child) {
        break-after: auto;
        page-break-after: auto;
      }
      .overlay, .tapzones { display: none !important; }
    }
  `;class h extends HTMLElement{static get observedAttributes(){return["width","height","noscale"]}constructor(){super(),this._root=this.attachShadow({mode:"open"}),this._index=0,this._slides=[],this._notes=[],this._hideTimer=null,this._mouseIdleTimer=null,this._onKey=this._onKey.bind(this),this._onResize=this._onResize.bind(this),this._onSlotChange=this._onSlotChange.bind(this),this._onMouseMove=this._onMouseMove.bind(this),this._onTapBack=this._onTapBack.bind(this),this._onTapForward=this._onTapForward.bind(this)}get designWidth(){return parseInt(this.getAttribute("width"),10)||1920}get designHeight(){return parseInt(this.getAttribute("height"),10)||1080}connectedCallback(){this._render(),this._loadNotes(),this._syncPrintPageRule(),window.addEventListener("keydown",this._onKey),window.addEventListener("resize",this._onResize),window.addEventListener("mousemove",this._onMouseMove,{passive:!0})}disconnectedCallback(){window.removeEventListener("keydown",this._onKey),window.removeEventListener("resize",this._onResize),window.removeEventListener("mousemove",this._onMouseMove),this._hideTimer&&clearTimeout(this._hideTimer),this._mouseIdleTimer&&clearTimeout(this._mouseIdleTimer)}attributeChangedCallback(){this._canvas&&(this._canvas.style.width=this.designWidth+"px",this._canvas.style.height=this.designHeight+"px",this._canvas.style.setProperty("--deck-design-w",this.designWidth+"px"),this._canvas.style.setProperty("--deck-design-h",this.designHeight+"px"),this._fit(),this._syncPrintPageRule())}_render(){const i=document.createElement("style");i.textContent=a;const e=document.createElement("div");e.className="stage";const t=document.createElement("div");t.className="canvas",t.style.width=this.designWidth+"px",t.style.height=this.designHeight+"px",t.style.setProperty("--deck-design-w",this.designWidth+"px"),t.style.setProperty("--deck-design-h",this.designHeight+"px");const r=document.createElement("slot");r.addEventListener("slotchange",this._onSlotChange),t.appendChild(r),e.appendChild(t);const s=document.createElement("div");s.className="tapzones export-hidden",s.setAttribute("aria-hidden","true"),s.setAttribute("data-noncommentable","");const o=document.createElement("div");o.className="tapzone tapzone--back";const d=document.createElement("div");d.className="tapzone tapzone--mid",d.style.pointerEvents="none";const u=document.createElement("div");u.className="tapzone tapzone--fwd",o.addEventListener("click",this._onTapBack),u.addEventListener("click",this._onTapForward),s.append(o,d,u);const l=document.createElement("div");l.className="overlay export-hidden",l.setAttribute("role","toolbar"),l.setAttribute("aria-label","Deck controls"),l.setAttribute("data-noncommentable",""),l.innerHTML=`
        <button class="btn prev" type="button" aria-label="Previous slide" title="Previous (←)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>
        </button>
        <span class="count" aria-live="polite"><span class="current">1</span><span class="sep">/</span><span class="total">1</span></span>
        <button class="btn next" type="button" aria-label="Next slide" title="Next (→)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
        </button>
        <span class="divider"></span>
        <button class="btn reset" type="button" aria-label="Reset to first slide" title="Reset (R)">Reset<span class="kbd">R</span></button>
      `,l.querySelector(".prev").addEventListener("click",()=>this._go(this._index-1,"click")),l.querySelector(".next").addEventListener("click",()=>this._go(this._index+1,"click")),l.querySelector(".reset").addEventListener("click",()=>this._go(0,"click")),this._root.append(i,e,s,l),this._canvas=t,this._slot=r,this._overlay=l,this._countEl=l.querySelector(".current"),this._totalEl=l.querySelector(".total")}_syncPrintPageRule(){const i="deck-stage-print-page";let e=document.getElementById(i);e||(e=document.createElement("style"),e.id=i,document.head.appendChild(e)),e.textContent="@page { size: "+this.designWidth+"px "+this.designHeight+"px; margin: 0; } @media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; overflow: visible !important; height: auto !important; } * { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }"}_onSlotChange(){this._collectSlides(),this._restoreIndex(),this._applyIndex({showOverlay:!1,broadcast:!0,reason:"init"}),this._fit()}_collectSlides(){const i=this._slot.assignedElements({flatten:!0});this._slides=i.filter(e=>{const t=e.tagName;return t!=="TEMPLATE"&&t!=="SCRIPT"&&t!=="STYLE"}),this._slides.forEach((e,t)=>{const r=t+1;let s=e.getAttribute("data-label");if(!s){const o=e.getAttribute("data-screen-label");o&&(s=o.replace(/^\s*\d+\s*/,"").trim()||o)}if(!s){const o=e.querySelector("h1, h2, h3, [data-title]");o&&(s=(o.textContent||"").trim().slice(0,40))}s||(s="Slide"),e.setAttribute("data-screen-label",`${n(r)} ${s}`),e.hasAttribute("data-om-validate")||e.setAttribute("data-om-validate",p),e.setAttribute("data-deck-slide",String(t))}),this._totalEl&&(this._totalEl.textContent=String(this._slides.length||1)),this._index>=this._slides.length&&(this._index=Math.max(0,this._slides.length-1))}_loadNotes(){const i=document.getElementById("speaker-notes");if(!i){this._notes=[];return}try{const e=JSON.parse(i.textContent||"[]");Array.isArray(e)&&(this._notes=e)}catch(e){console.warn("[deck-stage] Failed to parse #speaker-notes JSON:",e),this._notes=[]}}_restoreIndex(){const i=(location.hash||"").match(/^#(\d+)$/);if(i){const e=parseInt(i[1],10)-1;e>=0&&e<this._slides.length&&(this._index=e)}}_applyIndex({showOverlay:i=!0,broadcast:e=!0,reason:t="init"}={}){if(!this._slides.length)return;const r=this._prevIndex==null?-1:this._prevIndex,s=this._index;try{history.replaceState(null,"","#"+(s+1))}catch{}if(this._slides.forEach((o,d)=>{d===s?o.setAttribute("data-deck-active",""):o.removeAttribute("data-deck-active")}),this._countEl&&(this._countEl.textContent=String(s+1)),e){try{window.postMessage({slideIndexChanged:s},"*")}catch{}const o={index:s,previousIndex:r,total:this._slides.length,slide:this._slides[s]||null,previousSlide:r>=0&&this._slides[r]||null,reason:t};this.dispatchEvent(new CustomEvent("slidechange",{detail:o,bubbles:!0,composed:!0}))}this._prevIndex=s,i&&this._flashOverlay()}_flashOverlay(){this._overlay&&(this._overlay.setAttribute("data-visible",""),this._hideTimer&&clearTimeout(this._hideTimer),this._hideTimer=setTimeout(()=>{this._overlay.removeAttribute("data-visible")},1800))}_fit(){if(!this._canvas)return;if(this.hasAttribute("noscale")){this._canvas.style.transform="none";return}const i=window.innerWidth,e=window.innerHeight,t=Math.min(i/this.designWidth,e/this.designHeight);this._canvas.style.transform=`scale(${t})`}_onResize(){this._fit()}_onMouseMove(){this._flashOverlay()}_onTapBack(i){i.preventDefault(),this._go(this._index-1,"tap")}_onTapForward(i){i.preventDefault(),this._go(this._index+1,"tap")}_onKey(i){const e=i.target;if(e&&(e.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(e.tagName))||i.metaKey||i.ctrlKey||i.altKey)return;const t=i.key;let r=!0;if(t==="ArrowRight"||t==="PageDown"||t===" "||t==="Spacebar")this._go(this._index+1,"keyboard");else if(t==="ArrowLeft"||t==="PageUp")this._go(this._index-1,"keyboard");else if(t==="Home")this._go(0,"keyboard");else if(t==="End")this._go(this._slides.length-1,"keyboard");else if(t==="r"||t==="R")this._go(0,"keyboard");else if(/^[0-9]$/.test(t)){const s=t==="0"?9:parseInt(t,10)-1;s<this._slides.length&&this._go(s,"keyboard")}else r=!1;r&&(i.preventDefault(),this._flashOverlay())}_go(i,e="api"){if(!this._slides.length)return;const t=Math.max(0,Math.min(this._slides.length-1,i));if(t===this._index){this._flashOverlay();return}this._index=t,this._applyIndex({showOverlay:!0,broadcast:!0,reason:e})}get index(){return this._index}get length(){return this._slides.length}goTo(i){this._go(i,"api")}next(){this._go(this._index+1,"api")}prev(){this._go(this._index-1,"api")}reset(){this._go(0,"api")}}customElements.get("deck-stage")||customElements.define("deck-stage",h)})();
