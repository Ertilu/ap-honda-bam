import { createStore } from 'redux'
import { EDIT_INVENTORY, RESET_INVENTORY_FORM, SET } from './actionType'

const initialState = {
  sidebarShow: true,
  formMode: 'add',
  inventoryData: {
    name: '',
    price: '',
  },
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case SET:
      return { ...state, ...rest }
    case EDIT_INVENTORY:
      return {
        ...state,
        formMode: 'edit',
        inventoryData: rest?.inventoryData || initialState.inventoryData,
      }
    case RESET_INVENTORY_FORM:
      return { ...state, inventoryData: initialState.inventoryData, formMode: 'add' }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
