"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchCategories, fetchShopItems } from "./categoryUtils";
import ProductItem from "@/components/Common/ProductItem";
import { Product } from "@/types/product";
import OfferItem, { ShopOffer } from "./OfferItem";

type Category = { _id: string; title: string; products: number };
export default function ShopWithSidebar() {
  const params = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<(Product | ShopOffer)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sort, setSort] = useState("latest");
  const categoryKey = params.getAll("category").join(",");
  const selectedCategories = categoryKey ? categoryKey.split(",") : [];
  const category = selectedCategories[0] || "";
  const [layout, setLayout] = useState("grid");
  const toggleCategory = (id: string) => { const next = new URLSearchParams(window.location.search); const current = next.getAll("category"); next.delete("category"); const selected = current.includes(id) ? current.filter(value => value !== id) : [...current, id]; selected.forEach(value => next.append("category", value)); const search = next.toString(); window.history.pushState(null, "", `/shop-with-sidebar${search ? `?${search}` : ""}`); };
  const query = params.get("query") || "";
  useEffect(() => { let active = true; setLoading(true); setError(false); Promise.all([fetchCategories(), fetchShopItems(categoryKey ? categoryKey.split(",") : [])]).then(([cats, items]) => { if(active) { setCategories(cats); setProducts(items); } }).catch(() => { if(active) setError(true); }).finally(() => { if(active) setLoading(false); }); return () => { active = false; }; }, [categoryKey]);
  const visible = useMemo(() => { const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean); const list = products.filter(p => { const text = `${p.title} ${p.description || ""}`.toLowerCase(); return words.every(word => text.includes(word)); }); const actualPrice = (p: Product | ShopOffer) => p._type === "offer" ? Number(p.price) * (1 - Number(p.discount || 0) / 100) : Number(p.price); if(sort === "low") list.sort((a,b) => actualPrice(a)-actualPrice(b)); if(sort === "high") list.sort((a,b) => actualPrice(b)-actualPrice(a)); return list; }, [products, query, sort]);
  return <main className="sk-shop"><div className="sk-shop-heading"><div className="sk-wrap"><span className="sk-eyebrow">THE SK COLLECTION</span><h1>Find your kind of tech<span>.</span></h1><p>Explore computers and accessories for your everyday.</p></div></div><div className="sk-wrap sk-shop-layout"><aside className="sk-filter"><div className="sk-filter-title">Browse categories</div><Link href={query ? `/shop-with-sidebar?query=${encodeURIComponent(query)}` : "/shop-with-sidebar"} className={!category ? "active" : ""}>All products <span>↗</span></Link>{categories.map(c => <label className="sk-filter-option" key={c._id}><input type="checkbox" checked={selectedCategories.includes(c._id)} onChange={() => toggleCategory(c._id)}/><span>{c.title}</span></label>)}<div className="sk-filter-help"><strong>Need a hand?</strong><p>Our team can help you find the right fit.</p><a href="https://wa.me/256774077357">Chat with us ↗</a></div></aside><div className="sk-shop-results"><div className="sk-results-top"><div><span className="sk-eyebrow">EXPLORE THE STORE</span><h2>{query ? `Results for “${query}”` : (selectedCategories.length > 1 ? "Selected categories" : categories.find(c=>c._id===category)?.title) || "All products"}</h2><p>{loading ? "Loading products…" : `${visible.length} ${visible.length === 1 ? "item" : "items"}`}</p></div><label>Sort by <select value={sort} onChange={e => setSort(e.target.value)}><option value="latest">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div><div className="sk-view-controls"><span>View as</span><button aria-pressed={layout === "grid"} onClick={() => setLayout("grid")}>Grid</button><button aria-pressed={layout === "list"} onClick={() => setLayout("list")}>List</button></div><div className="sk-mobile-categories"><Link href="/shop-with-sidebar" className={!category ? "active" : ""}>All</Link>{categories.map(c=><button key={c._id} aria-pressed={selectedCategories.includes(c._id)} className={selectedCategories.includes(c._id) ? "active" : ""} onClick={() => toggleCategory(c._id)}>{c.title}</button>)}</div>{loading ? <div className="sk-loading">Finding your products…</div> : error ? <div className="sk-loading">We couldn’t load products right now. Please try again shortly.</div> : visible.length ? <div className={`sk-product-grid sk-shop-grid ${layout === "list" ? "sk-shop-list" : ""}`}>{visible.map(item => item._type === "offer" ? <OfferItem item={item as ShopOffer} key={item._id}/> : <ProductItem item={item as Product} key={item._id || item.id}/>)}</div> : <div className="sk-loading">No products found. Try another search or category. <Link href="/shop-with-sidebar">Browse all products →</Link></div>}</div></div></main>;
}
