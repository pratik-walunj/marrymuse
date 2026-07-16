import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OfferBanner } from "@/components/shared/offer-banner";
import { FloatingActions } from "@/components/shared/floating-actions";
import { RecentBookings } from "@/components/shared/recent-bookings";
import { ExitIntent } from "@/components/shared/exit-intent";
import { getSettings } from "@/lib/content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const s = await getSettings();
  const phoneHref = `tel:${s.phone.replace(/\s/g, "")}`;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Fixed top chrome: announcement bar + sticky header */}
      <div className="fixed inset-x-0 top-0 z-50">
        <OfferBanner text={s.offerBanner} />
        <Header phoneHref={phoneHref} />
      </div>

      <main className="flex-1">{children}</main>

      <Footer />

      {/* Conversion widgets */}
      <FloatingActions whatsapp={s.whatsapp} phoneHref={phoneHref} />
      <RecentBookings />
      <ExitIntent />
    </div>
  );
}
