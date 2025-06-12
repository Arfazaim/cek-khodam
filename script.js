// Ambil elemen dari HTML
const video = document.getElementById('video');
const startButton = document.getElementById('startButton');
const scanButton = document.getElementById('scanButton');
const canvas = document.getElementById('canvas');
const khodamName = document.getElementById('khodamName');
const khodamDesc = document.getElementById('khodamDesc');
const loader = document.getElementById('loader');

// --- DATABASE KHODAM (Tetap sama) ---
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

// Muat model face-api.js terlebih dahulu
console.log("Memuat model deteksi wajah...");
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
]).then(() => {
    console.log("Model berhasil dimuat.");
    startButton.disabled = false; // Aktifkan tombol setelah model siap
}).catch(err => {
    console.error("Gagal memuat model: ", err);
});
startButton.disabled = true; // Nonaktifkan tombol saat model sedang dimuat

// Fungsi untuk memulai kamera
startButton.addEventListener('click', async () => {
    try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    // ... kode jika berhasil
} catch (err) {
    console.error("Error mengakses kamera: ", err);
    // INI YANG MUNCUL DI LAYAR ANDA
    alert("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin dan menggunakan koneksi HTTPS."); 
}
});

// Logika saat tombol "Scan Wajah" diklik
scanButton.addEventListener('click', async () => {
    // Tampilkan loader dan bersihkan hasil sebelumnya
    loader.classList.remove('hidden');
    khodamName.innerText = '';
    khodamDesc.innerText = '';

    // Siapkan canvas untuk menangkap frame dari video
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    
    // Deteksi wajah dari gambar di canvas
    const detections = await faceapi.detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions());

    // Beri jeda untuk efek "memproses"
    setTimeout(() => {
        if (detections.length > 0) {
            // Jika wajah terdeteksi, pilih khodam acak
            const randomIndex = Math.floor(Math.random() * khodamDatabase.length);
            const randomKhodam = khodamDatabase[randomIndex];

            // Tampilkan hasil
            khodamName.innerText = `Khodam Anda: ${randomKhodam.name}`;
            khodamDesc.innerText = randomKhodam.description;
        } else {
            // Jika tidak ada wajah yang terdeteksi
            khodamName.innerText = "Wajah tidak terdeteksi!";
            khodamDesc.innerText = "Pastikan wajah Anda terlihat jelas di kamera.";
        }
        
        // Sembunyikan loader
        loader.classList.add('hidden');
    }, 2500); // Jeda 2.5 detik
});