import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from '../../config/database.config';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('MongoDB connected successfully');
        });
        connection.on('error', (error: Error) => {
          console.error('MongoDB connection error:', error);
        });
        return connection;
      },
    }),
  ],
})
export class DatabaseModule {}
