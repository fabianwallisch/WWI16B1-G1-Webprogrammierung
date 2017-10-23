angular.module("edit").component("edit", {
	templateUrl: "/scripts/edit/edit.template.html",
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
		}
	]
});