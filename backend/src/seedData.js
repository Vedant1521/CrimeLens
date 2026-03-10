const mongoose = require('mongoose');
const Crime = require('./models/Crime');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crime-data';

// All 28 states + 2 UTs with population data
const STATES = [
  { name: 'Andhra Pradesh',      code: 'AP', pop: { 2018:53903393,2019:54578239,2020:55274310,2021:55390000,2022:55800000,2023:56200000,2024:56600000,2025:57000000 } },
  { name: 'Arunachal Pradesh',   code: 'AR', pop: { 2018:1570458, 2019:1591000, 2020:1605000, 2021:1620000, 2022:1640000, 2023:1660000, 2024:1680000, 2025:1700000 } },
  { name: 'Assam',               code: 'AS', pop: { 2018:35607039,2019:36083000,2020:36470000,2021:35998000,2022:36300000,2023:36600000,2024:36900000,2025:37200000 } },
  { name: 'Bihar',               code: 'BR', pop: { 2018:119520000,2019:121500000,2020:124800000,2021:128500000,2022:130000000,2023:131500000,2024:133000000,2025:134500000 } },
  { name: 'Chhattisgarh',        code: 'CG', pop: { 2018:28724000,2019:29436000,2020:30060000,2021:31158000,2022:31500000,2023:31900000,2024:32300000,2025:32700000 } },
  { name: 'Delhi',               code: 'DL', pop: { 2018:30000000,2019:30500000,2020:31000000,2021:31500000,2022:32000000,2023:32500000,2024:33000000,2025:33500000 } },
  { name: 'Goa',                 code: 'GA', pop: { 2018:1540000, 2019:1558000, 2020:1573000, 2021:1590000, 2022:1610000, 2023:1630000, 2024:1650000, 2025:1670000 } },
  { name: 'Gujarat',             code: 'GJ', pop: { 2018:69600000,2019:70500000,2020:71500000,2021:72000000,2022:73000000,2023:74000000,2024:75000000,2025:76000000 } },
  { name: 'Haryana',             code: 'HR', pop: { 2018:28204000,2019:28900000,2020:29500000,2021:28900000,2022:29300000,2023:29700000,2024:30100000,2025:30500000 } },
  { name: 'Himachal Pradesh',    code: 'HP', pop: { 2018:7300000, 2019:7370000, 2020:7440000, 2021:7530000, 2022:7600000, 2023:7670000, 2024:7740000, 2025:7810000 } },
  { name: 'Jharkhand',           code: 'JH', pop: { 2018:37403000,2019:38000000,2020:38600000,2021:39000000,2022:39500000,2023:40000000,2024:40500000,2025:41000000 } },
  { name: 'Karnataka',           code: 'KA', pop: { 2018:64000000,2019:65000000,2020:66000000,2021:67000000,2022:68000000,2023:68500000,2024:69000000,2025:70000000 } },
  { name: 'Kerala',              code: 'KL', pop: { 2018:34600000,2019:34900000,2020:35100000,2021:35100000,2022:35300000,2023:35500000,2024:35700000,2025:35900000 } },
  { name: 'Madhya Pradesh',      code: 'MP', pop: { 2018:85000000,2019:86500000,2020:87500000,2021:85800000,2022:86600000,2023:87400000,2024:88200000,2025:89000000 } },
  { name: 'Maharashtra',         code: 'MH', pop: { 2018:118000000,2019:119000000,2020:121000000,2021:123000000,2022:125000000,2023:125000000,2024:128000000,2025:130000000 } },
  { name: 'Manipur',             code: 'MN', pop: { 2018:3000000, 2019:3050000, 2020:3100000, 2021:3200000, 2022:3250000, 2023:3300000, 2024:3350000, 2025:3400000 } },
  { name: 'Meghalaya',           code: 'ML', pop: { 2018:3300000, 2019:3360000, 2020:3420000, 2021:3366000, 2022:3400000, 2023:3440000, 2024:3480000, 2025:3520000 } },
  { name: 'Mizoram',             code: 'MZ', pop: { 2018:1190000, 2019:1210000, 2020:1230000, 2021:1240000, 2022:1260000, 2023:1280000, 2024:1300000, 2025:1320000 } },
  { name: 'Nagaland',            code: 'NL', pop: { 2018:2160000, 2019:2190000, 2020:2220000, 2021:2190000, 2022:2210000, 2023:2230000, 2024:2250000, 2025:2270000 } },
  { name: 'Odisha',              code: 'OD', pop: { 2018:44900000,2019:45500000,2020:46100000,2021:46000000,2022:46400000,2023:46800000,2024:47200000,2025:47600000 } },
  { name: 'Punjab',              code: 'PB', pop: { 2018:30140000,2019:30500000,2020:30900000,2021:30100000,2022:30500000,2023:30900000,2024:31300000,2025:31700000 } },
  { name: 'Rajasthan',           code: 'RJ', pop: { 2018:79500000,2019:80800000,2020:82100000,2021:81000000,2022:82000000,2023:83000000,2024:84000000,2025:85000000 } },
  { name: 'Sikkim',              code: 'SK', pop: { 2018:690000,  2019:700000,  2020:712000,  2021:615000,  2022:625000,  2023:635000,  2024:645000,  2025:655000  } },
  { name: 'Tamil Nadu',          code: 'TN', pop: { 2018:68000000,2019:69000000,2020:70000000,2021:71000000,2022:72000000,2023:72000000,2024:73000000,2025:74000000 } },
  { name: 'Telangana',           code: 'TS', pop: { 2018:38000000,2019:38600000,2020:39200000,2021:35000000,2022:35500000,2023:36000000,2024:36500000,2025:37000000 } },
  { name: 'Tripura',             code: 'TR', pop: { 2018:4050000, 2019:4100000, 2020:4150000, 2021:4170000, 2022:4210000, 2023:4250000, 2024:4290000, 2025:4330000 } },
  { name: 'Uttar Pradesh',       code: 'UP', pop: { 2018:220000000,2019:222000000,2020:225000000,2021:228000000,2022:230000000,2023:230000000,2024:235000000,2025:240000000 } },
  { name: 'Uttarakhand',         code: 'UK', pop: { 2018:11140000,2019:11300000,2020:11450000,2021:11700000,2022:11800000,2023:11900000,2024:12000000,2025:12100000 } },
  { name: 'West Bengal',         code: 'WB', pop: { 2018:97700000,2019:98700000,2020:99600000,2021:91300000,2022:92000000,2023:92700000,2024:93400000,2025:94100000 } },
  { name: 'Jammu & Kashmir',     code: 'JK', pop: { 2018:13600000,2019:13800000,2020:14000000,2021:12541000,2022:12700000,2023:12900000,2024:13100000,2025:13300000 } },
]

// 8 crime categories with base rates per 100k population (realistic NCRB-style)
const CATEGORIES = [
  { name: 'Theft',            baseRate: 12.5, trend: 1.04 },
  { name: 'Assault',          baseRate: 8.2,  trend: 1.03 },
  { name: 'Homicide',         baseRate: 2.1,  trend: 0.98 },
  { name: 'Rape',             baseRate: 3.4,  trend: 1.05 },
  { name: 'Kidnapping',       baseRate: 2.8,  trend: 1.02 },
  { name: 'Robbery',          baseRate: 4.1,  trend: 0.97 },
  { name: 'Cybercrime',       baseRate: 1.8,  trend: 1.18 },
  { name: 'Human Trafficking',baseRate: 0.4,  trend: 1.01 },
]

// State-specific multipliers (some states have higher crime rates historically)
const STATE_MULTIPLIERS = {
  'Uttar Pradesh':    1.45,
  'Bihar':           1.35,
  'Madhya Pradesh':  1.30,
  'Rajasthan':       1.20,
  'Delhi':           1.50,
  'West Bengal':     1.10,
  'Maharashtra':     1.15,
  'Haryana':         1.25,
  'Chhattisgarh':    1.20,
  'Jharkhand':       1.15,
  'Assam':           1.10,
  'Odisha':          1.05,
  'Telangana':       0.95,
  'Karnataka':       0.90,
  'Tamil Nadu':      0.85,
  'Kerala':          0.80,
  'Gujarat':         0.88,
  'Punjab':          1.00,
  'Andhra Pradesh':  0.92,
  'Himachal Pradesh':0.70,
  'Uttarakhand':     0.85,
  'Goa':             0.75,
  'Tripura':         0.95,
  'Meghalaya':       0.90,
  'Manipur':         1.05,
  'Nagaland':        0.80,
  'Mizoram':         0.65,
  'Arunachal Pradesh':0.70,
  'Sikkim':          0.60,
  'Jammu & Kashmir': 1.00,
}

const YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]

function generateData() {
  const records = []

  for (const state of STATES) {
    const stateMultiplier = STATE_MULTIPLIERS[state.name] || 1.0

    for (const category of CATEGORIES) {
      for (const year of YEARS) {
        const population = state.pop[year]

        // Calculate rate with trend growth from 2018 baseline
        const yearsFromBase = year - 2018
        const trendMultiplier = Math.pow(category.trend, yearsFromBase)

        // Add some randomness (+/- 8%) for realism
        const randomFactor = 0.92 + Math.random() * 0.16

        const rate = category.baseRate * stateMultiplier * trendMultiplier * randomFactor
        const count = Math.round((rate / 100000) * population)
        const crimeRate = parseFloat(((count / population) * 100000).toFixed(2))

        records.push({
          state:      state.name,
          stateCode:  state.code,
          year,
          category:   category.name,
          count:      Math.max(1, count),
          population,
          crimeRate,
        })
      }
    }
  }

  return records
}

async function seedDatabase() {
  try {
    console.log('🔗 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    console.log('🗑️  Clearing old data...')
    await Crime.deleteMany({})
    console.log('✅ Old data cleared')

    console.log('⚙️  Generating crime data...')
    const data = generateData()
    console.log(`📦 Generated ${data.length} records`)

    console.log('📥 Inserting into database...')
    // Insert in batches of 500
    const batchSize = 500
    let inserted = 0
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize)
      await Crime.insertMany(batch)
      inserted += batch.length
      console.log(`   ✓ Inserted ${inserted}/${data.length}`)
    }

    console.log('\n📊 Summary:')
    console.log(`   States:     ${STATES.length}`)
    console.log(`   Categories: ${CATEGORIES.length}`)
    console.log(`   Years:      2018–2025 (${YEARS.length})`)
    console.log(`   Total:      ${data.length} records`)

    await mongoose.connection.close()
    console.log('\n✅ Seeding complete! Restart backend and refresh dashboard.')
    process.exit(0)
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

seedDatabase()
