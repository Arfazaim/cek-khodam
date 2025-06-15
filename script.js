let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let khodamName = document.getElementById('khodamName');
let khodamDesc = document.getElementById('khodamDesc');
let loader = document.getElementById('loader');

const khodamDatabase = [
  { name: 'Macan Putih', description: 'Sosok pendamping yang penuh wibawa dan keberanian.' },
  { name: 'Naga Emas', description: 'Membawa kemakmuran dan kebijaksanaan dalam setiap langkah.' },
  { name: 'Garuda Perkasa', description: 'Pelindung yang sigap dan memiliki pandangan tajam.' },
  { name: 'Ratu Angin', description: 'Memberikan ketenangan dan kemampuan beradaptasi yang luar biasa.' },
  { name: 'Semar Mesem', description: 'Memiliki daya tarik dan pesona yang sulit ditolak.' },
  { name: 'Api Suci', description: 'Membakar semangat dan menjauhkan dari energi negatif.' },
  { name: 'Batu Karang', description: 'Kokoh, tegar, dan tidak mudah goyah oleh keadaan.' },
  { name: 'Kosong', description: 'Anda masih polos, belum ada khodam yang mendekat.' }
];

// Load model
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models')
]).then(startVideo);

// Mulai kamera
function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => {
      video.srcObject = stream;
      video.play();
      startAutoScan(); // Mulai auto scan saat kamera menyala
    })
    .catch(err => {
      alert("Gagal mengakses kamera: " + err.message);
    });
}

// Scan setiap 2 detik
function startAutoScan() {
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
    if (detections.length > 0) {
      tampilkanLoader(true);

      // Pilih khodam acak
      const random = Math.floor(Math.random() * khodamDatabase.length);
      const result = khodamDatabase[random];

      // Tampilkan hasil dengan efek
      setTimeout(() => {
        khodamName.textContent = `Khodam Anda: ${result.name}`;
        khodamDesc.textContent = result.description;
        khodamName.classList.add("show");
        khodamDesc.classList.add("show");
        tampilkanLoader(false);
      }, 1500); // delay agar terlihat seperti memproses
    }
  }, 1000);
}

function tampilkanLoader(status) {
  if (status) {
    loader.classList.remove('hidden');
    khodamName.classList.remove("show");
    khodamDesc.classList.remove("show");
    khodamName.textContent = '';
    khodamDesc.textContent = '';
  } else {
    loader.classList.add('hidden');
  }
}
