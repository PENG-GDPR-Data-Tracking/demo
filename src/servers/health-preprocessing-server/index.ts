import { tracingFullConfiguration } from 'opentelemetry-plugin-gdpr';
import { Server } from '../../types';

const CONFIG: Server = {
  name: 'health-preprocessing-server',
  port: process.env.PORT || 8003,
  paths: ['/api1'],
  remoteUrls: ['http://localhost:8004/api1', 'http://localhost:8005/api1'],
  gdprTracingBaseConfiguration: {
    serviceName: 'health-preprocessing-server',
    location: 'Europe',
    baseTTL: 216000,
    baseLegalBasis: 'Contractual',
    baseLegitimateInterest: '',
    baseAutomatedDecisionMaking: false,
    basePurpose: 'Preprocessing raw body health data',
  },
};

tracingFullConfiguration(CONFIG.gdprTracingBaseConfiguration);

import('../registerServer').then((m) => m.registerServer(CONFIG));
