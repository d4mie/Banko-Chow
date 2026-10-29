import { Link } from 'react-router'
import { Container, Page, PageHero } from '../components/layout/Page'
import { Glass } from '../components/ui/Glass'
import { site, telUrl, whatsappUrl } from '../config/site'

const sections = [
  {
    title: 'What this covers',
    body: 'This policy explains what Banko Chow collects when you use the website, the iOS app, or the Android app, and what we do with it. The three are the same app. Ordering works by sending a message to our WhatsApp line. We do not run a separate account system.',
  },
  {
    title: 'What you give us',
    body: 'When you place an order you can enter your name, phone number, delivery address, and a note for the kitchen. You also choose the items, extras, and whether you want pickup or delivery. Nothing is sent until you tap Send on WhatsApp.',
  },
  {
    title: 'What stays on your device',
    body: 'Your bag and the details you typed are saved in local storage on that phone or browser so they are still there if you leave and come back. Uninstalling the app, or clearing the browser’s site data, removes that copy. We cannot see a bag you have not sent.',
  },
  {
    title: 'What leaves your device',
    body: 'Tapping Send on WhatsApp opens WhatsApp with the order written out, addressed to our business line. WhatsApp then delivers that message under WhatsApp’s own terms. Calling us, opening Instagram, or opening Maps leaves the app and is handled by those services. We do not run ads, we do not use analytics tools, and we do not sell your information.',
  },
  {
    title: 'What we do not collect',
    body: 'We do not ask you to create an account, and we do not collect precise location, contacts, photos, or payment card details in the app. Payment, if any, is arranged with the crew when they confirm the order. Delivery fees are confirmed in the same chat.',
  },
  {
    title: 'How long we keep an order',
    body: 'Once you send an order, the message lives in the WhatsApp chat between you and Banko Chow, which we use to prepare and deliver it. We do not copy orders into another database. You can delete the chat in WhatsApp on your side.',
  },
  {
    title: 'Children',
    body: 'Banko Chow is a food service for a general audience. The app is not directed at children, and we do not knowingly collect information from anyone under 13.',
  },
  {
    title: 'Changes',
    body: 'If this policy changes, the updated version will be posted on this page with a new date. Continuing to use the app after that means the new version applies.',
  },
]

export function Privacy() {
  return (
    <Page title="Privacy policy">
      <PageHero
        eyebrow="Privacy"
        title="Your order stays yours."
        lede="We collect only what the crew needs to make the order and get it to you. Last updated 29 October 2026."
      />

      <Container className="mt-10 pb-16">
        <Glass tone="light" className="space-y-8 p-6 sm:p-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="display text-2xl font-bold text-cocoa">{section.title}</h2>
              <p className="mt-2 text-pretty text-[16px] leading-relaxed text-cocoa/80">{section.body}</p>
            </section>
          ))}

          <section>
            <h2 className="display text-2xl font-bold text-cocoa">Contact</h2>
            <p className="mt-2 text-pretty text-[16px] leading-relaxed text-cocoa/80">
              {site.name}, {site.address.line1}, {site.address.area}, {site.address.city}, {site.address.country}. Call{' '}
              <a className="font-semibold text-brand-dark underline" href={telUrl}>
                {site.phoneDisplay}
              </a>{' '}
              or{' '}
              <a className="font-semibold text-brand-dark underline" href={whatsappUrl('Hi Banko Chow, I have a privacy question.')}>
                message us on WhatsApp
              </a>
              . To ask for an order message to be deleted, send that request in the same WhatsApp chat.
            </p>
            <p className="mt-4 text-sm text-cocoa/60">
              <Link to="/find-us" className="font-semibold text-brand-dark underline">
                Find us
              </Link>{' '}
              has the map, hours, and the same contact details.
            </p>
          </section>
        </Glass>
      </Container>
    </Page>
  )
}
