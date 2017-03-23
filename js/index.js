var app = new PIXI.Application();
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
		
		// Background
		
		var iceTexture = PIXI.Texture.fromImage('images/ice.png');
		var iceSprite = new PIXI.extras.TilingSprite(iceTexture, app.renderer.width, app.renderer.height );
				
		var anim = new PIXI.extras.AnimatedSprite(frames);

	    anim.x = app.renderer.width / 2;
	    anim.y = app.renderer.height / 2;
	    anim.anchor.set(0.5);
	    anim.animationSpeed = 1;
	
	    app.stage.addChild(iceSprite);
	    app.stage.addChild(anim);
	    
	    $('canvas').click( function(evt){
		    var destX = evt.offsetX;
		    var destY = evt.offsetY;
		    
    	    anim.play();
		    
		    $({
			    x: anim.x,
			    y: anim.y
		    }).animate({
			    x: destX,
			    y: destY
		    }, {
			    step: function(){
				    anim.x = this.x;
				    anim.y = this.y;
			    },
			    
			    complete: function(){
					anim.stop();
			    }
		    });
		    
	    });
		
	});
	
}

/*function onAssetsLoaded()
{
    // create an array of textures from an image path
    var frames = [];

    for (var i = 0; i < 30; i++) {
        var val = i < 10 ? '0' + i : i;

        // magically works since the spritesheet was loaded with the pixi loader
        frames.push(PIXI.Texture.fromFrame('rollSequence00' + val + '.png'));
    }

    // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
    var anim = new PIXI.extras.AnimatedSprite(frames);

    anim.x = app.renderer.width / 2;
    anim.y = app.renderer.height / 2;
    anim.anchor.set(0.5);
    anim.animationSpeed = 0.5;
    anim.play();

    app.stage.addChild(anim);

    // Animate the rotation
    app.ticker.add(function() {
        anim.rotation += 0.01;
    });
}*/
