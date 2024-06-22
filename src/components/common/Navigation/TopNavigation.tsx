import { useTranslations } from "next-intl";

export default function TopNavigation() {
  const t = useTranslations("common.headerMobile");
  return (
    <section className="bg-background fixed left-0 top-0 flex h-[80px] w-full flex-col items-center justify-center gap-y-1 py-4">
      <p className="text-xl font-bold uppercase text-black/70">{t("title")}</p>
      <p className="font-medium text-black/70">{t("description")}</p>
    </section>
  );
}
