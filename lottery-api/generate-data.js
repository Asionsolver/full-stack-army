const { faker } = require("@faker-js/faker");
const fs = require("fs");
const readline = require("readline");

// Configuration: You can change the settings here as you wish.
const CONFIG = {
  totalRecords: 250000, // Total number of records to generate (e.g., 100000 = 1 lakh)
  outputFile: "output.csv", // Name of the output file
  batchSize: 10000, // Number of records to write in each batch to save memory
  countries: [
    "NL",
    "United States",
    "Spain",
    "China",
    "France",
    "Germany",
    "Sweden",
    "Italy",
    "Japan",
    "India",
    "Bangladesh",
    "Brazil",
    "Russia",
    "Mexico",
    "Indonesia",
    "Turkey",
    "Saudi Arabia",
    "South Korea",
    "Australia",
    "Canada",
    "United Kingdom",
    "Nigeria",
    "Egypt",
    "Argentina",
    "Colombia",
    "Vietnam",
    "Thailand",
    "Philippines",
    "Pakistan",
    "Iran",
    "Iraq",
    "Morocco",
    "Kenya",
    "Ethiopia",
    "Ghana",
    "Algeria",
    "Sudan",
    "Ukraine",
    "Poland",
    "Netherlands",
    "Belgium",
    "Switzerland",
    "Austria",
    "Denmark",
    "Norway",
    "Finland",
    "Portugal",
    "Greece",
    "Czech Republic",
    "Hungary",
    "Romania",
    "Bulgaria",
    "Serbia",
    "Croatia",
    "Slovenia",
    "Slovakia",
    "Lithuania",
    "Latvia",
    "Estonia",
    "Cyprus",
    "Luxembourg",
    "Liechtenstein",
    "Iceland",
    "Malta",
    "Andorra",
    "Monaco",
    "San Marino",
    "Vatican City",
    "New Zealand",
    "Singapore",
    "Hong Kong",
  ],
  statusOptions: ["subscribed", "unsubscribed", ""], // Status options (including the option to remain blank)
};

// Phone number generation function (by country code)
function generatePhone(countryCode) {
  const formats = {
    NL: "+31 6 ########",
    "United States": "+1 ###-###-####",
    Spain: "+34 6## ### ###",
    China: "+86 1## #### ####",
    France: "+33 6 ## ## ## ##",
    Germany: "+49 1## #######",
    Sweden: "+46 7# ### ## ##",
    Italy: "+39 3## ### ####",
    Japan: "+81 90 #### ####",
    India: "+91 9##### #####",
    Bangladesh: "+880 1###-#######",
    Brazil: "+55 9####-####",
    Russia: "+7 9## ###-##-##",
    Mexico: "+52 1 ## #### ####",
    Indonesia: "+62 8###-####-####",
    Turkey: "+90 5## ### ## ##",
    "Saudi Arabia": "+966 5# ### ####",
    "South Korea": "+82 10-####-####",
    Australia: "+61 4## ### ###",
    Canada: "+1 ###-###-####",
    "United Kingdom": "+44 7### ######",
    Nigeria: "+234 8## ### ####",
    Egypt: "+20 1## ### ####",
    Argentina: "+54 9 11 ####-####",
    Colombia: "+57 3## ### ####",
    Vietnam: "+84 9## ### ####",
    Thailand: "+66 8# ### ####",
    Philippines: "+63 9## ### ####",
    Pakistan: "+92 3## ### ####",
    Iran: "+98 9## ### ####",
    Iraq: "+964 7## ### ####",
    Morocco: "+212 6## ### ###",
    Kenya: "+254 7## ### ###",
    Ethiopia: "+251 9## ### ###",
    Ghana: "+233 2###-####",
    Algeria: "+213 5# ## ## ##",
    Sudan: "+249 1# ### ####",
    Ukraine: "+380 6## ### ## ##",
    Poland: "+48 5## ### ## ##",
    Netherlands: "+31 6 ########",
    Belgium: "+32 4## ### ###",
    Switzerland: "+41 7## ### ## ##",
    Austria: "+43 6## ### ####",
    Denmark: "+45 2## ## ## ##",
    Norway: "+47 4## ### ###",
    Finland: "+358 4## ### ####",
    Portugal: "+351 9## ### ###",
    Greece: "+30 6## ### ####",
    "Czech Republic": "+420 7## ### ###",
    Hungary: "+36 20 ### ####",
    Romania: "+40 7## ### ###",
    Bulgaria: "+359 8## ### ###",
    Serbia: "+381 6## ### ####",
    Croatia: "+385 9## ### ###",
    Slovenia: "+386 4## ### ###",
    Slovakia: "+421 9## ### ####",
    Lithuania: "+370 6## ### ##",
    Latvia: "+371 2## ### ###",
    Estonia: "+372 5## ### ###",
    Cyprus: "+357 9## ### ###",
    Luxembourg: "+352 6## ### ###",
    Liechtenstein: "+423 6## ### ###",
    Iceland: "+354 6## ### ##",
    Malta: "+356 9## ### ###",
    Andorra: "+376 3## ###",
    Monaco: "+377 6## ### ##",
    "San Marino": "+378 3## ### ##",
    "Vatican City": "+379 3## ### ##",
    "New Zealand": "+64 2# ### ####",
    Singapore: "+65 8#### ####",
    "Hong Kong": "+852 5# #### ####",
    default: "+### ### ### ###",
  };
  const pattern = formats[countryCode] || formats["default"];
  return faker.helpers.replaceSymbols(pattern);
}

// Email generation function
function generateEmail(firstName, lastName, index) {
  const domains = ["example.com", "email.com", "mail.com", "test.com"];
  const cleanFirst = firstName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const cleanLast = lastName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const domain = faker.helpers.arrayElement(domains);

  // Ensure uniqueness by adding the index occasionally
  const suffix = index > 10000 && index % 10 === 0 ? index : "";
  return `"${cleanFirst}.${cleanLast}${suffix}@${domain}"`;
}

// CSV file escaping function
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

  // Write header
  const header = "email,first_name,last_name,phone,country,status\n";
  fs.writeFileSync(CONFIG.outputFile, header, "utf8");

  let stream = fs.createWriteStream(CONFIG.outputFile, { flags: "a" });

  for (let i = 0; i < CONFIG.totalRecords; i++) {
    // Generate random data
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const country = faker.helpers.arrayElement(CONFIG.countries);
    const status = faker.helpers.arrayElement(CONFIG.statusOptions);

    const record =
      [
        generateEmail(firstName, lastName, i),
        escapeCSV(firstName),
        escapeCSV(lastName),
        generatePhone(country),
        escapeCSV(country),
        escapeCSV(status),
      ].join(",") + "\n";

    stream.write(record);

    // Show progress (every 10%)
    if ((i + 1) % Math.floor(CONFIG.totalRecords / 10) === 0) {
      const percent = Math.round(((i + 1) / CONFIG.totalRecords) * 100);
      console.log(`⏳ Progress: ${percent}% completed...`);
    }
  }

  // Close the stream
  stream.end();

  console.log(`\n✅ Data generated successfully!`);
  console.log(`📁 File saved: ${CONFIG.outputFile}`);
}

// Run the script
generateData().catch((err) => {
  console.error("❌ Error occurred:", err);
});
