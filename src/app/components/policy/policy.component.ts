import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  constructor() { }

  terms = [
    {
      name: 'PRIVACY POLICY',
      content: 'Monet multimedia platform consisting of websites, services, software applications and networks (“Monet”) allows you to optionally upload and share multimedia content and assist you in understanding and monitoring non-verbal communications on the internet and thereby enriching your overall web experience. Monet believes in informed consent and full disclosure of the use of data collected. You may visit this site as an unregistered visitor. However, to access all the features and use the site, you will have to register as a member. During the registration with Monet and optionally uploading images and videos, you provide some personal information about you. Your privacy is important to us. Monet is committed to safeguarding and preserving your privacy when you visit our site or communicate electronically with us. This Privacy Policy, together with our Terms of Use, provides an explanation as to what happens to any personal data that you provide to us, or that we collect from you. By using or accessing Monet, you agree to our privacy practices outlined below.'
    },
    {
      name: 'TABLE OF CONTENTS',
      content: '1. Collection of information 2. Cookies 3. Using your personal data 4. Other disclosures 5. Data transfer 6. Security of your personal data 7. Children’s privacy 8. Policy amendments 9. Your rights 10. Third party websites 11. Updating information 12. Business transition 13. Contact information'
    },
    {
      name: '(1) Collection of information',
      content: 'Monet is the sole owner of information collected on this website. We will not share, sell, or trade this information to third parties in ways different from what is disclosed in this Privacy Policy. We may collect and store the following kinds ofdata/information: (a) Information automatically collected during your visit to this website (as a visitor or a member): (i) information about your computer or mobile device, including type and model, operating system, carrier name, IP addresses, type of browser, network connection type (e.g. Wi-Fi or cellular) and identifiers assigned to your device, such as its iOS Identifier for Advertising (IDFA), Android Advertising ID, or unique device identifier (a number uniquely allocated to your device by your device manufacturer); (ii) information and about your visits to and use of this website, such as your IP address, geographical location, the time and your time zone, referral source, length of visit, number of page views and your interaction with the viewed pages; and (iii) information relating to any transactions carried out between you and us on or in relation to this website, including information relating to any website settings that you specify or purchases you make of our goods or services; (b) Information provided by you/collected by us: (i) information that you provide to us for the purpose of registering with us, logging in and using the functionality of the website; (ii) information that you provide to us for the purpose of subscribing to electronic notifications and/or newsletters; (iii) information you provide to us including images and videos, for the purpose of using our website services (such images and videos may include images and videos of you, if you upload or provide us with such images and videos); (iv) records of your correspondence with us (including email addresses and phone numbers) if you contact us; (v) your responses to surveys that we might ask you to complete for research purposes; and (vi) any other information provided by you. (c) Multimedia data: Multimedia Data will be collected when you participate in interactive web applications. This video data can include images and video of you or your likeness and will be used by Monet to train its computer algorithms for measurement and communication of certain metrics including emotions and general mood of the user. Monet may further use this data to enhance its current services or evaluate its future services.'
    },
    {
      name: '(2) Cookies',
      content: 'We use cookies on this website. A cookie is a text file sent by a web server to a web browser and stored by the browser. The text file is then sent back to the server each time the browser requests a page from the server. This enables the web server to identify the web browser and provide personalized services to you. We may send a cookie which may be stored by your browser on your computer’s hard drive. We may use the information we obtain from the cookie in the administration of this website, to improve the website’s usability and for approved marketing purposes. We may also use that information to recognise your computer when you visit our website, and to personalise our website for you. Our advertisers and partners may also send you cookies. Most browsers allow you to refuse to accept cookies. This may however, disable accessibility to some of the features of the websites.'
    },
    {
      name: '(3) Using your personal data',
      content: 'Personal data submitted on this website may be used for the purposes specified in this privacy policy or in relevant parts of the website. We may use your personal information to: (a) administer the website; (b) improve your browsing experience by personalizing the website; (c) enable your use of the services available on the website; (d) send to your goods purchased via the website, and supply to your services purchased via the website; (e) collect payments from you; (f) send you general (non-marketing) commercial communications; (g) send you electronic notifications which you have specifically requested; (h) send to you our newsletter and other marketing communications (relating to our business or the businesses of carefully-selected third parties, which we think may be of interest to you, by post or, where you have specifically agreed to this, by email, SMS or similar technology. You can inform us at any time if you no longer require marketing communications to be sent by emailing us at unsubscribe@youmonet.com; (i) provide select partners with information sufficient to create analytics and statistical information and further enhance Monet’s current and future offerings; (j) provide third parties with statistical information about our users – but this information will not be used to identify any individual user; (k) deal with enquiries and complaints made by or about you relating to the website; and (l) other uses that do not conflict with this Privacy Policy. We will not without your express consent provide your personal information to any third parties for the purpose of direct marketing. Although we do not provide your personal information to organizations for whom we conduct market research, please note that it may be possible to identify you by reference to your video image and we may, with your consent, allow the videos you upload to our website to be used by us or our clients for promotional purposes.'
    },
    {
      name: '(4) Other disclosures',
      content: 'In addition to the disclosures reasonably necessary for the purposes identified elsewhere in this privacy policy, we may disclose information about you: (a) to the extent that we are required to do so by law; (b) in connection with any legal proceedings or prospective legal proceedings; (c) in order to establish, exercise or defend our legal rights (including providing information to others for the purposes of fraud prevention and reducing credit risk); and (d) to our affiliates and subsidiaries; and (e) to the purchaser (or prospective purchaser) of any business or asset which we are (or are contemplating) selling. Except as provided in this privacy policy, we will not provide your information to third parties.'
    },
    {
      name: '(5) Data transfers',
      content: 'Information that we collect may be stored and processed in and transferred between any of the countries in which we operate in order to enable us to use the information in accordance with this privacy policy. Information which you provide may be transferred to countries some of which do not have data protection laws equivalent to those in force in the United States. You expressly agree to such transfers.'
    },
    {
      name: '(6) Security of your personal data',
      content: 'We will take reasonable technical and organisational precautions to prevent the loss, misuse or alteration of your personal information. We store all the personal information you provide on our secure servers. All electronic transactions you make to or receive from us will be encrypted using SSL technology to prevent unauthorized access to your account information. We invest in security technology and aim to ensure that our processes meet or exceed industry standards. Of course, data transmission over the internet is inherently insecure, and we cannot guarantee the security of data sent over the internet. However, we will notify you in case we observe any security breach. You are responsible for keeping your password and user details confidential. We will not ask you for your password. Please do not share your pass word with others. Change your password regularly.'
    },
    {
      name: '(7) Children’s privacy',
      content: 'If you are under 13 years of age, you are not permitted to access this website. We do not collect or maintain personally identifiable data from children below 13 years of age. If we notice or it is brought to our notice that such information is collected, we will ensure to delete such information and terminate such account. A parent or legal guardian of a child under 13 years, who has become a member of this website, may contact us at privacy@youmonet.com to have that child’s account terminated and information deleted.'
    },
    {
      name: '(8) Policy amendments',
      content: 'Changes to the policy – in particular as to permissible uses of personal data: personal information collected on one basis will not be used for a different purpose by changing the terms of the privacy policy, without duly informing you. We may update this privacy policy from time-to-time by posting a new version on our website. You should check this page occasionally to ensure you are happy with any changes. Your continued use of this site constitutes your acceptance of the changes. If you are registered with Monet, we will notify you of changes in our privacy policy by email.'
    },
    {
      name: '(9) Your rights',
      content: 'You may instruct us to provide you with any personal information we hold about you. You may instruct us not to process your personal data for marketing purposes by email to privacy@youmonet.com at any time. California residents may further obtain the personalized information retained by us by sending us a written request at the address provided below.'
    },
    {
      name: '(10) Third party websites',
      content: 'We may provide links to third-party websites, such as those of our business partners and online advertisers. These sites may collect information about you. Since we do not control the information policies or practices of these third parties, you should review their privacy policies to learn more about how they collect and use personally identifiable information. We are not responsible for the privacy policies or practices of third party websites.'
    },
    {
      name: '(11) Updating information',
      content: 'Please let us know if the personal information which we hold about you needs to be corrected or updated. You can change your personal information by logging into your account page. The same will be corrected/updated within a reasonable time.'
    },
    {
      name: '(12) Business Transitions',
      content: 'In the event that Monet goes through a business transition, such as a merger, acquisition by another company, or the sale of a portion of its assets, members’ personal information will, in most instances, be part of the assets transferred. Members will be notified prior to a change of ownership or control over their personal information. If, as a result of the business transition, members’ personally identifiable information will be used in a manner different from that stated at the time of collection, they will be given a choice not to have their information used in this different manner as described in the Notification of Changes section, above.'
    },
    {
      name: '(13) Contact information',
      content: 'If you have any questions about this privacy policy or our treatment of your personal data, please send email to us at privacy@monet.com or by post to Monet Privacy, Kalara Law Firm 1055 W 7th Street # 650 Los Angeles, CA 90017, We will respond to your mail and take appropriate steps to resolve any issue within 21 days of receipt of your mail.'
    }
  ];

  ngOnInit(): void { }

}
