import React from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import withoutMainNavigation from '../hocs/withoutMainNavigation'
import Link from "react-router-dom/Link";

const styles = () => ({
  root: {
    height: '100%',
    width: '650px',
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

      <p>
        We at Kiwi Compute (“Kiwi Compute”, “we”, “us”, “our”) know that our users (“you,” “your”) care about how your personal information is used and shared, and Kiwi Compute takes your privacy seriously. Please read the following to learn more about Kiwi Compute’s Privacy Policy. By visiting or using the Kiwi Compute’s Website or Services in any manner, you acknowledge that you accept the practices and policies outlined in this Privacy Policy, and you hereby consent that Kiwi Compute will collect, use, and share your information in the following ways.
      </p>


      <h2>I. What Does This Privacy Policy Cover?</h2>

      <p>
        This Privacy Policy covers Kiwi Compute’s treatment of personally identifiable information (“Personal Information”) that it gathers when you are accessing or using its Services. This policy does not apply to the practices of companies that we do not own or control, or to individuals that Kiwi Compute does not employ or manage. If you are not of legal age to form a binding contract (in many jurisdictions, this age is 18), you may only use the Services and disclose information to Kiwi Compute with your parent’s or legal guardian’s express consent. Review this Privacy Policy with your parent or legal guardian to make sure you understand it.
      </p>

      <p>
        We do not collect Personal Information from students under 13. If you are a student under 13, please do not send any Personal Information about yourself to us. If Kiwi Compute learns that it collected Personal Information from a student under 13 without parental consent being obtained by his or her parent, or guardian, Kiwi Compute will delete that information as soon as is reasonably possible having regard to the circumstances. If you believe that a student under 13 may have provided Kiwi Compute with personal information in violation of this paragraph, please contact us at support@kiwicompute.com.
      </p>

      <p>
        When Kiwi Compute uses the term “Personal Information” in this Privacy Policy, we are referring to personally identifiable information of individual, non-children (i.e., adult) registrants of the Services. References to “Children’s Personal Information” only apply to personally identifiable information collected about users who are registered for the Services students. General references to “Information” apply to all users.
      </p>

      <p>
        Kiwi Compute gathers various types of Information from our users, as explained more fully below. Kiwi Compute may use this Personal Information to personalize and improve our services, to allow our users to set up a user account and profile, to contact users, to fulfill your requests for certain products and services, to analyze how users utilize the Services, and as otherwise set forth in this Privacy Policy. Kiwi Compute may share certain types of Information with third parties, as described below.
      </p>

      <h2>II. What Information Does Kiwi Compute Collect?</h2>

      <h3>
        A. Information You Provide to Kiwi Compute:
      </h3>

      <p>
        Kiwi Compute receives and stores any Information you knowingly provide to us. For example, Kiwi Compute collects Personal Information such as your name and email address. You can choose not to provide Kiwi Compute with certain information, but then you may not be able to register with us or to take advantage of some of our features. Kiwi Compute may anonymize your Personal Information so that you cannot be individually identified, and provide that information to our partners. The Children’s Personal Information that you provide shall only be used for creating your individual account. You may modify or remove your Personal Information or Children’s Personal Information identified below at any time by logging into your account and accessing features to edit your profile and/or account information.
      </p>

      <p>
        If you have provided Kiwi Compute with a means of contacting you, we may use such means to communicate with you. For example, we may send you promotional offers on behalf of Kiwi or other businesses (without sharing your Personal Information or Children’s Personal Information), or communicate with you about your use of the Services. Also, Kiwi Compute may receive a confirmation when you open a message from us. This confirmation helps us to improve our communications with you and better our services. If you do not want to receive communications from Kiwi Compute indicate your preference by sending us an email to this effect with your login information to support@kiwicompute.com
      </p>

      <h3>
        B. Information Collected Automatically:
      </h3>

      <p>
        Whenever you interact with our Services, Kiwi Compute automatically receives and records information on our server logs from your browser including your IP address, “cookie” information, and the page you requested. “Cookies” are identifiers that Kiwi Compute transfers to your computer or mobile device that allow us to recognize your browser or mobile device and tell us how and when pages and features in our Services are visited and by how many people. You may be able to change the preferences on your browser or mobile device to prevent or limit your computer or device’s acceptance of cookies, but this may prevent you from taking advantage of some of our features. Also, if you click on a link to a third party website, such third party may also transmit cookies to you.
      </p>

      <h2>III. Will Kiwi Compute Share Any of the Personal Information OR Childrens Personal Information it Receives?</h2>

      <p>
        Kiwi Compute neither rents nor sells your Personal Information or Children’s Personal Information in personally identifiable form to anyone. Kiwi Compute shares your Personal Information and Children’s Personal Information with third parties as described in Section II and in the current Section:
      </p>

      <h3>
        A. Affiliated Businesses and Third Party Websites Kiwi Compute Does Not Control:
      </h3>

      <p>
        In certain situations, businesses or third party websites that Kiwi Compute is affiliated with may sell items or provide services to you through the Services (either alone or jointly with us). You can recognize when an affiliated business is associated with such a transaction or service, and Kiwi Compute will share your Personal Information with that affiliated business only to the extent that it is related to such transaction or service. If you are a student/child user, Kiwi Compute will not share your Children’s Personal Information in connection with any commercial third party transaction or service. One such service may include the ability for you to automatically transmit Third Party Account Information to your Services profile or to automatically transmit information in your Services profile to your third party account. For adult users, Kiwi Compute has no control over the policies and practices of third party websites or businesses as to privacy or anything else, so if you choose to take part in any transaction or service relating to an affiliated website or business, please review all such business’ or websites’ policies.
      </p>

      <h3>
        B. Agents:
      </h3>

      <p>
        Kiwi Compute employs other companies and people to perform tasks on our behalf and need to share your information with them to provide products or services to you. Unless we tell you differently, our agents do not have any right to use the Personal Information or Children’s Personal Information that we share with them beyond what is necessary to assist us. Kiwi Compute also takes steps to ensure that they agree to protect the Personal Information or Children’s Personal Information shared with them.
      </p>

      <h3>
        C. User Profiles:
      </h3>

      <p>
        Certain user profile information, including without limitation a user name, location, and any image content that such user has uploaded to the Services, may be displayed to other users to facilitate user interaction within the Services or address your request for Kiwi Compute’s services. Any content you upload to your public user profile, along with any Personal Information or (if applicable) Children’s Personal Information or content that you voluntarily disclose online in a manner other users can view (on discussion boards, in messages and chat areas, etc.) becomes publicly available, and can be collected and used by others. Your user name may also be displayed to other users if and when you send messages or comments or upload images or videos through the Services and other users can contact you through messages and comments. Additionally, if you sign into the Services through a third party social networking site or service, your list of “friends” from that site or service may be automatically imported to the Services, and such “friends,” if they are also registered users of the Services, may be able to access certain non-public information you have entered in your Services user profile. Again, Kiwi Compute does not control the policies and practices of any other third party site or service that are available to adult users. Some of the features above may not be made available to children/student users, or if they are, with additional moderation or the requirement that teachers/schools obtain the necessary verifiable consent from parents in advance of activating such features.
      </p>

      <h3>
        D. Business Transfers:
      </h3>

      <p>
        Kiwi Compute may choose to buy or sell assets. In these types of transactions, customer information is typically one of the business assets that would be transferred. Also, if Kiwi Compute (or our assets) is acquired, or if we go out of business, enter bankruptcy, or go through some other change of control, Personal Information and Children’s Personal Information would be one of the assets transferred to or acquired by a third party, if permitted by applicable law.
      </p>

      <h3>
        E. Protection of Kiwi Compute and Others:
      </h3>

      <p>
        Kiwi Compute reserves the right to access, read, preserve, and disclose any information that we reasonably believe is necessary to comply with law or court order; enforce or apply our conditions of use and other agreements; or protect the rights, property, or safety of Kiwi Compute, our employees, our users, or others. This includes exchanging information with other companies and organizations for fraud protection and credit risk reduction.
      </p>

      <h3>
        F. With Your Consent:
      </h3>

      <p>
        Except as set forth above, you will be notified when your Personal Information or Children’s Personal Information may be shared with third parties in personally identifiable form, and will be able to prevent the sharing of this information. In the case of Children’s Personal Information, we will first obtain the prior verifiable consent of a parent or legal guardian.
      </p>

      <h2>IV. Is My Personal Information and Children’s Personal Information Secure?</h2>

      <p>
        Your account is protected by a password for your privacy and security. If you access your account via a third party site or service, you may have additional or different sign-on protections via that third party site or service. You must prevent unauthorized access to your account and Personal Information and Children’s Personal Information by selecting and protecting your password and/or other sign-on mechanism appropriately and limiting access to your computer or device and browser by signing off after you have finished accessing your account.
      </p>

      <p>
        Kiwi Compute uses industry-standard security techniques to protect the privacy of your account and other Personal Information and Children’s Personal Information we hold in our records. While we may provide encryption technologies and use other reasonable precautions to protect confidential information and provide suitable security, Kiwi Compute cannot guarantee complete security. Unauthorized entry or use, hardware or software failure, and other factors, may compromise the security of user information at any time.
      </p>

      <p>
        The Services may contain links to other sites. Kiwi Compute is not responsible for the privacy policies and/or practices on other sites. When following a link to another site, you should read that site’s privacy policy.
      </p>

      <h2>V. What Personal Information and Children’s Personal Information can I access?</h2>
      <p>
        Through your account settings, you may access, and, in some cases, edit or delete the following information you’ve provided to us:
      </p>

      <ul>
        <li>Name and password</li>
        <li>Email address</li>
        <li>User profile information</li>
        <li>Content in your account</li>
      </ul>

      <p>
        The information you can view, update, and delete may change as the Services change. If you have any questions about viewing or updating information we have on file about you, please contact us at support@kiwicompute.com.
      </p>

      <p>
        If you would like to request that Children’s Personal Information regarding your child be updated or deleted or if you wish to request that we discontinue the further collection nor use of Children’s Personal Information, please contact us at support@kiwicompute.com. A minor student’s participation in our Services, and the ability of a minor student to access the Services, will not be conditioned on that student providing more Children’s Personal Information than is reasonably necessary for that participation or access. We will respond to a request made pursuant to this section within 30 days of our receipt of such request.
      </p>

      <p>
        To request removal of your Personal Information or Children’s Personal Information from our public forums, contact us at support@kiwcompute.com. In some cases, Kiwi Compute may not be able to remove your information, in which case we will let you know if we are unable to do so and why.
      </p>

      <h2>VI. What Choices Do I Have?</h2>

      <p>
        You can always opt not to disclose information to us, but keep in mind some information may be needed to register with Kiwi Compute or to take advantage of some of our special features.
      </p>

      <p>
        You may be able to add, update, or delete information as explained in Section V above. When you update information, however, we may maintain a copy of the unrevised information in our records. You may request deletion of your account by sending an email with instructions. Please note that some information may remain in our records after your deletion of such information from your account. Kiwi Compute may use any aggregated data derived from or incorporating your Personal Information and Children’s Personal Information after you update or delete it, but not in a manner that would identify you personally.
      </p>

      <h2>VII. Changes to this Privacy Policy</h2>

      <p>
        Kiwi Compute may amend this Privacy Policy from time to time. Use of information that we collect now is subject to the Privacy Policy in effect at the time such information is used. If we make changes in the way that we use Personal Information or Children’s Personal Information, Kiwi Compute will notify you by posting an announcement on our Website or sending you a message, and if necessary, obtain the prior verifiable consent of a parent or legal guardian. You are bound by any changes to the Privacy Policy when you use the Services after such changes have been first posted.
      </p>

      <h2>VIII. Questions or Concerns</h2>

      <p>
        If you have any questions or concerns regarding our privacy policies, please send us a detailed message to support@kiwicompute.com and we will try to resolve your concerns.
      </p>

      <p>
        <b>Kiwi Compute</b><br />
        4000 Ave A #309<br />
        Austin, TX 78751<br />
        Phone: 513-600-6610<br />
        Email: support@kiwicompute.com<br />
        Effective Date: August 1, 2018<br />
      </p>


    </div>

    <Link className={ classes.link } to='/'>Got it. Take me home.</Link>
  </div>

PrivacyPolicy.propTypes = {
  classes: T.object.isRequired
}

PrivacyPolicy = withStyles(styles, { withTheme: true })(PrivacyPolicy)

PrivacyPolicy = withoutMainNavigation(PrivacyPolicy)

export default PrivacyPolicy