export interface Station {
  id: number;
  station_name: string;
  cpu_usage: number;
  memory_usage: number;
  signal_strength: number;
  active_connections: number;
  status: string;
  last_telemetry_timestamp: string;
}