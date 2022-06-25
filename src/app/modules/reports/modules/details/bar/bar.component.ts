import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_dark from '@amcharts/amcharts4/themes/dark';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit, AfterViewInit {
  @Input() stdId: any;
  @Input() data: any;
  chart: any;
  constructor() { }

  ngOnInit(): void {
  }

  createChart(): void {
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
// Themes end

    this.chart = am4core.create(this.stdId, am4charts.XYChart);

// some extra padding for range labels
    this.chart.paddingBottom = 50;

    this.chart.cursor = new am4charts.XYCursor();
    this.chart.scrollbarX = new am4core.Scrollbar();

// will use this to store colors of the same items
    const colors: any = {};

    const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataItems.template.text = '{realName}';
    categoryAxis.adapter.add('tooltipText', (tooltipText: any, target: any) => {
      return categoryAxis.tooltipDataItem.dataContext.realName;
    });

    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.min = 0;

// single column series for all data
    const columnSeries = this.chart.series.push(new am4charts.ColumnSeries());
    columnSeries.columns.template.width = am4core.percent(80);
    columnSeries.tooltipText = '{provider}: {realName}, {valueY}';
    columnSeries.dataFields.categoryX = 'category';
    columnSeries.dataFields.valueY = 'value';

// second value axis for quantity
 /*   const valueAxis2 = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.renderer.opposite = true;
    valueAxis2.syncWithAxis = valueAxis;
    valueAxis2.tooltip.disabled = true;

// quantity line series
    const lineSeries = this.chart.series.push(new am4charts.LineSeries());
    lineSeries.tooltipText = '{valueY}';
    lineSeries.dataFields.categoryX = 'category';
    lineSeries.dataFields.valueY = 'quantity';
    lineSeries.yAxis = valueAxis2;
    lineSeries.bullets.push(new am4charts.CircleBullet());
    lineSeries.stroke = this.chart.colors.getIndex(13);
    lineSeries.fill = lineSeries.stroke;
    lineSeries.strokeWidth = 2;
    lineSeries.snapTooltip = true;

// when data validated, adjust location of data item based on count
    lineSeries.events.on('datavalidated', () => {
      lineSeries.dataItems.each((dataItem: any) => {
        // if count divides by two, location is 0 (on the grid)
        if (dataItem.dataContext.count / 2 === Math.round(dataItem.dataContext.count / 2)){
          dataItem.setLocation('categoryX', 0);
        }
        // otherwise location is 0.5 (middle)
        else{
          dataItem.setLocation('categoryX', 0.5);
        }
      });
    });
*/
// fill adapter, here we save color value to colors object so that each time the item has the same name, the same color is used
    columnSeries.columns.template.adapter.add('fill', (fill: any, target: any) => {
      const name = target.dataItem.dataContext.realName;
      if (!colors[name]) {
        colors[name] = this.chart.colors.next();
      }
      target.stroke = colors[name];
      return colors[name];
    });


    const rangeTemplate = categoryAxis.axisRanges.template;
    rangeTemplate.tick.disabled = false;
    rangeTemplate.tick.location = 0;
    rangeTemplate.tick.strokeOpacity = 0.6;
    rangeTemplate.tick.length = 60;
    rangeTemplate.grid.strokeOpacity = 0.5;
    rangeTemplate.label.tooltip = new am4core.Tooltip();
    rangeTemplate.label.tooltip.dy = -10;
    rangeTemplate.label.cloneTooltip = false;

///// DATA
    const chartData: any[] = [];

    const data: any =
      {
        'Segment 1': {
          'item 1': 10,
          'item 2': 35,
          'item 3': 5
        },
        'Segment 2': {
          'item 1': 15,
          'item 3': 21,
          'item 4': 20
        },
        'Segment 3': {
          'item 2': 25,
          'item 3': 11,
          'item 4': 17
        },
        'Segment 4': {
          'item 3': 12,
          'item 4': 15,
          'item 5': 20
        }
      };

// process data ant prepare it for the chart
    for (const providerName in data) {
      if (data.hasOwnProperty(providerName)) {
        const providerData = data[providerName];

        // add data of one provider to temp array
        const tempArray: any = [];
        let count = 0;
        // add items
        for (const itemName in providerData) {
          if (itemName !== 'quantity'){
            count++;
            // we generate unique category for each column (providerName + '_' + itemName) and store realName
            tempArray.push({
              category: providerName + '_' + itemName,
              realName: itemName, value: providerData[itemName],
              provider: providerName});
          }
        }
        // sort temp array
        tempArray.sort((a: any, b: any) => {
          if (a.value > b.value) {
            return 1;
          }
          else if (a.value < b.value) {
            return -1;
          }
          else {
            return 0;
          }
        });

        // add quantity and count to middle data item (line series uses it)
        const lineSeriesDataIndex = Math.floor(count / 2);
        tempArray[lineSeriesDataIndex].quantity = providerData.quantity;
        tempArray[lineSeriesDataIndex].count = count;
        // push to the final data
        am4core.array.each(tempArray, (item) => {
          chartData.push(item);
        });

        // create range (the additional label at the bottom)
        const range = categoryAxis.axisRanges.create();
        range.category = tempArray[0].category;
        range.endCategory = tempArray[tempArray.length - 1].category;
        range.label.text = tempArray[0].provider;
        range.label.dy = 30;
        range.label.truncate = true;
        range.label.fontWeight = 'bold';
        range.label.tooltipText = tempArray[0].provider;

        range.label.adapter.add('maxWidth', (maxWidth: any, target: any) => {
          const range1 = target.dataItem;
          const startPosition = categoryAxis.categoryToPosition(range1.category, 0);
          const endPosition = categoryAxis.categoryToPosition(range1.endCategory, 1);
          const startX = categoryAxis.positionToCoordinate(startPosition);
          const endX = categoryAxis.positionToCoordinate(endPosition);
          return endX - startX;
        });
      }
    }

    this.chart.data = chartData;


// last tick
    const range2 = categoryAxis.axisRanges.create();
    range2.category = this.chart.data[this.chart.data.length - 1].category;
    range2.label.disabled = true;
    range2.tick.location = 1;
    range2.grid.location = 1;
  }
  ngAfterViewInit(): void {
    this.createChart();
  }
}
