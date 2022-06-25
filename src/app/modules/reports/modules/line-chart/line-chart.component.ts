/* tslint:disable:max-line-length */
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_dark from '@amcharts/amcharts4/themes/dark';
import { ApiService } from '../../../shared/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AMEvent} from '@amcharts/amcharts4/core';
import {IDateAxisEvents} from '@amcharts/amcharts4/charts';
import {BehaviourSubjectsService} from "../../../../services/behaviour-subjects.service";
import {UtilityService} from "../../../shared/services/utility.service";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @Input() stdId: any;
  @Input() config: any;
  @Input() detectChartDataChange: any;
  @Input() secMin: any;
  @Input() allSeriesData: any;
  @Output() seekVideoFrom: any = new EventEmitter();
  debounce: any;
  chartLoadCheck = false;
  params: any;
  chart: any;
  metric: any = 0;
  duration: any;
  segmentArray: any = [];
  yAxisLabels: any = [{value : 0, text: 'Camera Off'}, {value: 40, text: 'Low'}, {value: 80, text: 'Medium'}, {value: 100, text: 'High'}];
  series: any = [
    {
      name: 'Engagement',
      color: '#ff8b51'
    },
    {
      name: 'Mood',
      color: '#1393ff'
    }
  ];

  constructor(private as: ApiService,
              private bhvSub: BehaviourSubjectsService,
              private as$: ApiService,
              private zone: NgZone,
              private router: Router,
              private route: ActivatedRoute,
              private utility: UtilityService) { }

  createChart(): void {
    const that = this;
    // let indicator;
    // @ts-ignore
    this.segmentArray = this.secMin === 'Seconds' ? this.createSegment(Math.floor((this.utility.getSegmentData(this.allSeriesData.mergedDataSecWise).duration) / 4)) : this.createMinutesQuadrants();
    // console.log('Segment Array :', this.segmentArray);
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_dark);
// Themes end

// Create chart instance
    this.config.chart = am4core.create(this.stdId, am4charts.XYChart);

// Add data
    this.config.chart.data = this.secMin === 'Seconds' ? this.allSeriesData.mergedDataSecWise : this.allSeriesData.mergedDataMinWise;
    // console.log('Line Chart Data :', this.config.chart.data);

// Create axes
    const dateAxis = this.config.chart.xAxes.push(new am4charts.CategoryAxis());
    dateAxis.dataFields.category = 'segment';
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.cursorTooltipEnabled = false;

    const valueAxis = this.config.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.line.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = 110;
    valueAxis.renderer.grid.template.disabled = true;


// For categories on y-axis
    const yAxis = this.config.chart.yAxes.push(new am4charts.CategoryAxis());
    yAxis.dataFields.category = 'category';
    /*yAxis.dataFields.category = this.metric === 0 ? 'category' : 'moodCategory';*/
    // yAxis.dataFields.category =;
    yAxis.cursorTooltipEnabled = false;
    yAxis.renderer.labels.template.disabled = true;
    yAxis.renderer.grid.template.disabled = true;

// Create series -> user
    [{name: 'engagement', value: 0}, {name: 'mood', value: 1}, {name: 'average_engagement', value: 0}, {name: 'average_mood', value: 1}].forEach(line => { // {}{} => user, {}{} => overall
      const series = this.config.chart.series.push(new am4charts.LineSeries());
      if (line.value === 0 && line.name === 'engagement') {
        series.tooltipText = 'Engagement : {engagement.formatNumber(".##")}';
        series.segments.template.fill =  am4core.color('#1393ff');
        series.stroke = am4core.color('#1393ff');
        series.fill = am4core.color('#1393ff');
      }
      else if (line.value === 0 && line.name === 'average_engagement') {
        series.tooltipText = 'Overall Engagement : {average_engagement.formatNumber(".##")}';
        series.segments.template.fill = am4core.color('#ff8b51');
        series.stroke = am4core.color('#ff8b51');
        series.fill = am4core.color('#ff8b51');
      }
      else if (line.value === 1 && line.name === 'mood') {
        series.tooltipText = 'Mood : {mood.formatNumber(".##")}';
        series.segments.template.fill = am4core.color('#1393ff');
        series.stroke = am4core.color('#1393ff');
        series.fill = am4core.color('#1393ff');
      }
      else if (line.value === 1 && line.name === 'average_mood') {
        series.tooltipText = 'Overall Mood : {average_mood.formatNumber(".##")}';
        series.segments.template.fill =  am4core.color('#ff8b51');
        series.stroke = am4core.color('#ff8b51');
        series.fill = am4core.color('#ff8b51');
      }
      series.fillOpacity = 1;
      const fillModifier = new am4core.LinearGradientModifier();
      fillModifier.opacities = [0.7, 0];
      fillModifier.offsets = [0, 1];
      fillModifier.gradient.rotation = 90;
      series.segments.template.fillModifier = fillModifier;

      const {dataFields, tooltip} = series;
      dataFields.valueY = line.name;
      series.hidden = line.value !== this.metric;
      dataFields.categoryX = 'segment';
      // series.tooltipText = '{value}';
      series.strokeWidth = 2;
      series.minBulletDistance = 15;


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
      this.config.chart.cursor = new am4charts.XYCursor();
    });

// Create range grid lines
    function createRangeGrid(position: any): void {
      const range = dateAxis.axisRanges.create();
      range.category = position;
      range.grid.strokeOpacity = 0.5;
      range.label.text = '';
      range.tick.disabled = true;
      range.tick.strokeOpacity = 0.5;
      // range.tick.length = 40;
    }

// Create range labels
    function createRange(start: any, end: any, label: any): void {
      const range = dateAxis.axisRanges.create();
      range.category  = start;
      range.endCategory = end;
      range.label.text = label;
      range.label.location = 0.5;
      range.label.horizontalCenter = 'middle';
      range.label.fontWeight = 'bold';
      /*range.grid.disabled = false;*/
      range.label.inside = true;
      range.label.valign = 'top';
      range.label.events.on('hit', () => {
        dateAxis.zoomToIndexes(range.category, range.endCategory);
      });
    }

// Create range labels for Y-Axis
    function createRangeY(value: any, text: any): void {
      const range = valueAxis.axisRanges.create();
      range.value = value;
      range.label.text = text;

    }
    for ( let i = 0; i < 4; i++ ){
      createRange(this.segmentArray[i].start, this.segmentArray[i].end, this.segmentArray[i].label);
      createRangeGrid(this.segmentArray[i].start);
      createRangeY(this.yAxisLabels[i].value, this.yAxisLabels[i].text);
    }

    // Chart Cursor
    this.config.chart.cursor.lineX.stroke = am4core.color('red');
    this.config.chart.cursor.lineX.strokeWidth = 2;
    this.config.chart.cursor.lineX.strokeOpacity = 0.5;
    // this.config.chart.cursor.lineX.strokeDasharray = '';


    // Zoom Event Handlers
    dateAxis.events.on('startchanged', categoryAxisZoomed);
    dateAxis.events.on('endchanged', categoryAxisZoomed);
    function categoryAxisZoomed(ev: AMEvent<typeof dateAxis, IDateAxisEvents>['startchanged' | 'endchanged']): any {
      const axis = ev.target;
      const start = axis.getPositionLabel(axis.start);
      const end = axis.getPositionLabel(axis.end);
      // console.log('New range: ' + start + ' -- ' + end);
      if (that.debounce) {
        clearInterval(that.debounce);
      }
      that.debounce = setTimeout(() => {
        that.seekVideoFrom.emit({Start: start, End: end});
      }, 100);
    }

    // Handling Chart with no data
   /* this.chart?.events.on('beforedatavalidated', (ev: any) => {
      // check if there's data
      if (ev?.target?.data?.length === 0) {
        showIndicator();
      }
      else { // @ts-ignore
        if (indicator) {
          hideIndicator();
        }
      }
    });

    function showIndicator(): any {
      // @ts-ignore
      if (indicator) {
        // @ts-ignore
        indicator.show();
      }
      else {
        indicator = that.chart.tooltipContainer.createChild(am4core.Container);
        indicator.background.fill = am4core.color('#fff');
        indicator.background.fillOpacity = 0.2;
        indicator.width = am4core.percent(100);
        indicator.height = am4core.percent(100);

        const indicatorLabel = indicator.createChild(am4core.Label);
        indicatorLabel.text = 'No data...';
        indicatorLabel.align = 'center';
        indicatorLabel.valign = 'middle';
        indicatorLabel.fontSize = 20;
        indicatorLabel.fill = 'white';
      }
    }

    function hideIndicator(): any {
      // @ts-ignore
      indicator.hide();
    }*/
  }

// ---------------------------------------- CREATE CHART END ------------------------------------------------------


  ngOnInit(): void {
    this.route.queryParams.subscribe(next => {
      this.params = next;
    });
    this.bhvSub.engOrMood$.subscribe( (data: any) => {
      if (typeof data === 'number' && this.config.chart) {
        this.metric = data;
        const engagementSeries = this.config.chart.series.getIndex(0);
        const moodSeries = this.config.chart.series.getIndex(1);
        const allengagementSeries = this.config.chart.series.getIndex(2);
        const allavgmoodSeries = this.config.chart.series.getIndex(3);
        this.config.chart.series.values.map((ser: any, i: number) => {
          if ( this.metric === 0 ) {
            engagementSeries.show();
            moodSeries.hide();
            allengagementSeries.show();
            allavgmoodSeries.hide();
          }
          else {
            engagementSeries.hide();
            moodSeries.show();
            allengagementSeries.hide();
            allavgmoodSeries.show();
          }
        });
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.config.chart) {
      this.config.chart.dispose();
      setTimeout(() => {
      this.createChart();
      }, 1000);
    }
    else {
      this.createChart();
    }
  }

  ngOnChanges(sc: SimpleChanges): void {
    // console.log(sc);
    if (sc?.secMin) {
      if (this.chartLoadCheck) {
        if (sc.secMin.currentValue === 'Minutes') {
          let segArrInd = 0;
          this.config.chart.data = this.allSeriesData.mergedDataMinWise;
          this.segmentArray = this.createMinutesQuadrants();
          for ( let i = 0; i < 7; i++ ){
            if (i % 2 === 0) {
                this.config.chart.xAxes.values[0].axisRanges.values[i].properties.category = this.segmentArray[segArrInd].start;
                this.config.chart.xAxes.values[0].axisRanges.values[i].properties.endCategory = this.segmentArray[segArrInd].end;
                this.config.chart.xAxes.values[0].axisRanges.values[i].label.text = this.segmentArray[segArrInd].label;
                segArrInd++;
            }
            else {
                this.config.chart.xAxes.values[0].axisRanges.values[i].properties.category = this.segmentArray[segArrInd].start;
            }
          }
          this.config.chart.validateData();
        }
        else if (sc.secMin.currentValue === 'Seconds') {
          let segArrInd = 0;
          this.config.chart.data = this.allSeriesData.mergedDataSecWise;
          this.segmentArray = this.createSegment(Math.floor((this.utility.getSegmentData(this.allSeriesData.mergedDataSecWise).duration) / 4));
          for ( let i = 0; i < 7; i++ ){
            if (i % 2 === 0) {
              this.config.chart.xAxes.values[0].axisRanges.values[i].properties.category = this.segmentArray[segArrInd].start;
              this.config.chart.xAxes.values[0].axisRanges.values[i].properties.endCategory = this.segmentArray[segArrInd].end;
              this.config.chart.xAxes.values[0].axisRanges.values[i].label.text = this.segmentArray[segArrInd].label;
              segArrInd++;
            }
            else {
              this.config.chart.xAxes.values[0].axisRanges.values[i].properties.category = this.segmentArray[segArrInd].start;
            }
          }
          this.config.chart.validateData();
        }
      }

    }
    if (sc?.allSeriesData) {
      this.chartLoadCheck = true;
      if (this.config.chart) {
        this.config.chart.dispose();
        setTimeout(() => {
          this.createChart();
        }, 1000);
      }
      else {
        this.createChart();
      }
    }
  }

  createMinutesQuadrants(): any {
    const quadlength = Math.floor(this.allSeriesData.mergedDataMinWise.length / 4);
    let start = this.allSeriesData.mergedDataMinWise[0].segment === 0 ? 0 : this.allSeriesData.mergedDataMinWise[0].segment;
    let end = start + quadlength;
    const arr = [];
    for (let i = 0 ; i < 4 ; i++) {
      arr.push({start: `${start}`, end: `${end > this.allSeriesData.mergedDataMinWise.length - 1 ? this.allSeriesData.mergedDataMinWise.length - 1 : end}`, label: this.utility.convertDate(quadlength * (i), quadlength  * 4) + ' - ' + this.utility.convertDate(quadlength * (i + 1), quadlength * 4)});
      start += quadlength;
      end += quadlength;
    }
    return arr;
  }

  createSegment(duration: number): any[] {
      let start = 1;
      let end = start + Math.floor(this.allSeriesData.mergedDataSecWise.length / 4);
      const arr = [];
      for (let i = 0; i < 4 ; i++) {
        arr.push({start: `${start}`, end: end >= this.allSeriesData.mergedDataSecWise.length - 1 ? this.allSeriesData.mergedDataSecWise.length - 1 : end, label : this.utility.convertDate(duration * (i), duration  * 4) + ' - ' + this.utility.convertDate(duration * (i + 1), duration * 4)});
        start += Math.floor(this.allSeriesData.mergedDataSecWise.length / 4);
        end += Math.floor(this.allSeriesData.mergedDataSecWise.length / 4);

      }
      return arr;
    }

  ngOnDestroy(): void {
    this.chartLoadCheck = false;
    try {
      this.zone.runOutsideAngular(() => {
        if (this.chart) {
          this.config.chart.dispose();
          delete this.config.chart;
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}


