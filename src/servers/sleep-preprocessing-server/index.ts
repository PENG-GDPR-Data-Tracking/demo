import { tracingFullConfiguration } from 'opentelemetry-plugin-gdpr';
import { Server } from '../../types';

const CONFIG: Server = {
  name: 'sleep-preprocessing-server',
  port: process.env.PORT || 8002,
  paths: ['/api1'],
  remoteUrls: ['https://gdpr-sleep-database.herokuapp.com/api1'],
  gdprTracingBaseConfiguration: {
    serviceName: 'sleep-preprocessing-server',
    location: 'Europe',
    baseTTL: 0,
    baseLegalBasis: 'Contractual',
    baseLegitimateInterest: '',
    baseAutomatedDecisionMaking: false,
    basePurpose: 'Preprocessing raw sleep data',
  },
};

tracingFullConfiguration(CONFIG.gdprTracingBaseConfiguration, 'https://gdpr-zipkin.sloppy.zone/api/v2/spans');
import('../registerServer').then((m) => m.registerServer(CONFIG));
