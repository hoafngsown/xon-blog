import Typography from "@/components/common/Typography";
import { type ExperienceItemType } from "@/types/experiences";
import ExperienceCompany from "./ExperienceCompany";

interface Props {
  title: string;
  item: ExperienceItemType[];
}

export default function ExperienceLifeTimeItem({ item, title }: Props) {
  return (
    <div className="flex flex-col gap-y-2 sm:gap-y-3">
      <Typography text={title} className="uppercase" />

      <div className="flex flex-col gap-y-10">
        {item.map((expItem, index) => (
          <div key={expItem.time + index}>
            <ExperienceCompany item={expItem} />
          </div>
        ))}
      </div>
    </div>
  );
}
