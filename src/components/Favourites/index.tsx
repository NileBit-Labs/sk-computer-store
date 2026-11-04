"use client";
import Link from "next/link";
import { Heart, Trash2, Eye, MessageCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { removeAllItemsFromFavourites, removeItemFromFavourites } from "@/redux/features/favourites-slice";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { useModalContext } from "@/app/context/QuickViewModalContext";

export default function Favourites() {
  const dispatch = useDispatch();
  const items = useAppSelector((state) => state.FavouritesReducer.items);
  const { openModal } = useModalContext();
  return <main className="sk-favourites-page sk-wrap"><div className="sk-results-top"><div><span className="sk-eyebrow">SAVED FOR LATER</span><h1>Your favourites</h1><p>{items.length} {items.length === 1 ? "product" : "products"}</p></div>{items.length > 0 && <button className="sk-clear-favourites" onClick={() => dispatch(removeAllItemsFromFavourites())}>Clear favourites</button>}</div>{items.length === 0 ? <div className="sk-favourites-empty"><Heart size={32}/><h2>Your favourites list is empty</h2><p>Save products you like and find them here later.</p><Link href="/shop-with-sidebar">Browse products →</Link></div> : <div className="sk-favourites-list">{items.map(item => { const message = encodeURIComponent(`Hello, I'm interested in ${item.title} (UGX ${Number(item.price).toLocaleString("en-UG")}).`); return <article className="sk-favourite-row" key={item.id}><Link href={`/product-details/${item.id}`} className="sk-favourite-image">{item.imageUrl && <img src={item.imageUrl} alt={item.title}/>}</Link><div className="sk-favourite-info"><Link href={`/product-details/${item.id}`}><h2>{item.title}</h2></Link><strong>{new Intl.NumberFormat("en-UG", {style:"currency", currency:"UGX", minimumFractionDigits:0}).format(item.price)}</strong><div className="sk-favourite-actions"><button onClick={() => { dispatch(updateQuickView(item)); openModal(); }}><Eye size={15}/> Quick view</button><a href={`https://wa.me/256774077357?text=${message}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={15}/> WhatsApp</a></div></div><button className="sk-favourite-remove" onClick={() => dispatch(removeItemFromFavourites(item.id))} aria-label={`Remove ${item.title} from favourites`}><Trash2 size={18}/></button></article>; })}</div>}</main>;
}
export { Favourites };
