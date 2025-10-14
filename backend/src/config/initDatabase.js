const pool = require('./database');

const createTables = async () => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        country VARCHAR(100),
        user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('seller', 'buyer')),
        profile_picture VARCHAR(500),
        self_description TEXT,
        programming_skills TEXT[],
        programming_interests TEXT[],
        is_verified BOOLEAN DEFAULT FALSE,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Projects table
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        project_type VARCHAR(100),
        price DECIMAL(10, 2) NOT NULL,
        images TEXT[],
        files TEXT[],
        technologies TEXT[],
        demo_url VARCHAR(500),
        video_links TEXT[],
        video_source VARCHAR(50),
        is_profitable BOOLEAN DEFAULT FALSE,
        revenue_type VARCHAR(50),
        monthly_revenue DECIMAL(10, 2),
        status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'sold', 'inactive')),
        views_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Transactions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        total_amount DECIMAL(10, 2) NOT NULL,
        platform_fee DECIMAL(10, 2) NOT NULL,
        seller_amount DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50),
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'escrow_held', 'completed', 'refunded', 'disputed')),
        escrow_release_date TIMESTAMP,
        review_period_days INTEGER DEFAULT 7,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Escrow table
    await client.query(`
      CREATE TABLE IF NOT EXISTS escrow (
        id SERIAL PRIMARY KEY,
        transaction_id INTEGER REFERENCES transactions(id) ON DELETE CASCADE,
        amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'held' CHECK (status IN ('held', 'released', 'refunded')),
        released_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Installments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS installments (
        id SERIAL PRIMARY KEY,
        transaction_id INTEGER REFERENCES transactions(id) ON DELETE CASCADE,
        amount DECIMAL(10, 2) NOT NULL,
        due_date TIMESTAMP NOT NULL,
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
        paid_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Notifications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        link VARCHAR(500),
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Messages/Chat table
    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        transaction_id INTEGER REFERENCES transactions(id) ON DELETE SET NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Platform earnings table
    await client.query(`
      CREATE TABLE IF NOT EXISTS platform_earnings (
        id SERIAL PRIMARY KEY,
        transaction_id INTEGER REFERENCES transactions(id) ON DELETE CASCADE,
        amount DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Payment methods table
    await client.query(`
      CREATE TABLE IF NOT EXISTS payment_methods (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL,
        country VARCHAR(100),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Withdrawal methods table
    await client.query(`
      CREATE TABLE IF NOT EXISTS withdrawal_methods (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL,
        country VARCHAR(100),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // User payment preferences table
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_payment_preferences (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        payment_method_id INTEGER REFERENCES payment_methods(id) ON DELETE CASCADE,
        withdrawal_method_id INTEGER REFERENCES withdrawal_methods(id) ON DELETE CASCADE,
        account_details TEXT,
        is_default BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query('COMMIT');
    console.log('✅ Database tables created successfully');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error creating tables:', error);
    throw error;
  } finally {
    client.release();
  }
};

const insertDefaultPaymentMethods = async () => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Check if payment methods already exist
    const { rows } = await client.query('SELECT COUNT(*) FROM payment_methods');
    
    if (parseInt(rows[0].count) === 0) {
      // Egyptian payment methods
      await client.query(`
        INSERT INTO payment_methods (name, type, country, is_active) VALUES
        ('فودافون كاش', 'mobile_wallet', 'مصر', TRUE),
        ('اتصالات كاش', 'mobile_wallet', 'مصر', TRUE),
        ('أورانج كاش', 'mobile_wallet', 'مصر', TRUE),
        ('بطاقة بنكية', 'bank_card', NULL, TRUE)
      `);

      // Withdrawal methods (same for Egypt)
      await client.query(`
        INSERT INTO withdrawal_methods (name, type, country, is_active) VALUES
        ('فودافون كاش', 'mobile_wallet', 'مصر', TRUE),
        ('اتصالات كاش', 'mobile_wallet', 'مصر', TRUE),
        ('أورانج كاش', 'mobile_wallet', 'مصر', TRUE),
        ('تحويل بنكي', 'bank_transfer', NULL, TRUE)
      `);

      console.log('✅ Default payment and withdrawal methods inserted');
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error inserting payment methods:', error);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { createTables, insertDefaultPaymentMethods };
