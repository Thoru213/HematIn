# 💰 Hematin

**Hematin** adalah aplikasi manajemen keuangan pribadi berbasis web yang dirancang untuk membantu pengguna mengelola kondisi keuangan secara lebih efektif. Aplikasi ini menyediakan fitur pencatatan pemasukan dan pengeluaran, pengelolaan wallet, pengaturan budget, analitik keuangan interaktif, serta unggah struk transaksi untuk mendukung otomatisasi pencatatan keuangan. Dengan antarmuka yang modern dan mudah digunakan, Hematin membantu pengguna memantau arus kas, mengontrol pengeluaran, dan mengambil keputusan finansial yang lebih baik.

---

# 🌐 [Demo Website](https://hematin.web.id)

---

## 📷 Demo Tampilan

### 🖥️ Halaman Beranda

![Halaman Beranda](https://github.com/Thoru213/HematIn/blob/main/Assets/beranda.jpeg)

### 📝 Halaman Transaksi

![Halaman Transaksi](https://github.com/Thoru213/HematIn/blob/main/Assets/transaksi.jpeg)

### 🧾Unggah Struk

![Upload Struk](https://github.com/Thoru213/HematIn/blob/main/Assets/struk.jpeg)

---

## 💡 Fitur Utama

- 💰 Manajemen Multi Wallet
- 📊 Dasbor & Analitik Keuangan
- 📈 Pelacakan Anggaran/Budget
- 📝 Manajemen Transaksi
- 🧾 Unggah Struk
- 🌙 Mode Gelap
- 🔐 Autentikasi JWT

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi               |
| -------- | ----------------------- |
| Frontend | React.js, Bootstrap.css |
| Backend  | Express.js              |
| Database | PostgreSQL Supabase     |
| Auth     | JWT                     |
| Storage  | Supabase Storage        |
| OCR      | Tesseract.js            |
| Chart    | Recharts                |

## Cara Menjalankan Proyek

### 1. Clone Repositori

```bash
git clone https://github.com/Thoru213/HematIn.git
cd HematIn
```

### 2. Environtment Setup

Buat file `.env` pada folder backend dan file `.env` pada folder frontend dengan ketentuan sesuai `.env.example`

### 3. Instalasi dan Jalankan

#### Frontend:

```bash
cd FE
npm install
npm run dev
```

#### Backend:

```bash
cd BE
npm install
node server.js
```

# 🤖 Machine Learning Model

Saat ini Hematin belum menggunakan model Machine Learning.

Fitur unggah struk masih berfungsi sebagai media dipersiapkan untuk integrasi OCR
