import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './styles/index.scss'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducers'
import { thunk } from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;

export type User = {
  id_user: number;
  name: string;
  prenom: string;
  email: string;
  age: number;
  followed: User;
  follower: User;
};

export type Post = {
  id_post?: number,
  content: string,
  video: string,
  user: { id_user?: number },
  comments: [{
    id_commentaire?: number
  }],
  likes: []
}

export interface Follow {
  followerId: number;
  followedId: number;
  followed: User,
  follower: User
};

export interface UserState {
  id_user?: number;
  email: string;
  name: string;
  created_at: string;
  update: {
    success: boolean;
    message: string;
  };
  blob: string;
  following: Follow[];
  followers: Follow[];
  noFollowing: User[];
}

export interface PostState {
  update: {},
  posts: Post[]
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)