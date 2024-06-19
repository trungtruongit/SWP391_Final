import categoriesMegaMenu from "./categoriesMegaMenu";
import { useEffect } from "react"; // MEGAMENU DATA

const navbarNavigations = [
    {
        title: "Home",
        megaMenu: false,
        megaMenuWithSub: false,
        url: "/",
    },
    {
        megaMenu: false,
        megaMenuWithSub: false,
        title: "Barcode",
        url: "/barcode",
    },
    {
        megaMenu: false,
        megaMenuWithSub: false,
        title: "Buy Back",
        url: "/buy-back",
    },

    {
        megaMenu: false,
        megaMenuWithSub: false,
        title: "Support Ticket",
        url: "/support-ticket",
    },
    {
        megaMenu: false,
        megaMenuWithSub: false,
        title: "Warranty",
        url: "/warranty",

    },
    {
        megaMenu: false,
        megaMenuWithSub: false,
        title: "Logout",
        url: "/login",
    },
];
export default navbarNavigations;
