import ormconfig from '@app/ormconfig';

const ormseedconfig = {
  ...ormconfig,
  migrations: [`${__dirname}/seeds/*.ts`],
  cli: {
    migrationsDir: 'src/seeds',
  },
};

export default ormseedconfig;
