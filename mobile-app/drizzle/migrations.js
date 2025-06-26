// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_plain_trauma.sql';
import m0001 from './0001_wooden_phantom_reporter.sql';
import m0002 from './0002_broad_molecule_man.sql';
import m0003 from './0003_mixed_inhumans.sql';
import m0004 from './0004_volatile_ser_duncan.sql';
import m0005 from './0005_dapper_magik.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003,
m0004,
m0005
    }
  }
  