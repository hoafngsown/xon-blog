import type { LocaleType } from "@/types/common";
import { format } from "date-fns";
import { enUS, vi } from "date-fns/locale";

export const formatDate = (
  date: Date | string,
  locale?: LocaleType,
  options?: {
    hideTime?: boolean;
  },
) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  let selectedLocale;

  if (!locale || locale === "vi") selectedLocale = vi;
  else selectedLocale = enUS;

  const formattedDate = format(dateObj, "dd/MM/yyyy", {
    locale: selectedLocale,
  });
  const formattedTime = format(dateObj, "h:mm a", { locale: selectedLocale });

  return `${formattedDate}${options?.hideTime ? "" : ` ${locale === "vi" ? "lúc" : "at"} ${formattedTime}`}`;
};
