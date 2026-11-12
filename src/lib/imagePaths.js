export const campaignImageOptions = [
  "/images/campaigns/hero.png",
  "/images/campaigns/languages.png",
  "/images/modalities/hero.png",
  "/images/teachers/no-photo.png",
];

const legacyCampaignImagePaths = {
  "/images/hero.png": campaignImageOptions[0],
  "/images/Lenguajes.png": campaignImageOptions[1],
  "/images/Modalities.png": campaignImageOptions[2],
  "/images/Sinfoto.png": campaignImageOptions[3],
};

export function resolveCampaignImage(image) {
  return legacyCampaignImagePaths[image] || image || campaignImageOptions[0];
}
