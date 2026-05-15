const myDB = require("../db/db");

describe("MyDB Lottery Database", () => {
  // Clearing (resetting) the database before running each test
  // so that one test's data does not affect another test.
  beforeEach(() => {
    myDB.lotteries = [];
  });

  describe("create()", () => {
    it("should create a new lottery and add it to the database", () => {
      const lottery = myDB.create("Asion", 100);

      expect(lottery).toHaveProperty("id");
      expect(lottery.username).toBe("Asion");
      expect(lottery.price).toBe(100);
      expect(myDB.lotteries.length).toBe(1);
    });
  });

  describe("bulkCreate()", () => {
    it("should create multiple lotteries for a single user", () => {
      const lotteries = myDB.bulkCreate("Asion", 100, 3);

      expect(lotteries.length).toBe(3);
      expect(myDB.lotteries.length).toBe(3);
      expect(lotteries[0].username).toBe("Asion");
    });
  });

  describe("find() & findById() & findByUsername()", () => {
    beforeEach(() => {
      myDB.create("Asion", 100);
      myDB.create("Selim", 200);
      myDB.create("Selim", 200);
    });

    it("should return all lotteries", () => {
      const allLotteries = myDB.find();
      expect(allLotteries.length).toBe(3);
    });

    it("should find a lottery by its ID", () => {
      const targetLottery = myDB.lotteries[1];
      const foundLottery = myDB.findById(targetLottery.id);

      expect(foundLottery).toBeDefined();
      expect(foundLottery.username).toBe("Selim");
      expect(foundLottery.id).toBe(targetLottery.id);
    });

    it("should return lotteries by username", () => {
      const asionLotteries = myDB.findByUsername("Asion");
      const selimLotteries = myDB.findByUsername("Selim");

      expect(asionLotteries.length).toBe(1);
      expect(selimLotteries.length).toBe(2);
    });
  });

  describe("updateById() & bulkUpdateByUsername()", () => {
    beforeEach(() => {
      myDB.create("Asion", 100);
      myDB.create("Selim", 200);
      myDB.create("Selim", 200);
    });

    it("should update lottery details by ID", () => {
      const targetLottery = myDB.lotteries[0];
      const updatedLottery = myDB.updateById(targetLottery.id, { price: 150 });

      expect(updatedLottery.price).toBe(150);
      expect(updatedLottery.username).toBe("Asion"); // unchanged
      // updatedAt can be checked to see if it has changed
    });

    it("should return null if updating a non-existent ID", () => {
      const updatedLottery = myDB.updateById("invalid-id", { price: 150 });
      expect(updatedLottery).toBeNull();
    });

    it("should update multiple lotteries for a username", () => {
      const updatedLotteries = myDB.bulkUpdateByUsername("Selim", {
        price: 250,
      });

      expect(updatedLotteries.length).toBe(2);
      expect(updatedLotteries[0].price).toBe(250);
      expect(updatedLotteries[1].price).toBe(250);
    });
  });

  describe("deleteById() & bulkDeleteByUsername()", () => {
    beforeEach(() => {
      myDB.create("Asion", 100);
      myDB.create("Selim", 200);
      myDB.create("Selim", 200);
    });

    it("should delete a lottery by ID", () => {
      const targetLotteryId = myDB.lotteries[0].id;
      const deletedLottery = myDB.deleteById(targetLotteryId);

      expect(deletedLottery.id).toBe(targetLotteryId);
      expect(myDB.lotteries.length).toBe(2); // 3 - 1 = 2
    });

    it("should return null if deleting a non-existent ID", () => {
      const deletedLottery = myDB.deleteById("invalid-id");
      expect(deletedLottery).toBeNull();
      expect(myDB.lotteries.length).toBe(3); // no change
    });

    it("should delete all lotteries of a specific user", () => {
      const deletedLotteries = myDB.bulkDeleteByUsername("Selim");

      expect(deletedLotteries.length).toBe(2);
      expect(myDB.lotteries.length).toBe(1); // Only "Asion" remains
    });
  });

  describe("draw()", () => {
    it("should return null if there are no tickets", () => {
      const winners = myDB.draw(2);
      expect(winners).toBeNull();
    });

    it("should draw the specified number of unique winners", () => {
      myDB.bulkCreate("User1", 100, 5);

      const winners = myDB.draw(3);
      expect(winners.length).toBe(3);

      // Check if all winners are unique
      const uniqueWinners = new Set(winners.map((w) => w.id));
      expect(uniqueWinners.size).toBe(3);
    });
  });

  describe("drawWinnerNames()", () => {
    it("should return null if there are no tickets", () => {
      // Act: Called when the database was empty
      const winnerNames = myDB.drawWinnerNames(2);

      // Assert: The result is expected to be null.
      expect(winnerNames).toBeNull();
    });

    it("should return an array of winner usernames", () => {
      // Arrange: I made 3 tickets for 3 people.
      myDB.create("Asion", 100);
      myDB.create("Selim", 100);
      myDB.create("Pretom", 100);

      // Act: I drew names of 2 winners.
      const winnerNames = myDB.drawWinnerNames(2);

      // Assert:
      expect(winnerNames.length).toBe(2); // Are 2 winner names returned?
      expect(Array.isArray(winnerNames)).toBe(true); // Is the result an array?

      // Checks whether the data inside the array is actually a string (name), not an object
      expect(typeof winnerNames[0]).toBe("string");
      expect(typeof winnerNames[1]).toBe("string");

      // We know that the winner's name will be one of these three
      const validNames = ["Asion", "Selim", "Pretom"];
      expect(validNames).toContain(winnerNames[0]); // Is the first winner's name in the list?
      expect(validNames).toContain(winnerNames[1]); // Is the second winner's name in the list?
    });

    it("should return the exact same username if only one user has all tickets", () => {
      // Arrange: I made 3 tickets just for Asion
      myDB.bulkCreate("Asion", 100, 3);

      // Act: I drew names of 2 winners
      const winnerNames = myDB.drawWinnerNames(2);

      // Assert: Since all tickets are for Asion, the winner array should contain just ["Asion", "Asion"]
      expect(winnerNames).toEqual(["Asion", "Asion"]);
    });
  });
});
