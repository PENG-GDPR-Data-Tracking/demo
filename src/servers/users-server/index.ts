import { tracingFullConfiguration } from 'opentelemetry-plugin-gdpr';
import { Server } from '../../types';

const CONFIG: Server = {
  name: 'users-server',
  port: process.env.PORT || 8001,
  paths: ['/api1'],
  remoteUrls: ['https://gdpr-sleep-database.herokuapp.com/api1', 'https://gdpr-statistics-server.herokuapp.com/api1'],
  gdprTracingBaseConfiguration: {
    serviceName: 'users-server',
    location: 'USA',
    baseTTL: 0,
    baseLegalBasis: 'Contractual',
    baseLegitimateInterest: '',
    baseAutomatedDecisionMaking: false,
    basePurpose: 'Providing user data (such as name, e-mail, password) for the WebApp',
  },
};

tracingFullConfiguration(CONFIG.gdprTracingBaseConfiguration, 'https://gdpr-zipkin.sloppy.zone/api/v2/spans');
import('../registerServer').then((m) => m.registerServer(CONFIG));
