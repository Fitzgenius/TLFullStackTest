class BookingList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.data = [];
        this.availableFilters = ["all", "usa", "dutch", "uk"];
        this.selectedFilter = null;
        this.loading = true;
    }

    attributeChangedCallback() {
        this.render();
    }

    // move to utils
    capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    async loadData(status = null) {
        const searchParams = new URLSearchParams(window.location.search);
        this.loading = true;
        this.render();
        try {
            if (searchParams.has("market")) {
                status = searchParams.get("market");
            }
            const response = await fetch(
                `/bookings/list${status ? `?market=${status}` : ``}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                    },
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            this.data = data;
            this.loading = false;
            this.render();
        } catch (error) {
            console.error("Failed to load data:", error);
        }
    }

    async updateStatus(id, status) {
        this.loading = true;
        this.render();
        try {
            const response = await fetch(`/bookings/${id}/status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: JSON.stringify({ status: status }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
        this.loading = false;
        this.render();
    }

    render() {
        // Shadow DOM only includes the slot
        this.shadowRoot.innerHTML = `
            <slot></slot>
        `;

        const container = this.querySelector("#booking-row");

        // Clear previous content
        container.innerHTML = "";

        if (this.loading) {
            const loadingEl = document.createElement("div");
            loadingEl.textContent = "Loading...";
            container.appendChild(loadingEl);
            return;
        }

        this.data.forEach((item) => {
            const row = document.createElement("div");
            row.className = "booking-row";
            row.innerHTML = `
                <div class="booking-cell">
                    <span class="label" aria-label="Number">Number</span>
                    ${item.id}
                </div>
                <div class="booking-cell">
                    <span class="label" aria-label="Booking date">Booking date</span>
                    ${new Date(item.date * 1000).toLocaleDateString("en-GB")}
                </div>
                <div class="booking-cell">
                    <span class="label" aria-label="Client name">Client name</span>
                    ${item.client_name}
                </div>
                <div class="booking-cell">
                    <span class="label" aria-label="People">People</span>
                    x ${item.people}
                </div>
                <div class="booking-cell">
                    <span class="label" aria-label="Trip date">Trip date</span>
                    ${new Date(item.trip_date * 1000).toLocaleDateString("en-GB")}
                </div>
                <div class="booking-cell">
                    <span class="label" aria-label="Paid">Paid</span>
                    ${item.currency} ${item.total_paid}
                </div>
                <div class="booking-cell">
                    <span class="label" aria-label="Total price">Total price</span>
                    ${item.currency} ${item.total_price}
                </div>
                <div class="booking-cell">
                    <span class="label" aria-label="Payment status">Payment status</span>
                    ${this.capitalizeFirstLetter(item.payment_status)}
                </div>
                <div class="booking-cell">
                        <button data-booking-id="${item.id}" class="status-update-btn status state-${ item.booking_status ? item.booking_status  : `pending`}">
                            ${item.booking_status ? this.capitalizeFirstLetter(item.booking_status) : `Click to add status`}
                        </button>
                        <div class="booking-ui-dropdown" data-booking-id="${item.id}" >
                            <ul>
                                <li><button data-status="pending">Pending</button></li>
                                <li><button data-status="confirmed">Confirmed booking</button></li>
                                <li><button data-status="cancelled">Cancelled</button></li>
                            </ul>
                        </div>
                </div>
            `;
            container.appendChild(row);

            // Attach click handlers
            const statusBtn = row.querySelector(".status-update-btn");
            const dropdown = row.querySelector(".booking-ui-dropdown");

            statusBtn?.addEventListener("click", () => {
                dropdown.classList.toggle("visible");
            });

            // This will update the status and show in the API response it has been updated
            // It will not update the button as it re-renders with this.loadData
            dropdown?.querySelectorAll("button").forEach((btn) => {
                btn.addEventListener("click", async (e) => {
                    const newStatus = btn.dataset.status;
                    await this.updateStatus(item.id, newStatus);
                    await this.loadData();
                    this.render();
                });
            });
        });
    }

    connectedCallback() {
        // Run after light DOM is parsed
        requestAnimationFrame(() => {
            this.loadData(); 
            this.render();
        });
    }
}

customElements.define("booking-list", BookingList);

export default BookingList;
