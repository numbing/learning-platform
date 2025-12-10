import * as mongoose from 'mongoose';
import { LearningModuleEntity, LearningModuleSchema } from '../modules/learning-modules/schemas/learning-module.schema';
import { databaseConfig } from '../config/database.config';

const seedModules = [
  {
    title: 'Introduction to Artificial Intelligence',
    category: 'AI',
    estimatedMinutes: 45,
    completed: false,
  },
  {
    title: 'Machine Learning Fundamentals',
    category: 'AI',
    estimatedMinutes: 60,
    completed: false,
  },
  {
    title: 'Deep Learning with Neural Networks',
    category: 'AI',
    estimatedMinutes: 90,
    completed: false,
  },
  {
    title: 'Climate Change and Global Warming',
    category: 'Sustainability',
    estimatedMinutes: 40,
    completed: false,
  },
  {
    title: 'Renewable Energy Sources',
    category: 'Sustainability',
    estimatedMinutes: 50,
    completed: false,
  },
  {
    title: 'Web Development with Modern JavaScript',
    category: 'Digital Skills',
    estimatedMinutes: 75,
    completed: false,
  },
  {
    title: 'Cloud Computing Essentials',
    category: 'Digital Skills',
    estimatedMinutes: 55,
    completed: false,
  },
  {
    title: 'Cybersecurity Best Practices',
    category: 'Digital Skills',
    estimatedMinutes: 65,
    completed: false,
  },
];

async function seed(): Promise<void> {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(databaseConfig.uri);
    console.log('Connected to MongoDB successfully');

    const ModuleModel = mongoose.model(
      LearningModuleEntity.name,
      LearningModuleSchema,
      'learning_modules',
    );

    const existingModules = await ModuleModel.countDocuments();

    if (existingModules > 0) {
      console.log(`Database already contains ${existingModules} modules. Skipping seed.`);
      await mongoose.disconnect();
      console.log('Database connection closed');
      return;
    }

    console.log('Seeding database with sample modules...');
    await ModuleModel.insertMany(seedModules);

    console.log(`Successfully seeded ${seedModules.length} modules to the database`);
    await mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
}

seed();
