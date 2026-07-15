import React from 'react';
import * as Lucide from 'lucide-react';

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = '', size = 20 }: LucideIconProps) {
  // Map string names to actual Lucide component names
  const IconComponent = (Lucide as any)[name];

  if (!IconComponent) {
    // Fallback icon in case something is wrong
    return <Lucide.HelpCircle className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
