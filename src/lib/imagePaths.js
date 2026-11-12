export const campaignImageOptions = [
  "/images/campaigns/hero.webp",
  "/images/campaigns/languages.webp",
  "/images/modalities/hero.webp",
  "/images/teachers/no-photo.webp",
];

const legacyCampaignImagePaths = {
  "/images/hero.png": campaignImageOptions[0],
  "/images/Lenguajes.png": campaignImageOptions[1],
  "/images/Modalities.png": campaignImageOptions[2],
  "/images/Sinfoto.png": campaignImageOptions[3],
};

export function resolveCampaignImage(image) {
  if (!image) return campaignImageOptions[0];
  if (legacyCampaignImagePaths[image]) return legacyCampaignImagePaths[image];
  if (image.startsWith("/images/") && /\.(png|jpe?g)$/i.test(image)) {
    return image.replace(/\.(png|jpe?g)$/i, ".webp");
  }
  return image;
}
