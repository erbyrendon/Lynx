import * as Icons from 'lucide-react';
import { Circle, type LucideIcon } from 'lucide-react';

const iconRegistry = Icons as unknown as Record<string, LucideIcon>;

export function getLucideIconByName(name: string): LucideIcon {
  return iconRegistry[name] ?? Circle;
}