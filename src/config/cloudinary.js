import { buildUrl } from 'cloudinary-build-url'

export function cloudinaryUrl(public_id, width, height) {
  console.log('public_id', public_id)
  const url = buildUrl(public_id, {
    cloud: {
      cloudName: 'dncxq11ii',
    },
    transformations: { width, height },
  })

  console.log('url', url)

  return url
}
