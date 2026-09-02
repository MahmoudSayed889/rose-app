import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DecimalPipe, NgClass } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DashboardPayload } from '../../core/models/dashboard.models';
import {
  StatisticsParams,
  StatisticsService,
} from '../../core/services/statistics.service';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-overview',
  imports: [ChartModule, DecimalPipe, NgClass],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  private readonly statisticsService = inject(StatisticsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _layoutService = inject(LayoutService);

  stats = signal<DashboardPayload | null>(null);
  isLoading = signal<boolean>(false);
  revenuePeriod = signal<'monthly' | 'weekly'>('monthly');

  // Orders doughnut chart
  ordersChartData = computed(() => ({
    labels: ['Completed', 'In Progress', 'Cancelled'],
    datasets: [
      {
        data: [
          this.stats()?.orderStatus?.completed?.count ?? 0,
          this.stats()?.orderStatus?.inProgress?.count ?? 0,
          this.stats()?.orderStatus?.canceled?.count ?? 0,
        ],
        backgroundColor: ['#22C55E', '#3B82F6', '#EF4444'],
        borderWidth: 0,
      },
    ],
  }));

  ordersChartOptions = {
    cutout: '70%',
    plugins: { legend: { display: false } },
    responsive: true,
    maintainAspectRatio: true,
  };

  // Revenue line chart - map RevenuePoint[] to labels and data
  revenueChartData = computed(() => ({
    labels: this.stats()?.revenue?.points?.map((p) => p.label) ?? [],
    datasets: [
      {
        data: this.stats()?.revenue?.points?.map((p) => p.revenue) ?? [],
        fill: true,
        backgroundColor: (context: {
          chart: {
            ctx: CanvasRenderingContext2D;
            chartArea: { top: number; bottom: number } | null;
          };
        }) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return 'transparent';
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, 'rgba(166,37,42,0.5)');
          gradient.addColorStop(1, 'rgba(248,177,239,0)');
          return gradient;
        },
        borderColor: '#A6252A',
        tension: 0.4,
        pointBackgroundColor: '#A6252A',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }));

  revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: '#F4F4F5' } },
      x: { grid: { display: false } },
    },
  };

  // Use percent directly from backend - no need to compute
  completedPercent = computed(
    () => this.stats()?.orderStatus?.completed?.percent ?? 0
  );
  inProgressPercent = computed(
    () => this.stats()?.orderStatus?.inProgress?.percent ?? 0
  );
  cancelledPercent = computed(
    () => this.stats()?.orderStatus?.canceled?.percent ?? 0
  );

  getTopProductBg(index: number): string {
    const bgs = [
      'top-product-gold',
      'top-product-silver',
      'top-product-bronze',
    ];

    return bgs[index] ?? 'top-product-default';
  }

  constructor() {
    effect(() => {
      this.revenuePeriod();
      this.loadStats();
    });

    this._layoutService.setToolbarItems([{ label: 'sidebar.nav.dashboard' }, { label: 'sidebar.nav.overview' }]);
  }

  loadStats(): void {
    this.isLoading.set(true);
    const params: StatisticsParams = {
      revenuePeriod: this.revenuePeriod(),
      lowStockThreshold: 10,
      topProductsLimit: 10,
      lowStockLimit: 10,
    };
    this.statisticsService
      .getStatistics(params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.stats.set(data);
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });
  }
}
