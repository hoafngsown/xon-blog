import { Button } from "@/components/ui/button";
import { ROUTE_PATH } from "@/constants/routes";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function NotFound() {
  const t = useTranslations("page.notFound");

  return (
    <section className="flex h-[75vh] w-full flex-col items-center justify-center gap-y-4 sm:gap-y-6 md:gap-y-10">
      <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px]">
        <Image
          title="not-found"
          src="/images/notfound.png"
          alt="not-found-image"
          layout="fill"
          objectFit="contain"
        />
      </div>

      <p className="text-center text-2xl font-bold leading-9 sm:text-3xl md:text-4xl lg:text-5xl">
        {t("title")}
      </p>
      <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl">
        {t("description")}
      </p>
      <Link href={ROUTE_PATH.HOME} title="go-to-home">
        <Button
          type="button"
          className="text-base font-medium md:py-1.5 md:text-lg lg:px-4 lg:py-2 lg:text-2xl"
        >
          {t("button")}
        </Button>
      </Link>
    </section>
  );
}
