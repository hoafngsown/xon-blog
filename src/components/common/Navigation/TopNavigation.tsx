import { cn } from "@/libs/utils";
import { getTranslations } from "next-intl/server";

export default async function TopNavigation() {
  const t = await getTranslations("common.headerMobile");

  return (
    <header>
      <div
        className={cn(
          "bg-background fixed left-0 top-0 z-30 flex h-[80px] w-full flex-col items-center justify-center gap-y-1 py-4 shadow",
        )}
      >
        <p className="text-xl font-bold uppercase text-black/70">
          {t("title")}
        </p>
        <p className="font-medium text-black/70">{t("description")}</p>
      </div>
    </header>
  );
}
