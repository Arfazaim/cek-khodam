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
let scanInterval;

startButton.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        video.srcObject = stream;
        scanButton.classList.add('hidden');
        
        // Mulai interval pemindaian otomatis
        scanInterval = setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
            if (detections.length > 0) {
                clearInterval(scanInterval); // hentikan deteksi terus-menerus
                showScanEffect();
                tampilkanHasilKhodam();
            }
        }, 1000); // Deteksi setiap 1 detik
    } catch (err) {
        alert("Tidak dapat mengakses kamera. Gunakan browser HTTPS dan izinkan kamera.");
    }
});

function tampilkanHasilKhodam() {
    const random = Math.floor(Math.random() * khodamDatabase.length);
    const result = khodamDatabase[random];
    khodamName.innerText = `Khodam Anda: ${result.name}`;
    khodamDesc.innerText = result.description;
    khodamName.classList.add("show");
    khodamDesc.classList.add("show");
}
function showScanEffect() {
    loader.classList.add('active');
    setTimeout(() => {
        loader.classList.remove('active');
    }, 2000); // Tampilkan efek selama 2 detik
}

