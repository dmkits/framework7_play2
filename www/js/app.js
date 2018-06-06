
// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  domCache:true,
  //data: function () {
  //  return {
  //    user: {
  //      firstName: 'John',
  //      lastName: 'Doe',
  //    },
  //  };
  //},
  // App root methods
  //methods: {
  //  helloWorld: function () {
  //    app.dialog.alert('Hello World!');
  //  },
  //},
  // App routes
  routes: routes
});

 //Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/',
  domCache:true
});

//var mainView=app.views.add('.view-main', {domCache:true});

//var mainView = app.views.create('.view-main', {
//  on: {
//    pageInit: function () {
//      console.log('page init')
//    }
//  },
//  domCache:true
//});


//app.loginScreen.open;

$$('.login-screen .list-button').on('click', function () {
  var uname = $$('.login-screen input[name = "username"]').val();
  var pwd = $$('.login-screen input[name = "password"]').val();

  console.log('!!!!!!! Clicked');
  mainView.router.load({pageName: 'about'});
  //app.alert('Username: ' + uname + ', Password: ' + pwd, function () {
  //  app.closeModal('.login-screen');
  //});
});

//$$(document).on('page:init', function (e) {
//  // Do something here when page loaded and initialized
//  console.log('page:init=');
//});

//$$(document).on('page:init', '.page[data-page="about"]', function (e) {
//  // Do something here when page with data-page="about" attribute loaded and initialized
//
//  console.log('page about init');
//});



//Login Screen Demo
//$$('#my-login-screen .login-button').on('click', function () {
//  var username = $$('#my-login-screen [name="username"]').val();
//  var password = $$('#my-login-screen [name="password"]').val();
//  if(!(username=="user" && password=='123') ){
//    // Alert username and password
//    //app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
//    app.dialog.alert("Wrong password or login");
//  }else{
//    console.log('!!!!! Login wright');
//    //app.views.create('#main_content-view');
//   // mainView.router.loadPage({url:'./main_content.html', ignoreCache:true, reload:true });
//
//    //var tableView = app.views.create('#main_content_view', {
//    //  url: '/main_content.html'
//    //});
//
//     //mainView.route({name:'main_content_view'});
//
//
//  }
//  // Close login screen
//  //app.loginScreen.close('#my-login-screen');
//  //$$('#my-login-screen .login-button').path='/main_content/';
//
//
//  //var contentView = app.views.create('.main_content', {
//  //  url: './pages/main_content.html'
//  //});
//
//});
//function enterBarCode(){
//  var input = document.getElementById("barCodeInput");
//  var value=input.value;
//  console.log('enterBarCode clicked!!! input.value=',value);
//}



var rowNum=1;
function onkeypressFunction(keyCode){
  if(keyCode==13){
    //alert("onkeypressFunction keyCode  13="+keyCode);
    createTableRow();
  }
}

function createTableRow(){                                 console.log('createTableRow=');
  var barcode=$$("#barCodeInput").val();                   console.log('barcode=', barcode);
  if(document.getElementById(barcode)){    console.log('document.getElementById(barcode)');
    document.getElementById(barcode).innerText=parseInt(document.getElementById(barcode).innerText)+1;
    document.getElementById("barCodeInput").value='';
    return;
  }
  var mainTable=document.getElementById('inventoryTable');
  var trHigher=document.createElement('tr');
  var tdRowNum=document.createElement('td');
  var tdProdName=document.createElement('td');

  tdRowNum.innerText=rowNum.toString();
  tdRowNum.className='text-centered';

  tdProdName.innerText="Товар со штрих-кодом "+barcode;
  tdProdName.className="blue-text";
  trHigher.appendChild(tdRowNum);
  trHigher.appendChild(tdProdName);

  var trLower=document.createElement('tr');
  var tdBarCode=document.createElement('td');
  var tdUm=document.createElement('td');
  var tdRef=document.createElement('td');
  var tdReal=document.createElement('td');
  tdReal.id=barcode;

  tdBarCode.innerText=barcode;
  tdUm.innerText='шт';
  tdRef.innerText='1';
  tdReal.innerText='1';

  tdUm.className='text-centered';
  tdRef.className='text-right';
  tdReal.className='text-right';


  trLower.appendChild(tdBarCode);
  trLower.appendChild(tdUm);
  trLower.appendChild(tdRef);
  trLower.appendChild(tdReal);

  mainTable.appendChild(trHigher);
  mainTable.appendChild(trLower);
  tdRowNum.rowSpan='2';
  tdProdName.colSpan='4';

  document.getElementById("barCodeInput").value='';
  rowNum++;
}