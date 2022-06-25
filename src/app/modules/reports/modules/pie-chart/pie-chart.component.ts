import {AfterViewInit, Component, OnInit, Input, OnDestroy, NgZone} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_dark from '@amcharts/amcharts4/themes/dark';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4plugins_sliceGrouper from '@amcharts/amcharts4/plugins/sliceGrouper';

import {CategoryFilterPipe} from '../../../shared/pipes/category-filter.pipe';
import {ApiService} from '../../../shared/services/api.service';
import {Subscription} from 'rxjs';
import {BehaviourSubjectsService} from "../../../../services/behaviour-subjects.service";
import {UtilityService} from "../../../shared/services/utility.service";
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, AfterViewInit, OnDestroy {
  chartReg: any = {};
  subscription: Subscription;
  chart: any;
  engOrMood: any;
  categoryCount: any = {
    High: 0,
    Medium: 0,
    Low: 0,
    CamOff: 0
  };
  @Input() inpIn?: string;
  @Input() pieChartData: any;


  constructor(private categoryPipe: CategoryFilterPipe, private as: ApiService,  private zone: NgZone , private bhvSub: BehaviourSubjectsService, private utility: UtilityService) {
    this.subscription = this.bhvSub.engOrMood$.subscribe( (data: any) => {
      this.engOrMood = data;
    });
  }

  createChart(): void {
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    am4core.options.commercialLicense = true;
// Themes end

// Create chart instance
    this.chart = am4core.create(this.inpIn, am4charts.PieChart);
    this.chart.radius = am4core.percent(40);


      this.chart.data = [{
      category: 'HIGH',
      categoryValue:  `${!this.engOrMood ? this.pieChartData.hi_percentage[1].uuid.length : this.pieChartData.hi_percentage[2].uuid.length } ${!this.engOrMood ? this.pieChartData.hi_percentage[1].uuid.length === 1 ? 'Student' : 'Students' : this.pieChartData.hi_percentage[2].uuid.length === 1 ? 'Student' : 'Students'}`,
      value: !this.engOrMood ? this.pieChartData.hi_percentage[0] : this.pieChartData.hi_percentage[3],
      color: am4core.color('#1FA000'),
      },
      {
      category: 'MID',
      categoryValue:  `${!this.engOrMood ? this.pieChartData.med_percentage[1].uuid.length : this.pieChartData.med_percentage[2].uuid.length} ${!this.engOrMood ? this.pieChartData.med_percentage[1].uuid.length === 1 ? 'Student' : 'Students' : this.pieChartData.med_percentage[2].uuid.length === 1 ? 'Student' : 'Students'}`,
      value: !this.engOrMood ? this.pieChartData.med_percentage[0] : this.pieChartData.med_percentage[3],
      color: am4core.color('#D5AD2A'),
      },
      {
      category: 'LOW',
      categoryValue:  `${!this.engOrMood ? this.pieChartData.low_percentage[1].uuid.length : this.pieChartData.low_percentage[2].uuid.length} ${!this.engOrMood ? this.pieChartData.low_percentage[1].uuid.length === 1 ? 'Student' : 'Students' : this.pieChartData.low_percentage[2].uuid.length === 1 ? 'Student' : 'Students'}`,
      value: !this.engOrMood ? this.pieChartData.low_percentage[0] : this.pieChartData.low_percentage[3],
      color: am4core.color('#BA0E15'),
      },
   /*   {
      category: 'CAM OFF',
      // categoryValue: this.categoryCount.Low + 'Students',
      categoryValue:  `${this.pieChartData.camoff_percentage[1].uuid.length} ${this.pieChartData.camoff_percentage[1].uuid.length === 1 ? 'Student' : 'Students'}`,
      value: this.pieChartData.camoff_percentage[0],
      color: am4core.color('#262525'),
      }*/
      ];
    // console.error('CHECK :', this.chart.data);

// Add and configure Series
    const pieSeries = this.chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'category';
    pieSeries.slices.template.propertyFields.fill = 'color';
    pieSeries.slices.template.strokeOpacity = 1;
    /*const label = this.chart.seriesContainer.createChild(am4core.Label);
    label.text = this.userLength;
    label.horizontalCenter = 'middle';
    label.verticalCenter = 'middle';
    label.fontSize = 16;*/
// This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    // Wrap Labels
    pieSeries.labels.template.maxWidth = 130;
    pieSeries.labels.template.wrap = true;
    // pieSeries.labels.template.text = '[{color}]{category}\n [#FFFFFF]{categoryValue} students\n{value.formatNumber(".##")}%';
    pieSeries.slices.template.tooltipText = '{category} : {value.formatNumber(".##")}%';

    pieSeries.labels.template.adapter.add('text', (label: any, target: any, key: any) => {

      if (target.dataItem && (target.dataItem.category === 'CAM OFF')) {
        // target.html = '<div style="text-align: center;"><span style="color: #888787">{category}</span><br>{categoryValue}<br>{value.formatNumber(".##")}%</div>';
        target.html = '<div style="text-align: center;"><span style="color: #888787">{category}</span><br>{value.formatNumber(".##")}%<br>{categoryValue}</div>';

      } else {
        // target.html = '<div style="text-align: center;"><span style="color: {color}">{category}</span><br>{categoryValue}<br>{value.formatNumber(".##")}%</div>';
        target.html = '<div style="text-align: center;"><span style="color: {color}">{category}</span><br>{value.formatNumber(".##")}%<br>{categoryValue}</div>';
      }

    });

    // pieSeries.labels.template.background.fill = am4core.color("#eee");
    // pieSeries.labels.template.align = 'center';
    pieSeries.alignLabels = true;
    pieSeries.labels.template.radius = am4core.percent(10);
    // pieSeries.labels.template.padding(15, 10, 10, 10);
    pieSeries.ticks.template.disabled = false;
    pieSeries.ticks.template.stroke = am4core.color('white');
    pieSeries.ticks.template.strokeWidth = 1;
    // pieSeries.ticks.template.strokeDashoffset = 1;
    pieSeries.ticks.template.strokeOpacity = 1;
    pieSeries.ticks.template.length = 2;

    const grouper = pieSeries.plugins.push(new am4plugins_sliceGrouper.SliceGrouper());
    grouper.threshold = 0;
    grouper.groupName = 'Other';
    grouper.clickBehavior = 'none';

    this.chart.hiddenState.properties.radius = am4core.percent(0);
  }

  ngOnInit(): void {
    this.pieChartData.UAE = this.pieChartData.UAE.map((el: any) => {
      el.category = this.utility.setCategory(el.average);
      el.moodCategory = this.utility.setCategory(el.average_mood);
      return el;
    });
    const categories: any = [];
    this.pieChartData.UAE.map((el: any) => {
      categories.push(el.category);
    });
    const counteCategories = categories.reduce( (allCat: any, Cat: any) => {
      if (Cat in allCat) {
        allCat[Cat]++;
      }
      else {
        allCat[Cat] = 1;
      }
      return allCat;
    }, {});
    this.categoryCount.High = counteCategories.High;
    this.categoryCount.Medium = counteCategories.Medium;
    this.categoryCount.Low = counteCategories.Low;

    this.bhvSub.engOrMood$.subscribe( (data: any) => {
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
    setTimeout( () => {
      if (this.chart) {
        this.chart.dispose();
        setTimeout(() => {
          this.createChart();
        }, 1000);

      }
      else{
      this.createChart();
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
