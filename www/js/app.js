// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  theme: 'auto', // Automatic theme detection
  routes: routes
});

 //Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/',
  domCache:true
});

var users=[
  {"id":"1", "name":"anna", pswd:"123"},
  {"id":"2", "name":"borya", pswd:"123"},
  {"id":"3", "name":"vasya", pswd:"123"},
  {"id":"4", "name":"gena", pswd:"123"},
  {"id":"5", "name":"diana", pswd:"123"},
  {"id":"6", "name":"anna1", pswd:"123"},
  {"id":"7", "name":"borya1", pswd:"123"},
  {"id":"8", "name":"vasya1", pswd:"123"},
  {"id":"9", "name":"gena1", pswd:"123"},
  {"id":"10", "name":"diana1", pswd:"123"},
  {"id":"11", "name":"anna2", pswd:"123"},
  {"id":"12", "name":"borya2", pswd:"123"},
  {"id":"13", "name":"vasya2", pswd:"123"},
  {"id":"14", "name":"gena2", pswd:"123"},
  {"id":"15", "name":"diana2", pswd:"123"}
];
//Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();
  var ligInSuccess=false;
  for(var k in users){
    if(users[k].name==username){
      if(users[k].pswd==password)ligInSuccess=true;
      break;
    }
  }
  if(!ligInSuccess){
    app.dialog.alert("Неверное имя или пароль","", function(){
      $$('#my-login-screen [name="username"]').val("");
      $$('#my-login-screen [name="password"]').val("");
    });
  }else
    mainView.router.navigate('/main_content/');
});

var rowNum=1;
function onkeypressFunction(keyCode){
  if(keyCode==13){
    createTableRow();
  }
}

function createTableRow(){
  var barcode=$$("#barCodeInput").val();
  if(document.getElementById(barcode)){
    document.getElementById(barcode).innerText=parseInt(document.getElementById(barcode).innerText)+1;
    document.getElementById("barCodeInput").value='';
    return;
  }
  var mainTable=document.getElementById('inventoryTable');
  var tbody=document.createElement('tr');

  var trHigher=document.createElement('tr');
  var tdRowNum=document.createElement('td');
  var tdProdName=document.createElement('td');

  tdRowNum.innerText=rowNum.toString();
  tdRowNum.className='text-centered';

  //tdProdName.style.overflow="hidden";        //white-space: nowrap
  //tdProdName.style.whiteSpace="nowrap";

  tdProdName.innerText="Товар со штрих-кодом"+barcode;
  tdProdName.className="blue-text";
  trHigher.appendChild(tdRowNum);
  trHigher.appendChild(tdProdName);

  var trLower=document.createElement('tr');
  var tdBarCode=document.createElement('td');
  var tdUm=document.createElement('td');
  var tdRef=document.createElement('td');
  var tdReal=document.createElement('td');
  tdReal.id=barcode;
  tbody.onclick=  function(){
    showRealQtyFunction(tdReal, tdReal.innerText.trim(),tdProdName.innerText);
    if(document.getElementById('clickedTableRow')) document.getElementById('clickedTableRow').id="";
    tbody.id="clickedTableRow";
  };

  tdRowNum.style.width=(document.getElementById('num_td').offsetWidth-11) + "px";
  tdBarCode.style.width=(document.getElementById('code_td').offsetWidth-11) + "px";
  tdUm.style.width=(document.getElementById('um_td').offsetWidth-11) + "px";
  tdRef.style.width=(document.getElementById('doc_qty').offsetWidth-11) + "px";
  tdRef.style.textAlign="center";
  tdReal.style.width=(document.getElementById('real_qty').offsetWidth-11) + "px";
  tdReal.style.textAlign="center";

  tdBarCode.innerText=barcode;
  tdUm.innerText='шт';
  tdRef.innerText='1';
  tdReal.innerText='1';

  tdUm.className='text-centered';
  //tdRef.className='text-right';
  //tdReal.className='text-right';



  tdRef.className='refQty';
  tdReal.className='realQty';

  trLower.appendChild(tdBarCode);
  trLower.appendChild(tdUm);
  trLower.appendChild(tdRef);
  trLower.appendChild(tdReal);

  tbody.appendChild(trHigher);
  tbody.appendChild(trLower);
  mainTable.appendChild(tbody);

  tdRowNum.rowSpan='2';
  tdProdName.colSpan='4';

  document.getElementById("totalRowQty").innerHTML=rowNum;
  setTotalQty();

  document.getElementById("barCodeInput").value='';
  rowNum++;
}

function setTotalQty(){
  var refQtylist = document.getElementsByClassName("refQty");
  var realQtylist = document.getElementsByClassName("realQty");

  var totalrefQty=0;
  var totalrealQty=0;

  for(var tdIndex=0; tdIndex<refQtylist.length; tdIndex++){
    console.log('totalrealQty=', totalrealQty);
    console.log('innerHTML=', refQtylist[tdIndex].innerHTML);
    totalrealQty+=parseInt(refQtylist[tdIndex].innerHTML);
    totalrefQty+=parseInt(realQtylist[tdIndex].innerHTML);
  }
  document.getElementById("totalDocQty").innerHTML=totalrealQty;
  document.getElementById("totalRealQty").innerHTML=totalrefQty;
}

function showRealQtyFunction(cell,displayedQty, prodName){
  var input='<br><input id="inputRealQty" type="number" style="text-align:center; border: 1px solid grey; padding: 5px" value="'+displayedQty+'"></<input>';
  var realQtyDialog=app.dialog.create({
    destroyOnClose:true,
    content:input,
    title: 'Фактический остаток',
    text:prodName,
    on:{
      open:function(){
        unfocusBarcodeInput();
        document.getElementById("inputRealQty").focus();
      },
      close:function(){
        focusBarcodeInput()
      }
      //,
      //opened:function(){
      //  //document.getElementById("inputRealQty").focus();
      //}
    },
    buttons:[
      {
        text:"ОТМЕНА",
        onClick:function(){
          realQtyDialog.close();
        }
      },
      {
        text:"ВВОД",
        keyCodes:[13],
        onClick:function(){
          cell.innerText=document.getElementById("inputRealQty").value.trim() || 0;
          setTotalQty();
          realQtyDialog.close();
        }
      }
    ]
  });

  realQtyDialog.open();
}

var usersDialog;

$$('#autocomplete-standalone').on('click', function(){
  selectUserDialog();
});
function selectUserDialog(){
  usersDialog=app.dialog.create({
    content:generateUserDialogContent(users),
    on: {
      opened: function () {
        console.log('dialog opened');
        for (var f in users) {
          var username=users[f].name;
          //document.getElementById('loginDialog' + users[f].name).onclick = function () {
          //  setUserloginData(username);
          //}
          $$('#loginDialog'+users[f].name).on('click', function(el){
            console.log("ELEMENT="+JSON.stringify(el));
           // setUserloginData(username);
          })
        }
      }
    }
  });
  usersDialog.open('');
}



function generateUserDialogContent(users){
  if(!users || users.length==0) return '';
  var innerHtml='<div  style="height: 300px; overflow-y: scroll; font-size: 30px;">';
  innerHtml+='<ul>';
  for (var k in users){
    var user=users[k];
    var username=user.name.toString();
    //innerHtml+='<li onclick="setUserloginData(\''+username+'\')">'+user.name+'<br>';
    innerHtml+='<li id="loginDialog'+username+'">'+username+'<br>';
   //alert($$('#loginDialog'+username));
   //
   // $$('#loginDialog'+username).on('click', function(){
   //   alert('loginDialog'+username);
   //   setUserloginData(username);
   // })

    //document.getElementById('loginDialog'+username).onclick=function(){
    //  alert('loginDialog'+username);
    //  setUserloginData(username);
    //};
  }
  innerHtml+='</ul>';
  innerHtml+='</div>';
  console.log('innerHtml=', innerHtml);
  return innerHtml;

  //if(!users || users.length==0) return '';
  ////var div=$$('div');
  //var div=$$.append('div');
  //div.css({
  //  height:"300px",
  //  'overflow-y': 'scroll',
  //  'font-size': '30px'
  //});
  //var ul=div.append('ul');
  //for (var k in users){
  //  var user=users[k];
  //  var username=user.name.toString();
  //  ul.append('li')
  //      .on('click', function(){
  //        setUserloginData(username);})
  //      .html(user.name+'<br>') ;
  //}
  //return div;
}

function setUserloginData(username){
  usersDialog.close();
  $$('#my-login-screen [name="username"]').val(username);
}
function unfocusBarcodeInput(){
  var barcodeInput=document.getElementById("barCodeInput");
  barcodeInput.onblur=function(){};
  barcodeInput.blur();
}
function focusBarcodeInput(){
  var barcodeInput=document.getElementById("barCodeInput");
  barcodeInput.onblur=barcodeInput.focus();
}
