import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
    this.counter = new ReactiveVar(0);
    this.time = new ReactiveVar(0);
    Meteor.setInterval(() => this.time.set(this.time.get() + 1), 1000);
});

// How do I call the helpers?

Template.hello.helpers({
    counter() {
	return Template.instance().counter.get();
    },
    time() {
	return Template.instance().time.get();
    },
    cps() {
	return Template.instance().counter.get()/Template.instance().time.get();
    },
    disable_button() {
	if (Template.instance().time.get() >= 10)
	    return {disabled: 'disabled'}
	else
	    return {}
    },
    disabled() {
	return Template.instance().disable_button.get() != {}
    }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
