"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchCategories, fetchGadgetsByCategories } from "./categoryUtils";
import ProductItem from "@/components/Common/ProductItem";
import { Product } from "@/types/product";

type Category = { _id: string; title: string; products: number };
export default function ShopWithSidebar() {
  const params = useSearchParams();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sort, setSort] = useState("latest");
  const categoryKey = params.getAll("category").join(",");
  const selectedCategories = categoryKey ? categoryKey.split(",") : [];
  const category = selectedCategories[0] || "";
  const [layout, setLayout] = useState("grid");
  const toggleCategory = (id: string) => { const next = new URLSearchParams(params.toString()); next.delete("category"); const selected = selectedCategories.includes(id) ? selectedCategories.filter(value => value !== id) : [...selectedCategories, id]; selected.forEach(value => next.append("category", value)); router.push(`/shop-with-sidebar?${next.toString()}`); };
  const query = params.get("query") || "";
  useEffect(() => { let active = true; setLoading(true); setError(false); Promise.all([fetchCategories(), fetchGadgetsByCategories(categoryKey ? categoryKey.split(",") : [])]).then(([cats, items]) => { if(active) { setCategories(cats); setProducts(items); } }).catch(() => { if(active) setError(true); }).finally(() => { if(active) setLoading(false); }); return () => { active = false; }; }, [categoryKey]);
  const visible = useMemo(() => { const list = products.filter(p => `${p.title} ${p.description || ""}`.toLowerCase().includes(query.toLowerCase())); if(sort === "low") list.sort((a,b) => Number(a.price)-Number(b.price)); if(sort === "high") list.sort((a,b) => Number(b.price)-Number(a.price)); return list; }, [products, query, sort]);
  return <main className="sk-shop"><div className="sk-shop-heading"><div className="sk-wrap"><span className="sk-eyebrow">THE SK COLLECTION</span><h1>Find your kind of tech<span>.</span></h1><p>Explore computers and accessories for your everyday.</p></div></div><div className="sk-wrap sk-shop-layout"><aside className="sk-filter"><div className="sk-filter-title">Browse categories</div><Link href={query ? `/shop-with-sidebar?query=${encodeURIComponent(query)}` : "/shop-with-sidebar"} className={!category ? "active" : ""}>All products <span>↗</span></Link>{categories.map(c => <label className="sk-filter-option" key={c._id}><input type="checkbox" checked={selectedCategories.includes(c._id)} onChange={() => toggleCategory(c._id)}/><span>{c.title}</span></label>)}<div className="sk-filter-help"><strong>Need a hand?</strong><p>Our team can help you find the right fit.</p><a href="https://wa.me/256774077357">Chat with us ↗</a></div></aside><div className="sk-shop-results"><div className="sk-results-top"><div><span className="sk-eyebrow">EXPLORE THE STORE</span><h2>{query ? `Results for “${query}”` : (selectedCategories.length > 1 ? "Selected categories" : categories.find(c=>c._id===category)?.title) || "All products"}</h2><p>{loading ? "Loading products…" : `${visible.length} ${visible.length === 1 ? "product" : "products"}`}</p></div><label>Sort by <select value={sort} onChange={e => setSort(e.target.value)}><option value="latest">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div><div className="sk-view-controls"><span>View as</span><button aria-pressed={layout === "grid"} onClick={() => setLayout("grid")}>Grid</button><button aria-pressed={layout === "list"} onClick={() => setLayout("list")}>List</button></div><div className="sk-mobile-categories"><Link href="/shop-with-sidebar" className={!category ? "active" : ""}>All</Link>{categories.map(c=><button key={c._id} aria-pressed={selectedCategories.includes(c._id)} className={selectedCategories.includes(c._id) ? "active" : ""} onClick={() => toggleCategory(c._id)}>{c.title}</button>)}</div>{loading ? <div className="sk-loading">Finding your products…</div> : error ? <div className="sk-loading">We couldn’t load products right now. Please try again shortly.</div> : visible.length ? <div className={`sk-product-grid sk-shop-grid ${layout === "list" ? "sk-shop-list" : ""}`}>{visible.map(item=><ProductItem item={item} key={item._id || item.id}/>)}</div> : <div className="sk-loading">No products found. Try another search or category. <Link href="/shop-with-sidebar">Browse all products →</Link></div>}</div></div></main>;
}
