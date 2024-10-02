import React from "react";

/* Library of menus and thier items for the website
*
* - Main menu items
* - Footer menu items
* - Footer end items
*
*/

// Main menu items
const menuItems = [
    { label: "MINT", href: "/" },
    { label: "COLLECTION", href: "/archive" },
    // { label: "EXCHANGE", href: "/exchange" },
    { label: "ENROL", href: "/enrol" },
    // { label: "ABOUT US", href: "/about" },
    // Add more items as needed
];

export const MenuItems = menuItems;

// Footer menu items
const footerItems = [
    { label: "WHITEPAPERS", href: "/whitepapers" },
    { label: "ROADMAP", href: "/roadmap" },
    { label: "HELP & SUPPORT", href: "/support" },
    { label: "BLOG", href: "/blog" },
    // Add more items as needed
];

export const FooterItems = footerItems;

// Footer end items
const footerendItems = [
    { label: "TERMS & CONDITIONS", href: "/whitepapers" },
    { label: "PRIVACY", href: "/roadmap" },
    { label: "MANAGE COOKIES", href: "/support" },
    // Add more items as needed
];

export const FooterendItems = footerendItems;