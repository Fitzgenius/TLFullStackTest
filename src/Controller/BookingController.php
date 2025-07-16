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
        1 => [
            "id" => 1,
            "date" => 1752679974,
            "client_name" => "Sarah Scott",
            "people" => 2,
            "trip_date" => 1773675174,
            "total_paid" => 6730,
            "total_price" => 10000,
            "payment_status" => "partial",
            "booking_status" => null
        ],
        2 => [
            "id" => 1,
            "date" => 1752679974,
            "client_name" => "Tina Fey",
            "people" => 2,
            "trip_date" => 1773675174,
            "total_paid" => 6730,
            "total_price" => 10000,
            "payment_status" => "partial",
            "booking_status" => "confirmed"
        ],
        3 => [
            "id" => 1,
            "date" => 1752679974,
            "client_name" => "Jackson Lamb",
            "people" => 2,
            "trip_date" => 1773675174,
            "total_paid" => 6730,
            "total_price" => 10000,
            "payment_status" => "partial",
            "booking_status" => "cancelled"
        ],
    ];

    #[Route('/', name: 'bookings')]
    public function index(): Response
    {
        return $this->render('booking/index.html.twig', [
            'controller_name' => 'BookingController',
        ]);
    }

    #[Route('', methods: ['GET'])]
    public function list(): JsonResponse
    {
        return $this->json(array_values($this->bookings));
    }

    #[Route('/{id}/status', methods: ['POST'])]
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $newStatus = $data['status'] ?? null;

        if (!isset($this->bookings[$id])) {
            return $this->json(['error' => 'Booking not found'], 404);
        }

        if (!in_array($newStatus, ['confirmed', 'cancelled'], true)) {
            return $this->json(['error' => 'Invalid status'], 400);
        }

        // In-memory update (not persistent)
        $this->bookings[$id]['booking_status'] = $newStatus;

        return $this->json([
            'message' => 'Status updated',
            'booking' => $this->bookings[$id]
        ]);
    }
}
