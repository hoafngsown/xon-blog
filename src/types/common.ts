export type LinkType = {
  url: string;
  label: string;
  icon?: any;
};

export type BreadcrumbType = {
  label: string;
  url: string;
  icon?: any;
};

export type OptionType = {
  label: string;
  value: string;
  icon?: any;
};

export type PostMetaType = {
  id: number;
  title: string;
  description: string;
  publishAt: string;
  tags: string[];
};
