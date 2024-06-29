import ContactComponents from "@/components/pages/contacts/ContactPage";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.contacts" });

  return {
    title: t("title"),
    description: t("description"),
    icons: [{ rel: "icon", url: "/logo.png" }],
  } as Metadata;
}

export default async function AboutPage() {
  return <ContactComponents />;
}
