export type AboutVisualType = "orbit" | "board" | "nodes" | "bars";

export type AboutCard = {
  title: string;
  description: string;
  type: AboutVisualType;
};
