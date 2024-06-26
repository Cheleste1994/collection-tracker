import { StatusItem } from '@/types/items';

export enum COLUMNS_UID_ITEMS {
  id = 'id',
  name = 'name',
  image = 'image',
  category = 'category',
  status = 'status',
}

export type ENUM_COLUMNS_UID_ITEMS = keyof typeof COLUMNS_UID_ITEMS;

export const INITIAL_VISIBLE_COLUMNS = new Set([
  COLUMNS_UID_ITEMS.name,
  COLUMNS_UID_ITEMS.category,
  COLUMNS_UID_ITEMS.status,
  'actions',
]);

export const columns = [
  { name: 'ID', uid: COLUMNS_UID_ITEMS.id, sortable: true },
  { name: 'NAME', uid: COLUMNS_UID_ITEMS.name, sortable: true },
  { name: 'CATEGORY', uid: COLUMNS_UID_ITEMS.category, sortable: true },
  { name: 'STATUS', uid: COLUMNS_UID_ITEMS.status, sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

type PropertyColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export const statusOptionsItem: Record<keyof typeof StatusItem, PropertyColor> =
  {
    ACTIVE: 'success',
    PAUSED: 'danger',
  };

export type StatusOptionsItem = typeof statusOptionsItem;
