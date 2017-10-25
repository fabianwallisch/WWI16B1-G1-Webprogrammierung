angular.module("add").component("add", {
	// templateUrl: "/scripts/add/add.template.html",
	template: `
	<div class="card">
	<div class="card-block">
		<h4 class="card-title">Adresse hinzufügen</h4>
		<form ng-submit="save()" class="mt-3">
			<div class="form-group">
				<input class="form-control" ng-model="firstname" type="text" placeholder="Vorname" />
			</div>
			<div class="form-group">
				<input class="input-Add form-control" ng-model="lastname" type="text" placeholder="Nachname" />
			</div>
			<div class="form-group">
				<input class="input-Add form-control" ng-model="phone" type="phone" placeholder="Telefon" />
			</div>
			<div class="form-group">
				<input class="input-Add form-control" ng-model="email" type="email" placeholder="Email" />
			</div>
			<div class="form-group">
				<span class="formularActions">
					<input class="btn btn-outline-primary" type="submit" value="Speichern" />
				</span>
				<span class="formularActions">
					<a href="#!/">
						<input class="btn btn-outline-primary" type="button" value="Cancel">
					</a>
				</span>
			</div>

		</form>
	</div>
</div>
`,
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