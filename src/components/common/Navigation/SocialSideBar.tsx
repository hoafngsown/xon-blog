import IconFacebook from "@/components/icons/IconFacebook";
import IconGithub from "@/components/icons/IconGithub";
import IconInstagram from "@/components/icons/IconInstagram";
import IconLinkedin from "@/components/icons/IconLinkedin";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MY_SOCIAL_LINK } from "@/constants/common";
import { cn } from "@/libs/utils";

import { type LinkType } from "@/types/common";
import {
  getLocale,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";

export default async function SocialSideBar() {
  const locale = await getLocale();
  unstable_setRequestLocale(locale);

  const t = await getTranslations("common.social");

  const SOCIAL_LINKS: LinkType[] = [
    {
      label: t("fb"),
      url: MY_SOCIAL_LINK.FB,
      icon: IconFacebook,
    },
    {
      label: t("ins"),
      url: MY_SOCIAL_LINK.INS,
      icon: IconInstagram,
    },
    {
      label: t("github"),
      url: MY_SOCIAL_LINK.GITHUB,
      icon: IconGithub,
    },
    {
      label: t("linkedin"),
      url: MY_SOCIAL_LINK.LINKEDIN,
      icon: IconLinkedin,
    },
  ];

  return (
    <aside className="hidden md:fixed md:left-6 md:top-1/2 md:flex md:-translate-y-1/2 md:flex-col md:gap-y-4">
      <p className="text-center text-sm font-medium text-title xl:text-base">
        <span>.....</span>
        <br />
        <span>H</span>
        <br />
        <span>O</span>
        <br />
        <span>À</span>
        <br />
        <span>N</span>
        <br />
        <span>G</span>
        <br />
        <span>.</span>
        <br />
        <span>X</span>
        <br />
        <span>Ơ</span>
        <br />
        <span>N</span>
        <br />
        <span>...</span>
      </p>

      {SOCIAL_LINKS.map((item, index) => (
        <TooltipProvider key={item.url + "_" + index} delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                target="_blank"
                type="button"
                href={item.url}
                className={cn(
                  "group rounded-[10px] border border-[#ccc] bg-title p-2 outline-none transition-all hover:bg-primary hover:shadow-md",
                  index === 0 && "bg-primary",
                )}
              >
                <item.icon
                  fill="white"
                  stroke="#75787e"
                  className="group-hover:fill-white group-hover:stroke-title md:h-4 md:w-4 xl:h-5 xl:w-5"
                />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-base lg:text-lg">{item.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </aside>
  );
}
