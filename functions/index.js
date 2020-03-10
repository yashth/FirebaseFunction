const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.emojify = functions.database.ref('/messages/{pushId}/text')
                  .onWrite(( change,context) =>{
					  // Database write events include new, modified, or deleted
        // database nodes. All three types of events at the specific
        // database path trigger this cloud function.
        // For this function we only want to emojify new database nodes,
        // so we'll first check to exit out of the function early if
        // this isn't a new message.

        // !event.data.val() is a deleted event
        // event.data.previous.val() is a modified event
		
					if(!change.after.val() || change.before.val()){
						console.log("not a new write event");
						return;
					}
					
					console.log("emojifying!");
					
					const originalText = change.after.val();
					
					console.log("originalText: ",originalText);
					const emojifiedText = emojifyText(originalText);
					
					console.log("emojifiedText: ",emojifiedText);
					
					return change.after.ref.set(emojifiedText);
					
				  });
				  
function emojifyText(text) {
	
	var emojifiedText = text;
	
	console.log("emojifyText: ",emojifiedText);
	
	emojifiedText = emojifiedText.replace(/\blol\b/ig, "😂");
    emojifiedText = emojifiedText.replace(/\bcat\b/ig, "😸");
	console.log(" in emojifyText() return emojifiedText: ",emojifiedText);
	return emojifiedText;
}