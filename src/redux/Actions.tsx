import {item} from './Reducer';

export const ADD_FAV = (item: any) => {
  return {
    type: 'ADD_FAV',
    payload: {item: item},
  };
};

export const REMOVE_FAV = (id: number) => {
  return {
    type: 'REMOVE_FAV',
    payload: {item: {id: id}},
  };
};

export const Change_Display_item = (id: number, incordec: 'inc' | 'dec') => {
  return incordec === 'inc'
    ? {
        type: 'INC',
        payload: {item: {id: id - 1}},
      }
    : {
        type: 'DEC',
        payload: {item: {id: id - 1}},
      };
};

export const setDisplayItem = (id: number) => {
  return {
    type: 'SET_DISPLAY_ITEM',
    payload: {item: {id: id}},
  };
};
