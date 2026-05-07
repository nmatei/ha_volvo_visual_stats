import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, VolvoStatsCardConfig, CarState, WindowsDoorConfig, ClimateConfig, ChargingConfig, TirePressureConfig } from './types';
import { renderSvgOverlay } from './components/svg-base';

declare global {
  interface HTMLElementTagNameMap {
    'volvo-visual-stats': VolvoStatsCard;
  }
}

const VOLVO_CAR_IMAGE_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='; // Placeholder, will use default.PNG from assets

@customElement('volvo-visual-stats')
export class VolvoStatsCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  
  @property({ type: Object })
  public config!: VolvoStatsCardConfig;

  @state()
  private _carState: CarState = {
    windows_doors: {
      window_front_left: false,
      window_front_right: false,
      window_back_left: false,
      window_back_right: false,
      door_front_left: false,
      door_front_right: false,
      door_back_left: false,
      door_back_right: false,
      trunk: false,
      frunk: false,
    },
    climate: {
      active: false,
    },
    charging: {
      status: 'idle',
      isCharging: false,
    },
    tire_pressure: {
      front_left_warning: false,
      front_right_warning: false,
      back_left_warning: false,
      back_right_warning: false,
    },
  };

  setConfig(config: VolvoStatsCardConfig): void {
    if (!config.id_prefix && !config.entities) {
      throw new Error('Volvo Visual Stats: Missing id_prefix or entities configuration');
    }
    this.config = config;
  }

  protected firstUpdated(): void {
    this.updateCarState();
  }

  protected updated(): void {
    this.updateCarState();
  }

  private getEntityId(section: 'windows_doors' | 'climate' | 'charging' | 'tire_pressure', key: string): string | undefined {
    const idPrefix = this.config.id_prefix || 'volvo_';
    const configEntities = this.config.entities || {};
    const sectionConfig = configEntities[section] as Record<string, string> | undefined;

    // Check if override exists in config
    if (sectionConfig && sectionConfig[key]) {
      return sectionConfig[key];
    }

    // Auto-generate from prefix
    if (section === 'windows_doors' || section === 'tire_pressure') {
      return `binary_sensor.${idPrefix}${key}_open`.replace('_open_open', '_open').replace('_open_warning', '_warning');
    } else if (section === 'climate') {
      return `binary_sensor.${idPrefix}${key}_active`.replace('_active_active', '_active');
    } else if (section === 'charging') {
      return `sensor.${idPrefix}${key}_status`.replace('_status_status', '_status');
    }

    return undefined;
  }

  private updateCarState(): void {
    if (!this.hass) return;

    const newState: CarState = {
      windows_doors: {
        window_front_left: this.getEntityState(this.getEntityId('windows_doors', 'window_front_left')),
        window_front_right: this.getEntityState(this.getEntityId('windows_doors', 'window_front_right')),
        window_back_left: this.getEntityState(this.getEntityId('windows_doors', 'window_back_left')),
        window_back_right: this.getEntityState(this.getEntityId('windows_doors', 'window_back_right')),
        door_front_left: this.getEntityState(this.getEntityId('windows_doors', 'door_front_left')),
        door_front_right: this.getEntityState(this.getEntityId('windows_doors', 'door_front_right')),
        door_back_left: this.getEntityState(this.getEntityId('windows_doors', 'door_back_left')),
        door_back_right: this.getEntityState(this.getEntityId('windows_doors', 'door_back_right')),
        trunk: this.getEntityState(this.getEntityId('windows_doors', 'trunk')),
        frunk: this.getEntityState(this.getEntityId('windows_doors', 'frunk')),
      },
      climate: {
        active: this.getEntityState(this.getEntityId('climate', 'active')),
      },
      charging: {
        status: this.hass.states[this.getEntityId('charging', 'status') || '']?.state || 'idle',
        isCharging: this.getEntityState(this.getEntityId('charging', 'status')),
      },
      tire_pressure: {
        front_left_warning: this.getEntityState(this.getEntityId('tire_pressure', 'front_left_warning')),
        front_right_warning: this.getEntityState(this.getEntityId('tire_pressure', 'front_right_warning')),
        back_left_warning: this.getEntityState(this.getEntityId('tire_pressure', 'back_left_warning')),
        back_right_warning: this.getEntityState(this.getEntityId('tire_pressure', 'back_right_warning')),
      },
    };

    this._carState = newState;
  }

  private getEntityState(entityId: string | undefined): boolean {
    if (!entityId || !this.hass.states[entityId]) {
      return false;
    }
    const state = this.hass.states[entityId].state;
    return state === 'on' || state === 'true' || state === 'open';
  }

  protected render() {
    return html`
      <ha-card>
        ${this.config.title ? html`<div class="card-header">${this.config.title}</div>` : ''}
        <div class="card-content">
          <div class="car-container">
            ${renderSvgOverlay(this._carState)}
          </div>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      ha-card {
        overflow: hidden;
      }

      .card-header {
        padding: 16px;
        font-size: 16px;
        font-weight: 600;
      }

      .card-content {
        padding: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .car-container {
        width: 100%;
        max-width: 400px;
        aspect-ratio: 9 / 16;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
      }
    `;
  }
}

// Register card with Home Assistant UI picker
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'volvo-visual-stats',
  name: 'Volvo Visual Stats',
  description: 'Displays Volvo vehicle status with real-time visual indicators',
  preview: false,
});
