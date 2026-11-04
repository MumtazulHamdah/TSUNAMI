require('dotenv').config({ path: '../backend/.env' });
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'gelombang_aman',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

async function runSeeds() {
  const client = await pool.connect();
  try {
    console.log('🌱 Running GELOMBANG AMAN seed data...');
    const seedDir = path.join(__dirname, 'seeds');
    const files = fs.readdirSync(seedDir).filter(f => f.endsWith('.sql')).sort();
    for (const file of files) {
      console.log(`  ▶ Seeding: ${file}`);
      const sql = fs.readFileSync(path.join(seedDir, file), 'utf8');
      await client.query(sql);
      console.log(`  ✓ Done: ${file}`);
    }
    console.log('\n✅ Seed data inserted successfully!');
    console.log('👤 Admin default: admin@gelombangaman.id / GelombangAman2024!');
    console.log('⚠️  Segera ubah password admin setelah login pertama!');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runSeeds();
