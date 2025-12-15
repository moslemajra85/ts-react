export const getInitials = (name: string) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return (first + second).toUpperCase();
};

export const formatWebsite = (site?: string) => {
  if (!site) return null;
  const clean = site.replace(/^https?:\/\//i, "");
  return clean.replace(/\/$/, "");
};
