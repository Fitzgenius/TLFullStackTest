/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// Images (WHY?)
import avatar from "./images/less-serious-avatar.jpg";

// any CSS you import will output into a single css file (app.css in this case)
import "./styles/sass/main.scss";

import './js/components/booking-list';

// Your custom JS here
document.addEventListener("DOMContentLoaded", () => {

    // Mobile menu toggle
    const sidebarMenu = document.querySelector("#sidebar");
    const mobileMenuButton = document.querySelector(".mobile-utils button");
    mobileMenuButton.addEventListener("click", (e) => {
        sidebarMenu.classList.toggle("collapsed");
    });

});
