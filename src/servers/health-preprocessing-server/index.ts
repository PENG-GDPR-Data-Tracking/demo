import { tracingFullConfiguration } from 'opentelemetry-plugin-gdpr';
import { Server } from '../../types';

const CONFIG: Server = {
  name: 'health-preprocessing-server',
  port: process.env.PORT || 8003,
  paths: ['/api1'],
  remoteUrls: ['https://gdpr-sleep-database.herokuapp.com/api1', 'https://gdpr-health-database.herokuapp.com/api1'],
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

tracingFullConfiguration(CONFIG.gdprTracingBaseConfiguration, 'https://gdpr-zipkin.sloppy.zone/api/v2/spans');

import('../registerServer').then((m) => m.registerServer(CONFIG));
