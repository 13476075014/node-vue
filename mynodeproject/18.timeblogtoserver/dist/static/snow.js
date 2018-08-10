// ge1doot - 25 Oct 2015
// canvas pointer utility

var snow = {
	a: function(doms) {

		'use strict';

		var canvas = {

			elem: document.createElement('canvas'),

			_resize: function() {
				var cl = window.screen.width;
				var ch = window.screen.height;
				this.elem.width = cl;
				this.elem.height = ch;
				this.width = this.elem.width = this.elem.offsetWidth;
				this.height = this.elem.height = this.elem.offsetHeight;
				this.resize && this.resize();

			},

			init: function(doms) {
				this.elem.style.cssText = "position:fixed;top:0;left:0;z-index:-1;background:white;";
				var ctx = this.elem.getContext('2d');
				doms.appendChild(this.elem);
				window.addEventListener('resize', this._resize.bind(this), false);
				this._resize();
				return ctx;
			},

			setCursor: function(type) { //鼠标指针上去的样式

				if(type !== this.cursor) {
					this.cursor = type;
					this.elem.style.cursor = type;
				}

			},

			pointer: function() {

				var pointer = {
					x: 0,
					y: 0,
					isDown: false
				};

				pointer.move = function(e) {

					var touchMode = e.targetTouches,
						pointer;
					if(touchMode) {
						e.preventDefault();
						pointer = touchMode[0];
					} else pointer = e;
					this.x = pointer.clientX;
					this.y = pointer.clientY;

				}

				pointer.bind = function(elem, events, fn) {

					for(var i = 0, e = events.split(','); i < e.length; i++) {
						elem.addEventListener(e[i], fn.bind(pointer), false);
					}

				}

				pointer.bind(window, 'mousemove,touchmove', function(e) {

					this.move(e);

				});

				pointer.bind(canvas.elem, 'mousedown,touchstart', function(e) {

					this.move(e);
					this.isDown = true;
					this.down && this.down();

				});

				pointer.bind(window, 'mouseup,touchend,touchcancel', function(e) {

					e.preventDefault();
					this.isDown = false;
					this.up && this.up();

				});

				return pointer;

			}
		};
		// ge1doot 25 Oct 2015
		// vector 2D

		'use strict';

		function Vector(x, y) {
			this.x = x || 0.0;
			this.y = y || 0.0;
		}

		Vector.prototype.set = function(x, y) {
			this.x = x;
			this.y = y;
			return this;
		}

		Vector.prototype.copy = function(v) {
			this.x = v.x;
			this.y = v.y;
			return this;
		}

		Vector.prototype.sub = function(v1, v2) {
			this.x = v1.x - v2.x;
			this.y = v1.y - v2.y;
			return this;
		}

		Vector.prototype.selfSub = function(v) {
			this.x -= v.x;
			this.y -= v.y;
			return this;
		}

		Vector.prototype.mult = function(v, f) {
			this.x = v.x * f;
			this.y = v.y * f;
			return this;
		}

		Vector.prototype.selfMult = function(f) {
			this.x *= f;
			this.y *= f;
			return this;
		}

		Vector.prototype.div = function(v, f) {
			this.x = v.x / f;
			this.y = v.y / f;
			return this;
		}

		Vector.prototype.selfDiv = function(f) {
			this.x /= f;
			this.y /= f;
			return this;
		}

		Vector.prototype.add = function(v1, v2) {
			this.x = v1.x + v2.x;
			this.y = v1.y + v2.y;
			return this;
		}

		Vector.prototype.selfAdd = function(v) {
			this.x += v.x;
			this.y += v.y;
			return this;
		}

		Vector.prototype.limit = function(maxLength) {
			var lengthSquared = this.x * this.x + this.y * this.y;
			if((lengthSquared > maxLength * maxLength) && (lengthSquared > 0)) {
				var ratio = maxLength / Math.sqrt(lengthSquared);
				this.x *= ratio;
				this.y *= ratio;
			}
			return this;
		}

		Vector.prototype.dist2 = function(v) {
			return((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y));
		}

		Vector.prototype.mag2 = function() {
			return(this.x * this.x + this.y * this.y);
		}
		/* 
		 Spheres - v.1.0.0 - 2014/01/03 
		 PROCESSINGJS.COM HEADER ANIMATION  
		 MIT License - F1lT3R/Hyper-Metrix
		 Modified by Casey Reas, 7 Nov 2013
		 Modified by slsdo, 3 Jan 2014
		 Javascript adaptation by ge1doot, 25 Oct 2015
		*/

		'use strict';
		// setup

		var count = 10, //小球的数量
			circles = [],
			ds = 2, //初始的球的距离
			dragging = false, //是否可以手动的拖拽球
			colors = ['#f80', '#08f', '#666'],//球的颜色
			//colors = ["black","red","green"], //球的颜色
			maxRad, grd;

		// Circle constructor

		function Circle() {

			this.rad = 10 + Math.random() * maxRad; // radius
			this.rad2 = this.rad * this.rad;
			this.pos = new Vector(canvas.width * Math.random(), canvas.height * Math.random()); // Location
			this.vel = new Vector(Math.random() - 0.5, Math.random() - 0.5); // Speed
			this.acc = new Vector(); // Acceleration
			this.offset = new Vector(); // Offset from mouse
			this.force = new Vector(); // force
			this.c = colors[Math.floor(Math.random() * colors.length)]; // Color
			this.locked = false;
			this.parent = null;
			this.k = 0.1; // Spring constant
			this.damp = 0.98; // Damping

		}

		// circle update

		Circle.prototype.update = function() {

			this.acc.set(0, 0);

			if(this.locked && this.parent === null) {

				// Move the particle's coordinates to the mouse's position, minus its original offset
				this.acc.sub(this.force.sub(pointer, this.offset), this.pos).limit(1);
				this.vel.selfAdd(this.acc).limit(3); // Apply acceleration
				this.pos.sub(pointer, this.offset);

			} else if(this.locked && this.parent !== null && this.pos.dist2(this.parent.pos) >= this.parent.rad2) {

				// Move the particle's coordinates to the parent's position, minus its original offset
				this.force.sub(this.pos, this.parent.pos).selfMult(-this.k);
				this.acc.div(this.force, this.rad * 0.5); // Set acceleration
				this.vel.mult(this.force.add(this.vel, this.acc), this.damp).limit(14); // Set velocity
				this.pos.selfAdd(this.vel); // Updated position

			} else {

				this.vel.selfAdd(this.acc.limit(1)); // Apply acceleration
				if(this.vel.mag2() > 0.5 * 0.5) {
					this.vel.selfMult(0.99); // Velocity damping
				}
				this.pos.selfAdd(this.vel); // Move circle

			}

			var dm = this.rad * 1; // Cache diameter
			// Wrap around canvas edges
			if(this.pos.x < -dm) this.pos.x = canvas.width + dm;
			if(this.pos.x > canvas.width + dm) this.pos.x = -dm;
			if(this.pos.y < -dm) this.pos.y = canvas.height + dm;
			if(this.pos.y > canvas.height + dm) this.pos.y = -dm;

		};

		// circle render

		Circle.prototype.render = function() {

			ctx.beginPath();

			if(this.pos.dist2(pointer) < this.rad2) {
				ctx.fillStyle = '#f20';
				ctx.globalAlpha = 0.35;
				pointer.over = true;
			} else {
				ctx.fillStyle = this.c;
				ctx.globalAlpha = 0.35;
			}

			ctx.arc(this.pos.x, this.pos.y, this.rad, 0, 2 * Math.PI);
			ctx.fill();

			ctx.strokeStyle = '#777777';
			ctx.globalAlpha = 0.35;

			// Loop through all circles
			for(var j = 0; j < count; j++) {
				var that = circles[j];
				// If the circles are close
				if(this.pos.dist2(that.pos) < this.rad2 * 1.44) {
					// Stroke a line from current circle to adjacent circle
					ctx.beginPath();
					ctx.moveTo(this.pos.x, this.pos.y);
					ctx.lineTo(that.pos.x, that.pos.y);
					ctx.stroke();
					// Attach it to parent
					if(this.locked && !that.locked) {
						that.locked = true;
						that.parent = this;
					}
				} else if(that.parent != null && that.parent === this) {
					ctx.beginPath();
					ctx.moveTo(this.pos.x, this.pos.y);
					ctx.lineTo(that.pos.x, that.pos.y); // Link to parent
					ctx.stroke();
				}
			}
			ctx.fillStyle = '#fff'; //圆心的颜色
			ctx.fillRect(this.pos.x - ds, this.pos.y - ds, ds * 2, ds * 2); // Draw dot in center of circle

		};

		// main draw loop

		function draw(doms) {
			requestAnimationFrame(draw);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.globalCompositeOperation = 'lighter';//'source-over' //参考网址：https://blog.csdn.net/laijieyao/article/details/41862473；
													//canvas的合成操作，lighter这个值与顺序无关，如果源与目标重叠，就将两者的颜色值想家。得到的颜色值的最大取值为255，结果就为白色。
			pointer.over = false;

			// looping through circle array

			for(var i = 0; i < count; i++) {
				circles[i].update();
				circles[i].render();
			}

			// cursor

			if(dragging) {
				canvas.setCursor('move');
			} else {
				if(pointer.over) canvas.setCursor('pointer');
				else canvas.setCursor('default');
			}

			// vignette

			ctx.globalAlpha = 1;//透明度
			ctx.globalCompositeOperation = 'source-over';
			ctx.fillStyle = grd;
//				ctx.fillStyle = "black"
			ctx.fillRect(0, 0, canvas.width, canvas.height);

		}

		// create canvas context and pointer

		var ctx = canvas.init(doms);

		// canvas resize event function

		canvas.resize = function() {

			// radius
			maxRad = Math.round(Math.sqrt(Math.min(this.width, this.height)) * 5);
			// vignette
			var outerRadius = this.width * 0.7;
			var innerRadius = this.height * 0.3;
			
			//采用放射状去绘制矩形
			grd = ctx.createRadialGradient(this.width / 2, this.height / 2, innerRadius, this.width / 2, this.height / 2, outerRadius);
			//grd.addColorStop(0, 'rgba(0,0,0,0)');
			//grd.addColorStop(1, 'rgba(0,0,0,1)');
			//grd="white";
		};

		canvas.resize();

		// pointer

		var pointer = canvas.pointer();

		// pointer down event

		pointer.down = function() {

			// Look for a circle the mouse is in, then lock that circle to the mouse
			for(var i = 0; i < count; i++) {
				// If the circles are close...
				if(circles[i].pos.dist2(this) < circles[i].rad2) {
					circles[i].locked = true;
					circles[i].offset.sub(this, circles[i].pos);
					dragging = true; // Break out of the loop because we found our circle
					break;
				}
			}

		};

		// pointer up event

		pointer.up = function() {

			// User is no-longer dragging
			for(var i = 0; i < count; i++) {
				circles[i].offset.set(0, 0);
				circles[i].locked = false;
				circles[i].parent = null; // Clear parent
			}
			dragging = false;

		};

		// create circles

		for(var i = 0; i < count; i++) {
			circles[i] = new Circle();
		}

		// start

		draw(doms);

	}
}

export default snow;