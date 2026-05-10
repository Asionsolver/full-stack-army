# LOTTERY API

> This is a simple API for a lottery system. It allows users to create a lottery, buy tickets, and draw winners.

## API Endpoints

- Sell Lottery Tickets: `POST /lottery/sell`
- Update Lottery Information: `PUT /lottery/update`
- Delete Lottery: `DELETE /lottery/delete`
- Get All Tickets: `GET /lottery/tickets`
- Get Lottery by ID: `GET /lottery/{id}`
- Bulk Sell Lottery Tickets: `POST /lottery/sell/bulk`

<!-- Example Endpoints -->

- Bulk Update Lottery Information: `PUT /lottery/update/bulk`
- Bulk Delete Lottery: `DELETE /lottery/delete/bulk`
- Get Lottery Statistics: `GET /lottery/statistics`
- Get Lottery History: `GET /lottery/history`
- Get Lottery Information: `GET /lottery/info`
- Get Lottery Participants: `GET /lottery/participants`
- Get Lottery Winners: `GET /lottery/winners`
- Draw Lottery Winners: `POST /lottery/draw`

<!-- Ticket Model -->

## Ticket Model

```json
{
  "id": "string" (Unique identifier for the ticket),
  "username": "string" (Username of the ticket holder),
  "price": "number" (Price of the ticket),
  "timestamp": "string" (ISO 8601 format)
}
```
