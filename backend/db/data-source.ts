import { join } from 'path';
import { User } from 'src/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: join(__dirname, '..', 'database.sqlite'),
  entities: [User],
  migrations: [join(__dirname, '..', 'db', 'migrations', '*.js')]
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
