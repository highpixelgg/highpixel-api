import 'dotenv/config';
import LowRacingAPI from './app';
import log from 'vendor/log';

LowRacingAPI.listen(process.env.PORT, () =>
  log.success('LowRacingAPI: has been loaded')
);
