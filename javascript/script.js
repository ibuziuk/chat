function getMessage()
{
	var message=document.getElementById('ChatText').value;
	return message;
}

var uniqueId = function() {
	var date = Date.now();
	var random = Math.random() * Math.random();

	return Math.floor(date * random).toString();
};

var theMessage = function(text, name) {
	return {
		description:text,
		username: name,
		id: uniqueId()
	};
};

var msgList = [];
var currentUser;

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
	var allTasks = restore();
	if(allTasks!=null)
	{
	createAllTasks(allTasks);
	}
	var user = restoreCurrentUser();
	if(user!=null)
	{
		currentUser = user;
		addUser(user);
	}
}

function createAllTasks(allTasks) {
	for(var i = 0; i < allTasks.length; i++)
	{
		addRestoringInformation(allTasks[i]);
		msgList.push(allTasks[i]);
	}
}


function delegateEvent(evtObj) {
	if (evtObj.type === 'click' && evtObj.target.classList.contains('ButtonSend') && document.getElementsByClassName('Select').length == 0)
		addMessage();
	if (evtObj.type === 'click' && evtObj.target.classList.contains('ButtonLogin'))
		addUser(getUserName());
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

function createMessage(text, id){
	var divItem = document.createElement('div');
	divItem.innerHTML = '<div data-id=' + id+'><button class="Delete"></button><button class="Change"></button>'+text+'</div>';
	return divItem;
}

function addMessage()
{   
	var name = currentUser;

	if(getMessage().length!=0 )
	{
	
	var chat = document.getElementsByClassName('BlockChatting')[0];
	var newMsg = theMessage(name+": "+getMessage(), name);
	 msgList.push(newMsg);
	var message = createMessage(name+": "+getMessage(), newMsg.id);
	chat.appendChild(message);
	document.getElementById('ChatText').value='';
	store(msgList);
	}
}

function createUser(text)
{
	var divItem = document.createElement('div');
	currentUser = text;
	divItem.className = 'User';
	divItem.appendChild(document.createTextNode(text));
	storeCurrentUser(currentUser);
	return divItem;
}

function getUserName()
{
	var userName = document.getElementById('TextLogin').value;
	document.getElementById('TextLogin').value = '';
	return userName;
}

function addUser(text)
{
	var users = document.getElementsByClassName('BlockUsers')[0];
	var user = createUser(text);
	users.appendChild(user);
}

function changeUserName()
{
	var divItem = document.getElementsByClassName('User')[0];
	var name = prompt('Введите новый логин:', divItem.firstChild.nodeValue);
	divItem.firstChild.nodeValue = name;
	currentUser = name;
	storeCurrentUser(currentUser);
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
	var id = messages[0].getAttribute('data-id');
	for(var i = 0; i < msgList.length; i++){
		if(msgList[i].id != id)
			continue;
	msgList.splice(i,1);
	messages[0].remove();
	}
	store(msgList);
}

function editMessage()
{
	var messages = document.getElementsByClassName('Select');
	var str = messages[0].innerHTML;
	var pos = str.indexOf(":")+1;
	var text = str.substring(pos);
    document.getElementById('ChatText').value = text;
   
}

function nextEditMessage()
{
	var messages = document.getElementsByClassName('Select');
    var id = messages[0].getAttribute('data-id');
	for(var i = 0; i < msgList.length; i++){
		if(msgList[i].id != id)
			continue;
		msgList[i].description = msgList[i].username+":"+getMessage();
		messages[0].innerHTML = '<div data-id=' + msgList[i].id+'><button class="Delete"></button><button class="Change"></button>'+msgList[i].description+'</div>';
	}
	document.getElementById('ChatText').value='';
	messages[0].classList.remove('Select');
	store(msgList);
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

function store(listToSave) {

	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	localStorage.setItem("MessagesList", JSON.stringify(listToSave));
}

function restore() {
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	var item = localStorage.getItem("MessagesList");

	return item && JSON.parse(item);
}

function storeCurrentUser(user){
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	localStorage.setItem("UserName", JSON.stringify(user));
}

function restoreCurrentUser() {
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	var item = localStorage.getItem("UserName");

	return item && JSON.parse(item);
	}

function addRestoringInformation(msg)
{
	var chat = document.getElementsByClassName('BlockChatting')[0];
	chat.appendChild(createMessage(msg.description, msg.id));
}