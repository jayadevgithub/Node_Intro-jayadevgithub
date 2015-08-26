/*
OVERVIEW: 	In this project, you will save contacts to a file. You can use the Synchrnous versions
			of the node.js fs module (such as fs.readFileSync)
*/
var fs = require('fs');

/*
OVERVIEW: 	Add/Append a contact to file.

INPUTS: 	filename - string giving the path of the file.
			contact - A javascript object with {firstName, lastName, phone} as the properties.

OUTPUTS: 	none

NOTES: 		1) All the properties of the contact (firstName, lastName, phone) can have varying lengths - ie contact1.firstname can be 5 chars
				while contact2.firstName can be 15 chars.
			2) A straight-forward approach of just appending contact object to the file alone may not work. You
			   need to think of how read contact(s) will be implemented as well to ensure both Add/Read will work.
*/
function RefreshContacts(listOfContacts, filename) {
	var newContacts = JSON.stringify(listOfContacts);
	fs.writeFileSync(filename, newContacts);
}

exports.AddContact = function(filename, contact) {
	var listOfContacts=exports.ReadContacts(filename);
	listOfContacts.push(contact);
	RefreshContacts(listOfContacts, filename);
}

/*
OVERVIEW: 	Read all the contacts from the file.

INPUTS: 	filename - string giving the path of the file.

OUTPUTS: 	Array of javascript objects representing the contacts read from the file.

NOTES: 		1) All the properties of the contact (firstName, lastName, phone) can have varying lengths - ie contact1.firstname can be 5 chars
				while contact2.firstName can be 15 chars.
*/

exports.ReadContacts = function(filename){
	var listOfContacts = new Array();
	var contactsAsString = fs.readFileSync(filename,"utf8");
	if(!contactsAsString == ""){
		var contactsAsJSON = JSON.parse(contactsAsString);
		for(var i=0; i<contactsAsJSON.length;i++){
			listOfContacts.push(contactsAsJSON[i]);
		}
	}
	return listOfContacts;
}

/*
OVERVIEW: 	Update contacts with matching firstName in the file

INPUTS: 	filename - string giving the path of the file.
			contactname - All contacts whose firstName matches this param value should be updated.
			newPhoneNumber - phone of all contacts whose firstName is contactname should be updated to this value.

OUTPUTS: 	None

NOTES: 		You need to only come up with a functionally correct solution and it does not have to be performant. For example: It is
			ok for the entire file to be rewritten as part of this update implementation.

*/
exports.UpdateContact = function(filename, contactname, newPhoneNumber){
	var listOfContacts = exports.ReadContacts(filename);
	for(var contact in listOfContacts){
		if(listOfContacts[contact].firstName==contactname){
			listOfContacts[contact].phone=newPhoneNumber;
		}
	}
	RefreshContacts(listOfContacts, filename);
}

/*
OVERVIEW: 	Delete contacts with matching firstName in the file

INPUTS: 	filename - string giving the path of the file.
			contactname - All contacts whose firstName matches this param value should be deleted.

OUTPUTS: 	None

NOTES: 		You need to only come up with a functionally correct solution and it does not have to be performant. For example: It is
			ok for the entire file to be rewritten as part of this delete implementation.

*/
exports.DeleteContact = function(filename, contactname){
	var listOfContacts = exports.ReadContacts(filename);
	for(var contact in listOfContacts){
		if(listOfContacts[contact].firstName==contactname){
			listOfContacts.splice(contact,1);
		}
	}
	RefreshContacts(listOfContacts, filename);
}
