import {AfterViewInit, Component, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_dark from '@amcharts/amcharts4/themes/dark';
import * as am4charts from '@amcharts/amcharts4/charts';
import {ApiService} from '../../../shared/services/api.service';
import {BehaviourSubjectsService} from '../../../../services/behaviour-subjects.service';

@Component({
  selector: 'app-overall-line-chart',
  templateUrl: './overall-line-chart.component.html',
  styleUrls: ['./overall-line-chart.component.scss']
})
export class OverallLineChartComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() stdId: any;
  @Input() overallData: any;
  chart: any;
  engOrMood: any = 0;
  yAxisLabels: any = [{value: 40, text: 'Low'}, {value: 80, text: 'Medium'}, {value: 100, text: 'High'}];

  constructor( private zone: NgZone, private as: ApiService, private  bhvSub: BehaviourSubjectsService) {}

  createChart(): void {
    // @ts-ignore
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_dark);
// Themes end

// Create chart instance
    this.chart = am4core.create('overalllineChart', am4charts.XYChart);

// Add data
    this.chart.data = this.overallData;
// Create axes
    const dateAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    dateAxis.dataFields.category = 'segment';
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.cursorTooltipEnabled = false;

    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.line.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = 110;
    valueAxis.renderer.grid.template.disabled = true;


// For categories on y-axis
    const yAxis = this.chart.yAxes.push(new am4charts.CategoryAxis());
    yAxis.dataFields.category = this.engOrMood ? 'moodCategory' : 'category';
    yAxis.cursorTooltipEnabled = false;
    yAxis.renderer.labels.template.disabled = true;
    yAxis.renderer.grid.template.disabled = true;


// Create series
    const series = this.chart.series.push(new am4charts.LineSeries());
    series.tooltipText = this.engOrMood ? 'Mood : {average_mood.formatNumber(".##")}' : 'Engagement : {average_engagement.formatNumber(".##")}';
    series.fillOpacity = 1;
    const fillModifier = new am4core.LinearGradientModifier();
    fillModifier.opacities = [0.7, 0];
    fillModifier.offsets = [0, 1];
    fillModifier.gradient.rotation = 90;
    series.segments.template.fillModifier = fillModifier;
    const {dataFields, tooltip} = series;
    dataFields.valueY = this.engOrMood ? 'average_mood' : 'average_engagement';
    series.hidden = false;
    dataFields.categoryX = 'segment';
    // series.tooltipText = '{value}';
    series.strokeWidth = 2;
    series.minBulletDistance = 15;

// Range Axis
    function createRangeY(value: any, text: any): void {
      const range = valueAxis.axisRanges.create();
      range.value = value;
      range.label.text = text;

    }
    for ( let i = 0; i < 3; i++ ){
      if (this.yAxisLabels) {
      createRangeY(this.yAxisLabels[i].value, this.yAxisLabels[i].text);
      }
    }

// Drop-shaped tooltips
    tooltip.background.cornerRadius = 20;
    tooltip.background.strokeOpacity = 0;
    tooltip.pointerOrientation = 'vertical';
    tooltip.label.minWidth = 20;
    tooltip.label.minHeight = 20;
    tooltip.label.textAlign = 'middle';
    tooltip.label.textValign = 'middle';

// Make bullets grow on hover
    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color('#fff');

    const bullethover = bullet.states.create('hover');
    bullethover.properties.scale = 1.3;
    this.chart.cursor = new am4charts.XYCursor();
  }

  ngOnInit(): void {
    this.bhvSub.engOrMood$.subscribe((data: any) => {
      this.engOrMood = data;
      if (this.chart) {
        this.chart.dispose();
        setTimeout(() => {
          this.createChart();
        }, 1000);

      }
      else {
        this.createChart();
      }
    });
  }


  ngAfterViewInit(): void {
    // console.warn(this.chart.isDisposed());
    if (this.chart) {
      this.chart.dispose();
      setTimeout(() => {
        this.createChart();
      }, 1000);

    }
    else {
      this.createChart();
    }
  }

  ngOnChanges(sc: SimpleChanges): void {
    if (sc?.overallData) {
      // console.warn(sc);
      if (this.chart) {
        this.chart.dispose();
        setTimeout(() => {
          this.createChart();
        }, 1000);

      }
      else {
        this.createChart();
      }
    }
  }

  ngOnDestroy(): void {
    try {
      this.zone.runOutsideAngular(() => {
        if (this.chart) {
          this.chart.dispose();
          delete this.chart;
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}
