export default function CampaignVideo({ src, name }) {
  return (
    <iframe
      className="block h-full w-full"
      src={src}
      title={name ? `Video de YouTube de ${name}` : 'Video de YouTube de la campaña'}
      allow="encrypted-media; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  )
}
