import { Ionicons } from "@expo/vector-icons";

interface DrawerItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  isActive?: boolean;
}

export const drawerItems: DrawerItem[] = [
  { label: "HOME", icon: "home-outline", route: "/", isActive: true },
  { label: "LAST QUIZ REVIEW", icon: "time-outline", route: "/(quiz)/quiz" },
  { label: "BB POINTS", icon: "trophy-outline", route: "/bbpoints" },
  { label: "WEBSITE", icon: "laptop-outline", route: "website" },
];
