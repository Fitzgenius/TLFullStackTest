<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/bookings')]
class BookingController extends AbstractController
{
    private array $bookings = [
        1 =>
        [
            "id" => 1,
            "date" => 1752679974,
            "client_name" => "Sarah Scott",
            "people" => 2,
            "trip_date" => 1773675174,
            "total_paid" => 6730,
            "total_price" => 10000,
            "payment_status" => "partial",
            "booking_status" => null,
            "market" => "usa",
            "currency" => "USD"
        ],
        2 => 
        [
            "id" => 2,
            "date" => 1752679974,
            "client_name" => "Tina Fey",
            "people" => 2,
            "trip_date" => 1773675174,
            "total_paid" => 6730,
            "total_price" => 10000,
            "payment_status" => "partial",
            "booking_status" => "confirmed",
            "market" => "dutch",
            "currency" => "EUR"
        ],
        3 =>
        [
            "id" => 3,
            "date" => 1752679974,
            "client_name" => "Jackson Lamb",
            "people" => 2,
            "trip_date" => 1773675174,
            "total_paid" => 6730,
            "total_price" => 10000,
            "payment_status" => "partial",
            "booking_status" => "cancelled",
            "market" => "uk",
            "currency" => "GBP"
        ],
    ];

    #[Route('/', name: 'bookings')]
    public function index(Request $request): Response
    {
        $selectedFilter = $request->query->get('market');

        return $this->render('booking/index.html.twig', [
            'available_filters' => [
                "usa" => "USA Market",
                "uk" => "UK Market",
                "dutch" => "Dutch Market"
            ],
            'table_headers' => [
                "id" => "Number",
                "date" => "Booking date",
                "client_name" => "Client name",
                "people"=> "People",
                "trip_date" => "Trip date",
                "total_paid" => "Paid",
                "total_price" => "Total price",
                "payment_status" => "Payment status",
                "booking_status" => "Booking status",
            ],
            'selected_filter' => $selectedFilter,
            'bookings' => array_values($this->bookings)
        ]);
    }

    #[Route('', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $filter = $request->query->get('market');

        $filteredBookings = array_filter($this->bookings, function ($booking) use ($filter) {
            if (!$filter) {
                return true; 
            }

            return $booking['market'] === $filter;
        });

        return $this->json(array_values($filteredBookings));
    }

    #[Route('/{id}/status', methods: ['POST'])]
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $newStatus = $data['status'] ?? null;

        if (!isset($this->bookings[$id])) {
            return $this->json(['error' => 'Booking not found'], 404);
        }

        if (!in_array($newStatus, ['confirmed', 'cancelled', 'pending'], true)) {
            return $this->json(['error' => 'Invalid status'], 400);
        }

        // In-memory update (not persistent)
        $this->bookings[$id]['booking_status'] = $newStatus;

        return $this->json([
            'message' => 'Status updated',
            'booking' => $this->bookings[$id]
        ]);
    }

    // Move the code from list() to something like this
    // enable multiple query var filters
    public function filterBookings(array $bookings) {
        // return some formatted version of $this->bookings
    }

}
