Template.personalize.onRendered(function(){
	var order = this.data;
	if(order.wrist_color){
		var colors = "/colors/" + order.wrist_color + order.hand_color + order.fingers_color + ".jpg";
		Session.set("colors", colors);

		$('select#select-wrist').val(order.wrist_color);
		$('select#select-hand').val(order.hand_color);
		$('select#select-fingers').val(order.fingers_color);
		if(order.additions){
			$('select#addons').val(order.additions);
		}
	} else {
		Session.set("colors", "Red-Red-Red");
	}

});

Template.personalize.helpers({
	'colors':function(){
		return Session.get("colors");
	}
	
});

Template.personalize.events({
	'change select':function(e){
		var wristColor = $('select#select-wrist').val();
		var handColor = $('select#select-hand').val();
		var fingersColor = $('select#select-fingers').val();

		//var colors = wristColor + "-" + handColor + "-" + fingersColor;
		var colors = "/colors/" + wristColor + handColor + fingersColor + ".jpg";
		Session.set("colors", colors);
	}
});

/*
Colors:
Negro
Rojo
Lila
Blanco
Amarillo
Azul
Gris
Rosa
Naranja
Verde oscuro
Verde brillante
*/