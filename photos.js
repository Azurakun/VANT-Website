// photos.js — VANT Photography: events, photos and page copy.
//
// Photos are web copies (longest side 2000px, plus a 720px-wide thumb for the wall) of
// originals in the photographer's Google Drive. Event dates and places follow the Drive
// folder names; camera details are read from each original's EXIF.
// To add a photo: put both files in img/photography/ and add an entry below.
// Optional per-photo fields: title { en, id }, caption { en, id }, place, date.

const ME = { name: 'Achmad Arditio Sumartono', url: 'https://www.instagram.com/achmad_arditio/' };

export const events = [
    { id: 'mitakobi', name: 'MITAKOBI', place: 'SMANTULIS', date: '2026-10-04', tint: '#FF5A36' },
    { id: 'tabehoudai', name: 'Tabehoudai', place: 'Gabuswetan', date: '2026-09-13', tint: '#4FB89A' },
    { id: 'other', name: {'en':'Other','id':'Lainnya'}, place: 'Alun-Alun', date: '2026-09-11', tint: '#F3EEE6' },
    { id: 'icofest', name: 'ICOFEST vol. 3', place: '', date: '2026-07-26', tint: '#FF5A36' },
    { id: 'cofcos', name: 'CofCos II Party', place: 'B&M Cafe & Resto', date: '2026-06-14', tint: '#4FB89A' },
    { id: 'wibufest', name: 'Nusantara Wibufest', place: 'Mall Indramayu', date: '2026-05-24', tint: '#F3EEE6' },
    { id: 'matsuri', name: 'Dermayu JapanMatsuri Vol II', place: 'Kidspark', date: '2026-04-05', tint: '#FF5A36' }
];

export const photos = [
    { src: 'img/photography/mitakobi-01.jpg', thumb: 'img/photography/mitakobi-01-sm.jpg', ratio: '3:2', event: 'mitakobi', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S55-250mm f/4-5.6 IS II', focal: '55mm', aperture: 'f/4.5', shutter: '1/80', iso: '640' } },
    { src: 'img/photography/mitakobi-02.jpg', thumb: 'img/photography/mitakobi-02-sm.jpg', ratio: '2:3', event: 'mitakobi', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '48mm', aperture: 'f/7.1', shutter: '1/200', iso: '800' } },
    { src: 'img/photography/mitakobi-03.jpg', thumb: 'img/photography/mitakobi-03-sm.jpg', ratio: '3:2', event: 'mitakobi', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '40mm', aperture: 'f/9', shutter: '1/200', iso: '800' } },
    { src: 'img/photography/mitakobi-04.jpg', thumb: 'img/photography/mitakobi-04-sm.jpg', ratio: '3:2', event: 'mitakobi', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '50mm', aperture: 'f/7.1', shutter: '1/100', iso: '100' } },
    { src: 'img/photography/mitakobi-05.jpg', thumb: 'img/photography/mitakobi-05-sm.jpg', ratio: '2:3', event: 'mitakobi', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '18mm', aperture: 'f/4', shutter: '1/50', iso: '100' } },
    { src: 'img/photography/mitakobi-06.jpg', thumb: 'img/photography/mitakobi-06-sm.jpg', ratio: '2:3', event: 'mitakobi', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '18mm', aperture: 'f/4.5', shutter: '1/50', iso: '100' } },
    { src: 'img/photography/tabehoudai-01.jpg', thumb: 'img/photography/tabehoudai-01-sm.jpg', ratio: '2:3', event: 'tabehoudai', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S55-250mm f/4-5.6 IS II', focal: '79mm', aperture: 'f/5.6', shutter: '1/1000', iso: '800' } },
    { src: 'img/photography/tabehoudai-02.jpg', thumb: 'img/photography/tabehoudai-02-sm.jpg', ratio: '2:3', event: 'tabehoudai', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S55-250mm f/4-5.6 IS II', focal: '70mm', aperture: 'f/5.6', shutter: '1/1000', iso: '800' } },
    { src: 'img/photography/tabehoudai-03.jpg', thumb: 'img/photography/tabehoudai-03-sm.jpg', ratio: '2:3', event: 'tabehoudai', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S55-250mm f/4-5.6 IS II', focal: '131mm', aperture: 'f/5.6', shutter: '1/500', iso: '800' } },
    { src: 'img/photography/tabehoudai-04.jpg', thumb: 'img/photography/tabehoudai-04-sm.jpg', ratio: '2:3', event: 'tabehoudai', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S55-250mm f/4-5.6 IS II', focal: '60mm', aperture: 'f/5.6', shutter: '1/320', iso: '800' } },
    { src: 'img/photography/tabehoudai-05.jpg', thumb: 'img/photography/tabehoudai-05-sm.jpg', ratio: '2:3', event: 'tabehoudai', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S55-250mm f/4-5.6 IS II', focal: '100mm', aperture: 'f/5.6', shutter: '1/160', iso: '400' } },
    { src: 'img/photography/tabehoudai-06.jpg', thumb: 'img/photography/tabehoudai-06-sm.jpg', ratio: '2:3', event: 'tabehoudai', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S55-250mm f/4-5.6 IS II', focal: '55mm', aperture: 'f/5.6', shutter: '1/160', iso: '400' } },
    { src: 'img/photography/tabehoudai-07.jpg', thumb: 'img/photography/tabehoudai-07-sm.jpg', ratio: '2:3', event: 'tabehoudai', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S55-250mm f/4-5.6 IS II', focal: '163mm', aperture: 'f/5.6', shutter: '1/80', iso: '400' } },
    { src: 'img/photography/other-01.jpg', thumb: 'img/photography/other-01-sm.jpg', ratio: '2:3', event: 'other', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S55-250mm f/4-5.6 IS II', focal: '131mm', aperture: 'f/5', shutter: '1/30', iso: '6400' } },
    { src: 'img/photography/other-02.jpg', thumb: 'img/photography/other-02-sm.jpg', ratio: '2:3', event: 'other', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S55-250mm f/4-5.6 IS II', focal: '90mm', aperture: 'f/5.6', shutter: '1/100', iso: '6400' } },
    { src: 'img/photography/other-03.jpg', thumb: 'img/photography/other-03-sm.jpg', ratio: '2:3', event: 'other', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S55-250mm f/4-5.6 IS II', focal: '116mm', aperture: 'f/5.6', shutter: '1/80', iso: '6400' } },
    { src: 'img/photography/other-04.jpg', thumb: 'img/photography/other-04-sm.jpg', ratio: '2:3', event: 'other', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S55-250mm f/4-5.6 IS II', focal: '154mm', aperture: 'f/5.6', shutter: '1/80', iso: '6400' } },
    { src: 'img/photography/other-05.jpg', thumb: 'img/photography/other-05-sm.jpg', ratio: '2:3', event: 'other', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S55-250mm f/4-5.6 IS II', focal: '100mm', aperture: 'f/5.6', shutter: '1/40', iso: '6400' } },
    { src: 'img/photography/other-06.jpg', thumb: 'img/photography/other-06-sm.jpg', ratio: '2:3', event: 'other', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S55-250mm f/4-5.6 IS II', focal: '96mm', aperture: 'f/5.6', shutter: '1/40', iso: '6400' } },
    { src: 'img/photography/other-07.jpg', thumb: 'img/photography/other-07-sm.jpg', ratio: '2:3', event: 'other', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S55-250mm f/4-5.6 IS II', focal: '90mm', aperture: 'f/5.6', shutter: '1/40', iso: '6400' } },
    { src: 'img/photography/icofest-01.jpg', thumb: 'img/photography/icofest-01-sm.jpg', ratio: '2:3', event: 'icofest', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '55mm', aperture: 'f/5.6', shutter: '1/30', iso: '400' } },
    { src: 'img/photography/icofest-02.jpg', thumb: 'img/photography/icofest-02-sm.jpg', ratio: '2:3', event: 'icofest', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '55mm', aperture: 'f/5.6', shutter: '1/25', iso: '400' } },
    { src: 'img/photography/icofest-03.jpg', thumb: 'img/photography/icofest-03-sm.jpg', ratio: '2:3', event: 'icofest', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '55mm', aperture: 'f/5.6', shutter: '1/20', iso: '400' } },
    { src: 'img/photography/icofest-04.jpg', thumb: 'img/photography/icofest-04-sm.jpg', ratio: '2:3', event: 'icofest', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '55mm', aperture: 'f/5.6', shutter: '1/25', iso: '400' } },
    { src: 'img/photography/icofest-05.jpg', thumb: 'img/photography/icofest-05-sm.jpg', ratio: '2:3', event: 'icofest', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '49mm', aperture: 'f/5.6', shutter: '1/25', iso: '400' } },
    { src: 'img/photography/icofest-06.jpg', thumb: 'img/photography/icofest-06-sm.jpg', ratio: '2:3', event: 'icofest', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '36mm', aperture: 'f/4.5', shutter: '1/25', iso: '400' } },
    { src: 'img/photography/icofest-07.jpg', thumb: 'img/photography/icofest-07-sm.jpg', ratio: '2:3', event: 'icofest', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '55mm', aperture: 'f/5.6', shutter: '1/25', iso: '400' } },
    { src: 'img/photography/cofcos-01.jpg', thumb: 'img/photography/cofcos-01-sm.jpg', ratio: '2:3', event: 'cofcos', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '25mm', aperture: 'f/14', shutter: '1/50', iso: '100' } },
    { src: 'img/photography/cofcos-02.jpg', thumb: 'img/photography/cofcos-02-sm.jpg', ratio: '2:3', event: 'cofcos', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '24mm', aperture: 'f/7.1', shutter: '1/100', iso: '100' } },
    { src: 'img/photography/cofcos-03.jpg', thumb: 'img/photography/cofcos-03-sm.jpg', ratio: '2:3', event: 'cofcos', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '35mm', aperture: 'f/14', shutter: '1/40', iso: '100' } },
    { src: 'img/photography/cofcos-04.jpg', thumb: 'img/photography/cofcos-04-sm.jpg', ratio: '2:3', event: 'cofcos', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '35mm', aperture: 'f/14', shutter: '1/100', iso: '200' } },
    { src: 'img/photography/cofcos-05.jpg', thumb: 'img/photography/cofcos-05-sm.jpg', ratio: '3:2', event: 'cofcos', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '18mm', aperture: 'f/14', shutter: '1/80', iso: '400' } },
    { src: 'img/photography/cofcos-06.jpg', thumb: 'img/photography/cofcos-06-sm.jpg', ratio: '2:3', event: 'cofcos', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '47mm', aperture: 'f/5.6', shutter: '1/60', iso: '200' } },
    { src: 'img/photography/cofcos-07.jpg', thumb: 'img/photography/cofcos-07-sm.jpg', ratio: '2:3', event: 'cofcos', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '40mm', aperture: 'f/5', shutter: '1/60', iso: '640' } },
    { src: 'img/photography/wibufest-01.jpg', thumb: 'img/photography/wibufest-01-sm.jpg', ratio: '2:3', event: 'wibufest', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '30mm', aperture: 'f/5', shutter: '1/40', iso: '1000' } },
    { src: 'img/photography/wibufest-02.jpg', thumb: 'img/photography/wibufest-02-sm.jpg', ratio: '2:3', event: 'wibufest', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '39mm', aperture: 'f/5', shutter: '1/50', iso: '640' } },
    { src: 'img/photography/wibufest-03.jpg', thumb: 'img/photography/wibufest-03-sm.jpg', ratio: '2:3', event: 'wibufest', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '29mm', aperture: 'f/4.5', shutter: '1/40', iso: '1250' } },
    { src: 'img/photography/wibufest-04.jpg', thumb: 'img/photography/wibufest-04-sm.jpg', ratio: '2:3', event: 'wibufest', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '53mm', aperture: 'f/5.6', shutter: '1/80', iso: '800' } },
    { src: 'img/photography/wibufest-05.jpg', thumb: 'img/photography/wibufest-05-sm.jpg', ratio: '2:3', event: 'wibufest', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '36mm', aperture: 'f/4.5', shutter: '1/50', iso: '1250' } },
    { src: 'img/photography/wibufest-06.jpg', thumb: 'img/photography/wibufest-06-sm.jpg', ratio: '2:3', event: 'wibufest', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '34mm', aperture: 'f/5', shutter: '1/50', iso: '640' } },
    { src: 'img/photography/wibufest-07.jpg', thumb: 'img/photography/wibufest-07-sm.jpg', ratio: '2:3', event: 'wibufest', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '34mm', aperture: 'f/4.5', shutter: '1/50', iso: '800' } },
    { src: 'img/photography/matsuri-01.jpg', thumb: 'img/photography/matsuri-01-sm.jpg', ratio: '2:3', event: 'matsuri', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '18mm', aperture: 'f/7.1', shutter: '1/160', iso: '100' } },
    { src: 'img/photography/matsuri-02.jpg', thumb: 'img/photography/matsuri-02-sm.jpg', ratio: '2:3', event: 'matsuri', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '21mm', aperture: 'f/5.6', shutter: '1/100', iso: '100' } },
    { src: 'img/photography/matsuri-03.jpg', thumb: 'img/photography/matsuri-03-sm.jpg', ratio: '2:3', event: 'matsuri', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '27mm', aperture: 'f/5.6', shutter: '1/100', iso: '100' } },
    { src: 'img/photography/matsuri-04.jpg', thumb: 'img/photography/matsuri-04-sm.jpg', ratio: '2:3', event: 'matsuri', by: ME, camera: { body: 'Canon EOS 650D', lens: 'EF-S18-55mm f/3.5-5.6 IS II', focal: '27mm', aperture: 'f/5.6', shutter: '1/100', iso: '100' } }
];

export const copy = {
    en: {
        'meta-title': 'VANT Photography',
        'skip': 'Skip to photos',
        'back': 'Back to VANT',
        'jp': '写真 · シャシン',
        'title': 'VANT Photography',
        'lead': 'Photographed by Achmad Arditio Sumartono at cosplay events, conventions and evening shoots.',
        'stats': '{photos} photos · {events} events',
        'preview': 'Layout preview. These frames are placeholders until the real photos are added.',
        'all': 'All',
        'placeholder': 'Placeholder',
        'photo-title': 'Photo title',
        'photographer': 'Photographer',
        'by': 'Photo by',
        'event': 'Event',
        'place': 'Place',
        'date': 'Date',
        'camera': 'Camera',
        'lens': 'Lens',
        'settings': 'Settings',
        'caption-ph': 'A short caption about the moment goes here.',
        'close': 'Close',
        'prev': 'Previous photo',
        'next': 'Next photo',
        'open': 'Open photo',
        'join': 'Shoot with us? Photos by VANT members are welcome.',
        'join-cta': 'Get in touch',
        'footer': '© 2026 VANT Project. Photos belong to their photographers.'
    },
    id: {
        'meta-title': 'Fotografi VANT',
        'skip': 'Langsung ke foto',
        'back': 'Kembali ke VANT',
        'jp': '写真 · シャシン',
        'title': 'Fotografi VANT',
        'lead': 'Dipotret oleh Achmad Arditio Sumartono di acara cosplay, konvensi, dan sesi foto malam hari.',
        'stats': '{photos} foto · {events} acara',
        'preview': 'Pratinjau tata letak. Bingkai ini hanya placeholder sampai foto aslinya ditambahkan.',
        'all': 'Semua',
        'placeholder': 'Placeholder',
        'photo-title': 'Judul foto',
        'photographer': 'Fotografer',
        'by': 'Foto oleh',
        'event': 'Acara',
        'place': 'Tempat',
        'date': 'Tanggal',
        'camera': 'Kamera',
        'lens': 'Lensa',
        'settings': 'Pengaturan',
        'caption-ph': 'Keterangan singkat tentang momen ini ditulis di sini.',
        'close': 'Tutup',
        'prev': 'Foto sebelumnya',
        'next': 'Foto berikutnya',
        'open': 'Buka foto',
        'join': 'Mau memotret bersama kami? Foto dari anggota VANT dipersilakan.',
        'join-cta': 'Hubungi kami',
        'footer': '© 2026 Proyek VANT. Foto milik fotografernya masing-masing.'
    }
};
