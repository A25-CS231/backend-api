Berikut adalah draft `README.md` yang lengkap dan terstruktur sesuai standar industri untuk proyek **AI Learning Insight Backend** (Learning AI API). Dokumen ini mencakup deskripsi proyek, instalasi, konfigurasi, dokumentasi API, dan struktur kode berdasarkan file yang Anda unggah.

-----

# 🧠 AI Learning Insight - Backend API

   

Backend API untuk platform **Learning AI**. Layanan ini menyediakan fungsionalitas RESTful API untuk autentikasi pengguna, pelacakan perjalanan belajar (learning journey), pencatatan aktivitas, serta fitur analisis pelajar (*learner features*) berbasis Machine Learning untuk memprediksi tipe dan perilaku pengguna.

## 📋 Daftar Isi

  - [Fitur Utama](#-fitur-utama)
  - [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
  - [Struktur Proyek](#-struktur-proyek)
  - [Prasyarat](#-prasyarat)
  - [Instalasi dan Konfigurasi](#-instalasi-dan-konfigurasi)
  - [Variabel Lingkungan (.env)](#-variabel-lingkungan-env)
  - [Menjalankan Aplikasi](#️-menjalankan-aplikasi)
  - [Migrasi Database](#-migrasi-database)
  - [Pengujian (Testing)](#-pengujian-testing)
  - [Dokumentasi API](#-dokumentasi-api)

## 🚀 Fitur Utama

  * **Autentikasi & Otorisasi**: Login, Token Refresh (JWT), Logout, dan manajemen password menggunakan enkripsi Bcrypt.
  * **Manajemen User**: Verifikasi kredensial dan pengambilan profil pengguna.
  * **Journey Tracking**: Memantau progress perjalanan belajar developer/user.
  * **Activity Logging**: Mencatat dan mengambil aktivitas terakhir pengguna.
  * **Learner Insight (ML Features)**:
      * Analisis perilaku belajar (kecepatan, konsistensi, perfeksionisme).
      * Prediksi tipe pelajar (*fast*, *consistent*, *reflective*).
      * Manajemen narasi dan pengaturan fitur pelajar (Admin).
  * **Keamanan**: Implementasi middleware untuk validasi input, autentikasi token, dan otorisasi role admin.

## 🛠 Teknologi yang Digunakan

  * **Runtime**: [Node.js](https://nodejs.org/)
  * **Framework**: [Express.js](https://expressjs.com/)
  * **Database**: [PostgreSQL](https://www.postgresql.org/)
  * **ORM/Migration**: `node-pg-migrate` & `pg` driver
  * **Authentication**: `jsonwebtoken` (JWT) & `bcrypt`
  * **Validation**: `joi`
  * **Utilities**: `nanoid` (ID Generator), `dotenv`
  * **Linting**: ESLint (Google/Dicoding Style)
  * **Containerization**: Docker & Docker Compose

## 📂 Struktur Proyek

```bash
backend-api/
├── migrations/             # File migrasi database
├── src/
│   ├── controllers/        # Logika request/response (Handler)
│   ├── errors/             # Custom Error Classes (400, 401, 404, dll)
│   ├── middlewares/        # Auth, Error Handler, Validator
│   ├── repositories/       # Akses data langsung ke Database (Query)
│   ├── routes/             # Definisi endpoint API
│   ├── services/           # Logika bisnis utama
│   ├── utils/              # Token manager, DB connection, ID gen
│   ├── validators/         # Skema validasi request (Joi)
│   ├── app.js              # Setup Express App
│   └── server.js           # Entry point server
├── .gitignore
├── docker-compose.yml      # Konfigurasi Database PostgreSQL Docker
├── eslint.config.mjs       # Konfigurasi Linter
├── package.json            # Dependensi proyek
└── Backend API Test.postman_collection.json # Koleksi API Testing
```

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

  * [Node.js](https://nodejs.org/) (Versi LTS disarankan)
  * [npm](https://www.npmjs.com/)
  * [Docker Desktop](https://www.docker.com/products/docker-desktop) (Opsional, untuk menjalankan database dengan mudah)

## ⚡ Instalasi dan Konfigurasi

1.  **Clone repositori ini:**

    ```bash
    git clone https://github.com/A25-CS231/backend-api.git
    cd backend-api
    ```

2.  **Install dependensi:**

    ```bash
    npm install
    ```

3.  **Siapkan Database:**
    Anda dapat menggunakan Docker untuk menjalankan PostgreSQL dengan cepat menggunakan file `docker-compose.yml` yang disediakan.

    ```bash
    docker-compose up -d
    ```

    *Perintah ini akan menjalankan container PostgreSQL di port 5433 (sesuai konfigurasi).*

## 🔐 Variabel Lingkungan (.env)

Buat file `.env` di root direktori proyek dan sesuaikan dengan konfigurasi berikut:

```ini
# Server Configuration
HOST=localhost
PORT=5000
ALLOWED_ORIGIN=http://localhost:3000

# PostgreSQL Database Configuration
# Sesuaikan dengan config di docker-compose.yml jika menggunakan Docker
PGUSER=postgres
PGPASSWORD=ailearning!1
PGDATABASE=ailearningdb
PGHOST=localhost
PGPORT=5433

# JWT Configuration
# Gunakan string acak yang panjang dan aman
ACCESS_TOKEN_KEY=rahasia-access-token-super-aman
REFRESH_TOKEN_KEY=rahasia-refresh-token-super-aman
ACCESS_TOKEN_AGE=1800 # Dalam detik (contoh: 30 menit)
```

## 📦 Migrasi Database

Aplikasi ini menggunakan `node-pg-migrate` untuk manajemen skema database. Setelah database berjalan, jalankan perintah berikut untuk membuat tabel:

```bash
# Menjalankan migrasi (UP)
npm run migrate up
```

## ▶️ Menjalankan Aplikasi

**Mode Development (dengan nodemon):**

```bash
npm run start-dev
```

**Mode Production:**

```bash
npm start
```

Server akan berjalan di `http://localhost:5000` (atau sesuai PORT di .env).

## 🧪 Pengujian (Testing)

File koleksi Postman telah disertakan dalam proyek ini:
`Backend API Test.postman_collection.json`

**Cara Menggunakan:**

1.  Buka Postman.
2.  Klik **Import** dan pilih file `.json` tersebut.
3.  Pastikan environment variable di Postman (seperti `baseUrl` dan `accessToken`) dikonfigurasi dengan benar.
4.  Jalankan request pada folder **Authentication** terlebih dahulu untuk mendapatkan token.

## 📚 Dokumentasi API

Berikut adalah ringkasan endpoint utama yang tersedia:

### Authentication

| Method | Endpoint | Deskripsi | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/auths` | Login pengguna (mendapatkan Access & Refresh Token) | No |
| `PUT` | `/auths` | Refresh Access Token | No |
| `DELETE` | `/auths` | Logout (Menghapus Refresh Token) | No |
| `PATCH` | `/auths` | Mengganti Password | **Yes** (Admin) |
| `GET` | `/me` | Mendapatkan profil user yang sedang login | **Yes** |

### Activities & Journeys

| Method | Endpoint | Deskripsi | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/activities` | Mendapatkan aktivitas terbaru user | **Yes** |
| `GET` | `/journeys` | Mendapatkan daftar perjalanan belajar user | **Yes** |

### Learner Features (Insight)

| Method | Endpoint | Deskripsi | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/learner/features` | Mendapatkan data fitur & prediksi user saat ini | **Yes** |
| `GET` | `/learner/features/data` | Mendapatkan semua data fitur learner (Raw Data) | **Yes** (Admin) |
| `GET` | `/learner/features/settings` | Melihat pengaturan visibilitas fitur | **Yes** (Admin) |
| `PATCH` | `/learner/features/settings` | Mengubah pengaturan visibilitas fitur | **Yes** (Admin) |
| `GET` | `/learner/features/narratives` | CRUD Narasi tipe learner | **Yes** |

-----

**Catatan:**

  * **Auth**: Membutuhkan Header `Authorization: Bearer <access_token>`.
  * **Admin**: Membutuhkan user dengan `user_role: 1`.

## 📄 Lisensi

Proyek ini dilisensikan di bawah [ISC License](https://opensource.org/licenses/ISC).