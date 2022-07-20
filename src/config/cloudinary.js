import { buildUrl } from 'cloudinary-build-url'

export function cloudinaryUrl(public_id, width, height) {
  return buildUrl(public_id, {
    cloud: {
      cloudName: 'dncxq11ii',
    },
    transformations: { width, height },
  })
}
