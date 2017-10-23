angular.module("add").component("add", {
	templateUrl: "/scripts/add/add.template.html",
	controller: [
		'contactService',
		'$location',
		'$scope',
		(contactService, $location, $scope)=>{
			var init = ()=>{
				$scope.firstname = "";
				$scope.lastname = "";
				$scope.email = "";
				$scope.phone = "";
			}
			init();

			$scope.save = ()=>{

				if(!$scope.firstname && !$scope.lastname && !$scope.email && !$scope.phone){
					alert("Ein leerer Kontakt kann nicht gespeichert werden");
					return;
				}

				if($scope.firstname.length == 0 && $scope.lastname.length == 0 && $scope.email.length == 0 && $scope.phone.length == 0){
					alert("Ein leerer Kontakt kann nicht gespeichert werden");
					return;
				}

				contactService.addContact({
					firstname: $scope.firstname,
					lastname: $scope.lastname,
					email: $scope.email,
					phone: $scope.phone
				});

				$location.path("/");
				
			}
		}
	]
});