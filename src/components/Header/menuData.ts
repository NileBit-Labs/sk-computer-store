import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Shop",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 11,
        title: "Shop With Sidebar",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 12,
        title: "Shop Without Sidebar",
        newTab: false,
        path: "/shop-without-sidebar",
      },
    ],
  },
];
