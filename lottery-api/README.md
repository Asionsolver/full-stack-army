# LOTTERY API

> This is a simple API for a lottery system. It allows users to create a lottery, buy Lotteries, and draw winners.

## API Endpoints

- Sell Lotteries -----------------------------------------> `POST/lotteries/sell` --------------------------------> DONE --------> TEST DONE
- Bulk Sell Lotteries ------------------------------------> `POST/lotteries/sell/bulk` ---------------------------> DONE --------> TEST DONE
- Get All Lotteries --------------------------------------> `GET/lotteries` --------------------------------------> DONE --------> TEST DONE
- Get Lottery by ID --------------------------------------> `GET/lotteries/t/:lotteriesId` -----------------------> DONE --------> TEST DONE
- Delete Lottery by ID -----------------------------------> `DELETE/lotteries/t/:lotteriesId` --------------------> DONE --------> TEST DONE
- Update Lottery Information ID --------------------------> `PATCH/lotteries/t/:lotteriesId` ---------------------> DONE --------> TEST DONE
- Bulk Update Lottery Information by IDs -----------------> `PATCH/lotteries/t/update/bulk/:lotteriesIds` --------> DONE --------> TEST DONE
- Bulk Delete Lottery by IDs -----------------------------> `DELETE/lotteries/delete/bulk/t/:lotteriesIds` -------> DONE --------> TEST DONE
- Get Lottery Username -----------------------------------> `GET/lotteries/u/:username` --------------------------> DONE --------> TEST DONE
- Delete Lottery by Username -----------------------------> `DELETE/lotteries/u/:username` -----------------------> DONE --------> TEST DONE
- Bulk Update Lottery Information by Username ------------> `PATCH/lotteries/u/update/bulk` ----------------------> DONE --------> TEST DONE
- Bulk Delete Lottery by Username ------------------------> `DELETE/lotteries/delete/bulk/u` ---------------------> DONE --------> TEST DONE
- Get Lottery Count --------------------------------------> `GET/lotteries/count` --------------------------------> DONE --------> TEST DONE
- Draw Lottery Winners -----------------------------------> `POST/lotteries/draw` --------------------------------> DONE --------> TEST DONE
- Get Lottery Total Sales --------------------------------> `GET/lotteries/total-sales` --------------------------> DONE --------> TEST DONE
- Get Lottery Winners Names ------------------------------> `GET/lotteries/winners/names` ------------------------> DONE --------> TEST DONE

<!-- Extra Endpoints -->

- Get Lottery Statistics ---------------------------------> `GET/lotteries/statistics`
- Get Lottery History ------------------------------------> `GET/lotteries/history`

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
