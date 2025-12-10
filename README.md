# Learning Platform

A full-stack learning module tracker built with **NestJS**, **MongoDB**, and **Angular 21**.

Track your progress across AI, Sustainability, and Digital Skills modules with a clean, modern interface.

---

## Quick Start

### 1. Install MongoDB

**macOS:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
```

**Windows:**
Download from [mongodb.com](https://www.mongodb.com/try/download/community) and start the service.

Verify it's running:
```bash
mongosh --eval "db.version()"
```

### 2. Install Everything

```bash
# Clone/navigate to project
cd learning-platform

# Copy environment file
cp .env.example .env

# Install all dependencies (root + backend + frontend)
npm run install:all

# Seed database with 8 sample modules
npm run seed

# Start both servers
npm start
```

**Done!** 🎉

- Frontend: http://localhost:4200
- Backend API: http://localhost:3000

Press `Ctrl+C` to stop.

---

## Tech Stack

**Backend:**
- NestJS 10 + TypeScript
- MongoDB + Mongoose
- REST API
- Jest testing

**Frontend:**
- Angular 21 (latest)
- TypeScript
- Bootstrap 5
- Signals (reactive state)


## API Endpoints

### Get all modules
```bash
curl http://localhost:3000/api/modules
```

### Get modules by category
```bash
curl http://localhost:3000/api/modules?category=AI
```

### Mark module as completed
```bash
curl -X PATCH http://localhost:3000/api/modules/YOUR_MODULE_ID \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

---

## Run Tests

```bash
npm test             
cd backend && npm run test:cov      # With coverage
```


## Troubleshooting

**MongoDB connection error?**
```bash
# Check if MongoDB is running
mongosh --eval "db.version()"

# Start MongoDB if needed
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

**Dependencies not installing?**
```bash
# Clean install
rm -rf node_modules backend/node_modules frontend/node_modules
npm run install:all
```

---

## Future Improvements

### Planned Enhancements

**Backend:**
- **GraphQL API** - Migrate from REST to GraphQL for more flexible data querying (I have experience with GraphQL in Next.js, interested in implementing it with NestJS)
- **Authentication & Authorization** - Add JWT-based user authentication with role-based access control
- **Advanced Filtering** - Add pagination, sorting, and search capabilities
- **API Documentation** - Add Swagger/OpenAPI documentation

**Frontend:**

- **Advanced Analytics** - Visualize learning progress with charts (e.g., Chart.js, D3.js)
- **Dark Mode** - Add theme switching capability
- **Accessibility** - Improve ARIA labels and keyboard navigation

**DevOps:**
- **CI/CD Pipeline** - Automate testing and deployment with GitHub Actions
- **Docker Deployment** - Containerize the application for easier deployment
- **Monitoring** - Add logging and error tracking (e.g., Sentry)
- **Performance Monitoring** - Track Core Web Vitals and API response times

---

## License

MIT - Use freely for learning or as a starting point for your projects.
