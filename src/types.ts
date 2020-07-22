import { OpenTelemetryGdprPluginConfiguration } from 'opentelemetry-plugin-gdpr';

export interface Server {
  name: string;
  port: string | number;
  paths: string[];
  remoteUrls: string[];
  gdprTracingBaseConfiguration: OpenTelemetryGdprPluginConfiguration;
}
