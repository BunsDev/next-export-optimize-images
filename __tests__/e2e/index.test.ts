import path from 'path'

import fs from 'fs-extra'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'

const exist = (filename: string) => fs.existsSync(path.resolve(__dirname, 'out/_next/static/chunks/images', filename))

const files = [
  // avif

  // next/image
  '_next/static/media/img.8a5ad2fe_[width].avif',
  'images/img_[width].avif',
  'og_[width].avif',
  'images/animated_[width].avif',
  '_next/static/media/client-only.8a5ad2fe_[width].avif',
  // next/legacy/image
  '_next/static/media/legacy-img.8a5ad2fe_[width].avif',
  'images/legacy-img_[width].avif',

  // webp

  // next/image
  '_next/static/media/img.8a5ad2fe_[width].webp',
  'images/img_[width].webp',
  'og_[width].webp',
  'images/animated_[width].webp',
  '_next/static/media/client-only.8a5ad2fe_[width].webp',
  // next/legacy/image
  '_next/static/media/legacy-img.8a5ad2fe_[width].webp',
  'images/legacy-img_[width].webp',

  // png

  // next/image
  '_next/static/media/img.8a5ad2fe_[width].png',
  'images/img_[width].png',
  'og_[width].png',
  '_next/static/media/client-only.8a5ad2fe_[width].png',
  // next/legacyjpgge
  '_next/static/media/legacy-img.8a5ad2fe_[width].png',
  'images/legacy-img_[width].png',
]

describe('`next build && next export && next-export-optimize-images` is executed correctly', () => {
  test('Images are being generated.', async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const customConfig = require('./next.config.js')
    const configImages = { ...imageConfigDefault, ...customConfig.images }
    const allSizes = [...configImages.imageSizes, ...configImages.deviceSizes]
    allSizes.forEach((size) => {
      files.forEach((file) => {
        expect(exist(file.replace('[width]', size.toString()))).toBeTruthy()
      })
    })
  })
})
