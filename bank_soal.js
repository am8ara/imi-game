// File: bank_soal.js
// Pusat semua data pertanyaan untuk semua game.

// 1. Data untuk Kuis Trivia
const allTriviaQuestions = [
  { question: "Menurut UU No. 6 Tahun 2011, apa yang dimaksud dengan Keimigrasian?", answers: [{ text: "Lalu lintas orang yang masuk atau keluar Wilayah Indonesia serta pengawasannya.", correct: true },{ text: "Pengaturan tentang kependudukan dan catatan sipil.", correct: false },{ text: "Hanya proses pembuatan paspor dan visa.", correct: false },{ text: "Pengawasan Warga Negara Indonesia di luar negeri.", correct: false }] },
  { question: "Dokumen perjalanan yang dikeluarkan oleh Pemerintah RI untuk WNI disebut...", answers: [{ text: "Visa", correct: false },{ text: "Izin Tinggal", correct: false },{ text: "Paspor", correct: true },{ text: "Kartu Tanda Penduduk", correct: false }] },
  { question: "Pejabat yang menjalankan tugas Keimigrasian berdasarkan UU disebut...", answers: [{ text: "Polisi", correct: false },{ text: "Pejabat Imigrasi", correct: true },{ text: "Duta Besar", correct: false },{ text: "Hakim", correct: false }] },
  { question: "Apa yang dimaksud dengan 'Deportasi'?", answers: [{ text: "Tindakan paksa mengeluarkan Orang Asing dari Wilayah Indonesia.", correct: true },{ text: "Tindakan menolak masuknya Orang Asing di perbatasan.", correct: false },{ text: "Proses pemindahan narapidana asing ke negaranya.", correct: false },{ text: "Pencabutan paspor seorang WNI.", correct: false }] },
  { question: "Berikut ini adalah bentuk Tindakan Administratif Keimigrasian, KECUALI...", answers: [{ text: "Pidana penjara.", correct: true },{ text: "Deportasi.", correct: false },{ text: "Penangkalan.", correct: false },{ text: "Pembatalan Izin Tinggal.", correct: false }] }
  { question: "Siapakah yang dimaksud dengan 'Orang Asing' dalam UU Keimigrasian?", answers: [{ text: "Orang yang bukan Warga Negara Indonesia.", correct: true }, { text: "Orang yang lahir di luar negeri dari orang tua WNI.", correct: false }, { text: "WNI yang memiliki paspor negara lain.", correct: false }, { text: "Setiap orang yang datang sebagai turis.", correct: false }] },
  { question: "Apa yang dimaksud dengan 'Visa Republik Indonesia'?", answers: [{ text: "Persetujuan tertulis sebagai dasar pemberian Izin Tinggal.", correct: true }, { text: "Kartu identitas bagi Orang Asing di Indonesia.", correct: false }, { text: "Surat izin untuk bekerja di Indonesia.", correct: false }, { text: "Dokumen yang menggantikan paspor.", correct: false }] },
  { question: "Apa fungsi utama dari Izin Tinggal?", answers: [{ text: "Memberikan hak kepada Orang Asing untuk berada di Wilayah Indonesia.", correct: true }, { text: "Memberikan hak suara dalam pemilihan umum.", correct: false }, { text: "Memberikan status kewarganegaraan sementara.", correct: false }, { text: "Memberikan izin untuk membawa barang tanpa bea cukai.", correct: false }] },
    
    ];

// 2. Data untuk Game Benar atau Salah
const allStatements = [
    { statement: "Deportasi adalah tindakan paksa mengeluarkan Orang Asing dari Wilayah Indonesia.", answer: true },
    { statement: "Visa dan Izin Tinggal adalah dua dokumen yang sama persis fungsinya.", answer: false },
    { statement: "Setiap orang yang masuk atau keluar Wilayah Indonesia wajib memiliki Dokumen Perjalanan yang sah.", answer: true },
    { statement: "Orang Asing yang menikah dengan WNI secara otomatis menjadi Warga Negara Indonesia.", answer: false },
    { statement: "Rumah Detensi Imigrasi adalah tempat penampungan sementara bagi Orang Asing yang melanggar peraturan.", answer: true }
];

// 3. Data untuk Game Studi Kasus
const allCases = [
    { scenario: "Seorang WNA asal Inggris masuk ke Indonesia dengan Visa Kunjungan untuk berlibur. Namun, setelah sebulan ia ditemukan bekerja sebagai DJ di sebuah klub malam. Tindakan apa yang paling tepat?", answers: [ { text: "Diberi Izin Tinggal Terbatas agar bisa bekerja.", correct: false }, { text: "Menyalahgunakan izin tinggal, dikenai Deportasi dan Penangkalan.", correct: true }, { text: "Hanya diberi teguran lisan.", correct: false }, { text: "Diminta untuk mengurus visa kerja secepatnya.", correct: false } ] },
    { scenario: "Perusahaan PT. Maju Jaya menjadi Penjamin (sponsor) bagi seorang tenaga kerja asing. Setelah 6 bulan, TKA tersebut melarikan diri dan tidak diketahui keberadaannya. Siapa yang wajib melaporkan hal ini ke Kantor Imigrasi?", answers: [ { text: "Tenaga kerja asing itu sendiri.", correct: false }, { text: "Kedutaan besar negara asal TKA.", correct: false }, { text: "PT. Maju Jaya sebagai Penjamin.", correct: true }, { text: "Rekan kerja TKA tersebut.", correct: false } ] },
    { scenario: "Seorang turis dari Australia kehilangan paspornya saat berlibur di Lombok. Apa yang harus ia lakukan terlebih dahulu untuk bisa pulang ke negaranya?", answers: [ { text: "Mengajukan permohonan Paspor Indonesia.", correct: false }, { text: "Langsung membeli tiket pesawat pulang.", correct: false }, { text: "Melapor ke Kantor Imigrasi untuk dibuatkan SPLP.", correct: false }, { text: "Melapor ke Kedutaan/Konsulat negaranya untuk dokumen perjalanan darurat.", correct: true } ] },
    { scenario: "Seorang WNI bernama Budi diduga terlibat kasus korupsi besar. Pihak Kejaksaan Agung khawatir Budi akan melarikan diri ke luar negeri. Apa tindakan pencegahan yang dapat diajukan oleh Jaksa Agung kepada Imigrasi?", answers: [ { text: "Deportasi terhadap Budi.", correct: false }, { text: "Penangkalan agar Budi tidak bisa masuk Indonesia.", correct: false }, { text: "Pencegahan (Cekal) agar Budi tidak bisa keluar dari Indonesia.", correct: true }, { text: "Pencabutan Paspor Budi secara permanen.", correct: false } ] }
];

// 4. Data untuk Game Acak Kata
const wordScrambleData = {
    mudah: { words: [{ word: "VISA", clue: "Izin masuk negara lain" },{ word: "PASPOR", clue: "Dokumen perjalanan WNI" },{ word: "ASING", clue: "Bukan warga negara Indonesia" }] },
    sedang: { words: [{ word: "DEPORTASI", clue: "Pengusiran paksa Orang Asing" },{ word: "PENJAMIN", clue: "Pihak yang bertanggung jawab atas Orang Asing" },{ word: "DETENSI", clue: "Tempat penampungan sementara imigran" }] },
    sulit: { words: [{ word: "KEIMIGRASIAN", clue: "Hal ihwal lalu lintas orang antarnegara" },{ word: "NATURALISASI", clue: "Proses menjadi warga negara" },{ word: "YURISDIKSI", clue: "Wilayah kewenangan hukum" }] }
};

// 5. Data untuk Game Urutkan Proses
const allProcesses = [
    { title: "Urutkan Alur Permohonan Paspor Biasa secara Online", steps: [ "Unduh aplikasi M-Paspor dan buat akun.", "Pilih kantor imigrasi dan jadwal kedatangan.", "Lakukan pembayaran biaya permohonan.", "Datang ke kantor imigrasi sesuai jadwal untuk foto & wawancara.", "Tunggu proses selesai dan ambil paspor yang sudah jadi." ] },
    { title: "Urutkan Tahapan Pemeriksaan Imigrasi di Pintu Keberangkatan Internasional", steps: [ "Check-in di konter maskapai dan dapatkan boarding pass.", "Menuju konter pemeriksaan Imigrasi.", "Serahkan Paspor dan boarding pass kepada Petugas Imigrasi.", "Dapatkan Tanda Keluar (stempel) pada Paspor.", "Lanjutkan ke ruang tunggu keberangkatan (boarding lounge)." ] }

];
