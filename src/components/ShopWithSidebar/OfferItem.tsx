/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";

export type ShopOffer = {
  _id: string;
  _type: "offer";
  title: string;
  description?: string;
  imageUrl?: string;
  price: number;
  discount?: number;
  categories?: { _id: string; title: string }[];
};
export default function OfferItem({ item }: { item: ShopOffer }) {
  const discount = Number(item.discount || 0);
  const price = Math.round(Number(item.price) * (1 - discount / 100));
  const format = (value: number) => new Intl.NumberFormat("en-UG", { style: "currency", currency: "UGX", minimumFractionDigits: 0 }).format(value);
  const href = `/#offer-${encodeURIComponent(item._id)}`;
  const message = encodeURIComponent(`Hello, I'm interested in the ${item.title} offer at ${format(price)}.`);
  return <article className="sk-product-card sk-shop-offer"><div className="sk-product-image"><Link href={href} aria-label={`View ${item.title} offer`}>{item.imageUrl ? <img src={item.imageUrl} alt={item.title} loading="lazy"/> : <span className="sk-no-image">SK</span>}</Link><span className="sk-offer-card-badge">{discount > 0 ? `${discount}% OFF` : "OFFER"}</span></div><div className="sk-product-info"><span className="sk-product-category">{item.categories?.[0]?.title ? `${item.categories[0].title} · SPECIAL OFFER` : "SPECIAL OFFER"}</span><Link href={href} className="sk-product-title">{item.title}</Link><div className="sk-product-bottom"><span><strong>{format(price)}</strong>{discount > 0 && <del className="sk-offer-original">{format(Number(item.price))}</del>}</span><Link href={href} aria-label={`View ${item.title} offer`}><ArrowUpRight size={19}/></Link></div><div className="sk-product-actions"><Link href={href}>View offer</Link><a href={`https://wa.me/256774077357?text=${message}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={16}/> WhatsApp</a></div></div></article>;
}
