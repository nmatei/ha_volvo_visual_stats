export interface HomeAssistant {
  states: Record<string, any>;
  config: any;
  call_service: (domain: string, service: string, serviceData?: any) => Promise<any>;
  callApi: (method: string, path: string, data?: any) => Promise<any>;
  locale: any;
  themes: any;
}

export interface WindowsDoorConfig {
  window_front_left?: string;
  window_front_right?: string;
  window_back_left?: string;
  window_back_right?: string;
  door_front_left?: string;
  door_front_right?: string;
  door_back_left?: string;
  door_back_right?: string;
  trunk?: string;
  frunk?: string;
}

export interface ClimateConfig {
  active?: string;
}

export interface ChargingConfig {
  status?: string;
}

export interface TirePressureConfig {
  front_left_warning?: string;
  front_right_warning?: string;
  back_left_warning?: string;
  back_right_warning?: string;
}

export interface EntitiesConfig {
  windows_doors?: WindowsDoorConfig | Record<string, never>;
  climate?: ClimateConfig | Record<string, never>;
  charging?: ChargingConfig | Record<string, never>;
  tire_pressure?: TirePressureConfig | Record<string, never>;
}

export interface VolvoStatsCardConfig {
  type: string;
  id_prefix?: string;
  entities?: EntitiesConfig;
  title?: string;
  theme?: string;
}

export interface WindowsDoorState {
  window_front_left: boolean;
  window_front_right: boolean;
  window_back_left: boolean;
  window_back_right: boolean;
  door_front_left: boolean;
  door_front_right: boolean;
  door_back_left: boolean;
  door_back_right: boolean;
  trunk: boolean;
  frunk: boolean;
}

export interface ClimateState {
  active: boolean;
}

export interface ChargingState {
  status: string | boolean;
  isCharging: boolean;
}

export interface TirePressureState {
  front_left_warning: boolean;
  front_right_warning: boolean;
  back_left_warning: boolean;
  back_right_warning: boolean;
}

export interface CarState {
  windows_doors: WindowsDoorState;
  climate: ClimateState;
  charging: ChargingState;
  tire_pressure: TirePressureState;
}
