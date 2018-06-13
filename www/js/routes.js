routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/main_content/',
    url: './pages/main_content.html',
    on: {
      //pageBeforeIn: function (event, page) {
      //  // do something before page gets into the view
      //},
      pageAfterIn: function (event, page) {
         //do something after page gets into the view
        document.getElementById("tableFixedHeader").style.maxWidth=document.getElementById("tableWithFixedHead").clientWidth+'px';
        //document.getElementById("inventoryTable").style.maxWidth=document.getElementById("tableWithFixedHead").clientWidth+'px';
        document.getElementById("inventoryTableTableDiv").style.maxWidth=document.getElementById("tableWithFixedHead").clientWidth+'px';
      //inventoryTableTableDiv
        //document.getElementById("inventoryTableTableDiv").style.wordWrap="break-word";
        document.getElementById("inventoryTableTableDiv").style.marginTop=
            ( document.getElementById("tableFixedHeader").offsetHeight
           //+ document.getElementById("inventoryNavbar").offsetHeight
            //document.getElementById("inventorySubNavbar").offsetHeight
            )  +'px';
        //
        //console.log('width=', document.getElementById("tableWithFixedHead").clientWidth+'px'); //inventoryTable
        document.getElementById("tableFixedHeader").style.position='fixed';
        //console.log('width=', document.getElementById("inventoryTable").clientWidth+'px');
      }
      //pageInit: function (event, page) {
      //  // do something when page initialized
      //  document.getElementById("tableFixedHeader").style.width=document.getElementById("tableWithFixedHead").offsetWidth+'px';
      //  console.log('width=', document.getElementById("tableWithFixedHead").offsetWidth+'px');
      //  document.getElementById("tableFixedHeader").style.position='fixed';
      //},
      //pageBeforeRemove: function (event, page) {
      //  // do something before page gets removed from DOM
      //},
    }
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
