routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/main_content/',
    url: './pages/main_content.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
