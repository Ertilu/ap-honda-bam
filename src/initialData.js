import { toLocalISOString } from './shared/utils'

export const promoData = {
  name: '',
  images: [],
  startDate: toLocalISOString(new Date()),
  endDate: toLocalISOString(new Date()),
}

export const initialState = {
  sidebarShow: true,
  formMode: 'add',
  catalogueData: {
    banners: [],
    images: [],
    featureTexts: [],
    featureImages: [],
    name: '',
    price: 0,
    description: '',
    category: '',
    colors: [
      {
        name: '',
        code: '',
        code2: '',
        code3: '',
        image: '',
      },
    ],
    logo: '',
    types: [
      {
        name: '',
        price: '',
      },
    ],
  },
  promoData,
}
