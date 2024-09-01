import { createStore } from 'redux'
import { EDIT_CATALOGUE, RESET_CATALOGUE_FORM, SET } from './actionType'

const initialState = {
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
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case SET:
      return { ...state, ...rest }
    case EDIT_CATALOGUE:
      return {
        ...state,
        formMode: 'edit',
        catalogueData: rest?.catalogueData || initialState.catalogueData,
      }
    case RESET_CATALOGUE_FORM:
      return { ...state, catalogueData: initialState.catalogueData, formMode: 'add' }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
