'use strict';

/**
 * New Relic agent configuration.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['Jenkins Node Demo'],
  /**
   * Your New Relic license key
   */
  license_key: process.env.NEW_RELIC_LICENSE_KEY || 'YOUR_LICENSE_KEY_HERE',
  /**
   * This setting controls distributed tracing.
   * Set to true to enable.
   */
  distributed_tracing: {
    enabled: true
  },
  logging: {
    level: 'info' // 'trace' for detailed debug
  },
  /**
   * Monitor only your local environment by default
   */
  allow_all_headers: true,
};
