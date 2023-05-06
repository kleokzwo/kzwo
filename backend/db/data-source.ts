import { join } from 'path';
import { User } from 'src/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: ['dist/**/*.entity.js'], //[User],
  migrations: ['dist/db/migrations/*.js'] //[join(__dirname, '..', 'db', 'migrations', '*.js')]
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
