angular.module("adressbuchApp").config(
	[
		"$locationProvider",
		"$routeProvider",
		($locationProvider, $routeProvider)=>{
			$locationProvider.hashPrefix('!');

			$routeProvider.when("/", {
				template: "<list></list>"
			});

			$routeProvider.when("/add", {
				template: "<add></add>"
			});

			$routeProvider.when("/edit/:contactId", {
				template: "<edit></edit>"
			});

			$routeProvider.otherwise("/");
		}
	]
);