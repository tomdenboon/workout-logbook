// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_dashing_firestar.sql';
import m0001 from './0001_careful_stature.sql';
import m0002 from './0002_groovy_mister_sinister.sql';
import m0003 from './0003_rare_victor_mancha.sql';
import m0004 from './0004_public_sentinels.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003,
m0004
    }
  }
  