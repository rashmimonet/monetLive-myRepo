import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-MonetHomePage',
  templateUrl: './MonetHomePage.component.html',
  styleUrls: ['./MonetHomePage.component.css']
})
export class MonetHomePageComponent implements OnInit {
  contextObj =
    {
      first1: {
        type: 'Did you know?',
        context: [
          {
            name: [
              'For investment in corporate training',
              'Every $ returns up to $30',
              'to your business.',
              '– IBM Report: “The Value of Training”.'
            ]
          },
          {
            name: [
              'Trainees using collaborative learning environments watch',
              '30x more hours',
              'of content than learners who don’t.',
              '–  LinkedIn Learning: “Workplace Learning Report 2021”.'
            ]
          },
          {
            name: [
              'The corporate training market is expected to be',
              '$52 Billion',
              'by 2024, with 8% CAGR.',
              '– Technavio: “Corporate Training Market – Forecast and Analysis 2020-2024”'
            ]
          }
        ]
      },
      second: {
        type: 'Monet Live™ is one-of-a-kind platform that integrates AI with videoconferencing to provide real-time engagement, emotion detection and interaction analytics for live online audiences.',
        context: [
          {
            imgName: '1',
            text: 'Managers and Directors',
            list: [
              'Improve effectiveness and ROI of training initiatives.',
              'Increase employee/trainee satisfaction.',
              'Ensure compliance with business requirements.',
              'Accelerate trainings and certifications.'
            ]
          },
          {
            imgName: '2',
            text: 'Training Providers',
            list: [
              'Win more business from clients.',
              'Provide your clients with visibility through detailed analytics.',
              'Meet and exceed clients expectations for training quality and ROI.',
              'Assess and improve trainer performance.'
            ]
          }, {
            imgName: '3',
            text: 'Trainers',
            list: [
              'Improve content delivery and training performance  with granular feedback.',
              'Optimize the quality and structure of your training material.',
              'Drive better learning outcomes for individual learner needs.'
            ]
          }, {
            imgName: '4',
            text: 'Trainees',
            list: [
              'Accelerate career growth through better learning habits.',
              'Foster collaborative learning through self and peer engagement levels.',
              'Receive personalized attention during and after training.',
            ]
          },

        ]
      },
      third: {
        type: 'Platform Overview',
        context: [
          {
          iconName: 'person_add_alt',
          header: 'Easy Onboarding',
          text: 'Access through calendar and bulk invitations. Participants can use intuitively the videoconference options of audio and video.'
        },
          {
            img: true,
            iconName: 'Group1',
            header: 'Understand Your Audience',
            text: 'Identify where and why your audience felt disengaged, distracted or confused by tracking in real- time their engagement and emotions.'
          },
         {
           img: true,
            iconName: 'Group2',
            header: 'Facial Action Coding',
            text: 'Measure attentiveness levels, detect contextualized emotions, and notice if somebody in the room may have been distracting or assisting the trainee.'
          },
          {
            iconName: 'sentiment_satisfied',
            header: 'Engagement and Mood Scores',
            text: 'Intuitive categorization of participants into High, Medium, Low engagement levels and automatic grouping of participants with camera turned off.'
          },
          {
            img: true,
            iconName: 'Group4',
            header: 'Observer View',
            text: 'Allow a designated training observer to monitor participant engagement in real time.'
          },
          {
            iconName: 'notifications',
            header: 'Participant Notifications',
            text: 'Notify or privately message individual participants that need help.'
          },
          {
            img: true,
            iconName: 'Group6',
            margin: true,
            header: 'Live & Post-Session Analytics',
            text: 'Measure attentiveness levels, detect contextualized emotions, and notice if With trainer and trainee statistics, time-based playback to review, and frame by frame engagement performance for deeper analysis.'
          },
          {
            img: true,
            iconName: 'Group7',
            header: 'Customize using APIs',
            text: 'Easily integrate with other conferencing apps or business applications by using the Monet Live™ APIs.'
          },

        ]
      },
      fourth: {
        type: 'Icon',
        context: [
          {
            name: 'f',
            link: 'https://www.facebook.com/monetnetworks/'
          },
          {
            name: 'l',
            link: 'https://in.linkedin.com/company/monet-networks'
          },   {
            name: 't',
            link: 'https://twitter.com/monetnetworks?lang=en'
          },   {
            name: 'i',
            link: 'https://www.instagram.com/monetnetworks/?hl=en'
          },
        ]
      }

    };

  constructor() {
  }

  ngOnInit(): void {
  }

}
