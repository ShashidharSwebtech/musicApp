export interface item {
  title: string;
  artist: String;
  artwork: String;
  url: String;
  id: String;
  favornot: boolean;
}
export interface Globalstate {
  data: item[];
  favData: item[];
  DisplayItem: item;
}

export const initState: Globalstate = {
  data: [
    {
      title: 'Death Bed',
      artist: 'Powfu',
      artwork: 'https://samplesongs.netlify.app/album-arts/death-bed.jpg',
      url: 'https://samplesongs.netlify.app/Death%20Bed.mp3',
      id: '1',
      favornot: false,
    },
    {
      title: 'Bad Liar',
      artist: 'Imagine Dragons',
      artwork: 'https://samplesongs.netlify.app/album-arts/bad-liar.jpg',
      url: 'https://samplesongs.netlify.app/Bad%20Liar.mp3',
      id: '2',
      favornot: false,
    },
    {
      title: 'Faded',
      artist: 'Alan Walker',
      artwork: 'https://samplesongs.netlify.app/album-arts/faded.jpg',
      url: 'https://samplesongs.netlify.app/Faded.mp3',
      id: '3',
      favornot: false,
    },
    {
      title: 'Hate Me',
      artist: 'Ellie Goulding',
      artwork: 'https://samplesongs.netlify.app/album-arts/hate-me.jpg',
      url: 'https://samplesongs.netlify.app/Hate%20Me.mp3',
      id: '4',
      favornot: false,
    },
    {
      title: 'Solo',
      artist: 'Clean Bandit',
      artwork: 'https://samplesongs.netlify.app/album-arts/solo.jpg',
      url: 'https://samplesongs.netlify.app/Solo.mp3',
      id: '5',
      favornot: false,
    },
    {
      title: 'Without Me',
      artist: 'Halsey',
      artwork: 'https://samplesongs.netlify.app/album-arts/without-me.jpg',
      url: 'https://samplesongs.netlify.app/Without%20Me.mp3',
      id: '6',
      favornot: false,
    },
  ],
  favData: [],
  DisplayItem: {
    title: 'Hate Me',
    artist: 'Ellie Goulding',
    artwork: 'https://samplesongs.netlify.app/album-arts/hate-me.jpg',
    url: 'https://samplesongs.netlify.app/Hate%20Me.mp3',
    id: '4',
    favornot: false,
  },
};
interface action {
  type: String;
  payload: item;
}

export const Reducer = (state = initState, action: any) => {
  switch (action.type) {
    case 'ADD_FAV':
      state.data = state.data.map((item: item) => {
        if (action.payload.item.id == item.id) {
          item.favornot = true;
        }
        return item;
      });
      state.favData = [...state.favData, action.payload.item];
      return {...state};
    case 'REMOVE_FAV':
      state.favData = state.favData.filter(
        (item: item) => item.id === action.payload.item.id,
      );
      state.data = state.data.map((item: item) => {
        if (action.payload.item.id == item.id) {
          item.favornot = false;
        }
        return item;
      });
      return {...state};
    case 'INC':
      if (
        action.payload.item.id <
        Number(state.data[state.data.length - 1].id) - 1
      ) {
        state.DisplayItem = state.data[Number(action.payload.item.id) + 1];
      }
      return {...state};
    case 'DEC':
      if (action.payload.item.id > state.data[0].id) {
        state.DisplayItem = state.data[Number(action.payload.item.id) - 1];
      }
      return {...state};
    case 'SET_DISPLAY_ITEM':
      state.DisplayItem = state.data[action.payload.item.id - 1];
      return {...state};
    default:
      return {...state};
  }
};
