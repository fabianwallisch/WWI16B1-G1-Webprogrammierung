angular.module("adressbuchApp").config(
	[
		"$locationProvider",
		"$routeProvider",
		($locationProvider, $routeProvider)=>{
			$locationProvider.hashPrefix('!');

			$routeProvider.when("/", {
				template: "<list class='page'></list>"
			});

			$routeProvider.when("/add", {
				template: "<add class='page'></add>"
			});

			$routeProvider.when("/edit/:contactId", {
				template: "<edit class='page'></edit>"
			});

			$routeProvider.otherwise("/");
		}
	]
);