angular.module("list").component("list", {
	// templateUrl: "/scripts/list/list.template.html",
	template: `
	<h2>Übersicht</h2>
	<p ng-show="contactList.length == 0" class="mt-3">Es sind noch keine Adressen vorhanden</p>
	<table ng-show="contactList.length > 0" class="table table-striped mt-3">
		<thead>
			<tr>
				<th>Vorname</th>
				<th>Nachname</th>
				<th>E-Mail</th>
				<th>Telefon</th>
				<th></th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="contact in contactList | orderBy:'firstname'">
				<td>{{contact.firstname}}</td>
				<td>{{contact.lastname}}</td>
				<td>{{contact.email}}</td>
				<td>{{contact.phone}}</td>
				<td><a ng-click="deleteContact(contact.id)"><span class="oi oi-trash"></span></a></td>
				<td><a ng-href="#!/edit/{{contact.id}}"><span class="oi oi-pencil"></span></a></td>
			</tr>
		</tbody>
	</table>
	<button ng-click="reset()" ng-show="contactList.length > 0" alt="Alle Adressen löschen" class="btn btn-outline-primary"><span class="oi oi-reload"></span></button>
	<button class="btn btn-outline-primary" ng-show="contactList.length > 0" ng-click="export()">Kontakte exportieren</button>
	<button class="btn btn-outline-primary" ng-click="import()">Kontakte importieren</button>
	`,
	controller: ['contactService', '$scope', (contactService, $scope) => {
		$scope.contactList = contactService.getList();
		$scope.deleteContact = (contactId)=>{
			contactService.deleteContact(contactId);
			$scope.contactList = contactService.getList();
		};

		$scope.export = ()=>{
			var link = document.createElement("a");
			var dataString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(contactService.exportData()));
			console.log(dataString);
			link.setAttribute("href", dataString);
			link.setAttribute("download", "adressbuch.json");
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		};

		$scope.import = ()=>{
			if(!confirm("ungespeicherte Daten gehen bei dem Import einer Datei verloren")){
				return;
			}

			var dialog = document.createElement("input");
			dialog.setAttribute("type", "file");
			dialog.setAttribute("accept", ".json, text/json");
			dialog.onchange = (event)=>{
				var files = dialog.files;
				var reader = new FileReader();
				reader.onloadend = (evt)=>{
					if(evt.target.readyState == FileReader.DONE) {
						try{
							var contactJson = JSON.parse(evt.target.result);

							if(!contactJson.contactId || ! contactJson.contactList)
								throw "JSON Format fehlerhaft";
							
							if(!Number.isInteger(contactJson.contactId) || contactJson.contactId < 1)
								throw "contactId ist fehlerhaft";

							contactJson.contactList.forEach((element)=>{
								if(!element.firstname && !element.lastname && !element.email && !element.phone)
									throw "leere Kontakte vorhanden";
				
								if(element.firstname.length == 0 && element.lastname.length == 0 && element.email.length == 0 && element.phone.length == 0)
									throw "leerer Kontakt vorhanden";
								
							});

							contactService.importData(contactJson);
							$scope.contactList = contactService.getList();
							$scope.$apply();
								
						}catch(exception){
							alert("Kontakte konnten nicht geladen werden: " + exception);
						}
					}
				}
				reader.readAsText(files[0]);
			}
			dialog.click();
		}

		$scope.reset = ()=>{
			if(confirm("Alle Daten werden beim zurücksetzen gelöscht. Fortfahren?")){
				contactService.reset();
				$scope.contactList = contactService.getList();
			}
		}

		var init = ()=>{
			var linkOverview = document.getElementById("link-overview")
			var linkAdd = document.getElementById("link-add");

			linkOverview.classList.add("active");
			linkAdd.classList.remove("active");
		}
		init();
	}]
});