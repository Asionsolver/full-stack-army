const Ticket = require("../models/Tickets.model");

class MyDB {
  constructor() {
    this.tickets = [];
  }

  /**
   * Create and save a new ticket
   * @param {string} username
   * @param {number} price
   * @returns {Ticket} The created ticket
   */
  create(username, price) {
    const ticket = new Ticket(username, price);
    this.tickets.push(ticket);
    return ticket;
  }

  /**
   * Create multiple tickets for a single user
   * @param {string} username
   * @param {number} price
   * @param {number} quantity
   * @returns {Array<Ticket>} Array of created multiple tickets
   */
  bulkCreate(username, price, quantity) {
    const tickets = [];
    for (let i = 0; i < quantity; i++) {
      tickets.push(this.create(username, price));
    }
    return tickets;
  }

  /**
   * Find all tickets
   * @returns {Array<Ticket>} Array of all tickets
   */
  find() {
    return this.tickets;
  }

  /**
   * Find a ticket by ID
   * @param {string} id
   * @returns {Ticket|null} The found ticket or null if not found
   */
  findById(id) {
    return this.tickets.find((ticket) => ticket.id === id);
  }

  /**
   * Find tickets by username
   * @param {string} username
   * @returns {Array<Ticket>} Array of tickets for the specified username
   */
  findByUsername(username) {
    return this.tickets.filter((ticket) => ticket.username === username);
  }

  /**
   * Update a ticket by ID
   * @param {string} id
   * @param {{username?: string, price?: number}} ticketData
   * @returns {Ticket|null} The updated ticket or null if not found
   */
  updateById(id, ticketData) {
    const ticket = this.findById(id);
    if (ticket) {
      if (ticketData.username) {
        ticket.username = ticketData.username;
      }
      if (ticketData.price) {
        ticket.price = ticketData.price;
      }
      ticket.updatedAt = new Date();
      return ticket;
    }
    return null;
  }

  /**
   *
   * @param {string} username
   * @param {{username?: string, price?: number}} ticketData
   * @returns {Array<Ticket>} Array of updated tickets
   */
  bulkUpdateByUsername(username, ticketData) {
    const updatedTickets = [];
    this.tickets.forEach((ticket) => {
      if (ticket.username === username) {
        if (ticketData.username) {
          ticket.username = ticketData.username;
        }
        if (ticketData.price) {
          ticket.price = ticketData.price;
        }
        ticket.updatedAt = new Date();
        updatedTickets.push(ticket);
      }
    });
    return updatedTickets;
  }

  /**
   * Delete a ticket by ID
   * @param {string} id
   * @returns {Ticket|null} The deleted ticket or null if not found
   */
  deleteById(id) {
    const index = this.tickets.findIndex((ticket) => ticket.id === id);
    if (index !== -1) {
      return this.tickets.splice(index, 1)[0];
    }
    return null;
  }

  /**
   *
   * @param {string} username
   * @returns {Array<Ticket>} Array of deleted tickets for the specified username
   */

  bulkDeleteByUsername(username) {
    const deletedTickets = this.tickets.filter(
      (ticket) => ticket.username === username,
    );
    this.tickets = this.tickets.filter(
      (ticket) => ticket.username !== username,
    );
    return deletedTickets;
  }

  /**
   * Draw a random ticket
   * @param {number} winnerCount - Number of winners to draw
   * @returns {Ticket|null} The drawn ticket or null if no tickets available
   */
  draw(winnerCount) {
    if (this.tickets.length === 0) {
      return null;
    }
    const winners = [];
    for (let i = 0; i < winnerCount; i++) {
      const randomIndex = Math.floor(Math.random() * this.tickets.length);
      if (!winners.includes(this.tickets[randomIndex])) {
        winners.push(this.tickets[randomIndex]);
      } else {
        i--; // If the ticket is already a winner, try again
      }
    }
    return winners;
  }
  drawWinnerNames(winnerCount) {
    const winners = this.draw(winnerCount);
    if (winners) {
      return winners.map((ticket) => ticket.username);
    }
    return null;
  }
}
const myDB = new MyDB();

module.exports = myDB;
