/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import DUTImage from "@/statics/images/DUT.png";
import KozoImage from "@/statics/images/Kozo.png";
import DiproImage from "@/statics/images/dipro.jpg";
import FreelancerImage from "@/statics/images/freelancer.png";

import Typography from "@/components/common/Typography";
import IconMui from "@/components/icons/IconMui";
import IconNextAuth from "@/components/icons/IconNextAuth";
import IconNextJS from "@/components/icons/IconNextJS";
import IconPrisma from "@/components/icons/IconPrisma";
import IconReactHookForm from "@/components/icons/IconReactHookForm";
import IconReactJS from "@/components/icons/IconReactJS";
import IconReactQuery from "@/components/icons/IconReactQuery";
import IconRedux from "@/components/icons/IconRedux";
import IconScss from "@/components/icons/IconScss";
import IconTailwinds from "@/components/icons/IconTailwinds";
import IconTypescript from "@/components/icons/IconTypescript";
import IconVite from "@/components/icons/IconVite";
import { getTranslations } from "next-intl/server";
import ExperienceLifeTimeItem from "./ExperienceLifeTimeItem";
export default async function ExperienceLifeTime() {
  const t = await getTranslations("page.experiences.list");

  const EXPERIENCES: any[] = [
    {
      title: t("edu.title"),
      experiences: [
        {
          title: t("edu.experiences.title"),
          subTitle: t("edu.experiences.subTitle"),
          description: t("edu.experiences.description"),
          time: t("edu.experiences.time"),
          projects: [],
          logo: DUTImage,
          previewLink: "https://dut.udn.vn/",
        },
      ],
    },
    {
      title: t("work.title"),
      experiences: [
        {
          title: t("work.kozo.title"),
          subTitle: t("work.kozo.subTitle"),
          description: t("work.kozo.description"),
          time: t("work.kozo.time"),
          projects: [
            {
              time: t("work.kozo.projects.mld.time"),
              title: t("work.kozo.projects.mld.title"),
              subTitle: t("work.kozo.projects.mld.subTitle"),
              description: t("work.kozo.projects.mld.description"),
              tags: [
                {
                  title: "Typescript",
                  icon: IconTypescript,
                },
                {
                  title: "NextJS",
                  icon: IconNextJS,
                },
                {
                  title: "ReactJS",
                  icon: IconReactJS,
                },
                {
                  title: "Shadcn UI",
                },
                {
                  title: "Tailwinds",
                  icon: IconTailwinds,
                },
                {
                  title: "React Hook Form",
                  icon: IconReactHookForm,
                },
                {
                  title: "React Query",
                  icon: IconReactQuery,
                },
                {
                  title: "Zustand",
                },
                {
                  title: "ViteJS",
                  icon: IconVite,
                },
              ],
            },
          ],
          logo: KozoImage,
          previewLink: "https://kozocom.vn/",
        },
        {
          title: t("work.dipro.title"),
          subTitle: t("work.dipro.subTitle"),
          description: t("work.dipro.description"),
          time: t("work.dipro.time"),
          projects: [
            {
              time: t("work.dipro.projects.umex.time"),
              title: t("work.dipro.projects.umex.title"),
              subTitle: t("work.dipro.projects.umex.subTitle"),
              description: t("work.dipro.projects.umex.description"),
              tags: [
                {
                  title: "Typescript",
                  icon: IconTypescript,
                },
                {
                  title: "NextJS",
                  icon: IconNextJS,
                },
                {
                  title: "Next-Auth",
                  icon: IconNextAuth,
                },
                {
                  title: "MUI",
                  icon: IconMui,
                },
                {
                  title: "Prisma",
                  icon: IconPrisma,
                },
                {
                  title: "SCSS",
                  icon: IconScss,
                },
                {
                  title: "Tailwinds",
                  icon: IconTailwinds,
                },
                {
                  title: "React Hook Form",
                  icon: IconReactHookForm,
                },
                {
                  title: "Redux",
                  icon: IconRedux,
                },
              ],
            },
            {
              time: t("work.dipro.projects.step.time"),
              title: t("work.dipro.projects.step.title"),
              subTitle: t("work.dipro.projects.step.subTitle"),
              description: t("work.dipro.projects.step.description"),
              tags: [
                {
                  title: "Typescript",
                  icon: IconTypescript,
                },
                {
                  title: "NextJS",
                  icon: IconNextJS,
                },
                {
                  title: "ReactJS",
                  icon: IconReactJS,
                },
                {
                  title: "Next-Auth",
                  icon: IconNextAuth,
                },
                {
                  title: "MUI",
                  icon: IconMui,
                },
                {
                  title: "SCSS",
                  icon: IconScss,
                },
                {
                  title: "Tailwinds",
                  icon: IconTailwinds,
                },
                {
                  title: "React Hook Form",
                  icon: IconReactHookForm,
                },
                {
                  title: "Redux",
                  icon: IconRedux,
                },
              ],
            },
            {
              time: t("work.dipro.projects.hp.time"),
              title: t("work.dipro.projects.hp.title"),
              subTitle: t("work.dipro.projects.hp.subTitle"),
              description: t("work.dipro.projects.hp.description"),
              tags: [
                {
                  title: "Typescript",
                  icon: IconTypescript,
                },
                {
                  title: "NextJS",
                  icon: IconNextJS,
                },
                {
                  title: "Next-Auth",
                  icon: IconNextAuth,
                },
                {
                  title: "Prisma",
                  icon: IconPrisma,
                },
                {
                  title: "MUI",
                  icon: IconMui,
                },
                {
                  title: "SCSS",
                  icon: IconScss,
                },
                {
                  title: "React Hook Form",
                  icon: IconReactHookForm,
                },
                {
                  title: "Redux",
                  icon: IconRedux,
                },
              ],
            },
          ],
          logo: DiproImage,
          previewLink: "https://www.dipro-tech.com/",
        },
        {
          title: t("work.freelancer.title"),
          subTitle: t("work.freelancer.subTitle"),
          description: t("work.freelancer.description"),
          time: t("work.freelancer.time"),
          projects: [
            {
              time: t("work.freelancer.projects.face.time"),
              title: t("work.freelancer.projects.face.title"),
              subTitle: t("work.freelancer.projects.face.subTitle"),
              description: t("work.freelancer.projects.face.description"),
              tags: [
                {
                  title: "Typescript",
                  icon: IconTypescript,
                },
                {
                  title: "NextJS",
                  icon: IconNextJS,
                },
                {
                  title: "ReactJS",
                  icon: IconReactJS,
                },
                {
                  title: "Shadcn UI",
                },
                {
                  title: "Tailwinds",
                  icon: IconTailwinds,
                },
                {
                  title: "React Hook Form",
                  icon: IconReactHookForm,
                },
                {
                  title: "React Query",
                  icon: IconReactQuery,
                },
                {
                  title: "Zustand",
                },
                {
                  title: "ViteJS",
                  icon: IconVite,
                },
              ],
            },
          ],
          logo: FreelancerImage,
          previewLink: "",
        },
      ],
    },
  ];

  return (
    <div className="mt-8 w-full md:mt-12 md:max-w-2xl lg:max-w-4xl">
      <div className="flex w-full flex-col gap-y-8 md:gap-y-14">
        <div className="flex flex-col gap-y-2">
          <Typography text={t("overview.title")} className="uppercase" />

          <ul className="flex list-disc flex-col gap-y-1 text-sm font-medium text-secondary sm:gap-2 md:gap-3 md:gap-y-4 md:text-base lg:gap-4">
            <li>
              <p>{t("overview.description1")}</p>
            </li>

            <li>
              <p>{t("overview.description2")}</p>
            </li>

            <li>
              <p>{t("overview.description3")}</p>
            </li>

            <li>
              <p>{t("overview.description4")}</p>
            </li>

            <li>
              <p>{t("overview.description5")}</p>
            </li>

            <li>
              <p>{t("overview.description6")}</p>
            </li>
          </ul>
        </div>

        {EXPERIENCES.map((item, index) => {
          return (
            <ExperienceLifeTimeItem
              key={item.title + index}
              title={item.title}
              item={item.experiences}
            />
          );
        })}
      </div>
    </div>
  );
}
