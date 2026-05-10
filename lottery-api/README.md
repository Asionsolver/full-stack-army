# LOTTERY API

> This is a simple API for a lottery system. It allows users to create a lottery, buy Lotteries, and draw winners.

## API Endpoints

- Sell Lottery Lotteries -----------------------------------> `POST/lottery/sell`
- Bulk Sell Lottery Lotteries ------------------------------> `POST/lottery/bulk`
- Get All Lotteries ----------------------------------------> `GET/lottery/lotteries`
- Get Lottery by ID --------------------------------------> `GET/lottery/t/:LotteryId`
- Delete Lottery by ID -----------------------------------> `DELETE/lottery/t/:LotteryId`
- Update Lottery Information ID --------------------------> `PATCH/lottery/t/:LotteryId`
- Bulk Update Lottery Information by IDs -----------------> `PATCH/lottery/t/update/bulk/:LotteryIds`
- Bulk Delete Lottery by IDs -----------------------------> `DELETE/lottery/delete/bulk/t/:LotteryIds`
- Get Lottery Username -----------------------------------> `GET/lottery/u/:username`
- Delete Lottery by Username -----------------------------> `DELETE/lottery/u/:username`
- Bulk Update Lottery Information by Username ------------> `PATCH/lottery/u/update/bulk/:username`
- Bulk Delete Lottery by Username ------------------------> `DELETE/lottery/delete/bulk/u/:username`
- Get Lottery Count --------------------------------------> `GET/lottery/count`
- Draw Lottery Winners -----------------------------------> `POST/lottery/draw`
- Get Lottery Total Sales --------------------------------> `GET/lottery/total-sales`
- Get Lottery Winners Names ------------------------------> `GET/lottery/winners/names`

<!-- Extra Endpoints -->

- Get Lottery Statistics ---------------------------------> `GET/lottery/statistics`
- Get Lottery History ------------------------------------> `GET/lottery/history`
- Get Lottery Information --------------------------------> `GET/lottery/info`

<!-- Lottery Model -->

## Lottery Model

```json
{
  "id": "string" (Unique identifier for the Lottery),
  "username": "string" (Username of the Lottery holder),
  "price": "number" (Price of the Lottery),
  "timestamp": "string" (ISO 8601 format)
}
```
