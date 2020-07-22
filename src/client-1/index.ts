import { tracingFullConfiguration, OpenTelemetryGdprPluginConfiguration } from 'opentelemetry-plugin-gdpr';
const SERVICE_NAME = 'client';
const SERVICE_PORT = process.env.PORT || 3001;
const CONFIG: OpenTelemetryGdprPluginConfiguration = {
  serviceName: SERVICE_NAME,
  location: 'Europe',
  baseTTL: 0,
  baseLegalBasis: 'Contractual',
  baseLegitimateInterest: '',
  baseAutomatedDecisionMaking: false,
  basePurpose: 'Webserver for providing our WebApp',
};
tracingFullConfiguration(CONFIG, 'https://gdpr-zipkin.sloppy.zone/api/v2/spans');

// don't know why, but opentelemetry express plugin works better when express is not yet imported
// so we initalize tracking and then import express
const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(express.static('./web'), cors());
[
  { path: '/api/userData', remoteUrl: 'http://gdpr-users-server.herokuapp.com/api1/' },
  { path: '/api/sleepData', remoteUrl: 'http://gdpr-sleep-preprocessing-serve.herokuapp.com/api1/' },
  { path: '/api/bodyHealthData', remoteUrl: 'http://gdpr-health-preprocessing-serv.herokuapp.com/api1/' },
].map((proxy) => {
  app.get(proxy.path, (req, res) => {
    // respond to the client
    res.send(`Response to path ${proxy.path} from ${SERVICE_NAME}`);

    // pass the request
    http.get(proxy.remoteUrl);
  });
});

app.get('*', (req, res) => res.send(`That's it from ${SERVICE_NAME}.`));

// app.listen(SERVICE_PORT, () => console.log(`${SERVICE_NAME} started at http://localhost:${SERVICE_PORT}`));
app.listen(SERVICE_PORT, () => console.log(`${SERVICE_NAME} started at http://localhost:${SERVICE_PORT}`));
