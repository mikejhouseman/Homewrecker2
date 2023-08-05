export const extractErrorMessages = (errors) => {
  if (!errors || typeof errors !== "object") {
    return [];
  }
  return Object.values(errors).flat();
};
