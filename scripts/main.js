import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";








let scene, camera, renderer, controls;
let planet_sun, planet_mercury, planet_venus, planet_earth, planet_mars, planet_jupiter, planet_saturn, planet_uranus, planet_neptune, moon, planet_pluto, planet_makemake, planet_ceres, planet_haumea, planet_eris;


let mercury_orbit_radius = 50;
let venus_orbit_radius = 60;
let earth_orbit_radius = 70;
let mars_orbit_radius = 80;
let jupiter_orbit_radius = 100;
let saturn_orbit_radius = 120;
let uranus_orbit_radius = 140;
let neptune_orbit_radius = 160;
let pluto_orbit_radius = 250;
let makemake_orbit_radius = 260;
let ceres_orbit_radius = 270;
let haumea_orbit_radius = 280;
let eris_orbit_radius = 290;

let mercury_revolution_speed = 2;
let venus_revolution_speed = 1.5;
let earth_revolution_speed = 1;
let mars_revolution_speed = 0.8;
let jupiter_revolution_speed = 0.7;
let saturn_revolution_speed = 0.6;
let uranus_revolution_speed = 0.5;
let neptune_revolution_speed = 0.4;
let pluto_revolution_speed = 0.3;
let makemake_revolution_speed = 0.25;
let ceres_revolution_speed = 0.4;
let haumea_revolution_speed = 0.35;
let eris_revolution_speed = 0.2;

let moon_revolution_speed = 5;
let moon_orbit_radius = 5; 

function createMaterialArray() {
  const skyboxImagepaths = [
    '/app/img/textures/skybox/space_ft.png', '/app/img/textures/skybox/space_bk.png', '/app/img/textures/skybox/space_up.png', 
    '/app/img/textures/skybox/space_dn.png', '/app/img/textures/skybox/space_rt.png', '/app/img/textures/skybox/space_lf.png'
  ];
  const materialArray = skyboxImagepaths.map((image) => {
    let texture = new THREE.TextureLoader().load(image);
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });
  return materialArray;
}

function setSkyBox() {
  const materialArray = createMaterialArray();
  let skyboxGeo = new THREE.BoxGeometry(6000, 6000, 6000);
  let skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);
}

function loadPlanetTexture(texture, radius, widthSegments, heightSegments, meshType) {
  const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  const loader = new THREE.TextureLoader();
  const planetTexture = loader.load(texture);
  const material = meshType == 'standard' ? new THREE.MeshStandardMaterial({ map: planetTexture }) : new THREE.MeshBasicMaterial({ map: planetTexture });

  const planet = new THREE.Mesh(geometry, material);
  return planet;
}

function createSaturnRings() {
  const loader = new THREE.TextureLoader();
  const ringTexture = loader.load("/app/img/textures/8k_saturn_ring_alpha.png");

  const geometry = new THREE.RingGeometry(9, 13, 64); 
  const material = new THREE.MeshBasicMaterial({ map: ringTexture, side: THREE.DoubleSide, transparent: true });

  const ring = new THREE.Mesh(geometry, material);
  ring.rotation.x = Math.PI / 2;
  ring.rotation.y = 0.5;
  planet_saturn.add(ring);
}




// Функция для обработки события клика на кнопки
function toggleSlideWindow(buttonId, slideWindowId, buttonText) {
document.getElementById(buttonId).addEventListener("click", function() {
  var slideWindow = document.getElementById(slideWindowId);
  

  // Если окно скрыто, выдвигаем его
  if (slideWindow.style.right === "-400px") { // Измените значение на -400px
      slideWindow.style.right = "0";
      slideWindow.style.opacity = "1"; // Показываем текст
      this.innerHTML = buttonText + " ←"; // Меняем текст и стрелку на левую
  } else {
      // Если окно видно, скрываем его
      slideWindow.style.right = "-400px"; // Измените значение на -400px
      slideWindow.style.opacity = "0"; // Скрываем текст
      this.innerHTML = buttonText + " →"; // Меняем текст и стрелку на правую
  }
});
}

// Вызов функции для каждой кнопки и соответствующего окна
toggleSlideWindow("toggleButton1", "slideWindow1", "Merсury");
toggleSlideWindow("toggleButton2", "slideWindow2", "Venus");
toggleSlideWindow("toggleButton3", "slideWindow3", "Earth");
toggleSlideWindow("toggleButton4", "slideWindow4", "Mars");
toggleSlideWindow("toggleButton5", "slideWindow5", "Jupiter");
toggleSlideWindow("toggleButton6", "slideWindow6", "Saturn");
toggleSlideWindow("toggleButton7", "slideWindow7", "Uran");
toggleSlideWindow("toggleButton8", "slideWindow8", "Neptune");
toggleSlideWindow("toggleButton9", "slideWindow9", "Moon");
toggleSlideWindow("toggleButton10", "slideWindow10", "Sun");
toggleSlideWindow("toggleButton11", "slideWindow11", "Pluto");
toggleSlideWindow("toggleButton12", "slideWindow12", "Makemake");
toggleSlideWindow("toggleButton13", "slideWindow13", "Ceres");
toggleSlideWindow("toggleButton14", "slideWindow14", "Eres");
toggleSlideWindow("toggleButton15", "slideWindow15", "Haumea");










function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  setSkyBox();
  
  planet_earth = loadPlanetTexture('/app/img/textures//8k_earth_daymap.jpg', 4, 100, 100, 'standard');
  planet_sun = loadPlanetTexture("/app/img/textures/image.png", 20, 100, 100, 'basic');
  planet_mercury = loadPlanetTexture("/app/img/textures/8k_mercury.jpg", 2, 100, 100, 'standard');
  planet_venus = loadPlanetTexture("/app/img/textures/8k_venus_surface.jpg", 3, 100, 100, 'standard');
  planet_mars = loadPlanetTexture("/app/img/textures/8k_mars.jpg", 3.5, 100, 100, 'standard');
  planet_jupiter = loadPlanetTexture("/app/img/textures/8k_jupiter.jpg", 10, 100, 100, 'standard');
  planet_saturn = loadPlanetTexture("/app/img/textures/8k_saturn.jpg", 8, 100, 100, 'standard');
  planet_uranus = loadPlanetTexture("/app/img/textures/2k_uranus.jpg", 6, 100, 100, 'standard');
  planet_neptune = loadPlanetTexture("/app/img/textures/2k_neptune.jpg", 5, 100, 100, 'standard');
  moon = loadPlanetTexture("/app/img/textures/8k_moon.jpg", 1, 100, 100, 'standard'); 
  planet_pluto = loadPlanetTexture("/app/img/textures/8k_moon.jpg", 2, 100, 100, 'standard'); // Add Pluto
  planet_makemake = loadPlanetTexture("/app/img/textures/4k_makemake_fictional.jpg", 2, 100, 100, 'standard'); // Add Makemake
  planet_ceres = loadPlanetTexture("/app/img/textures/4k_ceres_fictional.jpg", 2.5, 100, 100, 'standard'); // Add Ceres
  planet_haumea = loadPlanetTexture("/app/img/textures/4k_haumea_fictional.jpg", 2.5, 100, 100, 'standard'); // Add Haumea
  planet_eris = loadPlanetTexture("/app/img/textures//4k_eris_fictional.jpg ", 2.5, 100, 100, 'standard'); // Add Eris

  scene.add(planet_earth);
  scene.add(planet_sun);
  scene.add(planet_mercury);
  scene.add(planet_venus);
  scene.add(planet_mars);
  scene.add(planet_jupiter);
  scene.add(planet_saturn);
  scene.add(planet_uranus);
  scene.add(planet_neptune);
  scene.add(moon); 
  scene.add(planet_pluto); // Add Pluto to the scene
  scene.add(planet_makemake); // Add Makemake to the scene
  scene.add(planet_ceres); // Add Ceres to the scene
  scene.add(planet_haumea); // Add Haumea to the scene
  scene.add(planet_eris); // Add Eris to the scene
  
  createSaturnRings(); 

  function createNeonRing(innerRadius, color) {
    let outerRadius = innerRadius - 0.1;
    let thetaSegments = 100;

    // Создаем геометрию кольца
    const geometry = new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments);

    // Настраиваем материал с неоновым свечением
    const material = new THREE.MeshBasicMaterial({
        color: color,                 // Основной цвет
        emissive: color,              // Свечение (неоновый эффект)
        emissiveIntensity: 1.5,       // Интенсивность свечения
        transparent: true,            // Прозрачность материала
        opacity: 1,                 // Уровень прозрачности
        side: THREE.DoubleSide        // Отображение с обеих сторон
    });

    // Создаем меш
    const mesh = new THREE.Mesh(geometry, material);

    // Добавляем его в сцену
    scene.add(mesh);

    // Вращаем кольцо в нужную ориентацию
    mesh.rotation.x = Math.PI / 2;

    return mesh;
  }

  // Создаем орбиты планет с неоновыми кольцами
  createNeonRing(mercury_orbit_radius, 0xff0000);   // Меркурий
  createNeonRing(venus_orbit_radius, 0xffa500);     // Венера
  createNeonRing(earth_orbit_radius, 0x0000ff);     // Земля
  createNeonRing(mars_orbit_radius, 0xff4500);      // Марс
  createNeonRing(jupiter_orbit_radius, 0x8b4513);   // Юпитер
  createNeonRing(saturn_orbit_radius, 0xf4a460);    // Сатурн
  createNeonRing(uranus_orbit_radius, 0x00ffff);    // Уран
  createNeonRing(neptune_orbit_radius, 0x00008b);   // Нептун
  createNeonRing(pluto_orbit_radius, 0xffffff);     // Плутон
  createNeonRing(makemake_orbit_radius, 0xffffff);  // Макемаке
  createNeonRing(ceres_orbit_radius, 0xffffff);     // Церера
  createNeonRing(haumea_orbit_radius, 0xffffff);    // Хаумеа
  createNeonRing(eris_orbit_radius, 0xffffff);      // Эрида


  const sunLight = new THREE.PointLight(0xffffff, 1, 0); 
  sunLight.position.copy(planet_sun.position); 
  scene.add(sunLight);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.domElement.id = "c";
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 50;
  controls.maxDistance = 1000;

  camera.position.z = 100;
  
  camera.position.y = 100;
}

function planetRevolver(time, speed, planet, orbitRadius) {
  let orbitSpeedMultiplier = 0.001;
  const planetAngle = time * orbitSpeedMultiplier * speed;
  planet.position.x = planet_sun.position.x + orbitRadius * Math.cos(planetAngle);
  planet.position.z = planet_sun.position.z + orbitRadius * Math.sin(planetAngle);
}

function moonRevolver(time) {
  let moonSpeedMultiplier = 0.001;
  const moonAngle = time * moonSpeedMultiplier * moon_revolution_speed;
  moon.position.x = planet_earth.position.x + moon_orbit_radius * Math.cos(moonAngle);
  moon.position.z = planet_earth.position.z + moon_orbit_radius * Math.sin(moonAngle);
}


function animate(time) {
  requestAnimationFrame(animate);

  const rotationSpeed = 0.005;
  planet_earth.rotation.y += rotationSpeed;
  planet_sun.rotation.y += rotationSpeed;
  planet_mercury.rotation.y += rotationSpeed;
  planet_venus.rotation.y += rotationSpeed;
  planet_mars.rotation.y += rotationSpeed;
  planet_jupiter.rotation.y += rotationSpeed;
  planet_saturn.rotation.y += rotationSpeed;
  planet_uranus.rotation.y += rotationSpeed;
  planet_neptune.rotation.y += rotationSpeed;
  planet_pluto.rotation.y += rotationSpeed;
  planet_makemake.rotation.y += rotationSpeed;
  planet_ceres.rotation.y += rotationSpeed;
  planet_haumea.rotation.y += rotationSpeed;
  planet_eris.rotation.y += rotationSpeed;

  planetRevolver(time, mercury_revolution_speed, planet_mercury, mercury_orbit_radius);
  planetRevolver(time, venus_revolution_speed, planet_venus, venus_orbit_radius);
  planetRevolver(time, earth_revolution_speed, planet_earth, earth_orbit_radius);
  planetRevolver(time, mars_revolution_speed, planet_mars, mars_orbit_radius);
  planetRevolver(time, jupiter_revolution_speed, planet_jupiter, jupiter_orbit_radius);
  planetRevolver(time, saturn_revolution_speed, planet_saturn, saturn_orbit_radius);
  planetRevolver(time, uranus_revolution_speed, planet_uranus, uranus_orbit_radius);
  planetRevolver(time, neptune_revolution_speed, planet_neptune, neptune_orbit_radius);
  planetRevolver(time, pluto_revolution_speed, planet_pluto, pluto_orbit_radius);
  planetRevolver(time, makemake_revolution_speed, planet_makemake, makemake_orbit_radius);
  planetRevolver(time, ceres_revolution_speed, planet_ceres, ceres_orbit_radius);
  planetRevolver(time, haumea_revolution_speed, planet_haumea, haumea_orbit_radius);
  planetRevolver(time, eris_revolution_speed, planet_eris, eris_orbit_radius);



  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//

const aiButton = document.createElement('button');
aiButton.innerText = 'AI Assistant';
aiButton.style.position = 'fixed'; 
aiButton.style.bottom = '20px'; 
aiButton.style.left = '50%'; 
aiButton.style.transform = 'translateX(-50%)'; 
aiButton.style.backgroundColor = '#000000'; 
aiButton.style.color = 'white'; 
aiButton.style.border = 'none'; 
aiButton.style.padding = '10px 20px'; 
aiButton.style.borderRadius = '5px'; 
aiButton.style.cursor = 'pointer'; 
aiButton.style.zIndex = '1000'; 
aiButton.style.fontSize = '16px';


aiButton.onclick = () => {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
};

document.getElementById('closeChat').onclick = () => {
    document.getElementById('chatContainer').style.display = 'none';
};

document.getElementById('sendMessage').onclick = async () => {
    const userInput = document.getElementById('userInput');
    const message = userInput.value;

    if (message.trim() === '') return;

    
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML += `
        <div style="text-align: right; margin: 5px; background-color: #e0e0e0; padding: 5px; border-radius: 5px; display: inline-block;">
            <img src="/app/img/default-avatar.png" alt="User" style="width: 20px; vertical-align: middle;"> You: ${message}
        </div>`;
    userInput.value = ''; 

    
    const aiResponse = await getAIResponse(message);
    chatMessages.innerHTML += `
        <div style="text-align: left; margin: 5px; background-color: #d1c4e9; padding: 5px; border-radius: 5px; display: inline-block;">
            <img src="/app/img/aiIcon.png" alt="AI" style="width: 20px; vertical-align: middle;"> AI: ${aiResponse}
        </div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight; 
};


async function getAIResponse(userMessage) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY' //!!! API нужно поменять а то гг
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }]
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching AI response:', errorData);
        return 'Sorry, I am having trouble understanding you. You can use telegram Assistant @SolarExplorer_Assistant_bot';
    }

    const data = await response.json();
    return data.choices[0].message.content;
}


document.body.appendChild(aiButton);


//


window.addEventListener("resize", onWindowResize, false);



//time script
function updateClock() {
  const now = new Date();
  const utcTime = now.toUTCString().slice(-12, -4); // Получаем только время в UTC
  const localTime = now.toLocaleTimeString(); // Локальное время пользователя

  document.getElementById('clock').textContent = `Local Time: ${localTime} | UTC Time: ${utcTime}`;
}

// Обновляем время каждую секунду
setInterval(updateClock, 1000);

// Первый вызов для немедленного отображения
updateClock();






function createLabel(text) {
  const div = document.createElement('div');
  div.className = 'label';
  div.textContent = text;
  div.style.marginTop = '-1em'; // Adjust as needed
  return new CSS2DObject(div);
}

function addPlanetLabel(planet, name) {
  const label = createLabel(name);
  planet.add(label);
}





init();
animate(0);
