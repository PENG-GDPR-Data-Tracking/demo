import { tracingFullConfiguration } from 'opentelemetry-plugin-gdpr';
import { Server } from '../../types';

const CONFIG: Server = {
  name: 'sleep-database',
  port: process.env.PORT || 8004,
  paths: ['/api1', '/api2'],
  remoteUrls: ['http://localhost:8006/api2'],
  gdprTracingBaseConfiguration: {
    serviceName: 'sleep-database',
    location: 'Europe',
    baseTTL: 0,
    baseLegalBasis: 'Contractual',
    baseLegitimateInterest: '',
    baseAutomatedDecisionMaking: false,
    basePurpose: 'Storing sleep tracking data',
  },
};

tracingFullConfiguration(CONFIG.gdprTracingBaseConfiguration);
import('../registerServer').then((m) => m.registerServer(CONFIG));
