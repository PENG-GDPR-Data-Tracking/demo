import { tracingFullConfiguration } from 'opentelemetry-plugin-gdpr';
import { Server } from '../../types';

const CONFIG: Server = {
  name: 'health-database',
  port: process.env.PORT || 8005,
  paths: ['/api1'],
  remoteUrls: ['http://gdpr-sleep-database.herokuapp.com/api2', 'http://gdpr-statistics-server.herokuapp.com/api2'],
  gdprTracingBaseConfiguration: {
    serviceName: 'health-database',
    location: 'Europe',
    baseTTL: 0,
    baseLegalBasis: 'Contractual',
    baseLegitimateInterest: '',
    baseAutomatedDecisionMaking: false,
    basePurpose: 'Storing body health data',
  },
};

tracingFullConfiguration(CONFIG.gdprTracingBaseConfiguration, 'https://gdpr-zipkin.sloppy.zone/api/v2/spans');

import('../registerServer').then((m) => m.registerServer(CONFIG));
