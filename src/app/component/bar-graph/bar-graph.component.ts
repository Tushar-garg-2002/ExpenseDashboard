import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Totals } from '../../interface/totals';
import { Chart, LinearScale, BarElement, Title, BarController, CategoryScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css'] // Change `styleUrl` to `styleUrls`
})
export class BarGraphComponent implements AfterViewInit, OnChanges {
  @Input()  value!: Totals;
  @ViewChild('barChart') barChart!: ElementRef;
  private totalsData: number[] = [];
  private chart: Chart | null = null;

  constructor() {
    Chart.register(LinearScale, BarController, CategoryScale, BarElement, Title, ChartDataLabels);
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.totalsData = Object.values(this.value);
      this.createChart();
    }
  }

  private createChart(): void {
    if (!this.barChart || !this.totalsData.length) return;
    if (this.chart) {
      this.chart.destroy();
    }
    const backgroundColor = this.totalsData.map((_, index) => {
      if (index === 3) {
        return "#FFD54F"; // Special color for the last item
      }
      return "#BBD0FF"; // Default color
    });

    const labels: string[] = Object.keys(this.value);
    const ctx = this.barChart.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Totals",
          backgroundColor: backgroundColor,
          data: this.totalsData
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            display: false,
            grid: {
              display: false
            },
            ticks: {
              display: false
            },
          },
          x: {
            type: "category",
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          datalabels: {
            anchor: "start",
            align: "top",
            formatter: (value: number) => {
              return value.toString();
            },
            color: "black"
          }
        }
      },
    });
  }
}
