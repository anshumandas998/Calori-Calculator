require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || '';

let supabase = null;
const isConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY && SUPABASE_URL.startsWith('http'));

if (isConfigured) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false },
    });
    console.log('✅ Supabase Client initialized successfully with:', SUPABASE_URL);
  } catch (err) {
    console.error('❌ Failed to initialize Supabase client:', err.message);
  }
} else {
  console.log('ℹ️  Supabase credentials not detected or incomplete in .env. Falling back to SQLite.');
}

module.exports = {
  isConfigured: () => Boolean(supabase),
  client: supabase,

  isTableMissing(error) {
    return Boolean(error && (error.code === 'PGRST205' || error.message?.includes('schema cache') || error.code === '42P01'));
  },

  // Users
  async getUserByEmail(email) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();
    if (error) {
      if (this.isTableMissing(error)) {
        console.warn('⚠️ Supabase tables pending initialization. Please run supabase_schema.sql in the Supabase SQL Editor.');
      }
      throw error;
    }
    return data;
  },

  async getUserById(id) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, age, weight, height, goal, avatar, created_at')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async createUser(userData) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Meals
  async getMeals(userId, dateFilter = null) {
    if (!supabase) return [];
    let query = supabase
      .from('meals')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (dateFilter) {
      // Filter by day (start of day to end of day)
      const startDate = `${dateFilter}T00:00:00.000Z`;
      const endDate = `${dateFilter}T23:59:59.999Z`;
      query = query.gte('date', startDate).lte('date', endDate);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async addMeal(mealData) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('meals')
      .insert([mealData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteMeal(id, userId) {
    if (!supabase) return false;
    const { error } = await supabase
      .from('meals')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    if (error) throw error;
    return true;
  },

  // Goals
  async getGoals(userId) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async upsertGoals(userId, goalsData) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('goals')
      .upsert({ user_id: userId, ...goalsData }, { onConflict: 'user_id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Water Intake
  async getWater(userId, date) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('water')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .maybeSingle();
    if (error) throw error;
    return data || { amount: 0 };
  },

  async upsertWater(userId, date, amount) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('water')
      .upsert({ user_id: userId, date, amount }, { onConflict: 'user_id,date' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Workouts
  async getWorkouts(userId, date) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async upsertWorkouts(userId, date, workoutData) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('workouts')
      .upsert({ user_id: userId, date, data: workoutData }, { onConflict: 'user_id,date' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Admin User Management
  async getAllUsers() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, role, age, weight, height, goal, avatar, created_at')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async adminCreateUser(userData) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select('id, name, email, role, age, weight, height, goal, avatar, created_at')
      .single();
    if (error) throw error;
    return data;
  },

  async adminUpdateUser(id, updates) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select('id, name, email, role, age, weight, height, goal, avatar, created_at')
      .single();
    if (error) throw error;
    return data;
  },

  async adminDeleteUser(id) {
    if (!supabase) return false;
    // Delete user (cascades to meals, goals, water)
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  },

  async getAdminStats() {
    if (!supabase) return { totalUsers: 0, totalMeals: 0, totalWaterLogs: 0 };
    const check = await supabase.from('users').select('id').limit(1);
    if (check.error) throw check.error;

    const [usersRes, mealsRes, waterRes] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('meals').select('*', { count: 'exact', head: true }),
      supabase.from('water').select('*', { count: 'exact', head: true }),
    ]);
    if (usersRes.error) throw usersRes.error;
    if (mealsRes.error) throw mealsRes.error;
    if (waterRes.error) throw waterRes.error;
    return {
      totalUsers: usersRes.count ?? 0,
      totalMeals: mealsRes.count ?? 0,
      totalWaterLogs: waterRes.count ?? 0,
    };
  }
};

