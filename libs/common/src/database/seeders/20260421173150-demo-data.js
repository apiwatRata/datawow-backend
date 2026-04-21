'use strict';
 
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
 
const SALT_ROUNDS = 10;
 
// ── Helpers ──────────────────────────────────────────────────────────────────
 
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomFutureDate() {
  const now = new Date();
  // Random date between 1 month and 18 months from now
  const daysAhead = randomInt(30, 540);
  const date = new Date(now);
  date.setDate(date.getDate() + daysAhead);
  // Set a realistic show time: between 17:00 and 21:00
  date.setHours(randomInt(17, 21), 0, 0, 0);
  return date;
}

 
const ADJECTIVES = ['Swift', 'Brave', 'Calm', 'Dark', 'Epic', 'Fierce', 'Gentle', 'Happy', 'Iron', 'Jolly'];
const NOUNS      = ['Wolf', 'Eagle', 'Tiger', 'Panda', 'Shark', 'Phoenix', 'Dragon', 'Fox', 'Bear', 'Hawk'];
const DOMAINS    = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
const VENUES     = ['Thunder Arena', 'Moonlight Park', 'Crystal Hall', 'Neon Stage', 'Skyline Amphitheater'];
const ARTISTS    = ['The Echoes', 'Nova Pulse', 'Sunset Drive', 'Glass Horizon', 'Deep Velvet',
                    'Iron Circuit', 'Silver Lining', 'Neon Ghost', 'Wild Ember', 'Blue Static'];
 
// ── Users ─────────────────────────────────────────────────────────────────────
 
async function buildUsers() {
  const now = new Date();
 
  // 2 Admins (fixed credentials)
  const admins = [
    { email: 'admin1@datawow.io', password: 'Admin1234!' },
    { email: 'admin2@datawow.io', password: 'Admin5678!' },
  ];
 
  // 1 fixed User
  const fixedUsers = [
    { email: 'user@datawow.io', password: 'User1234!' },
  ];
 
  const adminRows = await Promise.all(
    admins.map(async (a) => ({
      id: uuidv4(),
      email: a.email,
      password_hash: await bcrypt.hash(a.password, SALT_ROUNDS),
      role: 'ADMIN',
      created_at: now,
      updated_at: now,
      deleted_at: null,
    }))
  );
 
  const fixedUserRows = await Promise.all(
    fixedUsers.map(async (u) => ({
      id: uuidv4(),
      email: u.email,
      password_hash: await bcrypt.hash(u.password, SALT_ROUNDS),
      role: 'USER',
      created_at: now,
      updated_at: now,
      deleted_at: null,
    }))
  );
 
  // 99 random Users
  const usedEmails = new Set([...admins.map(a => a.email), ...fixedUsers.map(u => u.email)]);
  const randomUserRows = await Promise.all(
    Array.from({ length: 99 }, async (_, i) => {
      let email;
      do {
        const adj = randomItem(ADJECTIVES);
        const noun = randomItem(NOUNS);
        email = `${adj.toLowerCase()}.${noun.toLowerCase()}${randomInt(1, 9999)}@${randomItem(DOMAINS)}`;
      } while (usedEmails.has(email));
      usedEmails.add(email);
 
      return {
        id: uuidv4(),
        email,
        password_hash: await bcrypt.hash(`Pass${randomInt(1000, 9999)}!`, SALT_ROUNDS),
        role: 'USER',
        created_at: now,
        updated_at: now,
        deleted_at: null,
      };
    })
  );
 
  return [...adminRows, ...fixedUserRows, ...randomUserRows];
}
 
// ── Concerts ──────────────────────────────────────────────────────────────────
 
function buildConcerts() {
  const now = new Date();
 
  return Array.from({ length: 10 }, (_, i) => {
    const artist  = ARTISTS[i];
    const venue   = randomItem(VENUES);
    const totalSeats = randomInt(200, 2000);
    const eventDate  = randomFutureDate();

    return {
      id: uuidv4(),
      name: `${artist} Live at ${venue}`,
      description: `Experience ${artist} performing live at ${venue}. An unforgettable night of music and energy.`,
      total_seats: totalSeats,
      reserved_seats: 0,   // will be updated after reservations are inserted
      event_date: eventDate,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    };
  });
}
 
// ── Reservations ──────────────────────────────────────────────────────────────
 
function buildReservations(users, concerts) {
  const now = new Date();
  const userOnly = users.filter(u => u.role === 'USER');
 
  const reservations = [];
  // Track active reservations per (user_id, concert_id) to respect unique constraint
  const activePairs = new Set();
  // Track reserved count per concert
  const reservedCount = {};
  concerts.forEach(c => { reservedCount[c.id] = 0; });
 
  let attempts = 0;
  while (reservations.length < 500 && attempts < 10000) {
    attempts++;
    const user    = randomItem(userOnly);
    const concert = randomItem(concerts);
    const pairKey = `${user.id}:${concert.id}`;
 
    // Skip if already has an active reservation for this pair
    if (activePairs.has(pairKey)) continue;
    // Skip if concert is full
    if (reservedCount[concert.id] >= concert.total_seats) continue;
 
    const isCancelled = Math.random() < 0.15; // 15% chance cancelled
    const status      = isCancelled ? 'cancelled' : 'active';
    const cancelledAt = isCancelled ? now : null;
 
    if (!isCancelled) {
      activePairs.add(pairKey);
      reservedCount[concert.id]++;
    }
 
    reservations.push({
      id: uuidv4(),
      user_id: user.id,
      concert_id: concert.id,
      status,
      created_at: now,
      updated_at: now,
      cancelled_at: cancelledAt,
    });
  }
 
  // Update reserved_seats on concert objects
  concerts.forEach(c => {
    c.reserved_seats = reservedCount[c.id];
  });
 
  return reservations;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   console.log('🌱 Building seed data...');
 
    const users    = await buildUsers();
    const concerts = buildConcerts();
    const reservations = buildReservations(users, concerts);
 
    console.log(`👤 Users:        ${users.length} (2 admins, 1 fixed user, 99 random)`);
    console.log(`🎵 Concerts:     ${concerts.length}`);
    console.log(`🎟️  Reservations: ${reservations.length}`);
 
    await queryInterface.bulkInsert('users', users);
    await queryInterface.bulkInsert('concerts', concerts);
    await queryInterface.bulkInsert('reservations', reservations);
 
    // Sync reserved_seats counts
    for (const concert of concerts) {
      await queryInterface.bulkUpdate(
        'concerts',
        { reserved_seats: concert.reserved_seats },
        { id: concert.id }
      );
    }
 
    console.log('✅ Seed complete!');
 
    // Print fixed credentials for reference
    console.log('\n📋 Fixed credentials:');
    console.log('  admin1@datawow.io  /  Admin1234!');
    console.log('  admin2@datawow.io  /  Admin5678!');
    console.log('  user@datawow.io    /  User1234!');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('reservations', null, {});
    await queryInterface.bulkDelete('concerts', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
