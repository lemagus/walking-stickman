

var Animation = {

	speed : 1,

	_app : null,
	_racoon : null,
	_frames: [],
	
	
	// events 
	
	onMove : function(destX, destY){},
	
	getRacoon : function(){
		return Animation._racoon;
	},
	
	move: function(racoon, x, y){		
		racoon.play();    	    
	    $({
		    
		    x: racoon.x,
		    y: racoon.y
		    
	    }).animate({
		    
		    x: x,
		    y: y
		    
	    }, {
		    step: function(){
			    
			    racoon.x = this.x;
			    racoon.y = this.y;
		    },
		    
		    complete: function(){
			    
				racoon.stop();
		    }
	    });
	},
	
	create: function(values) {
		
		var racoon = new PIXI.extras.AnimatedSprite(Animation._frames);
		
		racoon.x = values.x;
		racoon.y = values.y;
		
		racoon.anchor.set(0.5);
		racoon.animationSpeed = Animation.speed;
			
		Animation._app.stage.addChild(racoon);
		
		return racoon;
	},
	
	init : function(callback){
		
		if(undefined === callback) callback = function(){};
		
		var app = new PIXI.Application();
		Animation._app = app;
		
		document.body.appendChild(app.view);
		
		app.renderer.backgroundColor = 0xFFFFFF;
		
		PIXI.loader
		    .add('the_coon.png')
		    .load(onAssetsLoaded);
		    
		function onAssetsLoaded(evt) {
			
			$.getJSON('the_coon.json', function(datas){
				
				var spriteSheetImage  = PIXI.BaseTexture.fromImage(datas.meta.image);
				var frames = [];
				
				for(var i in datas.frames ){
					var frame = datas.frames[i].frame;
					var rect = new PIXI.Rectangle(
						parseInt(frame.x),
						parseInt(frame.y),
						parseInt(frame.w),
						parseInt(frame.h));
		
					frames.push(
						new PIXI.Texture(
							spriteSheetImage, 
							rect
						)
					);
				}
				
				Animation._frames = frames;
				
				// Background
				
				var iceTexture = PIXI.Texture.fromImage('images/ice.png');
				var iceSprite = new PIXI.extras.TilingSprite(iceTexture, app.renderer.width, app.renderer.height );
						
				Animation._racoon = new PIXI.extras.AnimatedSprite(frames);
				var racoon = Animation._racoon;
				
			    racoon.x = Math.round(Math.random() * app.renderer.width);
			    racoon.y = Math.round(Math.random() * app.renderer.height);
			    racoon.anchor.set(0.5);
			    racoon.animationSpeed = Animation.speed;
			    			
			    app.stage.addChild(iceSprite);
			    app.stage.addChild(racoon);
			    
			    callback.apply(Animation, [racoon]);
			    
			    $('canvas').click( function(evt){
				    
				    var destX = evt.offsetX;
				    var destY = evt.offsetY;
				    
				    Animation.move(racoon, destX, destY);
					Animation.onMove(destX, destY);
				   
			    });
				
			});
			
		}
		
	}
	
}