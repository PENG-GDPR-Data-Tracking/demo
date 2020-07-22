import { tracingFullConfiguration } from 'opentelemetry-plugin-gdpr';
import { Server } from '../../types';

const CONFIG: Server = {
  name: 'statistics-server',
  port: process.env.PORT || 8006,
  paths: ['/api1', '/api2'],
  remoteUrls: [],
  gdprTracingBaseConfiguration: {
    serviceName: 'statistics-server',
    location: 'USA',
    baseTTL: 0,
    baseLegalBasis: 'Contractual',
    baseLegitimateInterest: '',
    baseAutomatedDecisionMaking: false,
    basePurpose: 'Storing anonymous statistics data',
  },
};

tracingFullConfiguration(CONFIG.gdprTracingBaseConfiguration);
import('../registerServer').then((m) => m.registerServer(CONFIG));
