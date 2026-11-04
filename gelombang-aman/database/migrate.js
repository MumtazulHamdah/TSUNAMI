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

async function runMigrations() {
  const client = await pool.connect();
  try {
    console.log('🌊 Running GELOMBANG AMAN database migrations...');
    const migDir = path.join(__dirname, 'migrations');
    const files = fs.readdirSync(migDir).filter(f => f.endsWith('.sql')).sort();
    for (const file of files) {
      console.log(`  ▶ Running: ${file}`);
      const sql = fs.readFileSync(path.join(migDir, file), 'utf8');
      await client.query(sql);
      console.log(`  ✓ Done: ${file}`);
    }
    console.log('\n✅ Migrations completed successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations();
