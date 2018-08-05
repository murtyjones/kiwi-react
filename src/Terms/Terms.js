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
  sectionLiHeading: {
    fontSize: '110%',
    fontWeight: 'bold',
    margin: '10px 0 5px 0'
  }
})

let Terms = ({ classes }) =>
  <div className={ classes.root }>
    <h1 className={ classes.header }>Terms and Conditions</h1>
    <div className={ classes.body }>

      <p>Last updated: August 04, 2018</p>


      <p>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the kiwicompute.com website (the "Service") operated by Kiwi Compute, LLC (“Kiwi Compute”, "us", "we", or "our").</p>

      <p>Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who wish to access or use the Service.</p>

      <p>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you do not have permission to access the Service.</p>


      <h2>Communications</h2>

      <p>By creating an Account on our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.</p>


      <h2>Subscriptions</h2>

      <p>The Service is billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.</p>

      <p>At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or Kiwi Compute cancels it. You may cancel your Subscription renewal either through your online account management page.</p>

      <p>If you deactivate your subscription before the end of your current billing cycle, your cancellation will be effective on the day the next cycle is set to start. In the meantime, you will retain access to our Service.</p>

      <p>Kiwi Compute, in its sole discretion, has the right to suspend or terminate your account and refuse any and all current or future use of the Service, or any other of Kiwi Compute’s services, for any reason at any time. Such termination of the Service will result in the deactivation or deletion of your Account or your access to your Account. Kiwi Compute reserves the right to refuse service to anyone for any reason at any time.</p>


      <p>A valid payment method with credit card is required to process the payment for your Subscription. You shall provide Kiwi Compute with accurate and complete billing information including full name, address, state, zip code, telephone number, and a valid payment method information. By submitting such payment information, you automatically authorize Kiwi Compute to charge all Subscription fees incurred through your account to any such payment instruments.</p>

      <p>Should automatic billing fail to occur for any reason, Kiwi Compute will issue an electronic invoice indicating that you must proceed manually, within a certain deadline date, with the full payment corresponding to the billing period as indicated on the invoice.</p>


      <h2>Fee Changes</h2>

      <p>Kiwi Compute, in its sole discretion and at any time, may modify the Subscription fees for the Subscriptions. Any Subscription fee change will become effective at the end of the then-current Billing Cycle.</p>

      <p>Kiwi Compute will provide you with a reasonable prior notice of any change in Subscription fees to give you an opportunity to terminate your Subscription before such change becomes effective.</p>

      <p>Your continued use of the Service after the Subscription fee change comes into effect constitutes your agreement to pay the modified Subscription fee amount.</p>


      <h2>Refunds</h2>

      <p>You may cancel your membership at any time at https://stage.kiwicompute.com/provider/subscriptions, but your cancellation will not take effect until the end of your current commitment period (a one-month period). You will not be entitled to a refund for any membership fee already paid.</p>


      <h2>Content</h2>

      <p>Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>

      <p>By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity. We reserve the right to terminate the account of anyone found to be infringing on a copyright.</p>

      <p>You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights. We take no responsibility and assume no liability for Content you or any third party posts on or through the Service. However, by posting Content using the Service you grant us the right and license to use, modify, perform, display, reproduce, and distribute such Content on and through the Service.</p>

      <p>Kiwi Compute has the right but not the obligation to monitor and edit all Content provided by users.</p>

      <p>In addition, Content found on or through this Service are the property of Kiwi Compute or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.</p>


      <h2>Accounts</h2>

      <p>When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.</p>

      <p>You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>

      <p>You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar or obscene.</p>


      <h2>Intellectual Property</h2>

      <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Kiwi Compute and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Kiwi Compute.</p>

      <h2>Links To Other Web Sites</h2>

      <p>Our Service may contain links to third party web sites or services that are not owned or controlled by Kiwi Compute. </p>

      <p>Kiwi Compute has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.</p>

      <p>You acknowledge and agree that Kiwi Compute shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such third party web sites or services.</p>

      <p>We strongly advise you to read the terms and conditions and privacy policies of any third party web sites or services that you visit.</p>


      <h2>Termination</h2>

      <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>

      <p>If you wish to terminate your account, you may simply discontinue using the Service.</p>

      <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>


      <h2>Indemnification</h2>

      <p>You agree to defend, indemnify and hold harmless Kiwi Compute and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) your use and access of the Service, by you or any person using your account and password; b) a breach of these Terms, or c) Content posted on the Service.</p>



      <h2>Limitation of Liability</h2>

      <p>In no event shall Kiwi Compute, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>


      <h2>Disclaimer</h2>

      <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>

      <p>Kiwi Compute, its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.</p>


      <h2>Exclusions</h2>

      <p>Some jurisdictions do not allow the exclusion of certain warranties or the exclusion or limitation of liability for consequential or incidental damages, so the limitations above may not apply to you.</p>


      <h2>Governing Law</h2>

      <p>These Terms shall be governed and construed in accordance with the laws of Texas, United States, without regard to its conflict of law provisions.</p>

      <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have had between us regarding the Service.</p>


      <h2>Changes</h2>

      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

      <p>By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.</p>


      <h2>Contact Us</h2>

      <p>
        If you have any questions about these Terms, please contact us at:

        Email:
        support@kiwicompute.com
        Address:
        Kiwi Compute
        4000 Ave A #309
        Austin, TX

      </p>



    </div>

  </div>

Terms.propTypes = {
  classes: T.object.isRequired
}

Terms = withStyles(styles, { withTheme: true })(Terms)

Terms = withoutMainNavigation(Terms)

export default Terms