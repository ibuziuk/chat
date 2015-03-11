function getMessage()
{
	var message=document.getElementById('ChatText').value;
	return message;
}

function run(){
	var appContainer = document.getElementsByClassName('BlockMessageEnter')[0];
    appContainer.addEventListener('click', delegateEvent);
    var loginContainer = document.getElementsByClassName('BlockLogin')[0];
	loginContainer.addEventListener('click', delegateEvent);
	var messageContainer = document.getElementsByClassName('BlockChatting')[0];
	messageContainer.addEventListener('click', delegateEvent);
	var index = document.getElementById('Indicator');
	index.addEventListener('mouseover', delegateEvent);
	index.addEventListener('mouseout', delegateEvent);
	
}
function delegateEvent(evtObj) {
	if (evtObj.type === 'click' && evtObj.target.classList.contains('ButtonSend') && document.getElementsByClassName('Select').length == 0)
		addMessage();
	if (evtObj.type === 'click' && evtObj.target.classList.contains('ButtonLogin'))
		addUser();
	if (evtObj.type === 'click' && evtObj.target.classList.contains('ChangeLogin'))
		changeUserName();
	if (evtObj.type === 'click' && evtObj.target.classList.contains('Delete'))
	{
		var label = evtObj.target.parentElement;
	    setMarker(label);	
		deleteMessage();
	}
	if (evtObj.type === 'click' && evtObj.target.classList.contains('Change'))
	{
		var label = evtObj.target.parentElement;
	    setMarker(label);	
		editMessage();
	}
	var container = document.getElementsByClassName('Select');
	if (evtObj.type === 'click' && evtObj.target.classList.contains('ButtonSend') && container.length>0)
		nextEditMessage();
	if (evtObj.type === 'mouseover')
		changeIndicatorOn();
	if (evtObj.type === 'mouseout')
		changeIndicatorOff();
}

function createMessage(text){
	var divItem = document.createElement('div');
	var button1 = document.createElement('button');
	var button2 = document.createElement('button');
	    button1.className = "Delete";
		button2.className = "Change";
		divItem.className = 'Message';
		divItem.appendChild(button1);
		divItem.appendChild(button2);
	    divItem.appendChild(document.createTextNode(text));
 
	return divItem;
}

function addMessage()
{
	var users = document.getElementsByClassName('User');
	if(getMessage().length!=0)
	{
	if (users.length != 0)
	{
	var chat = document.getElementsByClassName('BlockChatting')[0];
	var message = createMessage(getMessage());
	chat.appendChild(message);
	document.getElementById('ChatText').value='';
	}
	else alert('Для того чтобы отправлять сообщения, вам нужно зарегестрироваться');
	}
}

function createUser(text)
{
	var divItem = document.createElement('div');
	var check = document.createElement('input');
	check.setAttributes
	divItem.className = 'User';
	divItem.appendChild(document.createTextNode(text));
	return divItem;
}

function getUserName()
{
	var userName = document.getElementById('TextLogin').value;
	document.getElementById('TextLogin').value = '';
	return userName;
}

function addUser()
{
	var users = document.getElementsByClassName('BlockUsers')[0];
	var user = createUser(getUserName());
	users.appendChild(user);
}

function changeUserName()
{
	var divItem = document.getElementsByClassName('User')[0];
	var name = prompt('Введите новый логин:', divItem.firstChild.nodeValue);
	divItem.firstChild.nodeValue = name;
}

function setMarker(label)
{
	if(label.classList.contains('Select'))
		label.classList.remove('Select');
	else label.classList.add('Select');
}
function deleteMessage()
{
	var messages = document.getElementsByClassName('Select');
	messages[0].remove();
}

function editMessage()
{
	var messages = document.getElementsByClassName('Select');
	var str = messages[0].innerHTML;
	var pos = str. lastIndexOf(">")+1;
	var text = str.substring(pos);
    document.getElementById('ChatText').value = text;
   
}

function nextEditMessage()
{
	var messages = document.getElementsByClassName('Select');
	if (getMessage().length!=0)
	messages[0].innerHTML = '<button class="Delete"></button><button class="Change"></button>'+getMessage();
	document.getElementById('ChatText').value='';
	messages[0].classList.remove('Select');
}

function changeIndicatorOn()
{
	var index = document.getElementById('Indicator');
	index.setAttribute('src','http://savepic.su/5321198.png');
}

function changeIndicatorOff()
{
	var index = document.getElementById('Indicator');
	index.setAttribute('src','http://savepic.su/5187513.png');
}

