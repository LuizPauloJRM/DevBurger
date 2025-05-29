module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'devburger',
  define: {
    timestamps: true,   // Automatically add createdAt and updatedAt fields
    underscored: true,  // Use snake_case for column names
    underscoredAll: true,   // Use snake_case for all table names
  }
};
