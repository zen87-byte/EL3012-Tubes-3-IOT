User interface:
![IMG-20250116-WA0000](https://github.com/user-attachments/assets/d4ea465d-95aa-4506-84d7-8eb77525c3b5)
Realtime database:
![SmartSelect_20250117_104028_Chrome](https://github.com/user-attachments/assets/77726e90-4d58-401a-8571-463ac84b8abc)

## Kontributor
1. Riswandha mashuri (13222002)
2. Alghoza Hamdani (13222008)
   
## Deskripsi Proyek
Proyek ini merupakan tugas besar 3 mata kuliah EL3012 - Sistem Mikroprosesor. Proyek ini merupakan aplikasi IOT (Internet of Things) yang bertujuan untuk melakukan komunikasi dengan ESP32 melalui website. Data dari sensor ESP32 disimpan dan diperbarui secara realtime menggunakan firebase database. Kode ESP32 yang digunakan dapat dilihat pada link berikut: [EL3012-Tubes-3-ESP32](https://github.com/zen87-byte/EL3012-Tubes-3-ESP32) 

## Teknologi yang digunakan
1. Next JS: Framework untuk pengembangan aplikasi website
2. Firebase by Google: Backend-as-a-Service (SaaS) untuk komunikasi secara realtime
3. Tailwind CSS: Styling yang cepat dan responsif

## Cara Menjalankan Proyek
1. Clone repository
   Clone proyek ini ke komputer `https://github.com/zen87-byte/EL3012-Tubes-3-IOT.git` atau download repository ini
2. Install dependencies
   Pastikan sudah menginstall package manager. Masuk ke folder proyek ini dan buka terminal untuk install dependencies yang diperlukan menggunakan `npm install`.
3. Setup Firebase Configuration
   Tambahkan file `.env.local` dan buat variable di dalam file tersebut sesuai template berikut.
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
   NEXT_PUBLIC-FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=
   ```
   Isi variable tersebut sesuai konfigurasi pada firebase
4. Jalankan aplikasi
   Gunakan perintah berikut untuk menjalankan website secara lokal.
   ```npm run dev```
