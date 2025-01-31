import React from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import withoutMainNavigation from '../hocs/withoutMainNavigation'

const styles = () => ({
  root: {
    height: '100%',
    width: '900px',
    margin: 'auto',
    padding: '15vh 0 25vh 0',
    boxSizing: 'border-box'
  },
  body: {
    overflow: 'scroll',
    maxHeight: '100%',
    padding: 20,
    boxSizing: 'border-box',
    '&::-webkit-scrollbar': {
      width: 10
    },

    /* Track */
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1'
    },

    /* Handle */
    '&::-webkit-scrollbar-thumb': {
      background: '#888'
    },

    /* Handle on hover */
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555'
    }
  },
  header: {
    textAlign: 'center',
    WebkitTextAlign: 'center'
  },
  link: {
    display: 'block',
    marginTop: 15,
    textAlign: 'center',
    WebkitTextAlign: 'center'
  },
})

let PrivacyPolicy = ({ classes }) =>
  <div className={ classes.root }>
    <h1 className={ classes.header }>Privacy Policy</h1>
    <div className={ classes.body }>
      
      <p>Effective date: August 04, 2018</p>


      <p>Kiwi Compute (“Kiwi Compute”, "us", "we", or "our") operates the kiwicompute.com website (hereinafter referred to as the "Service").</p>

      <p>This page informs you of our policies regarding the collection, use and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

      <p>We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from kiwicompute.com/terms</p>

      <h2>Definitions</h2>
      <ul>
        <li>
          <p><strong>Service</strong></p>
          <p>Service is the kiwicompute.com website operated by Kiwi Compute</p>
        </li>
        <li>
          <p><strong>Personal Data</strong></p>
          <p>Personal Data means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).</p>
        </li>
        <li>
          <p><strong>Usage Data</strong></p>
          <p>Usage Data is data collected automatically either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
        </li>
        <li>
          <p><strong>Cookies</strong></p>
          <p>Cookies are small files stored on your device (computer or mobile device).</p>
        </li>
        <li>
          <p><strong>Data Controller</strong></p>
          <p>Data Controller means the natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal information are, or are to be, processed.</p>
          <p>For the purpose of this Privacy Policy, we are a Data Controller of your Personal Data.</p>
        </li>
        <li>
          <p><strong>Data Processors (or Service Providers)</strong></p>
          <p>Data Processor (or Service Provider) means any natural or legal person who processes the data on behalf of the Data Controller.</p>
          <p>We may use the services of various Service Providers in order to process your data more effectively.</p>
        </li>
        <li>
          <p><strong>Data Subject (or User)</strong></p>
          <p>Data Subject is any living individual who is using our Service and is the subject of Personal Data.</p>
        </li>
      </ul>


      <h2>Information Collection and Use</h2>
      <p>We collect several different types of information for various purposes to provide and improve our Service to you. You can always opt not to disclose some information to us, but keep in mind some information may be needed to register with Kiwi Compute or to take advantage of some of our special features.</p>

      <h3>Types of Data Collected</h3>

      <h4>Personal Data</h4>
      <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>

      <ul>
        <li>Email address</li>    <li>First name and last name</li>            <li>Cookies and Usage Data</li>
      </ul>

      <p>We may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send or by contacting us.</p>

      <h4>Usage Data</h4>

      <p>We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>


      <h4>Tracking & Cookies Data</h4>
      <p>We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information.</p>

      <p>Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and to improve and analyze our Service.</p>

      <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>

      <p>Examples of Cookies we use:</p>
      <ul>
        <li><strong>Session Cookies.</strong> We use Session Cookies to operate our Service.</li>
        <li><strong>Preference Cookies.</strong> We use Preference Cookies to remember your preferences and various settings.</li>
        <li><strong>Security Cookies.</strong> We use Security Cookies for security purposes.</li>
      </ul>

      <h2>Use of Data</h2>
      <p>Kiwi Compute uses the collected data for various purposes:</p>
      <ul>
        <li>To provide and maintain our Service</li>
        <li>To notify you about changes to our Service</li>
        <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
        <li>To provide customer support</li>
        <li>To gather analysis or valuable information so that we can improve our Service</li>
        <li>To monitor the usage of our Service</li>
        <li>To detect, prevent and address technical issues</li>
        <li>To provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information</li></ul>


      <h2>Legal Basis for Processing Personal Data under the General Data Protection Regulation (GDPR)</h2>
      <p>If you are from the European Economic Area (EEA), Kiwi Compute legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Data we collect and the specific context in which we collect it.</p>
      <p>Kiwi Compute may process your Personal Data because:</p>
      <ul>
        <li>We need to perform a contract with you</li>
        <li>You have given us permission to do so</li>
        <li>The processing is in our legitimate interests and it is not overridden by your rights</li>
        <li>For payment processing purposes</li>    <li>To comply with the law</li>
      </ul>


      <h2>Retention of Data</h2>
      <p>Kiwi Compute will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes and enforce our legal agreements and policies.</p>
      <p>Kiwi Compute will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer periods.</p>

      <h2>Transfer of Data</h2>
      <p>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.</p>
      <p>If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.</p>
      <p>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
      <p>Kiwi Compute will take all the steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</p>

      <h2>Disclosure of Data</h2>
      <h3>Business Transaction</h3>
      <p>If Kiwi Compute is involved in a merger, acquisition, bankruptcy or asset sale, your Personal Data may be transferred. We will provide notice before your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>

      <h3>Disclosure for Law Enforcement</h3>
      <p>Under certain circumstances, Kiwi Compute may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>

      <h3>Legal Requirements</h3>
      <p>Kiwi Compute may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
      <ul>
        <li>To comply with a legal obligation</li>
        <li>To protect and defend the rights or property of Kiwi Compute</li>
        <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
        <li>To protect the personal safety of users of the Service or the public</li>
        <li>To protect against legal liability</li>
      </ul>

      <h2>Security of Data</h2>
      <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

      <h2>Our Policy on "Do Not Track" Signals under the California Online Protection Act (CalOPPA)</h2>
      <p>We do not support Do Not Track ("DNT"). Do Not Track is a preference you can set in your web browser to inform websites that you do not want to be tracked.</p>
      <p>You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web browser.</p>

      <h2>Service Providers</h2>
      <p>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), provide the Service on our behalf, perform Service-related services or assist us in analysing how our Service is used.</p>
      <p>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>

      <h3>Analytics</h3>
      <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
      <ul>
        <li>
          <p><strong>Google Analytics</strong></p>
          <p>Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.</p>

          <p>You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js and dc.js) from sharing information with Google Analytics about visits activity.</p>

          <p>For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page: <a href="https://policies.google.com/privacy?hl=en">https://policies.google.com/privacy?hl=en</a></p>
        </li>
      </ul>


      <h3>Payments</h3>
      <p>We may provide paid products and/or services within the Service. In that case, we may use third-party services for payment processing (e.g. payment processors).</p>
      <p>We will not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information.</p>
      <p>The payment processors we work with are:</p>
      <ul>
        <li>
          <p><strong>Stripe</strong></p>
          <p>Their Privacy Policy can be viewed at <a href="https://stripe.com/us/privacy">https://stripe.com/us/privacy</a></p>
        </li>
      </ul>


      <h2>Links to Other Sites</h2>
      <p>Our Service may contain links to other sites that are not operated by us. If you click a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
      <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>


      <h2>Children's Privacy</h2>
      <p>We do not collect Personal Information from students under 13. If you are a student under 13, please do not send any Personal Information about yourself to us. If Kiwi Compute learns that it collected Personal Information from a student under 13 without parental consent being obtained by his or her parent, or guardian, Kiwi Compute will delete that information as soon as is reasonably possible having regard to the circumstances. If you believe that a student under 13 may have provided Kiwi Compute with personal information in violation of this paragraph, please contact us at support@kiwicompute.com.</p>

      <p>If you would like to request that Children’s Personal Information regarding your child be updated or deleted, please contact us at support@kiwicompute.com. A minor student’s participation in our Services, and the ability of a minor student to access the Services, will not be conditioned on that student providing more Children’s Personal Information than is reasonably necessary for that participation or access. We will respond to a request made pursuant to this section within 30 days of our receipt of such request.</p>

      <p>To request removal of your Personal Information or Children’s Personal Information from our public forums, contact us at support@kiwcompute.com. In some cases, Kiwi Compute may not be able to remove your information, in which case we will let you know if we are unable to do so and why.</p>




      <h2>Changes to This Privacy Policy</h2>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
      <p>We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.</p>
      <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>


      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us:</p>
      <ul>
        <li>By email: support@kiwicompute.com</li>

      </ul>


    </div>

  </div>

PrivacyPolicy.propTypes = {
  classes: T.object.isRequired
}

PrivacyPolicy = withStyles(styles, { withTheme: true })(PrivacyPolicy)

PrivacyPolicy = withoutMainNavigation(PrivacyPolicy)

export default PrivacyPolicy