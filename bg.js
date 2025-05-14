var Engine = Matter.Engine,
    Events = Matter.Events,
    Runner = Matter.Runner,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Common = Matter.Common,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var engine = Engine.create();
  
// create renderer
var render = Render.create({
  element: document.body,
  canvas: document.getElementById("matterCanvas"),
  engine: engine,
  options: {
    width: Math.min(document.documentElement.clientWidth, 1920),
    height: 1050,
    wireframes: false,
    background: "transparent"
    // showVelocity: true
  }
});

var runner = Runner.create();

engine.world.gravity.x = 0;
engine.world.gravity.y = 0;

function distance2D(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const delta = 1000 / 30;
const subSteps = 12;
const subDelta = delta / subSteps;

(function run() {
    window.requestAnimationFrame(run);
    for (let i = 0; i < subSteps; i += 5) {
      Engine.update(engine, subDelta);
    }
})();

Composite.add(engine.world, [
    Bodies.rectangle(render.options.width / 2, render.options.height / 2, 2000, 2000, {
        isStatic: true,
        collisionFilter: {
            mask: 0x0005,
            category: 0x0006
        }
    }),
    Bodies.rectangle(0, render.options.height / 2, 30, render.options.height, {
        isStatic: true,
        collisionFilter: {
            mask: 0x0002,
            category: 0x0001
        },
        render: {
            fillStyle: "transparent"
        }
    }),
    Bodies.rectangle(render.options.width, render.options.height / 2, 30, render.options.height, {
        isStatic: true,
        collisionFilter: {
            mask: 0x0002,
            category: 0x0001
        },
        render: {
            fillStyle: "transparent"
        }
    }),
    Bodies.rectangle(render.options.width / 2, 0, render.options.width, 30, {
        isStatic: true,
        collisionFilter: {
            mask: 0x0002,
            category: 0x0001
        },
        render: {
            fillStyle: "transparent"
        }
    }),
    Bodies.rectangle(render.options.width / 2, render.options.height, render.options.width, 30, {
        isStatic: true,
        collisionFilter: {
            mask: 0x0002,
            category: 0x0001
        },
        render: {
            fillStyle: "transparent"
        }
    }),
])

// const mouse = Mouse.create(document.body);

let particles = [];

for (let i = 0; i < 200; i++) {
    // particles[i] = Bodies.circle((Math.random() * 10) + render.options.width, (Math.random() * 10) + render.options.height, 10, {inertia: Infinity});
    particles[i] = Bodies.circle((Math.random() * render.options.width), (Math.random() * render.options.height), 2, {
        collisionFilter: {
            mask: 0x0001,
            category: 0x0002
        },
        render: {
            fillStyle: "#ffffff"
        }
    });
    particles[i].inertia = Infinity;
    particles[i].restitution = 1;
    Composite.add(engine.world, particles[i]);
    Body.setVelocity(particles[i], {x: getRandomArbitrary(-1, 1), y: getRandomArbitrary(-1, 1)});
}

let mx, my;


let lines = [];

setInterval(() => {
    avg = 0;
    particles.forEach((p) => {
        if (Body.getSpeed(p) < 1) {
            Body.setSpeed(p, 1)
        }
    })
}, 100)

setInterval(() => {
    Composite.remove(engine.world, lines);
    lines = [];
    particles.forEach((p) => {
        if (distance2D(p.position.x, p.position.y, mx, my) < 100) {
            lines.push(Constraint.create({
                bodyA: p,
                pointB: {x: mx, y: my},
                stiffness: 0.000000001,
                render: {
                    type: "line",
                    anchors: false
                }
            }))
        }
    })

    for (let i = 2; i < particles.length; i++) {
        if (distance2D(particles[i].position.x, particles[i].position.y, particles[i - 1].position.x, particles[i - 1].position.y) < 200) {
            lines.push(Constraint.create({
                bodyA: particles[i],
                bodyB: particles[i - 1],
                stiffness: 0.00000001,
                render: {
                    type: "line",
                    anchors: false
                }
            }))
        }
        if (distance2D(particles[i].position.x, particles[i].position.y, particles[i - 2].position.x, particles[i - 2].position.y) < 200) {
            lines.push(Constraint.create({
                bodyA: particles[i],
                bodyB: particles[i - 2],
                stiffness: 0.00000001,
                render: {
                    type: "line",
                    anchors: false
                }
            }))
        }
    }
    Composite.add(engine.world, lines);
})


addEventListener("mousemove", function (e) {
    mx = e.clientX;
    my = e.clientY;
})

Runner.run(runner, engine);
Render.run(render);