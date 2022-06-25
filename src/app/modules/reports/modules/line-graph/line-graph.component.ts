import {AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements AfterViewInit, OnChanges {
  @Input() stdId: any;
  @Input() data: any;
  @Input() average: any;
  chart: any;
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
  constructor() { }

  ngAfterViewInit(): void {
    this.createLineGraph();
  }
  ngOnChanges(sc: SimpleChanges): void {
    if (sc.data && this.chart) {
      const shift = this.chart.data.length > 50 ? 1 : 0;
      if (!this.average) {
        const fd = sc.data.currentValue[this.stdId];
        if (fd) {
          this.chart.addData(
            {
              date: new Date().getTime(),

              engagement: fd.engagement || 0,
              mood: fd.mood_score || 0
            }, shift);
        }
      } else {
        const ab: any = Object.values(sc?.data?.currentValue).reduce((acc: any, std: any) => {
          if (std.NumberOfFaces > 0) {
            acc.engagement += std.engagement;
            acc.mood += std.mood_score;
          }
          return acc;
        }, {engagement: 0, mood: 0});
        Object.keys(ab).forEach((ky: any) => {
          if (ab[ky]) {
            ab[ky] = ab[ky] / Object.values(sc?.data?.currentValue).length;
            return ab;
          }
        });
       /* console.log(ab);*/
        this.chart.addData({...ab, date: new Date()});
      }
    }
  }
  createLineGraph(): void {
    // @ts-ignore
    let indicator: any;
    const that = this;

    am4core.useTheme(am4themes_animated);
    am4core.options.commercialLicense = true;
    this.chart = am4core.create('line-' + this.stdId, am4charts.XYChart);
    this.chart.hiddenState.properties.opacity = 0;
    this.chart.padding(0, 0, 0, 0);
    this.chart.zoomOutButton.disabled = true;
    this.chart.data = [];
    const dateAxis: any = this.chart.xAxes.push(new am4charts.DateAxis());
    const {renderer, periodChangeDateFormats} = dateAxis;
    dateAxis.dateFormats.setKey('second', 'ss');
    periodChangeDateFormats.setKey('second', '[bold]h:mm a');
    periodChangeDateFormats.setKey('minute', '[bold]h:mm a');
    periodChangeDateFormats.setKey('hour', '[bold]h:mm a');
    renderer.grid.template.location = 0;
    renderer.minGridDistance = 30;
    renderer.inside = true;
    renderer.axisFills.template.disabled = true;
    renderer.ticks.template.disabled = true;
    renderer.labels.template.fill = am4core.color('#777');
    renderer.labels.template.fontSize = '12px';

    const valueAxis: any = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.interpolationDuration = 500;
    valueAxis.rangeChangeDuration = 500;
    valueAxis.renderer.inside = true;
    const {axisFills, ticks, labels} = valueAxis.renderer;
    axisFills.template.disabled = true;
    ticks.template.disabled = true;
    labels.template.fill = am4core.color('#777');
    labels.template.fontSize = '12px';

    this.series.map((m: any) => {
      const series: any = this.chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = m.name.toLowerCase();
      series.interpolationDuration = 500;
      series.defaultState.transitionDuration = 0;

      series.tooltipText = '{' + m.name.toLowerCase() + '}';
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color(m.color);
      series.stroke = am4core.color(m.color);
      series.name = m.name;
      series.tooltipText = '{name}: [bold]{valueY}[/]';

      const bullet = series.createChild(am4charts.CircleBullet);
      bullet.circle.radius = 5;
      bullet.fillOpacity = 1;
      bullet.fill = this.chart?.colors?.getIndex(0);
      bullet.isMeasured = false;
      series.events.on('validated', () => {
        bullet.moveTo(series?.dataItems?.last?.point);
        bullet.validatePosition();
      });
    });
    this.chart.events.on('datavalidated', () => {
      dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
    });
    this.chart.events.on('beforedatavalidated', (ev: any) => {
      // check if there's data
      if (ev.target.data.length === 0) {
        showIndicator();
      }
      else {
        if (indicator) {
                hideIndicator();
              }
      }
    });

    function showIndicator(): any {
      if (indicator) {
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
      indicator.hide();
    }

    dateAxis.interpolationDuration = 500;
    dateAxis.rangeChangeDuration = 500;

// need to set this, otherwise fillOpacity is not changed and not set
    dateAxis.events.on('validated', () => {
      am4core.iter.each(dateAxis.renderer.labels.iterator(), (label: any) => {
        label.fillOpacity = label.fillOpacity;
      });
    });

// this makes date axis labels which are at equal minutes to be rotated
    dateAxis.renderer.labels.template.adapter.add('rotation', (rotation: any, target: any): number => {
      const dataItem: any = target.dataItem;
      if (dataItem.date && dataItem.date.getTime() === am4core.time.round(new Date(dataItem.date.getTime()), 'minute', 1).getTime()) {
        target.verticalCenter = 'middle';
        target.horizontalCenter = 'left';
        return -90;
      }
      else {
        target.verticalCenter = 'bottom';
        target.horizontalCenter = 'middle';
        return 0;
      }
    });
    this.chart.legend = new am4charts.Legend();
    this.chart.legend.contentAlign = 'left';
    this.chart.legend.data.map((m: any, i: any) => {
      m.fill = am4core.color(this.series[i].color);
    });
    this.chart.legend.fontSize = '12px';
    this.chart.legend.maxWidth = 100;
    this.chart.legend.labels.template.fill = am4core.color('#eee');
    this.chart.legend.markers.template.width = 12;
    this.chart.legend.markers.template.height = 12;

    this.chart.legend.labels.template.textDecoration = 'none';
    this.chart.legend.valueLabels.template.textDecoration = 'none';

    const as = this.chart.legend.labels.template.states.getKey('active');
    as.properties.textDecoration = 'line-through';
    as.properties.fill = am4core.color('#777');

    const marker = this.chart.legend.markers.template.children.getIndex(0);
    marker.horizontalCenter = 'middle';
    this.chart.legend.useDefaultMarker = true;
    this.chart.cursor = new am4charts.XYCursor();
    this.chart.cursor.xAxis = valueAxis;
  }
}
