// Array latar belakang gambar
const backgroundImages = [
  'imageBG/background.png',   // Gambar latar belakang pertama (default)
  'imageBG/background1.png',  // Gambar latar belakang kedua
  'imageBG/background2.png',   // Gambar latar belakang ketiga
  'imageBG/background3.png', // Gambar latar belakang keempat
  'imageBG/background4.png', // Gambar latar belakang kelima
  'imageBG/background5.png', // Gambar latar belakang keenam
  'imageBG/background6.png', // Gambar latar belakang ketujuh
  'imageBG/background7.png', // Gambar latar belakang kedelapan 
  'imageBG/background8.png', // Gambar latar belakang kesembilan
  'imageBG/background9.png', // Gambar latar belakang kesepuluh
  'imageBG/background10.png' // Gambar latar belakang kesebelas
];

// Array file audio latar belakang yang sesuai
const backgroundAudioFiles = [
  'audioBG/audio.mp3', // Audio yang sesuai dengan latar belakang pertama
  'audioBG/audio1.mp3', // Audio yang sesuai dengan latar belakang kedua
  'audioBG/audio2.mp3',  // Audio yang sesuai dengan latar belakang ketiga
  'audioBG/audio3.mp3',  // Audio yang sesuai dengan latar belakang keempat
  'audioBG/audio4.mp3',  // Audio yang sesuai dengan latar belakang kelima
  'audioBG/audio5.mp3',  // Audio yang sesuai dengan latar belakang keenam
  'audioBG/audio6.mp3',  // Audio yang sesuai dengan latar belakang ketujuh
  'audioBG/audio7.mp3',  // Audio yang sesuai dengan latar belakang kedelapan
  'audioBG/audio8.mp3',  // Audio yang sesuai dengan latar belakang kesembilan
  'audioBG/audio9.mp3', // Audio yang sesuai dengan latar belakang kesepuluh
  'audioBG/audio10.mp3' // Audio yang sesuai dengan latar belakang kesebelas
];

// Variabel untuk melacak indeks gambar saat ini
let currentBackgroundIndex = 0;

// Variabel untuk melacak tema gelap atau terang
let isDarkTheme = false;

// Definisikan elemen body
const bodyElement = document.body;

// Fungsi untuk mengubah latar belakang gambar berikutnya
const changeNextBackgroundImage = () => {
  currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
  const newBackgroundImage = `url('${backgroundImages[currentBackgroundIndex]}')`;
  const newAudioSource = backgroundAudioFiles[currentBackgroundIndex];

  // Hapus kelas animasi sebelum mengganti latar belakang
  bodyElement.classList.remove('animate__rollIn');

  document.body.style.backgroundImage = newBackgroundImage;
  const audio = document.getElementById('backgroundAudio');
  audio.src = newAudioSource;
  audio.play();
  audio.volume = 1;

  // Tambahkan kelas animasi animate__rollIn
  bodyElement.classList.add('animate__rollIn');

  // Simpan indeks gambar saat ini di localStorage
  localStorage.setItem('currentBackgroundIndex', currentBackgroundIndex.toString());
};

// Fungsi untuk mengubah latar belakang gambar sebelumnya
const changePreviousBackgroundImage = () => {
  currentBackgroundIndex = (currentBackgroundIndex - 1 + backgroundImages.length) % backgroundImages.length;
  const newBackgroundImage = `url('${backgroundImages[currentBackgroundIndex]}')`;
  const newAudioSource = backgroundAudioFiles[currentBackgroundIndex];

  // Hapus kelas animasi sebelum mengganti latar belakang
  bodyElement.classList.remove('animate__rollIn');

  document.body.style.backgroundImage = newBackgroundImage;
  const audio = document.getElementById('backgroundAudio');
  audio.src = newAudioSource;
  audio.play();
  audio.volume = 10;

  // Tambahkan kelas animasi animate__rollIn
  bodyElement.classList.add('animate__rollIn');

  // Simpan indeks gambar saat ini di localStorage
  localStorage.setItem('currentBackgroundIndex', currentBackgroundIndex.toString());
};

// Tampilkan SweetAlert konfirmasi ketika pengguna mengklik icon "cog"
document.getElementById('changeImageBg').addEventListener('click', () => {
  Swal.fire({
    title: 'Are you sure you want to change the background?',
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: 'Next',
    denyButtonText: 'Previous',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      // Pengguna memilih "Next," maka ubah latar belakang
      changeNextBackgroundImage();
      console.log('Berhasil! Sekarang halaman web menggunakan background baru!')
    } else if (result.isDenied) {
      // Pengguna memilih "Previous," maka ubah latar belakang
      changePreviousBackgroundImage();
      console.log('Berhasil! Sekarang halaman web menggunakan background sebelumnya!')
    }
    // Tidak ada tindakan jika pengguna memilih "Cancel" (SweetAlert akan ditutup secara otomatis)
  });
});

// Memeriksa localStorage saat halaman dimuat
window.addEventListener('load', () => {
  const audio = document.getElementById('backgroundAudio');
  const storedIndex = localStorage.getItem('currentBackgroundIndex');
  if (storedIndex !== null) {
    currentBackgroundIndex = parseInt(storedIndex);
    const newBackgroundImage = `url('${backgroundImages[currentBackgroundIndex]}')`;
    const newAudioSource = backgroundAudioFiles[currentBackgroundIndex];
    document.body.style.backgroundImage = newBackgroundImage;
    audio.src = newAudioSource;
  } else {
    // Jika tidak ada latar belakang yang tersimpan di localStorage, gunakan latar belakang default pertama
    const defaultBackgroundImage = `url('${backgroundImages[0]}')`;
    const defaultAudioSource = backgroundAudioFiles[0];
    document.body.style.backgroundImage = defaultBackgroundImage;
    audio.src = defaultAudioSource;
  }
  audio.play();
});

// Fungsi untuk menghentikan atau memutar audio latar belakang berdasarkan tema yang dipilih 

function toggleBackgroundAudio() { 
const audio = document.getElementById('backgroundAudio');
if (isDarkTheme) { 
// Jika tema gelap (bulat), hentikan audio 
audio.pause(); 
console.log('audio telah dimatikan!') 
} 
else { // Jika tema terang (matahari), putar audio
audio.play(); 
console.log('audio telah diputar!') 
}
 }

// Tambahkan event listener untuk perubahan tema 

document.getElementById('themeToggle').addEventListener("click", function() {
  isDarkTheme = !isDarkTheme; 
  toggleBackgroundAudio(); 

  const themeIcon = document.getElementById('themeIcon');
  if (isDarkTheme) {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  } else {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const socialDropdown = document.querySelector(".social-dropdown");

  socialDropdown.addEventListener("click", function () {
    this.classList.toggle("active");
  });

  // Close the dropdown if the user clicks outside of it
  window.addEventListener("click", function (event) {
    if (!event.target.matches(".social-dropdown")) {
      const dropdowns = document.getElementsByClassName("social-links");
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("active")) {
          openDropdown.classList.remove("active");
        }
      }
    }
  });
});
