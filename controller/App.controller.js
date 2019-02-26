sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("pfe.bot.controller.App", {
		onChatPress: function() {
			var chatbot = this.getView().byId("botchat");
			chatbot._onOpenChat();
		},

		onSendPressed: function(oEvent){
			
			var chatbot = this.getView().byId("botchat");
			var question = oEvent.getParameter("text");

			console.log(question);
			var data = '{"message": {"content":"' + question + '","type":"text"}, "conversation_id": "CONVERSATION_ID"}';
			

			var _id = localStorage.getItem("chatId");
			if (_id != undefined){
				//payload.id = _id;
			}
			
			jQuery.ajax({
				url: "https://api.openconnectors.ext.hanatrial.ondemand.com/elements/api-v2/",
				cache: false,
				type: "POST",
				headers: {
			        'Authorization':'User CnRqeTAM/0Gam0mn0FC8THg41b1BfZhpNPUCGCd8pns=, Organization 7c864423133b0be7aa25ce19cbbc7aaf, Element w/8rxilrE8xEjCzWAmLSd1nVEZddmSQyycqzXpFkF08=',
			        'Content-Type':'application/json'
			    },
				data: data,
				async: true,
				success: function(sData) {
					console.log('[POST] /discover-dialog', sData);

					chatbot.addChatItem(sData.results.messages[0].content, false);
					chatbot.botFinishTyping();
					localStorage.setItem("chatId", sData.id);
					
				},
				error: function(sError) {					
					chatbot.addChatItem("Something error!", false);      
				}
			});
			
		}

	});
});