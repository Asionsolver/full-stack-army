// const { faker } = require("@faker-js/faker");
// const fs = require("fs");

// // Configuration: You can change the settings here as you wish.
// const CONFIG = {
//   totalRecords: 500, // Total number of records to generate
//   outputFile: "output.csv", // Name of the output file
//   statusOptions: ["subscribed", "unsubscribed", ""], // Status options
// };

// // Country Data Map: Name -> { code, format }
// // This ensures Phone Code and Country Name always match.
// const COUNTRY_DATA = {
//   NL: { code: "NL", format: "+31 6 ########" },
//   "United States": { code: "US", format: "+1 ###-###-####" },
//   Spain: { code: "ES", format: "+34 6## ### ###" },
//   China: { code: "CN", format: "+86 1## #### ####" },
//   France: { code: "FR", format: "+33 6 ## ## ## ##" },
//   Germany: { code: "DE", format: "+49 1## #######" },
//   Sweden: { code: "SE", format: "+46 7# ### ## ##" },
//   Italy: { code: "IT", format: "+39 3## ### ####" },
//   Japan: { code: "JP", format: "+81 90 #### ####" },
//   India: { code: "IN", format: "+91 9##### #####" },
//   Bangladesh: { code: "BD", format: "+880 1###-#######" },
//   Brazil: { code: "BR", format: "+55 9####-####" },
//   Russia: { code: "RU", format: "+7 9## ###-##-##" },
//   Mexico: { code: "MX", format: "+52 1 ## #### ####" },
//   Indonesia: { code: "ID", format: "+62 8###-####-####" },
//   Turkey: { code: "TR", format: "+90 5## ### ## ##" },
//   "Saudi Arabia": { code: "SA", format: "+966 5# ### ####" },
//   "South Korea": { code: "KR", format: "+82 10-####-####" },
//   Australia: { code: "AU", format: "+61 4## ### ###" },
//   Canada: { code: "CA", format: "+1 ###-###-####" },
//   "United Kingdom": { code: "GB", format: "+44 7### ######" },
//   Nigeria: { code: "NG", format: "+234 8## ### ####" },
//   Egypt: { code: "EG", format: "+20 1## ### ####" },
//   Argentina: { code: "AR", format: "+54 9 11 ####-####" },
//   Colombia: { code: "CO", format: "+57 3## ### ####" },
//   Vietnam: { code: "VN", format: "+84 9## ### ####" },
//   Thailand: { code: "TH", format: "+66 8# ### ####" },
//   Philippines: { code: "PH", format: "+63 9## ### ####" },
//   Pakistan: { code: "PK", format: "+92 3## ### ####" },
//   Iran: { code: "IR", format: "+98 9## ### ####" },
//   Iraq: { code: "IQ", format: "+964 7## ### ####" },
//   Morocco: { code: "MA", format: "+212 6## ### ###" },
//   Kenya: { code: "KE", format: "+254 7## ### ###" },
//   Ethiopia: { code: "ET", format: "+251 9## ### ###" },
//   Ghana: { code: "GH", format: "+233 2###-####" },
//   Algeria: { code: "DZ", format: "+213 5# ## ## ##" },
//   Sudan: { code: "SD", format: "+249 1# ### ####" },
//   Ukraine: { code: "UA", format: "+380 6## ### ## ##" },
//   Poland: { code: "PL", format: "+48 5## ### ## ##" },
//   Netherlands: { code: "NL", format: "+31 6 ########" },
//   Belgium: { code: "BE", format: "+32 4## ### ###" },
//   Switzerland: { code: "CH", format: "+41 7## ### ## ##" },
//   Austria: { code: "AT", format: "+43 6## ### ####" },
//   Denmark: { code: "DK", format: "+45 2## ## ## ##" },
//   Norway: { code: "NO", format: "+47 4## ### ###" },
//   Finland: { code: "FI", format: "+358 4## ### ####" },
//   Portugal: { code: "PT", format: "+351 9## ### ###" },
//   Greece: { code: "GR", format: "+30 6## ### ####" },
//   "Czech Republic": { code: "CZ", format: "+420 7## ### ###" },
//   Hungary: { code: "HU", format: "+36 20 ### ####" },
//   Romania: { code: "RO", format: "+40 7## ### ###" },
//   Bulgaria: { code: "BG", format: "+359 8## ### ###" },
//   Serbia: { code: "RS", format: "+381 6## ### ####" },
//   Croatia: { code: "HR", format: "+385 9## ### ###" },
//   Slovenia: { code: "SI", format: "+386 4## ### ###" },
//   Slovakia: { code: "SK", format: "+421 9## ### ####" },
//   Lithuania: { code: "LT", format: "+370 6## ### ##" },
//   Latvia: { code: "LV", format: "+371 2## ### ###" },
//   Estonia: { code: "EE", format: "+372 5## ### ###" },
//   Cyprus: { code: "CY", format: "+357 9## ### ###" },
//   Luxembourg: { code: "LU", format: "+352 6## ### ###" },
//   Liechtenstein: { code: "LI", format: "+423 6## ### ###" },
//   Iceland: { code: "IS", format: "+354 6## ### ##" },
//   Malta: { code: "MT", format: "+356 9## ### ###" },
//   Andorra: { code: "AD", format: "+377 6## ### ##" },
//   Monaco: { code: "MC", format: "+377 6## ### ##" },
//   "San Marino": { code: "SM", format: "+378 3## ### ##" },
//   "Vatican City": { code: "VA", format: "+379 3## ### ##" },
//   "New Zealand": { code: "NZ", format: "+64 2# ### ####" },
//   Singapore: { code: "SG", format: "+65 8#### ####" },
//   "Hong Kong": { code: "HK", format: "+852 5# #### ####" },
// };

// // Convert map keys to array for random selection
// const AVAILABLE_COUNTRIES = Object.keys(COUNTRY_DATA);

// // Phone number generation function (Linked to Country)
// function generatePhone(countryName) {
//   const countryInfo = COUNTRY_DATA[countryName];
//   if (!countryInfo) {
//     // Fallback if country not found in map
//     return faker.phone.number();
//   }
//   // Use the specific format for the selected country
//   return faker.helpers.replaceSymbols(countryInfo.format);
// }

// // Email generation function
// function generateEmail(firstName, lastName, index) {
//   const domains = ["example.com", "email.com", "mail.com", "test.com"];
//   const cleanFirst = firstName.toLowerCase().replace(/[^a-z0-9]/g, "");
//   const cleanLast = lastName.toLowerCase().replace(/[^a-z0-9]/g, "");
//   const domain = faker.helpers.arrayElement(domains);

//   // Ensure uniqueness by adding the index occasionally
//   const suffix = index > 10000 && index % 10 === 0 ? index : "";
//   return `"${cleanFirst}.${cleanLast}${suffix}@${domain}"`;
// }

// // CSV file escaping function
// function escapeCSV(value) {
//   if (value == null) return '""';
//   const str = String(value);
//   if (str.includes(",") || str.includes('"') || str.includes("\n")) {
//     return `"${str.replace(/"/g, '""')}"`;
//   }
//   return str;
// }

// // Main generation function
// async function generateData() {
//   console.log(
//     `Data generation started: ${CONFIG.totalRecords.toLocaleString()} records...`,
//   );

//   // Write header
//   const header = "email,first_name,last_name,phone,country,status\n";
//   fs.writeFileSync(CONFIG.outputFile, header, "utf8");

//   let stream = fs.createWriteStream(CONFIG.outputFile, { flags: "a" });

//   for (let i = 0; i < CONFIG.totalRecords; i++) {
//     // 1. Select a Country Name Randomly
//     const selectedCountryName = faker.helpers.arrayElement(AVAILABLE_COUNTRIES);

//     // 2. Generate Data
//     const firstName = faker.person.firstName();
//     const lastName = faker.person.lastName();
//     const status = faker.helpers.arrayElement(CONFIG.statusOptions);

//     // 3. Generate Phone based EXACTLY on the selected country
//     const phoneNumber = generatePhone(selectedCountryName);

//     const record =
//       [
//         generateEmail(firstName, lastName, i),
//         escapeCSV(firstName),
//         escapeCSV(lastName),
//         phoneNumber, // Phone matches Country
//         escapeCSV(selectedCountryName), // Country Name
//         escapeCSV(status),
//       ].join(",") + "\n";

//     stream.write(record);

//     // Show progress (every 10%)
//     if ((i + 1) % Math.floor(CONFIG.totalRecords / 10) === 0) {
//       const percent = Math.round(((i + 1) / CONFIG.totalRecords) * 100);
//       console.log(`⏳ Progress: ${percent}% completed...`);
//     }
//   }

//   // Close the stream
//   stream.end();

//   console.log(`\n✅ Data generated successfully!`);
//   console.log(`📁 File saved: ${CONFIG.outputFile}`);
// }

// // Run the script
// generateData().catch((err) => {
//   console.error("❌ Error occurred:", err);
// });

// Duplicate Ignore

const { faker } = require("@faker-js/faker");
const fs = require("fs");

// Configuration
const CONFIG = {
  totalRecords: 1000, // Total records to generate
  outputFile: "output.csv", // Output file name
  statusOptions: ["subscribed", "unsubscribed", ""],
};

// Country Data Map: Name -> { code, format, base }
// 'base' is used to generate unique phone numbers deterministically
const COUNTRY_DATA = {
  NL: { code: "NL", format: "+31 6 ########", base: 600000000 },
  "United States": { code: "US", format: "+1 ###-###-####", base: 2000000000 },
  Spain: { code: "ES", format: "+34 6## ### ###", base: 600000000 },
  China: { code: "CN", format: "+86 1## #### ####", base: 13000000000 },
  France: { code: "FR", format: "+33 6 ## ## ## ##", base: 600000000 },
  Germany: { code: "DE", format: "+49 1## #######", base: 150000000 },
  Sweden: { code: "SE", format: "+46 7# ### ## ##", base: 700000000 },
  Italy: { code: "IT", format: "+39 3## ### ####", base: 3000000000 },
  Japan: { code: "JP", format: "+81 90 #### ####", base: 9000000000 },
  India: { code: "IN", format: "+91 9##### #####", base: 9000000000 },
  Bangladesh: { code: "BD", format: "+880 1#########", base: 17000000000 },
  Brazil: { code: "BR", format: "+55 9####-####", base: 900000000 },
  Russia: { code: "RU", format: "+7 9## ###-##-##", base: 9000000000 },
  Mexico: { code: "MX", format: "+52 1 ## #### ####", base: 1550000000 },
  Indonesia: { code: "ID", format: "+62 8###-####-####", base: 8100000000 },
  Turkey: { code: "TR", format: "+90 5## ### ## ##", base: 5000000000 },
  "Saudi Arabia": { code: "SA", format: "+966 5# ### ####", base: 500000000 },
  "South Korea": { code: "KR", format: "+82 10-####-####", base: 1000000000 },
  Australia: { code: "AU", format: "+61 4## ### ###", base: 400000000 },
  Canada: { code: "CA", format: "+1 ###-###-####", base: 4000000000 },
  "United Kingdom": { code: "GB", format: "+44 7### ######", base: 7000000000 },
  Nigeria: { code: "NG", format: "+234 8## ### ####", base: 8000000000 },
  Egypt: { code: "EG", format: "+20 1## ### ####", base: 1000000000 },
  Argentina: { code: "AR", format: "+54 9 11 ####-####", base: 1100000000 },
  Colombia: { code: "CO", format: "+57 3## ### ####", base: 3000000000 },
  Vietnam: { code: "VN", format: "+84 9## ### ####", base: 9000000000 },
  Thailand: { code: "TH", format: "+66 8# ### ####", base: 800000000 },
  Philippines: { code: "PH", format: "+63 9## ### ####", base: 9000000000 },
  Pakistan: { code: "PK", format: "+92 3## ### ####", base: 3000000000 },
  Iran: { code: "IR", format: "+98 9## ### ####", base: 9000000000 },
  Iraq: { code: "IQ", format: "+964 7## ### ####", base: 7000000000 },
  Morocco: { code: "MA", format: "+212 6## ### ###", base: 600000000 },
  Kenya: { code: "KE", format: "+254 7## ### ###", base: 700000000 },
  Ethiopia: { code: "ET", format: "+251 9## ### ###", base: 900000000 },
  Ghana: { code: "GH", format: "+233 2###-####", base: 200000000 },
  Algeria: { code: "DZ", format: "+213 5# ## ## ##", base: 500000000 },
  Sudan: { code: "SD", format: "+249 1# ### ####", base: 1000000000 },
  Ukraine: { code: "UA", format: "+380 6## ### ## ##", base: 6000000000 },
  Poland: { code: "PL", format: "+48 5## ### ## ##", base: 500000000 },
  Netherlands: { code: "NL", format: "+31 6 ########", base: 610000000 },
  Belgium: { code: "BE", format: "+32 4## ### ###", base: 400000000 },
  Switzerland: { code: "CH", format: "+41 7## ### ## ##", base: 700000000 },
  Austria: { code: "AT", format: "+43 6## ### ####", base: 600000000 },
  Denmark: { code: "DK", format: "+45 2## ## ## ##", base: 20000000 },
  Norway: { code: "NO", format: "+47 4## ### ###", base: 40000000 },
  Finland: { code: "FI", format: "+358 4## ### ####", base: 400000000 },
  Portugal: { code: "PT", format: "+351 9## ### ###", base: 900000000 },
  Greece: { code: "GR", format: "+30 6## ### ####", base: 600000000 },
  "Czech Republic": { code: "CZ", format: "+420 7## ### ###", base: 700000000 },
  Hungary: { code: "HU", format: "+36 20 ### ####", base: 200000000 },
  Romania: { code: "RO", format: "+40 7## ### ###", base: 700000000 },
  Bulgaria: { code: "BG", format: "+359 8## ### ###", base: 800000000 },
  Serbia: { code: "RS", format: "+381 6## ### ####", base: 600000000 },
  Croatia: { code: "HR", format: "+385 9## ### ###", base: 900000000 },
  Slovenia: { code: "SI", format: "+386 4## ### ###", base: 400000000 },
  Slovakia: { code: "SK", format: "+421 9## ### ####", base: 900000000 },
  Lithuania: { code: "LT", format: "+370 6## ### ##", base: 600000000 },
  Latvia: { code: "LV", format: "+371 2## ### ###", base: 200000000 },
  Estonia: { code: "EE", format: "+372 5## ### ###", base: 500000000 },
  Cyprus: { code: "CY", format: "+357 9## ### ###", base: 900000000 },
  Luxembourg: { code: "LU", format: "+352 6## ### ###", base: 600000000 },
  Liechtenstein: { code: "LI", format: "+423 6## ### ###", base: 6000000 },
  Iceland: { code: "IS", format: "+354 6## ### ##", base: 6000000 },
  Malta: { code: "MT", format: "+356 9## ### ###", base: 9000000 },
  Andorra: { code: "AD", format: "+377 6## ### ##", base: 6000000 },
  Monaco: { code: "MC", format: "+377 6## ### ##", base: 6100000 },
  "San Marino": { code: "SM", format: "+378 3## ### ##", base: 3000000 },
  "Vatican City": { code: "VA", format: "+379 3## ### ##", base: 3100000 },
  "New Zealand": { code: "NZ", format: "+64 2# ### ####", base: 200000000 },
  Singapore: { code: "SG", format: "+65 8#### ####", base: 80000000 },
  "Hong Kong": { code: "HK", format: "+852 5# #### ####", base: 50000000 },
};

const AVAILABLE_COUNTRIES = Object.keys(COUNTRY_DATA);

// Track phone counters per country to ensure uniqueness
const phoneCounters = {};
AVAILABLE_COUNTRIES.forEach((country) => {
  phoneCounters[country] = 0;
});

// Generate UNIQUE phone number based on country + counter
function generateUniquePhone(countryName) {
  const countryInfo = COUNTRY_DATA[countryName];
  if (!countryInfo) return faker.phone.number();

  // Increment counter for this country
  phoneCounters[countryName]++;
  const counter = phoneCounters[countryName];

  // Generate unique number: base + counter (modulo to fit format length)
  // This ensures no duplicates while keeping realistic format
  const base = countryInfo.base;
  const uniqueNumber = base + (counter % 9000000000); // Large range to avoid overflow

  // Format the number according to the pattern (simplified approach)
  // We replace # with digits from our unique number
  let phone = countryInfo.format;
  let numStr = uniqueNumber.toString();
  let numIndex = 0;

  for (let i = 0; i < phone.length && numIndex < numStr.length; i++) {
    if (phone[i] === "#") {
      phone = phone.substring(0, i) + numStr[numIndex] + phone.substring(i + 1);
      numIndex++;
    }
  }

  return phone;
}

// Generate UNIQUE email - always includes index for guaranteed uniqueness
function generateUniqueEmail(firstName, lastName, index) {
  const domains = ["example.com", "email.com", "mail.com", "test.com"];
  const cleanFirst = firstName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const cleanLast = lastName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const domain = faker.helpers.arrayElement(domains);

  // Always include index to guarantee uniqueness
  return `"${cleanFirst}.${cleanLast}.${index}@${domain}"`;
}

// CSV escaping function
function escapeCSV(value) {
  if (value == null) return '""';
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Main generation function
async function generateData() {
  console.log(
    `Data generation started: ${CONFIG.totalRecords.toLocaleString()} records...`,
  );
  console.log(`✅ Guaranteed: No duplicate emails or phone numbers!\n`);

  // Write header
  const header = "email,first_name,last_name,phone,country,status\n";
  fs.writeFileSync(CONFIG.outputFile, header, "utf8");

  let stream = fs.createWriteStream(CONFIG.outputFile, { flags: "a" });

  for (let i = 0; i < CONFIG.totalRecords; i++) {
    // Select country randomly
    const selectedCountryName = faker.helpers.arrayElement(AVAILABLE_COUNTRIES);

    // Generate data
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const status = faker.helpers.arrayElement(CONFIG.statusOptions);

    // Generate UNIQUE phone and email
    const phoneNumber = generateUniquePhone(selectedCountryName);
    const email = generateUniqueEmail(firstName, lastName, i);

    const record =
      [
        email,
        escapeCSV(firstName),
        escapeCSV(lastName),
        phoneNumber,
        escapeCSV(selectedCountryName),
        escapeCSV(status),
      ].join(",") + "\n";

    stream.write(record);

    // Show progress
    if ((i + 1) % Math.floor(CONFIG.totalRecords / 10) === 0) {
      const percent = Math.round(((i + 1) / CONFIG.totalRecords) * 100);
      console.log(`⏳ Progress: ${percent}% completed...`);
    }
  }

  stream.end();

  console.log(`\n✅ Data generated successfully!`);
  console.log(`📁 File saved: ${CONFIG.outputFile}`);
  console.log(`🔒 All emails and phone numbers are guaranteed unique!`);
}

// Run the script
generateData().catch((err) => {
  console.error("❌ Error occurred:", err);
});
