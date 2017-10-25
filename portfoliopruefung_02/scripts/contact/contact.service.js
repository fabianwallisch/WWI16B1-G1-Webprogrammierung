angular.module("contact").service("contactService", function () {

	var contactList = [];
	var contactId = 1;

	var loadLocalStorage = () => {
		if(!window.localStorage)
			return;

		var lsList;
		var lsId;

		if(localStorage.getItem("list") === null){
			lsList = [];
		}else{
			lsList = JSON.parse(localStorage.getItem("list"));
			if(!Array.isArray(lsList)){
				lsList = [];
			}
		}

		if(localStorage.getItem("id") === null){
			lsId = 1;
		}else{
			lsId = Number.parseInt(localStorage.getItem("id"));
			if(lsId < 1){
				lsId = 1;
			}
		}

		contactList = lsList;
		contactId = lsId;
	};

	var saveLocalStorage = () => {
		if(!window.localStorage)
			return;
		localStorage.setItem("list", JSON.stringify(contactList));
		localStorage.setItem("id", contactId);
	}

	this.getList = () => {
		return contactList;
	}

	this.getContactById = (contactId) => {
		var index = contactList.findIndex((contact) => {
			return contact.id === contactId;
		});

		if (index >= 0)
			return contactList[index];
		else
			return undefined;
	};

	this.addContact = (contact) => {
		contact.id = contactId++;
		contactList.push(contact);
		
		saveLocalStorage();
	};

	this.updateContact = (contactId, updatedContact) => {
		var index = contactList.findIndex((contact) => {
			return contact.id === contactId;
		});

		if (index < 0)
			return undefined;

		updatedContact.id = contactId;
		contactList[index] = updatedContact;
		
		saveLocalStorage();
	};

	this.deleteContact = (contactId) => {
		var index = contactList.findIndex((contact) => {
			return contact.id === contactId;
		});

		var newList = [];

		for (var i = 0; i < contactList.length; i++) {
			if (i == index)
				continue

			newList.push(contactList[i]);
		}

		contactList = newList;
		
		saveLocalStorage();
	};

	this.exportData = ()=>{
		var exportList = [];
		contactList.forEach((contact)=>{
			exportList.push({
				firstname: contact.firstname,
				lastname: contact.lastname,
				phone: contact.phone,
				email: contact.email
			});
		});
		return {
			contactId: contactId,
			contactList: exportList
		};
	};

	this.importData = (data)=>{
		contactId = data.contactId;
		contactList = data.contactList;
		saveLocalStorage();
	}

	this.reset = ()=>{
		contactList = [];
		contactId = 1;
		saveLocalStorage();
	}

	loadLocalStorage();
});