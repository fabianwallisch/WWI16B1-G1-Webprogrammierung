angular.module("contact").service("contactService", function(){
	
	var contactList = [];
	var contactId = 1;

	var initLocalStorage = ()=>{
		var lsList = Array.from(localStorage.getItem("list"));
		var lsId = Number.parseInt(localStorage.getItem("id"));

		if(lsList !== null)
			contactList = lsList;
		
		if(lsId !== null)
			contactId = lsId;
	};

	var saveLocalStorage = ()=>{
		// localStorage.setItem("list", contactList);
		// localStorage.setItem("id", contactId);
	}

	this.getList = ()=>{
		return contactList;
	}

	this.getContactById = (contactId)=>{
		var index = contactList.findIndex((contact)=>{
			return contact.id === contactId;
		});

		if(index >= 0)
			return contactList[index];
		else
			return undefined;
	};

	this.addContact = (contact)=>{
		contact.id = contactId++;
		contactList.push(contact);

		saveLocalStorage();
	};

	this.updateContact = (contactId, updatedContact)=>{
		var index = contactList.findIndex((contact)=>{
			return contact.id === contactId;
		});

		if(index < 0)
			return undefined;
		
		updatedContact.id = contactId;
		contactList[index] = updatedContact; 

		saveLocalStorage();
	};

	this.deleteContact = (contactId)=>{
		var index = contactList.findIndex((contact)=>{
			return contact.id === contactId;
		});

		var newList = [];

		for(var i = 0; i < contactList.length; i++){
			if(i == index)
				continue
			
			newList.push(contactList[i]);
		}

		contactList = newList;

		saveLocalStorage();
	};

	// initLocalStorage();
});