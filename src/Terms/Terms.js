import React from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import config from 'config'

import withoutMainNavigation from '../hocs/withoutMainNavigation'

import Link from 'react-router-dom/Link'

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
  sectionLiHeading: {
    fontSize: '110%',
    fontWeight: 'bold',
    margin: '10px 0 5px 0'
  }
})

let Terms = ({ classes }) =>
  <div className={ classes.root }>
    <h1 className={ classes.header }>Customer Agreement</h1>
    <div className={ classes.body }>

      <ol>
        <li className={ classes.sectionLiHeading }>Scope</li>
  
        <ol type='a'>
          <li>This Customer Agreement (“Agreement”) sets out the terms and conditions on which Kiwi Compute (“Kiwi Compute”) licenses you (you or your) to access, view and/or otherwise use (“Access”) the coding courses and projects (“Courses”) for which you register on Kiwi’s Website at www.kiwicompute.com (“Website”) and any documentation and materials provided by Kiwi Compute to you in relation to the Courses (“Materials”).</li>
          <li>By registering for a Course on the Website, you accept the terms and conditions of this Agreement without limitation or qualification. This Agreement governs your Access to the Courses, and all updates and upgrades that replace, modify, enhance or supplement the Courses.</li>
          <li>By checking the ‘Accept’ box, or by Accessing, downloading, installing or otherwise using the Courses, you agree to be bound by the terms of this Agreement. If you do not agree to the terms of this Agreement, do not Access the Courses. Kiwi Compute may change the terms of this Agreement from time to time by uploading new terms and conditions on the Website. By continuing to Access the Courses, you will be deemed to have accepted the amended terms. If you do not agree to the changes, you should notify us at Kiwi’s Website (kiwicompute.com) or cease to Access or otherwise use the Courses.</li>
        </ol>
  
        <li className={ classes.sectionLiHeading }>Registration</li>
  
        <ol type='a'>
          <li>You acknowledge that where you register for a Course on the Website and Kiwi Compute establishes an account for you, you are responsible for the account and all activities that occur under or in connection with the account.</li>
        </ol>
  
        <li className={ classes.sectionLiHeading }>License</li>
  
        <ol type='a'>
          <li>In consideration of the payment by you of the relevant Course Fees, Kiwi Compute grants you a non-exclusive and non-transferable license to Access the Courses and Materials during the term (as described in Section 7) of this Agreement.</li>
        </ol>
  
        <li className={ classes.sectionLiHeading }>Fees and Payment</li>
  
        <ol type='a'>
          <li>The Fees (recurring payments) for each subscription per user will be as notified on the Website.</li>
          <li>Unless otherwise agreed in writing, you must pay all Fees in advance in accordance with the instructions set out on the Website.</li>
          <li>Kiwi Compute may adjust the Fees at any time by posting the adjusted Fees on the Website.</li>
        </ol>
  
        <li className={ classes.sectionLiHeading }>Cancellation and Deactivation of Subscription</li>
  
        <ol type='a'>
          <li>You are responsible for properly canceling or pausing your subscription. You can do so at any time by clicking on the subscriptions section of the student dashboard or visiting kiwicompute.com/provider/subscriptions. The subscription section allows you to stop recurring payments indeterminately.</li>
          <li>If you deactivate your subscription before the end of your current billing cycle, your cancellation will be effective on the day the next cycle is set to start. In the meantime, you will retain access to our Service.</li>
          <li>Kiwi Compute, in its sole discretion, has the right to suspend or terminate your account and refuse any and all current or future use of the Service, or any other of Kiwi Compute’s services, for any reason at any time. Such termination of the Service will result in the deactivation or deletion of your Account or your access to your Account. Kiwi Compute reserves the right to refuse service to anyone for any reason at any time.</li>
        </ol>
  
        <li className={ classes.sectionLiHeading }>Refunds</li>
  
        <ol type='a'>
          <li>You may cancel your membership at any time at {config.shortHost}/provider/subscriptions, but your cancellation will not take effect until the end of your current commitment period (a one-month period). You will not be entitled to a refund for any membership fee already paid.</li>
        </ol>
  
        <li className={ classes.sectionLiHeading }>Access</li>
  
        <ol type='a'>
          <li>Where you are registered as a parent of a student, you:</li>
          <ol type='a'>
            <li>may allow only the number of users for which you have paid the Fees to Access the applicable Courses;</li>
            <li>must ensure that any usernames and passwords provided by Kiwi Compute are kept strictly confidential; and</li>
            <li>must supervise and monitor Access to ensure that all users registered under your account comply with this Agreement and the Website Terms of Use.</li>
          </ol>
        </ol>
  
        <li className={ classes.sectionLiHeading }>Confidentiality</li>
  
        <ol type='a'>
          <li>In this Agreement, Confidential Information means the Courses and any Materials, where such information is identified as confidential by Kiwi Compute.</li>
          <li>You will keep confidential, and will not disclose to any other person, any Confidential Information unless:</li>
          <ol type='a'>
            <li>the disclosure is authorised in writing by Kiwi Compute;</li>
            <li>the disclosure is required by law; or</li>
            <li>the Confidential Information already is, or becomes, public knowledge, other than as a result of a breach by you of this Agreement.</li>
          </ol>
        </ol>
  
        <li className={ classes.sectionLiHeading }>Intellectual Property</li>
  
        <ol type='a'>
          <li>In this Agreement, Intellectual Property means all patents, trademarks, trade names, designs, registered designs, domain names, trade secrets, formulations, inventions, models, plans, licences, know-how, databases, technical information, discoveries, ideas, data, research, results, reports, drawings, techniques, source code, rights in computer software, specifications, standards, methods, manuals, copyright in works and all rights or forms of protection of a similar nature, whether or not registered and any application to register any of these rights (where applicable).</li>
          <li>You acknowledge and agree that: Kiwi Compute owns all Intellectual Property in the Courses and Materials, including in any updates or upgrades to the Courses and Materials; and nothing in this Agreement or otherwise has the effect of transferring any Intellectual Property in the Courses and Materials to you, unless otherwise agreed in writing.</li>
          <li>You will not challenge or contest Kiwi Compute’s rights, or do anything that may adversely affect the validity or enforceability of Kiwi Compute’s rights, under this section 9.</li>
          <li>Where Kiwi Compute grants to you a Creative Commons License in relation to any Courses or Materials, you must comply in all respects with the license terms as notified to you from time to time.</li>
          <li>You must not (and must not allow any other person to):</li>
          <ol type='a'>
            <li>resell or redistribute the Courses or any Materials to any person other than as expressly authorised under this Agreement;</li>
            <li>decompile, disassemble or reverse engineer the whole or any part of the Courses and Materials, to the maximum extent permitted by law; or</li>
            <li>adapt or modify or create derivative works from the whole or any part of the Courses and Materials.</li>
          </ol>
        </ol>
  
        <li className={ classes.sectionLiHeading }>Updates</li>
  
        <ol type='a'>
          <li>Kiwi Compute may provide updates or upgrades in respect of the Courses and Materials, at its sole discretion, from time to time.</li>
        </ol>
  
        <li className={ classes.sectionLiHeading }>Disclaimer of Warranties</li>
  
        <ol type='a'>
          <li>The Courses are provided by Kiwi Compute on an ‘as is' basis without warranty of any kind, whether express or implied, and by Accessing the Courses you agree that your use of the Courses is at your sole risk.</li>
          <li>To the maximum extent permitted by law, Kiwi Compute expressly excludes all warranties, express or implied, including (but not limited to) implied warranties of satisfactory quality, fitness for a particular purpose, non-infringement, compatibility, security and accuracy.</li>
          <li>Kiw Compute does not warrant that the Courses will meet your requirements, or that the operation of the Courses will be uninterrupted or error-free, or that defects in the Courses will be corrected. Furthermore, Kiwi Compute does not make any warranties or representations regarding the use, or the results of the use, of the Courses and Materials in relation to their completeness, accuracy, reliability, or otherwise. No information or advice given by Kiwi Compute (or any agent of Kiwi Compute) creates a warranty or in any way increases the scope of this warranty. The entire risk arising out of the use or performance of the Courses remains with you.</li>
        </ol>
  
        <li className={ classes.sectionLiHeading }>Your Information</li>
  
        <ol type='a'>
          <li>You acknowledge and agree that Kiwi Compute may collect and use information about you and any users registered under your account. Kiwi Compute will collect and use such information in accordance with its Privacy Policy.</li>
          <li>If you are a teacher, you acknowledge and agree that you have obtained all parental consents required for the collection and use by us of your students’ personal information.</li>
        </ol>
  
        <li className={ classes.sectionLiHeading }>Limitation of Liability and Indemnity</li>
  
        <ol type='a'>
          <li>Kiwi Compute’s liability under, or in connection with, this Agreement (whether in contract, tort or otherwise) is limited to the amount of the Fees paid by you at the time of the relevant event or breach.</li>
          <li>Kiwi Compute is not liable for any special, indirect or consequential or similar damages arising out of or in connection with:</li>
          <ol type='a'>
            <li>any breach by Kiwi Compute of this Agreement; or</li>
            <li>any defects and/or errors in the Courses.</li>
          </ol>
          <li>You indemnify Kiwi Compute against all costs, legal costs (including solicitor and client costs), expenses and claims directly or indirectly incurred or suffered by Kiwi Compute as a result of any breach by you of this Agreement.</li>
        </ol>
  
        <li className={ classes.sectionLiHeading }>Term and Termination</li>
  
        <ol type='a'>
          <li>This Agreement commences on the date you register on the Website and will continue in effect until:</li>
          <ol type='a'>
            <li>it is terminated under this Section 14; or</li>
            <li>you cease to be a customer of Kiwi Compute, whichever is the earlier.</li>
          </ol>
          <li>Kiwi Compute may immediately terminate this Agreement upon written notice to you if:</li>
          <ol type='a'>
            <li>you commit a material breach of this Agreement that is reasonably capable of being remedied, but has not been remedied within 20 working days after receiving a notice from Kiwi Compute requiring you to remedy the relevant breach; or you commit a material breach of this Agreement which is not capable of being remedied.</li>
          </ol>
          <li>Following termination of this Agreement for any reason or its expiry you will:</li>
          <ol type='a'>
            <li>cease all use of the Courses and Materials; and</li>
            <li>immediately pay any outstanding Fees.</li>
          </ol>
          <li>Following termination or expiry of this Agreement, the provisions of Sections 4, 6, 7, 8 and this Section 13.4, and any other provisions of this Agreement which are required to give effect to those Sections, will remain in full force and effect.</li>
        </ol>
  
        <li className={ classes.sectionLiHeading }>Miscellaneous</li>
  
        <ol type='a'>
          <li>A party will not be liable for any failure or delay in complying with any obligation under this Agreement, if:</li>
          <ol type='a'>
            <li>the failure or delay arises directly from a cause reasonably beyond that party's control;</li>
            <li>that party gives written notice of the occurrence or event to the other party; and</li>
            <li>that party uses all reasonable endeavours to overcome or mitigate the effects of the event.</li>
          </ol>
          <li>The rights, powers and remedies in this Agreement are cumulative and are in addition to any rights, powers or remedies provided at law or in equity, unless specifically stated otherwise. Each party may pursue any remedy that it is entitled to pursue by law.</li>
          <li>You may not assign or otherwise transfer any of your rights or obligations under this Agreement to any other person without Kiwi Compute’s prior written consent.</li>
          <li>This Agreement record the entire agreement and understanding between the parties in relation to the subject matter of this Agreement, and supersedes and cancels all previous understandings or agreements (whether written, oral or both) between the parties, relating to that subject matter.</li>
          <li>You will promptly sign all documents and perform any other acts that may be reasonably required to give effect to the provisions and intent of this Agreement.</li>
          <li>This Agreement is governed by, and construed in accordance with, United States law. Each party irrevocably and unconditionally submits to the exclusive jurisdiction of the United States courts in connection with this Agreement.</li>
          <li>It is the intention of the Parties to this Agreement that this Agreement and the performance under this Agreement, and all suits and special proceedings under this Agreement, be construed in accordance with and governed, to the exclusion of the law of any other forum, by the laws of Texas, without regard to the jurisdiction in which any action or special proceeding may be instituted.</li>
          <li>Kiwi Compute will not be deemed to have waived any provision of this Agreement unless that waiver is in writing and signed by Kiwi Compute. Any such waiver will not be, or deemed to be, a waiver of any other right under this Agreement. Any failure or delay by Kiwi Compute to enforce any provision of this Agreement will not be considered to be a waiver of that provision.</li>
          <li>If any provision of this Agreement is held to be illegal, invalid or unenforceable, then (to the maximum extent permitted by law) that provision will be severed from this Agreement, and this will not affect the validity or enforceability of the other provisions of this Agreement.</li>
        </ol>
        
      </ol>



    </div>

    <Link className={ classes.link } to='/'>Got it. Take me home.</Link>
  </div>

Terms.propTypes = {
  classes: T.object.isRequired
}

Terms = withStyles(styles, { withTheme: true })(Terms)

Terms = withoutMainNavigation(Terms)

export default Terms