import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { CalendarCollectionAccess } from '../lib/calData.js'
function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.methods({
    getAllData(){
        let data = CalendarCollectionAccess.find(); //.fetch()
        console.log("################## CALLING ALL DATA ##################");
        console.log(data);
        return data;

    },
    getEventByEventID(eventID){
        return CalendarCollectionAccess.find({EventID:eventID});
    },
    updateEventByID(eventID, data){
        return CalendarCollectionAccess.update({EventID:eventID},{$set:data});
    }
});

Meteor.startup(() => {
    console.log(CalendarCollectionAccess.find().fetch());
  // If the Links collection is empty, add some data.

});
