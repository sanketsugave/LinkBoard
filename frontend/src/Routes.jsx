import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import Write from './pages/Write';
import Posts from './pages/Posts';
import PostView from './pages/PostView';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import About from './pages/About';
import Contact from './pages/Contact';
// import NotFound from './pages/NotFound'; // Optional 404 page

const routes = [
  {
    path: '/',
    element: (
      // <PrivateRoute>
        <Home />
      /* </PrivateRoute> */
    ),
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path:'/post/:id',
    element: (
      <PrivateRoute>
        <PostView />
      </PrivateRoute>
    ),
  },
  {
    path: '/write',
    element: (
        <PrivateRoute>
            <Write />
        </PrivateRoute>
    ),
  },
  {
  path: "/edit-profile",
  element: (
    <PrivateRoute>
      <EditProfile />
    </PrivateRoute>
  ),
},
  {
    path: '/Posts',
    element: (
      <PrivateRoute>
        <Posts />
      </PrivateRoute> 
    ),
  },
  {
  path: "/edit/:id",
  element: (
    <PrivateRoute>
      <EditPost />
    </PrivateRoute>
  ),
},
{
  path: "/profile",
  element: (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  ),
},
{
    path: '/login',
    element: <Login />,
},
{
    path: '/register',
    element: <Register />,
},
{
    path: '*',
    element:<h1>404 Not Found</h1>,
}
];

export default routes;
