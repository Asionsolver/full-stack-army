const myDB = require("../db/db");

describe("MyDB Ticket Database", () => {
  // Clearing (resetting) the database before running each test
  // so that one test's data does not affect another test.
  beforeEach(() => {
    myDB.tickets = [];
  });

  describe("create()", () => {
    it("should create a new ticket and add it to the database", () => {
      const ticket = myDB.create("Asion", 100);

      expect(ticket).toHaveProperty("id");
      expect(ticket.username).toBe("Asion");
      expect(ticket.price).toBe(100);
      expect(myDB.tickets.length).toBe(1);
    });
  });

  describe("bulkCreate()", () => {
    it("should create multiple tickets for a single user", () => {
      const tickets = myDB.bulkCreate("Asion", 100, 3);

      expect(tickets.length).toBe(3);
      expect(myDB.tickets.length).toBe(3);
      expect(tickets[0].username).toBe("Asion");
    });
  });

  describe("find() & findById() & findByUsername()", () => {
    beforeEach(() => {
      myDB.create("Asion", 100);
      myDB.create("Selim", 200);
      myDB.create("Selim", 200);
    });

    it("should return all tickets", () => {
      const allTickets = myDB.find();
      expect(allTickets.length).toBe(3);
    });

    it("should find a ticket by its ID", () => {
      const targetTicket = myDB.tickets[1];
      const foundTicket = myDB.findById(targetTicket.id);

      expect(foundTicket).toBeDefined();
      expect(foundTicket.username).toBe("Selim");
      expect(foundTicket.id).toBe(targetTicket.id);
    });

    it("should return tickets by username", () => {
      const asionTickets = myDB.findByUsername("Asion");
      const selimTickets = myDB.findByUsername("Selim");

      expect(asionTickets.length).toBe(1);
      expect(selimTickets.length).toBe(2);
    });
  });

  describe("updateById() & bulkUpdateByUsername()", () => {
    beforeEach(() => {
      myDB.create("Asion", 100);
      myDB.create("Selim", 200);
      myDB.create("Selim", 200);
    });

    it("should update ticket details by ID", () => {
      const targetTicket = myDB.tickets[0];
      const updatedTicket = myDB.updateById(targetTicket.id, { price: 150 });

      expect(updatedTicket.price).toBe(150);
      expect(updatedTicket.username).toBe("Asion"); // unchanged
      // updatedAt can be checked to see if it has changed
    });

    it("should return null if updating a non-existent ID", () => {
      const updatedTicket = myDB.updateById("invalid-id", { price: 150 });
      expect(updatedTicket).toBeNull();
    });

    it("should update multiple tickets for a username", () => {
      const updatedTickets = myDB.bulkUpdateByUsername("Selim", { price: 250 });

      expect(updatedTickets.length).toBe(2);
      expect(updatedTickets[0].price).toBe(250);
      expect(updatedTickets[1].price).toBe(250);
    });
  });

  describe("deleteById() & bulkDeleteByUsername()", () => {
    beforeEach(() => {
      myDB.create("Asion", 100);
      myDB.create("Selim", 200);
      myDB.create("Selim", 200);
    });

    it("should delete a ticket by ID", () => {
      const targetTicketId = myDB.tickets[0].id;
      const deletedTicket = myDB.deleteById(targetTicketId);

      expect(deletedTicket.id).toBe(targetTicketId);
      expect(myDB.tickets.length).toBe(2); // 3 - 1 = 2
    });

    it("should return null if deleting a non-existent ID", () => {
      const deletedTicket = myDB.deleteById("invalid-id");
      expect(deletedTicket).toBeNull();
      expect(myDB.tickets.length).toBe(3); // no change
    });

    it("should delete all tickets of a specific user", () => {
      const deletedTickets = myDB.bulkDeleteByUsername("Selim");

      expect(deletedTickets.length).toBe(2);
      expect(myDB.tickets.length).toBe(1); // Only "Asion" remains
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
});
