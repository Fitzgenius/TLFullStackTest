/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// Images (WHY?)
import avatar from './images/less-serious-avatar.jpg';

// any CSS you import will output into a single css file (app.css in this case)
import './styles/sass/main.scss';

// Your custom JS here
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".status-update-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const dropdown = btn.nextElementSibling;

            if (dropdown && dropdown.classList.contains("booking-ui-dropdown")) {
                dropdown.classList.toggle("visible"); // Toggle the visibility class
            }
        });
    });

 document.querySelectorAll(".booking-ui-dropdown button").forEach(button => {
        button.addEventListener("click", async (e) => {
            const status = button.dataset.status;
            const dropdown = button.closest(".booking-ui-dropdown");
            const bookingId = dropdown.dataset.bookingId;

            const statusCell = document.querySelector(
                    `.status-update-btn[data-booking-id="${bookingId}"]`
            );

            if (statusCell) {
                statusCell.textContent = capitalize("Updating..");
            }

            dropdown.classList.remove("visible");

            try {
                const response = await fetch(`/bookings/${bookingId}/status`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({ status: status })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();

                if (statusCell) {
                    statusCell.textContent = capitalize(status);
                }

                statusCell.classList.forEach(cls => {
                    if (cls.startsWith("state-")) {
                        statusCell.classList.remove(cls);
                    }
                });

                statusCell.classList.add(`state-${status}`);
                

            } catch (error) {
                console.error("Failed to update status:", error);
            }
        });
    });

    // Helper to capitalize the status
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

});