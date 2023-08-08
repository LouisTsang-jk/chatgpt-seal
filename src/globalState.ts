export const StorageKey = "templates"

export enum ListType {
  regular = "regular",
  hot = "hot"
}

import { signal } from "@preact/signals-react";

export const count = signal(0)

const globalState = {
  count: signal(0),
  templateList: signal<Template[]>([]),
  currentTemplate: signal<Template | null>(null),
  listType: signal<ListType>(ListType.regular),
  isBatchOperationActive: signal<boolean>(false),
};

export default globalState;
