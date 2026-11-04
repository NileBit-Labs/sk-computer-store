/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { Heart, ArrowUpRight, Eye, MessageCircle } from "lucide-react";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { useDispatch } from "react-redux";
import { Product } from "@/types/product";
import { addItemToFavourites } from "@/redux/features/favourites-slice";
import { updateproductDetails } from "@/redux/features/product-details";

export default function ProductItem({item}: {item: Product}) {
  const dispatch = useDispatch();
  const { openModal } = useModalContext();
  const id = item.id || item._id;
  const category = Array.isArray(item.categories) ? item.categories[0] : null;
  const categoryName = typeof category === "string" ? category : category?.title;
  function favourite() { dispatch(addItemToFavourites({id: String(id), title: item.title, price: Number(item.price), discountedPrice: Number(item.price), quantity: 1, imageUrl: item.imageUrl, imgs: item.imgs})); }
  const orderMessage = encodeURIComponent(`Hello, I'm interested in ${item.title} (UGX ${Number(item.price).toLocaleString("en-UG")}).`);
  return <article className="sk-product-card"><div className="sk-product-image"><Link href={`/product-details/${id}`} onClick={() => dispatch(updateproductDetails(item))} aria-label={`View ${item.title}`}>{item.imageUrl ? <img src={item.imageUrl} alt={item.title} loading="lazy"/> : <span className="sk-no-image">SK</span>}</Link><button onClick={favourite} aria-label={`Add ${item.title} to favourites`}><Heart size={18}/></button></div><div className="sk-product-info"><span className="sk-product-category">{categoryName || "SK COMPUTER STORE"}</span><Link href={`/product-details/${id}`} onClick={() => dispatch(updateproductDetails(item))} className="sk-product-title">{item.title}</Link><div className="sk-product-bottom"><strong>{new Intl.NumberFormat("en-UG", {style:"currency",currency:"UGX",minimumFractionDigits:0}).format(Number(item.price))}</strong><Link href={`/product-details/${id}`} onClick={() => dispatch(updateproductDetails(item))} aria-label={`View ${item.title}`}><ArrowUpRight size={19}/></Link></div><div className="sk-product-actions"><button type="button" onClick={() => { dispatch(updateQuickView(item)); openModal(); }}><Eye size={16}/> Quick view</button><a href={`https://wa.me/256774077357?text=${orderMessage}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={16}/> WhatsApp</a></div></div></article>;
}
