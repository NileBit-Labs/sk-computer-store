"use client";
import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, X, ArrowUpRight } from "lucide-react";
import LiveSearch from "./LiveSearch";
import { useAppSelector } from "@/redux/store";

export default function Header() {
  const [open, setOpen] = useState(false);
  const favourites = useAppSelector((state) => state.FavouritesReducer.items);
  return <header className="sk-header">
    <div className="sk-utility"><div className="sk-wrap"><span>SK COMPUTER STORE · KAMPALA</span><a href="tel:+256774077357">Need help? +256 774 077 357 <ArrowUpRight size={13}/></a></div></div>
    <div className="sk-header-main sk-wrap">
      <Link href="/" className="sk-brand" aria-label="SK Computer Store home"><img src="/images/logo/SK_logo_green.jpg" alt="SK Computer Store"/></Link>
      <nav className="sk-desktop-nav" aria-label="Main navigation"><Link href="/">Home</Link><Link href="/shop-with-sidebar">Shop</Link><Link href="/aboutus">About us</Link></nav>
      <LiveSearch />
      <Link className="sk-favourites" href="/favourites" aria-label={`Favourites, ${favourites.length} items`}><Heart size={21}/><span>{favourites.length}</span></Link>
      <button className="sk-menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
    <div className="sk-mobile-search-bar"><LiveSearch mobile onNavigate={() => setOpen(false)} /></div>
    {open && <div className="sk-mobile-nav"><Link onClick={() => setOpen(false)} href="/">Home</Link><Link onClick={() => setOpen(false)} href="/shop-with-sidebar">Shop all products</Link><Link onClick={() => setOpen(false)} href="/aboutus">About us</Link><a href="tel:+256774077357">Call the store</a></div>}
  </header>;
}
