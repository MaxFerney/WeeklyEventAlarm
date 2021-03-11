import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { CalendarCollectionAccess } from '../lib/calData.js'
function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.methods({
    getAllData(){
        return CalendarCollectionAccess.find().fetch();
    },
    getEventByEventID(eventID){
        return CalendarCollectionAccess.find({EventID:eventID});
    }
});

Meteor.startup(() => {
    console.log(CalendarCollectionAccess.find().fetch());
  // If the Links collection is empty, add some data.

});
