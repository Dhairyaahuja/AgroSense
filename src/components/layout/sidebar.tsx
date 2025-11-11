'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cog, LayoutGrid, ShieldAlert, Bot } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';

export function AppSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', icon: <LayoutGrid />, label: 'Dashboard' },
    { href: '/dashboard/recommendations', icon: <Bot />, label: 'Crop AI' },
    { href: '/dashboard/disease-detection', icon: <ShieldAlert />, label: 'Disease Scanner' },
    { href: '/dashboard/admin', icon: <Cog />, label: 'Admin Panel' },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg font-headline">
          <Logo className="w-7 h-7 text-primary" />
          <span>AgroSense</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-muted-foreground p-2 text-center group-data-[collapsible=icon]:hidden">
          AgroSense v1.0
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
