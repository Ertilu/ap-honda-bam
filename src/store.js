import { createStore } from 'redux'
import { EDIT_CATALOGUE, RESET_CATALOGUE_FORM, RESET_PROMO_FORM, SET } from './actionType'
import { initialState } from './initialData'
import { toLocalISOString } from './shared/utils'

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case SET:
      return { ...state, ...rest }
    case EDIT_CATALOGUE:
      return {
        ...state,
        formMode: 'edit',
        catalogueData:
          { ...state.catalogueData, ...rest?.catalogueData } || initialState.catalogueData,
      }
    case RESET_CATALOGUE_FORM:
      return {
        ...state,
        catalogueData: {
          banners: [],
          images: [],
          name: '',
          price: 0,
          downPayment: 0,
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
          features: [
            {
              title: '',
              text: '',
              image: '',
            },
          ],
        },
        formMode: 'add',
      }
    case RESET_PROMO_FORM:
      return {
        ...state,
        promoData: {
          name: '',
          images: [],
          startDate: toLocalISOString(new Date()),
          endDate: toLocalISOString(new Date()),
        },
        formMode: 'add',
      }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
