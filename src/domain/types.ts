export type MetricID = string & { readonly brand: unique symbol };
export type ScenarioID = string & { readonly brand: unique symbol };

export type MetricCategory = 'revenue' | 'expense' | 'growth' | 'efficiency';

export interface DataPoint {
  readonly date: string; // ISO Date
  readonly value: number;
}

export interface AppData {
  readonly metrics: ReadonlyArray<Metric>;
  readonly scenarios: ReadonlyArray<Scenario>;
  readonly config: AppConfig;
}

export type MetricType = 'currency' | 'percentage' | 'number';

export interface Metric {
  readonly id: MetricID;
  readonly name: string;
  readonly type: MetricType;
  readonly category: MetricCategory;
  readonly baselineValue: number; // Current aggregated value
  readonly history: ReadonlyArray<DataPoint>;
  readonly description?: string;
  readonly isDerived?: boolean; // If true, calculated from others (future scope)
}

export type AdjustmentType = 'growth_delta' | 'fixed_value' | 'percentage_of';

export interface Adjustment {
  readonly metricId: MetricID;
  readonly type: AdjustmentType;
  readonly value: number; // e.g. 0.12 for 12% growth
}

export interface Scenario {
  readonly id: ScenarioID;
  readonly name: string;
  readonly description: string;
  readonly adjustments: ReadonlyArray<Adjustment>;
  readonly isActive: boolean;
}

export interface AppConfig {
  readonly title: string;
  readonly refreshRateMs: number;
  readonly defaultScenarioId?: ScenarioID;
  readonly currency: string;
}

// Utility to brand strings
export const createMetricId = (id: string) => id as MetricID;
export const createScenarioId = (id: string) => id as ScenarioID;
