angular.module("edit").component("edit", {
	// templateUrl: "/scripts/edit/edit.template.html",
	template: `
	<div class="card">
	<div class="card-block">
		<h4 class="card-title">Kontakt bearbeiten</h4>
		<form ng-submit="save()" ng-show="loaded" class="mt-3">
			<div class="form-group">
				<label for="firstName">Vorname:</label>
				<input type="text" class="form-control" id="firstName" placeholder="Vorname" ng-model="firstname">
			</div>
			<div class="form-group">
				<label for="lastName">Nachname:</label>
				<input type="text" class="form-control" id="lastName" placeholder="Nachname" ng-model="lastname">
			</div>
			<div class="form-group">
				<label for="phone">Telefon:</label>
				<input type="phone" class="form-control" id="phone" placeholder="Telefon" ng-model="phone">
			</div>
			<div class="form-group">
				<label for="email">Email:</label>
				<input type="email" class="form-control" id="email" placeholder="name@example.com" ng-model="email">
			</div>
			<span class="formularActions"><input class="btn btn-outline-primary" type="submit" value="Speichern"></span>
			<span class="formularActions"><a href="#!/"><input class="btn btn-outline-primary" type="button" value="Cancel"></a></span>
		</form>
		<p ng-hide="loaded">Adresse ist nicht vorhanden</p>
	</div>
</div>
`,
	controller: [
		'$routeParams',
		'contactService',
		'$scope',
		'$location',
		($routeParams, contactService, $scope, $location)=>{
			var contact = contactService.getContactById(Number.parseInt($routeParams.contactId));
			$scope.loaded = contact !== undefined;

			if($scope.loaded){
				$scope.firstname = contact.firstname;
				$scope.lastname = contact.lastname;
				$scope.email = contact.email;
				$scope.phone = contact.phone;
			}
			
			$scope.save = ()=>{
				if(!$scope.loaded)
					return;

				if($scope.firstname.length == 0 && $scope.lastname.length == 0 && $scope.email.length == 0 && $scope.phone.length == 0){
					alert("Ein leerer Kontakt kann nicht gespeichert werden");
					return;
				}

				var updatedContact = {
					firstname: $scope.firstname,
					lastname: $scope.lastname,
					email: $scope.email,
					phone: $scope.phone
				}

				contactService.updateContact(contact.id, updatedContact);
				$location.path("/");
			}
			var init = ()=>{
				var linkOverview = document.getElementById("link-overview")
				var linkAdd = document.getElementById("link-add");
	
				linkOverview.classList.remove("active");
				linkAdd.classList.remove("active");
			}
			init();
		}
	]
});