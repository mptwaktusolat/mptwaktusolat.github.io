export type HomeLocale = "en" | "ms";

export const homePaths: Record<HomeLocale, string> = { en: "/", ms: "/ms/" };

export const homeCopy = {
  en: {
    title: "App Waktu Solat Malaysia | Malaysia Prayer Time App",
    description: "An essential app for Muslims in Malaysia. Find the latest prayer times, the qibla direction, and more.",
    heading: "Malaysia Prayer Time",
    intro: "An essential app for Muslims in Malaysia. Find the latest prayer times, the qibla direction, and more.",
    homeLabel: "Waktu Solat home",
    languageLabel: "Homepage language",
    whatsNew: "What's New",
    latestVersion: "Latest Version",
    downloadLabel: "Get Waktu Solat on Google Play",
    downloadAlt: "Get it on Google Play",
    iosNotice: "*Sorry, this app is not available for iOS yet.",
    screenshotAlt: "Waktu Solat app showing prayer times",
    featuresLabel: "Everything you need",
    featuresHeading: "\"Hurry to prayer. Hurry to success.\"",
    featuresIntro: "Packed with features, with a clean and minimal design.",
    features: [
      { heading: "Sleek design.", text: "Designed from the ground up to be simple and pleasing to the eye." },
      { heading: "Reliable.", text: "Data comes from the official local authority." },
      { heading: "Open source.", text: "Found a bug or want to contribute to the project? Visit our GitHub!" },
      { heading: "Continuous support.", text: "We are always working on improving the app and adding new features." },
    ],
    reviewsLabel: "Reviews",
    reviewsHeading: "What users are saying about the app",
    reviewsNotice: "*Reviews are from the Google Play Store.",
    starsLabel: "5 out of 5 stars",
    recentPosts: "Recent blog posts",
    socialLabel: "Social links",
    copyright: "All rights reserved.",
  },
  ms: {
    title: "Aplikasi Waktu Solat Malaysia | Waktu Solat & Arah Kiblat",
    description: "Aplikasi yang berguna untuk umat Islam di Malaysia. Semak waktu solat terkini, cari arah kiblat dan banyak lagi.",
    heading: "Waktu Solat Malaysia",
    intro: "Aplikasi yang berguna untuk umat Islam di Malaysia. Semak waktu solat terkini, cari arah kiblat dan banyak lagi.",
    homeLabel: "Laman utama Waktu Solat",
    languageLabel: "Bahasa laman utama",
    whatsNew: "Perubahan Baharu",
    latestVersion: "Versi Terkini",
    downloadLabel: "Muat turun Waktu Solat di Google Play",
    downloadAlt: "Dapatkan di Google Play",
    iosNotice: "*Maaf, aplikasi ini belum tersedia untuk iOS.",
    screenshotAlt: "Aplikasi Waktu Solat memaparkan waktu solat",
    featuresLabel: "Segala yang anda perlukan",
    featuresHeading: "\"Marilah menunaikan solat. Marilah menuju kejayaan.\"",
    featuresIntro: "Pelbagai ciri dengan reka bentuk yang moden dan ringkas.",
    features: [
      { heading: "Reka bentuk moden.", text: "Direka dari awal agar ringkas dan menyenangkan mata." },
      { heading: "Boleh dipercayai.", text: "Data diperoleh daripada pihak berkuasa tempatan yang rasmi." },
      { heading: "Projek sumber terbuka.", text: "Menemui masalah atau ingin menyumbang kepada projek? Layari GitHub kami!" },
      { heading: "Sokongan berterusan.", text: "Kami sentiasa berusaha menambah baik aplikasi dan memperkenalkan ciri baharu." },
    ],
    reviewsLabel: "Ulasan",
    reviewsHeading: "Apa kata pengguna tentang aplikasi ini",
    reviewsNotice: "*Ulasan diambil daripada Google Play Store.",
    starsLabel: "5 daripada 5 bintang",
    recentPosts: "Catatan blog terkini",
    socialLabel: "Pautan media sosial",
    copyright: "Hak cipta terpelihara.",
  },
} satisfies Record<HomeLocale, HomeCopy>;

// Both languages must provide the same content fields.
interface HomeCopy {
  title: string; description: string; heading: string; intro: string;
  homeLabel: string; languageLabel: string; whatsNew: string; latestVersion: string;
  downloadLabel: string; downloadAlt: string; iosNotice: string; screenshotAlt: string;
  featuresLabel: string; featuresHeading: string; featuresIntro: string;
  features: { heading: string; text: string }[];
  reviewsLabel: string; reviewsHeading: string; reviewsNotice: string; starsLabel: string;
  recentPosts: string; socialLabel: string; copyright: string;
};
