/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Heart, MessageCircle, MapPin } from "lucide-react";
import { useDispatch } from "react-redux";
import { client } from "@/sanity/lib/client";
import ProductItem from "@/components/Common/ProductItem";
import { fetchGadgets } from "@/components/Shop/shopData";
import { Product } from "@/types/product";
import { addItemToFavourites } from "@/redux/features/favourites-slice";

type Detail = { _id: string; title: string; description?: string; price: number; imageUrl?: string; images?: string[]; categories?: {title: string}[] };
export default function ProductDetails({productId}: {productId?: string | string[]}) {
  const id = Array.isArray(productId) ? productId[0] : productId;
  const [product, setProduct] = useState<Detail | null>(null);
  const [otherProducts, setOtherProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => { let active = true; setLoading(true); setSelected(0); client.fetch(`*[_type == "gadget" && _id == $id][0]{_id,title,description,price,"imageUrl":image.asset->url,"images":images[].asset->url,categories[]->{title}}`, {id}).then(data => { if(active) setProduct(data || null); }).catch(() => { if(active) setProduct(null); }).finally(() => { if(active) setLoading(false); }); return () => { active = false; }; }, [id]);
  useEffect(() => { let active = true; fetchGadgets(12).then(items => { if (active) setOtherProducts(items.filter(item => item.id !== id).slice(0, 4)); }); return () => { active = false; }; }, [id]);
  if (loading) return <main className="sk-wrap sk-detail-state">Loading product…</main>;
  if (!product) return <main className="sk-wrap sk-detail-state"><h1>Product unavailable</h1><p>We couldn’t find this product. Please browse the shop or contact us.</p><Link href="/shop-with-sidebar">← Back to shop</Link></main>;
  const images = Array.from(new Set([product.imageUrl, ...(product.images || [])].filter(Boolean))) as string[];
  const price = new Intl.NumberFormat("en-UG", {style:"currency", currency:"UGX", minimumFractionDigits:0}).format(Number(product.price));
  const message = encodeURIComponent(`Hello, I'm interested in ${product.title} (${price}).\n${typeof window !== "undefined" ? window.location.href : ""}`);
  return <main className="sk-detail sk-wrap"><Link href="/shop-with-sidebar" className="sk-detail-back"><ArrowLeft size={16}/> Back to shop</Link><div className="sk-detail-layout"><div><div className="sk-detail-image">{images[selected] ? <img src={images[selected]} alt={product.title}/> : <span>SK</span>}</div>{images.length > 1 && <div className="sk-detail-thumbs">{images.map((image,index)=><button key={image} onClick={()=>setSelected(index)} aria-label={`View image ${index+1}`} aria-pressed={selected===index}><img src={image} alt=""/></button>)}</div>}</div><div className="sk-detail-content"><span className="sk-eyebrow">{product.categories?.[0]?.title || "SK COMPUTER STORE"}</span><h1>{product.title}</h1><strong className="sk-detail-price">{price}</strong><div className="sk-detail-description"><h2>About this product</h2><p>{product.description || "Contact our team for more details about this product."}</p></div><a className="sk-detail-order" href={`https://wa.me/256774077357?text=${message}`} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Enquire on WhatsApp <ArrowUpRight size={18}/></a><button className="sk-detail-save" onClick={()=>dispatch(addItemToFavourites({id:product._id,title:product.title,price:Number(product.price),discountedPrice:Number(product.price),quantity:1,imageUrl:product.imageUrl}))}><Heart size={17}/> Save to favourites</button><div className="sk-detail-policies"><div><strong>Delivery country-wide</strong><span>Delivery fee depends on your location.</span></div><div><strong>Warranty</strong><span>1 year warranty</span></div></div><div className="sk-detail-help"><MapPin size={20}/><span><strong>Visit us in Wandegeya</strong><br/>University Plaza, Room B09. Our team is happy to help.</span></div></div></div>{otherProducts.length > 0 && <section className="sk-section"><div className="sk-section-head"><div><span className="sk-eyebrow">KEEP EXPLORING</span><h2>Other products<span>.</span></h2></div><Link href="/shop-with-sidebar" className="sk-link">Shop all products <ArrowUpRight size={17}/></Link></div><div className="sk-product-grid">{otherProducts.map(item => <ProductItem key={item.id} item={item}/>)}</div></section>}</main>;
}
