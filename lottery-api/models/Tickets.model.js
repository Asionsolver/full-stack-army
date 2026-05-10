const shortid = require("shortid");

class Ticket {
  /**
   * Constructor to create a new ticket
   * @param {string} user
   * @param {number} price
   */
  constructor(user, price) {
    this.id = shortid.generate();
    this.user = user;
    this.price = price;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = Ticket;
