/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { X, Heart, MessageCircle, ZoomIn } from "lucide-react";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { useAppSelector } from "@/redux/store";
import { addItemToFavourites } from "@/redux/features/favourites-slice";

export default function QuickViewModal() {
  const { isModalOpen, closeModal } = useModalContext();
  const product = useAppSelector(state => state.quickViewReducer.value);
  const dispatch = useDispatch();
  const [zoom, setZoom] = useState(false);
  useEffect(() => { if (!isModalOpen) { setZoom(false); return; } const onKey = (event: KeyboardEvent) => { if(event.key === "Escape") { if(zoom) setZoom(false); else closeModal(); } }; document.addEventListener("keydown", onKey); return () => document.removeEventListener("keydown", onKey); }, [isModalOpen, closeModal, zoom]);
  if (!isModalOpen || !product?.title) return null;
  const id = String(product.id || product._id);
  const price = new Intl.NumberFormat("en-UG", {style:"currency",currency:"UGX",minimumFractionDigits:0}).format(Number(product.price));
  const message = encodeURIComponent(`Hello, I'm interested in ${product.title} (${price}).`);
  return <div className="sk-modal-overlay" onClick={closeModal}><div role="dialog" aria-modal="true" aria-labelledby="sk-quick-title" className="sk-quick-modal" onClick={event => event.stopPropagation()}><button className="sk-modal-close" aria-label="Close quick view" onClick={closeModal}><X/></button><button className={`sk-quick-image ${zoom ? "zoomed" : ""}`} onClick={() => setZoom(!zoom)} aria-label={zoom ? "Reduce image" : "Zoom image"}>{product.imageUrl && <img src={product.imageUrl} alt={product.title}/>}<span><ZoomIn size={16}/> {zoom ? "Reduce" : "Zoom"}</span></button><div className="sk-quick-content"><span className="sk-eyebrow">QUICK VIEW</span><h2 id="sk-quick-title">{product.title}</h2><strong>{price}</strong><p>{product.description || "Contact us for more information about this product."}</p><a href={`https://wa.me/256774077357?text=${message}`} target="_blank" rel="noopener noreferrer" className="sk-detail-order"><MessageCircle size={18}/> Enquire on WhatsApp</a><button className="sk-detail-save" onClick={() => dispatch(addItemToFavourites({id,title:product.title,price:Number(product.price),discountedPrice:Number(product.price),quantity:1,imageUrl:product.imageUrl}))}><Heart size={17}/> Save to favourites</button><Link href={`/product-details/${id}`} onClick={closeModal} className="sk-quick-details">View full product details →</Link></div></div></div>;
}
