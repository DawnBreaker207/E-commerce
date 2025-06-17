import { TestBed } from '@angular/core/testing';
import { MenuItem } from '@/app/shared/models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          // icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          icon: 'dashboard',
          label: 'Dashboard',
          route: '/admin/dashboard',
        },
        {
          // icon: 'assets/icons/heroicons/outline/cube.svg',
          icon: 'category',
          label: 'Category',
          route: '/admin/category',
        },
        {
          // icon: 'assets/icons/heroicons/outline/cube.svg',
          icon: 'apps',
          label: 'Products',
          route: '/admin/product',
        },
        {
          // icon: 'assets/icons/heroicons/outline/cube.svg',
          icon: 'receipt_long',
          label: 'Orders',
          route: '/admin/order',
        },
        {
          // icon: 'assets/icons/heroicons/outline/cube.svg',
          icon: 'account_circle',
          label: 'User',
          route: '/admin/user',
        },
        {
          // icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          icon: 'lock',
          label: 'Auth',
          route: '/auth',
          children: [
            { label: 'Sign up', route: '/auth/sign-up' },
            { label: 'Sign in', route: '/auth/sign-in' },
            { label: 'Forgot Password', route: '/auth/forgot-password' },
            { label: 'New Password', route: '/auth/new-password' },
            { label: 'Two Steps', route: '/auth/two-steps' },
          ],
        },
        {
          // icon: 'assets/icons/heroicons/outline/exclamation-triangle.svg',
          icon: 'error',
          label: 'Errors',
          route: '/errors',
          children: [
            { label: '404', route: '/errors/404' },
            { label: '500', route: '/errors/500' },
          ],
        },
      ],
    },
    {
      group: 'Collaboration',
      separator: true,
      items: [
        {
          // icon: 'assets/icons/heroicons/outline/download.svg',
          icon: 'download',
          label: 'Download',
          route: '/download',
        },
        {
          // icon: 'assets/icons/heroicons/outline/gift.svg',
          icon: 'redeem',
          label: 'Gift Card',
          route: '/gift',
        },
        {
          // icon: 'assets/icons/heroicons/outline/users.svg',
          icon: 'person',
          label: 'Users',
          route: '/users',
        },
      ],
    },
    {
      group: 'Config',
      separator: false,
      items: [
        {
          // icon: 'assets/icons/heroicons/outline/cog.svg',
          icon: 'settings',
          label: 'Settings',
          route: '/settings',
        },
        {
          // icon: 'assets/icons/heroicons/outline/bell.svg',
          icon: 'notifications',
          label: 'Notifications',
          route: '/gift',
        },
        {
          // icon: 'assets/icons/heroicons/outline/folder.svg',
          icon: 'folder',
          label: 'Folders',
          route: '/folders',
          children: [
            { label: 'Current Files', route: '/folders/current-files' },
            { label: 'Downloads', route: '/folders/download' },
            { label: 'Trash', route: '/folders/trash' },
          ],
        },
      ],
    },
  ];
}
