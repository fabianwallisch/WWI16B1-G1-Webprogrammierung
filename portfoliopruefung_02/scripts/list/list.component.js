angular.module("list").component("list", {
	templateUrl: "/scripts/list/list.template.html",
	controller: ['contactService', '$scope', (contactService, $scope) => {
		$scope.contactList = contactService.getList();
		$scope.deleteContact = (contactId)=>{
			console.log(contactId);
			contactService.deleteContact(contactId);
			$scope.contactList = contactService.getList();
		};
	}]
});