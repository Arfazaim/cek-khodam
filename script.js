// Ambil elemen dari HTML
const video = document.getElementById('video');
const startButton = document.getElementById('startButton');
const scanButton = document.getElementById('scanButton');
const canvas = document.getElementById('canvas');
const khodamName = document.getElementById('khodamName');
const khodamDesc = document.getElementById('khodamDesc');
const loader = document.getElementById('loader');

// --- DATABASE KHODAM TERLENGKAP ---
const khodamDatabase = [
    { name: 'Macan Putih', description: 'Pendamping kuat dan berwibawa dari dunia gaib.' },
    { name: 'Naga Emas', description: 'Membawa rezeki dan kewibawaan tinggi.' },
    { name: 'Garuda Perkasa', description: 'Simbol pelindung dari serangan energi negatif.' },
    { name: 'Ratu Angin', description: 'Bergerak dengan cepat dan halus melindungi pengikutnya.' },
    { name: 'Semar Mesem', description: 'Memberikan pesona dan daya tarik luar biasa.' },
    { name: 'Api Suci', description: 'Membakar aura negatif dan meningkatkan semangat hidup.' },
    { name: 'Batu Karang', description: 'Simbol keteguhan dan kekuatan dalam diam.' },
    { name: 'Mbah Joyo', description: 'Khodam tua bijak dari dimensi leluhur Jawa.' },
    { name: 'Khodam Kalajengking Merah', description: 'Memiliki energi perlawanan dan penjaga dari serangan ghaib.' },
    { name: 'Harimau Hitam', description: 'Khodam penjaga gelap dengan tatapan tajam.' },
    { name: 'Nyai Roro Kidul', description: 'Energi mistik dari pantai selatan yang membawa aura kuat.' },
    { name: 'Mbah Kiai Agung', description: 'Sosok santri tua dengan kekuatan spiritual tinggi.' },
    { name: 'Khodam Serigala Putih', description: 'Penjaga loyal dengan naluri tajam.' },
    { name: 'Raja Naga Merah', description: 'Kekuatan mistis pembakar musuh dalam diam.' },
    { name: 'Kosong', description: 'Anda masih polos, belum ada khodam yang mendekat.' },
    { name: 'Ratu Selatan', description: 'Penjaga laut selatan yang memesona, penuh misteri dan keagungan.' },
{ name: 'Eyang Prabu Jayabaya', description: 'Sang peramal agung yang membuka tabir masa depan dan kebenaran.' },
{ name: 'Pangeran Sabrang Lor', description: 'Prajurit gaib dari tanah utara, tegas dan tak gentar.' },
{ name: 'Kyai Keramat', description: 'Roh suci yang selalu hadir dalam keheningan dan doa.' },
{ name: 'Putri Hijau', description: 'Perisai spiritual dengan aura hijau zamrud penyejuk jiwa.' },
{ name: 'Singa Barong', description: 'Penjaga dimensi gaib dengan tatapan tajam yang melindungi.' },
{ name: 'Mbah Jati', description: 'Roh bijak dari gunung tua yang membimbing dengan kesunyian.' },
{ name: 'Nyi Roro Kidul', description: 'Penguasa Laut Selatan, anggun namun sangat berwibawa dan penuh energi mistis.' },
{ name: 'Pendekar Tanpa Bayangan', description: 'Pejuang gaib yang hanya muncul saat kegelapan melanda.' },
{ name: 'Roh Lembu Sekilan', description: 'Jin penjaga tanah Jawa yang konon bisa membelah musuh dengan tatapan.' },
{ name: 'Khodam Pelindung Warisan Leluhur', description: 'Energi turun-temurun yang menjaga garis keturunanmu.' },
{ name: 'Khodam Netral', description: 'Khodam penyeimbang, tidak condong ke kebaikan atau keburukan.' },
{ name: 'Bayangan Merah', description: 'Entitas penjaga yang hanya muncul saat kamu dalam bahaya besar.' },
{ name: 'Sang Penuntun Cahaya', description: 'Energi positif yang datang saat kamu kehilangan arah hidup.' },
{ name: 'Khodam Digital', description: 'Entitas baru dari era modern, menjaga ruang siber dan dunia maya.' }

];

// Load model face-api.js
startButton.disabled = true;
console.log("Memuat model deteksi wajah...");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
]).then(() => {
    console.log("Model berhasil dimuat.");
    startButton.disabled = false;
}).catch(err => {
    console.error("Gagal memuat model:", err);
    alert("Gagal memuat model deteksi wajah. Pastikan folder 'models' tersedia.");
});

// Fungsi mulai kamera
startButton.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        video.srcObject = stream;
        startButton.disabled = true;
        scanButton.classList.remove('hidden');
    } catch (err) {
        console.error("Gagal mengakses kamera:", err);
        alert("Tidak dapat mengakses kamera. Pastikan browser memberi izin dan menggunakan HTTPS.");
    }
});

// Tombol scan wajah
scanButton.addEventListener('click', async () => {
    // Reset tampilan dan tampilkan loader
    khodamName.innerText = '';
    khodamDesc.innerText = '';
    khodamName.classList.remove('show');
    khodamDesc.classList.remove('show');
    loader.classList.remove('hidden');

    // Tambahkan efek scan garis
    const scanLine = document.getElementById('scanLine');
    scanLine.classList.remove('hidden');
    scanLine.classList.add('scan-line');

    // Tangkap frame dari video ke canvas
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Deteksi wajah
    const detections = await faceapi.detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions());

    // Efek proses 2.5 detik
    setTimeout(() => {
        scanLine.classList.add('hidden');
        loader.classList.add('hidden');

        if (detections.length > 0) {
            const randomKhodam = khodamDatabase[Math.floor(Math.random() * khodamDatabase.length)];
            khodamName.innerText = `🔮 Khodam Anda: ${randomKhodam.name}`;
            khodamDesc.innerText = randomKhodam.description;

            // Efek animasi khodam
            khodamName.classList.add('show');
            khodamDesc.classList.add('show');
        } else {
            khodamName.innerText = "😕 Wajah tidak terdeteksi!";
            khodamDesc.innerText = "Pastikan wajah Anda terlihat jelas di kamera.";
            khodamName.classList.add('show');
            khodamDesc.classList.add('show');
        }
    }, 2500);
});

