export default {
  name: 'default',
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  dropSchema: false,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
}
