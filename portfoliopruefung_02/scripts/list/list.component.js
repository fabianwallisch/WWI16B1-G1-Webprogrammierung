angular.module("list").component("list", {
	templateUrl: "/scripts/list/list.template.html",
	controller: ['contactService', '$scope', (contactService, $scope) => {
		$scope.contactList = contactService.getList();
		$scope.deleteContact = (contactId)=>{
			contactService.deleteContact(contactId);
			$scope.contactList = contactService.getList();
		};

		$scope.export = ()=>{
			// var link = document.createElement("a");
			// var dataString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(contactService.exportData()));
			// link.setAttribute("href", dataString);
			// link.setAttribute("download", "adressbuch.json");
			// link.click();
		};

		$scope.import = ()=>{
			// if(!confirm("ungespeicherte Daten gehen bei dem Import einer Datei verloren")){
			// 	return;
			// }

			// var dialog = document.createElement("input");
			// dialog.setAttribute("type", "file");
			// dialog.onchange = (event)=>{
			// 	var files = dialog.files;
			// 	var reader = FileReader();
			// 	reader.onload = (file)=>{
			// 		return (e)=>{
			// 			try{
			// 				var contactJson = JSON.parse(file);

			// 				if(!contactJson.contactId || ! contactJson.contactList)
			// 					throw "JSON Format fehlerhaft";
							
			// 				if(!Number.isInteger(contactJson.contactId) || contactJson.contactId < 1)
			// 					throw "contactId ist fehlerhaft";

			// 				contactJson.contactList.forEach((element)=>{
			// 					if(!element.firstname && !element.lastname && !element.email && !element.phone)
			// 						throw "leere Kontakte vorhanden";
				
			// 					if(element.firstname.length == 0 && element.lastname.length == 0 && element.email.length == 0 && element.phone.length == 0)
			// 						throw "leerer Kontakt vorhanden";
								
			// 				});

			// 				contactService.importData(contactJson);
								
			// 			}catch(exception){
			// 				alert("Kontakte konnten nicht geladen werden: " + exception);
			// 			}
			// 		}
			// 	}
			// 	reader.readAsText(files[0]);
			// }
			// dialog.click();
		}

		$scope.reset = ()=>{
			// if(confirm("Alle Daten werden beim zurücksetzen gelöscht. Fortfahren?")){
			// 	contactService.reset();
			// 	$scope.contactList = contactService.getList();
			// }
		}
	}]
});