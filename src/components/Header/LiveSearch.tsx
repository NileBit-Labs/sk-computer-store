"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { fetchGadgetsByCategories } from "@/components/ShopWithSidebar/categoryUtils";
import { fetchOffers } from "@/components/Home/Hero/offerData";

type SearchItem = { id: string; title: string; description?: string; imageUrl?: string; price: number; href: string; isOffer: boolean };
let catalogPromise: Promise<SearchItem[]> | null = null;
function loadCatalog() {
  if (!catalogPromise) {
    catalogPromise = Promise.all([fetchGadgetsByCategories(), fetchOffers()]).then(([products, offers]) => [
      ...products.map((p): SearchItem => ({ id: p._id, title: p.title, description: p.description, imageUrl: p.imageUrl, price: Number(p.price), href: `/product-details/${encodeURIComponent(p._id)}`, isOffer: false })),
      ...offers.map((o): SearchItem => ({ id: o._id, title: o.title, description: o.description, imageUrl: o.imageUrl, price: Math.round(Number(o.price) * (1 - Number(o.discount) / 100)), href: `/#offer-${encodeURIComponent(o._id)}`, isOffer: true })),
    ]).catch(error => { catalogPromise = null; throw error; });
  }
  return catalogPromise;
}

export default function LiveSearch({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const router = useRouter();
  const id = useId().replace(/:/g, "");
  const wrapper = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(-1);
  const trimmed = query.trim();
  const matches = useMemo(() => {
    if (!trimmed) return [];
    const words = trimmed.toLocaleLowerCase().split(/\s+/);
    return items.filter(item => { const text = `${item.title || ""} ${item.description || ""}`.toLocaleLowerCase(); return words.every(word => text.includes(word)); });
  }, [items, trimmed]);
  const expanded = focused && !!trimmed;
  useEffect(() => {
    if (!trimmed) return;
    let activeRequest = true;
    const timer = window.setTimeout(() => {
      setStatus("loading");
      loadCatalog().then(data => { if (activeRequest) { setItems(data); setStatus("ready"); } }).catch(() => { if (activeRequest) setStatus("error"); });
    }, 150);
    return () => { activeRequest = false; window.clearTimeout(timer); };
  }, [trimmed]);
  useEffect(() => {
    function outside(event: PointerEvent) { if (!wrapper.current?.contains(event.target as Node)) setFocused(false); }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  function navigate(href: string) { setFocused(false); setActive(-1); setQuery(""); onNavigate?.(); router.push(href); }
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!trimmed) return;
    if (active >= 0 && matches[active]) navigate(matches[active].href);
    else navigate(`/shop-with-sidebar?query=${encodeURIComponent(trimmed)}`);
  }
  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") { setFocused(false); setActive(-1); }
    if (event.key === "ArrowDown" && matches.length) { event.preventDefault(); setFocused(true); setActive(index => Math.min(index + 1, matches.length - 1)); }
    if (event.key === "ArrowUp" && matches.length) { event.preventDefault(); setActive(index => Math.max(index - 1, 0)); }
  }
  return <div ref={wrapper} className={mobile ? "sk-live-search sk-live-search-mobile" : "sk-live-search"}>
    <form className={mobile ? "sk-live-search-form" : "sk-search sk-live-search-form"} onSubmit={submit} role="search"><Search size={18}/><input role="combobox" aria-label="Search products" aria-autocomplete="list" aria-expanded={expanded} aria-controls={`${id}-results`} aria-activedescendant={active >= 0 && matches[active] ? `${id}-option-${active}` : undefined} placeholder={mobile ? "Search products" : "Search laptops, accessories..."} value={query} onChange={event => { setQuery(event.target.value); setFocused(true); setActive(-1); }} onFocus={() => setFocused(true)} onKeyDown={onKeyDown} autoComplete="off"/><button type="submit">Search</button></form>
    {expanded && <div className="sk-search-dropdown" id={`${id}-results`} role="listbox" aria-label="Product suggestions" aria-busy={status === "loading" || status === "idle"}>
      {(status === "loading" || status === "idle") && <div className="sk-search-message">Searching products…</div>}
      {status === "error" && <div className="sk-search-message">Suggestions are unavailable. Press Search to view results.</div>}
      {status === "ready" && matches.length === 0 && <div className="sk-search-message">No matches for “{trimmed}”.</div>}
      {status === "ready" && matches.map((item, index) => <Link key={`${item.isOffer ? "offer" : "product"}-${item.id}`} href={item.href} id={`${id}-option-${index}`} role="option" aria-selected={active === index} className="sk-search-result" onClick={event => { event.preventDefault(); navigate(item.href); }}><span className="sk-search-result-image">{item.imageUrl && <img src={item.imageUrl} alt=""/>}</span><span className="sk-search-result-info"><strong>{item.title}</strong><small>{item.isOffer ? "Special offer · " : ""}{new Intl.NumberFormat("en-UG", {style: "currency", currency: "UGX", minimumFractionDigits: 0}).format(item.price)}</small></span><span aria-hidden="true">↗</span></Link>)}
      {status === "ready" && matches.length > 0 && <button className="sk-search-all" type="button" onClick={() => navigate(`/shop-with-sidebar?query=${encodeURIComponent(trimmed)}`)}>View product results for “{trimmed}” →</button>}
    </div>}
  </div>;
}
