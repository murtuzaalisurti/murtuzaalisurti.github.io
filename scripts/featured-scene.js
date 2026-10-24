// browser module: a photoreal Macintosh II (AppleColor monitor on the system
// unit) in Platinum, path traced
// (three-gpu-pathtracer) on a transparent background. The CRT glass comes out
// semi-transparent, carrying only its reflections, so the page can show its
// own picture underneath it. loaded by scripts/build-featured.mjs inside
// headless Chrome; exposes window.renderComputer.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { WebGLPathTracer, GradientEquirectTexture } from "three-gpu-pathtracer";

const WIDTH = 1920;
const HEIGHT = 1080;
const SAMPLES = Number(new URLSearchParams(location.search).get("samples")) || 900;

const renderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: true,
    preserveDrawingBuffer: true,
});
renderer.setPixelRatio(1);
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x000000, 0);
renderer.toneMapping = THREE.AgXToneMapping;
renderer.toneMappingExposure = 1.5;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = null;

// studio: a dim room for ambient, then a firm warm key from the upper left
// (it shapes the forms and throws the shadow), a weak cool fill from the
// right, and a rim from behind that catches the top edges
const sky = new GradientEquirectTexture(256);
sky.topColor.set(0xd8d6d0);
sky.bottomColor.set(0x3a3833);
sky.exponent = 1.2;
sky.update();
scene.environment = sky;
scene.environmentIntensity = 0.3;

// close enough that it falls off across the machine, left to right and top
// to bottom, like a softbox just out of frame
const key = new THREE.RectAreaLight(0xfff1de, 26, 2.6, 2.6);
key.position.set(-6, 8.5, 6);
key.lookAt(0, 1.6, 0);
scene.add(key);
const fill = new THREE.RectAreaLight(0xe6edff, 2, 6, 6);
fill.position.set(12, 5, 7);
fill.lookAt(0, 1.8, 0);
scene.add(fill);
const rim = new THREE.RectAreaLight(0xffffff, 9, 6, 2);
rim.position.set(2, 9, -4.8);
rim.lookAt(0, 2.5, 0);
scene.add(rim);

// a matte floor and back wall, as in a studio: they catch the shadow (kept,
// as transparency, on the page) and bounce a little warm light into the machine
const backdrop = new THREE.MeshStandardMaterial({ color: 0xb6b2ab, roughness: 1 });
const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), backdrop);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);
const wall = new THREE.Mesh(new THREE.PlaneGeometry(80, 40), backdrop);
wall.position.set(0, 20, -5.0);
scene.add(wall);

// straight on, a little below the screen's centre, framed on the monitor
const camera = new THREE.PerspectiveCamera(22, WIDTH / HEIGHT, 0.1, 200);
camera.position.set(0, 2.6, 13.5);
camera.lookAt(0, 2.45, -0.3);

// ---- surface detail ----

// tiling noise: value noise at a few scales, wrapped so it repeats seamlessly
const noiseField = (size, scales) => {
    const out = new Float32Array(size * size);
    for (const [cells, weight] of scales) {
        const grid = new Float32Array(cells * cells).map(() => Math.random());
        const g = (x, y) => grid[((y % cells) + cells) % cells * cells + ((x % cells) + cells) % cells];
        for (let y = 0; y < size; y++)
            for (let x = 0; x < size; x++) {
                const fx = (x / size) * cells;
                const fy = (y / size) * cells;
                const x0 = Math.floor(fx);
                const y0 = Math.floor(fy);
                const tx = (fx - x0) ** 2 * (3 - 2 * (fx - x0));
                const ty = (fy - y0) ** 2 * (3 - 2 * (fy - y0));
                const top = g(x0, y0) * (1 - tx) + g(x0 + 1, y0) * tx;
                const bottom = g(x0, y0 + 1) * (1 - tx) + g(x0 + 1, y0 + 1) * tx;
                out[y * size + x] += (top * (1 - ty) + bottom * ty) * weight;
            }
    }
    return out;
};
const texture = (size, pixel) => {
    const data = new Uint8Array(size * size * 4);
    for (let i = 0; i < size * size; i++) data.set(pixel(i), i * 4);
    const tex = new THREE.DataTexture(data, size, size);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    tex.needsUpdate = true;
    return tex;
};

const SIZE = 512;
// uneven ageing: broad yellowed patches, gentle mottling and fine speckle in
// the moulded plastic
const mottle = noiseField(SIZE, [[4, 0.5], [12, 0.3], [48, 0.2]]);
const yellowing = noiseField(SIZE, [[3, 0.6], [7, 0.4]]);
const speckle = noiseField(SIZE, [[256, 1]]);
const plasticColor = texture(SIZE, (i) => {
    const v = 0.94 + (mottle[i] - 0.5) * 0.06 + (speckle[i] - 0.5) * 0.08;
    const y = Math.max(0, yellowing[i] - 0.45) * 2;
    return [
        Math.min(255, v * 255),
        Math.min(255, v * (1 - y * 0.03) * 255),
        Math.min(255, v * (1 - y * 0.11) * 255),
        255,
    ];
});
plasticColor.colorSpace = THREE.SRGBColorSpace;
const plasticRough = texture(SIZE, (i) => {
    const r = 195 + (mottle[i] - 0.5) * 50 + (speckle[i] - 0.5) * 40;
    return [r, r, r, 255];
});
// fine moulded texture as a normal map
const bump = noiseField(SIZE, [[128, 0.6], [256, 0.4]]);
const grain = texture(SIZE, (i) => {
    const x = i % SIZE;
    const y = Math.floor(i / SIZE);
    const h = (xx, yy) => bump[((yy + SIZE) % SIZE) * SIZE + ((xx + SIZE) % SIZE)];
    const n = new THREE.Vector3(-(h(x + 1, y) - h(x - 1, y)) * 2.5, -(h(x, y + 1) - h(x, y - 1)) * 2.5, 1).normalize();
    return [(n.x * 0.5 + 0.5) * 255, (n.y * 0.5 + 0.5) * 255, (n.z * 0.5 + 0.5) * 255, 255];
});

// Apple's "Platinum": a light warm grey
const plastic = (color, roughness = 0.6, side = THREE.FrontSide) =>
    new THREE.MeshPhysicalMaterial({
        color,
        roughness,
        metalness: 0,
        map: plasticColor,
        roughnessMap: plasticRough,
        normalMap: grain,
        normalScale: new THREE.Vector2(0.4, 0.4),
        side,
    });
const platinum = plastic(0xe4dfd1);
const platinumInner = plastic(0xd8d2c4, 0.62, THREE.DoubleSide);
const platinumDark = plastic(0xcbc5b7);
const slot = plastic(0x1c1c1b, 0.5);
const cavity = plastic(0x141413, 0.8);
// black, glossy glass: what it reflects becomes the glare over the picture
const tubeGlass = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    roughness: 0.05,
    metalness: 0,
});

const add = (parent, geometry, material, x = 0, y = 0, z = 0) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
};
const rbox = (w, h, d, r, segments = 4) => new RoundedBoxGeometry(w, h, d, segments, r);

// rounded rectangle outline with a fixed number of points, so two can be lofted
const ringPoints = (w, h, r, per = 10) => {
    const pts = [];
    const corners = [
        [w / 2 - r, h / 2 - r, 0],
        [-w / 2 + r, h / 2 - r, Math.PI / 2],
        [-w / 2 + r, -h / 2 + r, Math.PI],
        [w / 2 - r, -h / 2 + r, (3 * Math.PI) / 2],
    ];
    for (const [cx, cy, a0] of corners)
        for (let i = 0; i <= per; i++) {
            const a = a0 + (i / per) * (Math.PI / 2);
            pts.push(new THREE.Vector2(cx + Math.cos(a) * r, cy + Math.sin(a) * r));
        }
    return pts;
};
const roundedShape = (w, h, r) => new THREE.Shape(ringPoints(w, h, r));

// sloped wall between two rounded rectangles at different depths
const loft = (outer, zOuter, inner, zInner) => {
    const pos = [];
    const uv = [];
    for (const p of outer) pos.push(p.x, p.y, zOuter), uv.push(p.x, p.y);
    for (const p of inner) pos.push(p.x, p.y, zInner), uv.push(p.x, p.y);
    const n = outer.length;
    const index = [];
    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        index.push(i, j, n + i, j, n + j, n + i);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(index);
    g.computeVertexNormals();
    return g;
};

// printed details (logo, badge) as small transparent decals
const decal = (w, h, draw, px = 256) => {
    const canvas = document.createElement("canvas");
    canvas.width = px;
    canvas.height = Math.round((px * h) / w);
    draw(canvas.getContext("2d"), canvas.width, canvas.height);
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    return [
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshStandardMaterial({ map, transparent: true, roughness: 0.45 }),
    ];
};
// the six-colour Apple logo
const rainbowApple = (ctx, w, h) => {
    const s = Math.min(w, h) / 100;
    const shape = new Path2D();
    shape.moveTo(50 * s, 30 * s);
    shape.bezierCurveTo(62 * s, 20 * s, 88 * s, 22 * s, 90 * s, 50 * s);
    shape.bezierCurveTo(92 * s, 76 * s, 74 * s, 98 * s, 64 * s, 97 * s);
    shape.bezierCurveTo(57 * s, 96 * s, 55 * s, 92 * s, 50 * s, 92 * s);
    shape.bezierCurveTo(45 * s, 92 * s, 43 * s, 96 * s, 36 * s, 97 * s);
    shape.bezierCurveTo(26 * s, 98 * s, 8 * s, 76 * s, 10 * s, 50 * s);
    shape.bezierCurveTo(12 * s, 22 * s, 38 * s, 20 * s, 50 * s, 30 * s);
    shape.moveTo(52 * s, 26 * s);
    shape.bezierCurveTo(52 * s, 14 * s, 60 * s, 5 * s, 70 * s, 4 * s);
    shape.bezierCurveTo(70 * s, 15 * s, 62 * s, 25 * s, 52 * s, 26 * s);
    ctx.save();
    ctx.clip(shape);
    const stripes = ["#61bb46", "#fdb827", "#f5821f", "#e03a3e", "#963d97", "#009ddc"];
    stripes.forEach((c, i) => {
        ctx.fillStyle = c;
        ctx.fillRect(0, (4 + (i * 93) / 6) * s, w, (93 / 6 + 0.5) * s);
    });
    ctx.restore();
    // the bite
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(98 * s, 58 * s, 14 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
};

const computer = new THREE.Group();
scene.add(computer);

// ---- system unit: wide, low, with a parting groove, two floppy slots and louvres ----
const CPU = { w: 4.7, h: 1.38, d: 3.7 };
add(computer, rbox(CPU.w, CPU.h, CPU.d, 0.06), platinum, 0, CPU.h / 2, -CPU.d / 2);
// lid parting line and a second groove below the drives
add(computer, rbox(CPU.w + 0.004, 0.018, CPU.d + 0.004, 0.006, 1), slot, 0, 1.06, -CPU.d / 2);
add(computer, rbox(CPU.w - 0.3, 0.012, 0.012, 0.004, 1), platinumDark, 0, 0.68, 0.004);
// two floppy slots with eject holes, and the power indicator
for (const x of [0.15, 1.45]) {
    add(computer, rbox(1.05, 0.07, 0.03, 0.012), platinumDark, x, 0.86, 0.006);
    add(computer, rbox(0.95, 0.032, 0.03, 0.01), slot, x, 0.86, 0.012);
    add(computer, rbox(0.035, 0.035, 0.02, 0.012), slot, x + 0.6, 0.83, 0.008);
}
add(computer, rbox(0.14, 0.022, 0.02, 0.008), slot, -2.0, 1.2, 0.006);
// logo and badge on the lower front
{
    const [g, m] = decal(0.13, 0.13, rainbowApple, 128);
    add(computer, g, m, -2.08, 0.46, 0.003);
    const [tg, tm] = decal(0.62, 0.11, (ctx, w, h) => {
        ctx.fillStyle = "#8d887c";
        ctx.font = `italic 500 ${h * 0.78}px Georgia, "Times New Roman", serif`;
        ctx.textBaseline = "middle";
        ctx.fillText("Macintosh II", 0, h * 0.55);
    }, 512);
    add(computer, tg, tm, -1.65, 0.46, 0.003);
}
// louvres on the right side and across the top
for (let y = 0.16; y < 1.0; y += 0.075)
    add(computer, rbox(0.02, 0.028, CPU.d - 0.5, 0.008, 1), platinumDark, CPU.w / 2 + 0.006, y, -CPU.d / 2);
for (let y = 1.12; y < 1.32; y += 0.075)
    add(computer, rbox(0.02, 0.028, CPU.d - 0.5, 0.008, 1), platinumDark, CPU.w / 2 + 0.006, y, -CPU.d / 2);
for (let z = -0.35; z > -CPU.d + 0.2; z -= 0.09)
    add(computer, rbox(CPU.w - 0.5, 0.02, 0.032, 0.008, 1), platinumDark, 0, CPU.h + 0.006, z);

// ---- monitor: AppleColor-style, flat bezel with a narrow slope to the tube ----
const MON = { w: 3.65, h: 3.1, x: 0, front: -0.32 };
const monitor = new THREE.Group();
// the monitor rides on a tilt-swivel foot, leaving a shadowed gap above the unit
const FOOT_H = 0.16;
monitor.position.set(MON.x, CPU.h + FOOT_H + MON.h / 2, MON.front);
computer.add(monitor);

const OPEN = { w: 2.66, h: 2.08, r: 0.07, y: 0.14 }; // opening on the front face
const TUBE = { w: 2.48, h: 1.86, r: 0.05, depth: 0.16 }; // where the slope meets the glass (4:3)
const FACE_DEPTH = 0.42;
const BEVEL = 0.05;
const lift = (pts) => pts.map((p) => p.add(new THREE.Vector2(0, OPEN.y)));

const face = roundedShape(MON.w, MON.h, 0.14);
face.holes.push(new THREE.Path(lift(ringPoints(OPEN.w, OPEN.h, OPEN.r))));
const faceGeo = new THREE.ExtrudeGeometry(face, {
    depth: FACE_DEPTH - BEVEL,
    bevelEnabled: true,
    bevelThickness: BEVEL,
    bevelSize: 0.04,
    bevelSegments: 5,
    curveSegments: 10,
});
add(monitor, faceGeo, platinum, 0, 0, -(FACE_DEPTH - BEVEL));
add(monitor, loft(lift(ringPoints(OPEN.w - 0.01, OPEN.h - 0.01, OPEN.r)), 0.0, lift(ringPoints(TUBE.w, TUBE.h, TUBE.r)), -TUBE.depth), platinumInner);

// tube glass, nearly flat, larger than the opening so its edges tuck behind the bezel
const GLASS_W = TUBE.w + 0.14;
const GLASS_H = TUBE.h + 0.14;
const tubeGeo = new THREE.PlaneGeometry(GLASS_W, GLASS_H, 48, 36);
{
    const p = tubeGeo.attributes.position;
    for (let i = 0; i < p.count; i++) {
        const u = p.getX(i) / (GLASS_W / 2);
        const v = p.getY(i) / (GLASS_H / 2);
        p.setZ(i, 0.05 * (1 - u * u) * (1 - v * v));
    }
    tubeGeo.computeVertexNormals();
}
const tube = add(monitor, tubeGeo, tubeGlass, 0, OPEN.y, -TUBE.depth - 0.06);
add(monitor, new THREE.PlaneGeometry(TUBE.w + 0.4, TUBE.h + 0.4), cavity, 0, OPEN.y, -TUBE.depth - 0.12);

// logo bottom left, power light bottom right
{
    const [g, m] = decal(0.15, 0.15, rainbowApple, 128);
    // the bevel puts the bezel's front face at z = BEVEL
    add(monitor, g, m, -MON.w / 2 + 0.3, -MON.h / 2 + 0.24, BEVEL + 0.003);
}
add(monitor, rbox(0.12, 0.022, 0.02, 0.008), slot, MON.w / 2 - 0.3, -MON.h / 2 + 0.22, BEVEL);

// rear housing behind the face, louvred on the sides and top, tapering back
const HOUSING_FRONT = -FACE_DEPTH - 0.01;
const HOUSING = { w: MON.w - 0.16, h: MON.h - 0.14, d: 2.3 };
add(monitor, rbox(HOUSING.w, HOUSING.h, HOUSING.d, 0.12), platinum, 0, -0.03, HOUSING_FRONT - HOUSING.d / 2);
add(monitor, rbox(2.9, 2.5, 1.4, 0.3), platinum, 0, 0.0, HOUSING_FRONT - HOUSING.d - 0.55);
for (let y = -HOUSING.h / 2 + 0.25; y < HOUSING.h / 2 - 0.2; y += 0.085)
    add(monitor, rbox(0.02, 0.032, HOUSING.d - 0.5, 0.008, 1), platinumDark, HOUSING.w / 2 + 0.006, y, HOUSING_FRONT - HOUSING.d / 2 - 0.1);
for (let z = HOUSING_FRONT - 0.3; z > HOUSING_FRONT - HOUSING.d + 0.25; z -= 0.09)
    add(monitor, rbox(HOUSING.w - 0.6, 0.02, 0.034, 0.008, 1), platinumDark, 0, HOUSING.h / 2 - 0.03 + 0.006, z);
// the tilt-swivel foot: a recessed, rounded plinth set well back from the
// bezel, so from the front the gap reads as a dark band
add(monitor, rbox(2.5, FOOT_H + 0.06, 2.0, 0.07), platinumDark, 0, -MON.h / 2 - FOOT_H / 2 + 0.02, HOUSING_FRONT - 1.15);

const frame = () => new Promise((resolve) => requestAnimationFrame(resolve));

const pixels = (source) => {
    const canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(source, 0, 0, WIDTH, HEIGHT);
    return ctx.getImageData(0, 0, WIDTH, HEIGHT);
};

// coverage masks, at 2x resolution and scaled down for smooth edges: white
// where the chosen meshes show, black elsewhere (the floor included)
const coverage = (pick) => {
    const white = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const black = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const saved = new Map();
    scene.traverse((o) => {
        if (!o.isMesh) return;
        saved.set(o, o.material);
        o.material = pick(o) ? white : black;
    });
    const tone = renderer.toneMapping;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setSize(WIDTH * 2, HEIGHT * 2);
    renderer.render(scene, camera);
    const mask = pixels(renderer.domElement);
    renderer.setSize(WIDTH, HEIGHT);
    renderer.toneMapping = tone;
    saved.forEach((material, o) => (o.material = material));
    return mask;
};

const pathTrace = async () => {
    const tracer = new WebGLPathTracer(renderer);
    tracer.bounces = 6;
    tracer.filterGlossyFactor = 0.4;
    tracer.renderDelay = 0;
    tracer.fadeDuration = 0;
    tracer.minSamples = 1;
    tracer.dynamicLowRes = false;
    tracer.tiles.set(2, 2);
    tracer.setScene(scene, camera);
    while (tracer.samples < SAMPLES) {
        tracer.renderSample();
        await frame();
    }
    const out = pixels(renderer.domElement);
    tracer.dispose();
    return out;
};

// the picture's corners (top left, top right, bottom right, bottom left): the
// 4:3 rectangle where the bezel's slope meets the glass, in canvas pixels
const screenQuad = () => {
    monitor.updateWorldMatrix(true, true);
    return [[-1, 1], [1, 1], [1, -1], [-1, -1]].map(([sx, sy]) => {
        const v = new THREE.Vector3((sx * TUBE.w) / 2, OPEN.y + (sy * TUBE.h) / 2, -TUBE.depth)
            .applyMatrix4(monitor.matrixWorld)
            .project(camera);
        return [((v.x + 1) / 2) * WIDTH, ((1 - v.y) / 2) * HEIGHT];
    });
};

const luma = (d, k) => 0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2];

// path trace the computer in its studio, then the studio alone; the ratio of
// the two is the shadow the machine casts, kept as transparency so it lands
// on the page instead of a visible floor. the glass becomes a see-through
// layer of its own reflections. crop around the machine (centred on it) and
// report where the glass and the picture's corners sit, in %
window.renderComputer = async () => {
    const quad = screenQuad();
    const beauty = await pathTrace();
    scene.remove(computer);
    const empty = await pathTrace();
    scene.add(computer);
    // the masks swap materials, so they come after the path tracing
    const glass = coverage((o) => o === tube);
    const body = coverage((o) => o !== floor && o !== wall);

    // shadow strength on the floor, lightly blurred to settle the noise
    const raw = new Float32Array(WIDTH * HEIGHT);
    for (let i = 0; i < WIDTH * HEIGHT; i++) {
        const k = i * 4;
        const lit = luma(empty.data, k);
        raw[i] = lit > 4 ? Math.min(1, Math.max(0, 1 - luma(beauty.data, k) / lit)) : 0;
    }
    const shadow = new Float32Array(WIDTH * HEIGHT);
    const R = 2;
    for (let y = 0; y < HEIGHT; y++)
        for (let x = 0; x < WIDTH; x++) {
            let sum = 0;
            let n = 0;
            for (let dy = -R; dy <= R; dy++)
                for (let dx = -R; dx <= R; dx++) {
                    const xx = x + dx;
                    const yy = y + dy;
                    if (xx < 0 || yy < 0 || xx >= WIDTH || yy >= HEIGHT) continue;
                    sum += raw[yy * WIDTH + xx];
                    n++;
                }
            shadow[y * WIDTH + x] = sum / n;
        }

    const out = new ImageData(WIDTH, HEIGHT);
    const machine = [WIDTH, HEIGHT, 0, 0];
    const box = [WIDTH, HEIGHT, 0, 0];
    const glassBox = [WIDTH, HEIGHT, 0, 0];
    const grow = (b, x, y) => {
        b[0] = Math.min(b[0], x);
        b[1] = Math.min(b[1], y);
        b[2] = Math.max(b[2], x);
        b[3] = Math.max(b[3], y);
    };
    // near-black, so the shadow only ever darkens the page, light or dark theme
    const shade = [0.02, 0.016, 0.012];
    for (let i = 0; i < WIDTH * HEIGHT; i++) {
        const k = i * 4;
        const g = glass.data[k] / 255;
        const c = Math.max(0, body.data[k] / 255 - g);
        const f = 1 - c - g;
        const px = [0, 1, 2].map((ch) => beauty.data[k + ch] / 255);
        // glass: reflections minus the lifted black, as premultiplied colour
        const refl = px.map((v) => Math.max(0, v - 10 / 255));
        const glassA = Math.min(1, Math.max(...refl) + 0.04);
        // ignore the faint haze the machine casts across the whole floor
        const s = Math.max(0, shadow[i] - 0.06) / 0.94;
        const a = c + g * glassA + f * s;
        const premult = [0, 1, 2].map((ch) => c * px[ch] + g * refl[ch] + f * s * shade[ch]);
        // a little photographic grain on the plastic
        const noise = c > 0 ? (Math.random() - 0.5) * 0.035 * c : 0;
        for (let ch = 0; ch < 3; ch++)
            out.data[k + ch] = a > 0 ? Math.min(255, Math.max(0, ((premult[ch] + noise) / a) * 255)) : 0;
        out.data[k + 3] = Math.min(1, a) * 255;
        const x = i % WIDTH;
        const y = Math.floor(i / WIDTH);
        if (c + g > 0.03) grow(machine, x, y);
        if (a > 0.06) grow(box, x, y);
        if (g > 0.02) grow(glassBox, x, y);
    }

    // keep the machine centred, with a margin for its shadow on either side
    // (capped, so a long soft shadow doesn't shrink the machine on the page);
    // the shadow fades out before it reaches the crop's edge
    const centre = (machine[0] + machine[2]) / 2;
    const machineHalf = (machine[2] - machine[0]) / 2;
    const half = Math.min(Math.max(centre - box[0], box[2] - centre), machineHalf * 1.4);
    const minX = Math.max(0, Math.floor(centre - half));
    const maxX = Math.min(WIDTH - 1, Math.ceil(centre + half));
    const [, minY, , maxY] = box;
    const w = maxX - minX + 1;
    const h = maxY - minY + 1;
    const fadeFrom = machineHalf * 1.05;
    for (let y = minY; y <= maxY; y++)
        for (let x = minX; x <= maxX; x++) {
            const d = Math.abs(x - centre);
            if (d <= fadeFrom) continue;
            const k = (y * WIDTH + x) * 4;
            if (body.data[k] > 8) continue;
            const t = Math.min(1, (d - fadeFrom) / (half - fadeFrom));
            out.data[k + 3] *= 1 - t * t * (3 - 2 * t);
        }
    const full = document.createElement("canvas");
    full.width = WIDTH;
    full.height = HEIGHT;
    full.getContext("2d").putImageData(out, 0, 0);
    const crop = document.createElement("canvas");
    crop.width = w;
    crop.height = h;
    crop.getContext("2d").drawImage(full, minX, minY, w, h, 0, 0, w, h);

    const pct = (v) => Math.round(v * 10000) / 100;
    return {
        image: crop.toDataURL("image/webp", 0.82),
        width: w,
        height: h,
        aspect: TUBE.w / TUBE.h,
        screen: {
            left: pct((glassBox[0] - minX) / w),
            top: pct((glassBox[1] - minY) / h),
            width: pct((glassBox[2] - glassBox[0] + 1) / w),
            height: pct((glassBox[3] - glassBox[1] + 1) / h),
        },
        quad: quad.map(([x, y]) => [pct((x - minX) / w), pct((y - minY) / h)]),
    };
};
window.sceneReady = true;
