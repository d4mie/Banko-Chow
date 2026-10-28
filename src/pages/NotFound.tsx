import { Page, PageHero } from '../components/layout/Page'
import { GlassButton } from '../components/ui/GlassButton'

export function NotFound() {
  return (
    <Page title="Page not found">
      <PageHero eyebrow="404" title="This one no dey for here." lede="The page you’re looking for has left the building. The Street Burgers haven’t.">
        <div className="mt-8 flex flex-wrap gap-3">
          <GlassButton to="/" variant="solid" size="lg">
            Back home
          </GlassButton>
          <GlassButton to="/menu" size="lg">
            See the menu
          </GlassButton>
        </div>
      </PageHero>
      <div className="pb-24" />
    </Page>
  )
}
