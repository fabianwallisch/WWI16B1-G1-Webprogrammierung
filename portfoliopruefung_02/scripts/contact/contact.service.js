angular.module("contact").service("contactService", function () {

	var contactList = [];
	var contactId = 1;

	var loadLocalStorage = () => {
		var lsList;
		var lsId;

		try {
			lsList = JSON.parse(localStorage.getItem("list"));
			lsId = Number.parseInt(localStorage.getItem("id"));
		} catch (e) {
			return;
		}

		if (lsList !== null)
			contactList = lsList;

		if (lsId !== null)
			contactId = lsId;
	};

	var saveLocalStorage = () => {
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
	};

	this.updateContact = (contactId, updatedContact) => {
		var index = contactList.findIndex((contact) => {
			return contact.id === contactId;
		});

		if (index < 0)
			return undefined;

		updatedContact.id = contactId;
		contactList[index] = updatedContact;
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
	};
});