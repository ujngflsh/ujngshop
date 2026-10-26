import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';

const faqs = [
  ['Berapa lama pengiriman?', 'Pesanan dikirim 1–2 hari kerja setelah pembayaran. Estimasi tiba 2–5 hari tergantung lokasi.'],
  ['Metode pembayaran apa saja?', 'Transfer bank, e-wallet, kartu kredit, dan COD.'],
  ['Bagaimana kebijakan retur?', 'Retur maksimal 7 hari setelah barang diterima selama label masih utuh.'],
  ['Bagaimana memilih ukuran?', 'Tersedia ukuran S–XL. Jika ragu, pilih ukuran M untuk potongan longgar yang nyaman.'],
];

const About: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <SectionHeader title="Tentang UjngShop" subtitle="Indonesian Modest Fashion" />
    <p className="text-cokelat leading-relaxed mb-10">UjngShop menghadirkan busana muslim modern yang nyaman dipakai dengan sentuhan budaya Indonesia. Kami percaya tampil sopan tidak berarti membosankan — setiap koleksi dirancang agar kamu percaya diri di setiap momen.</p>
    <h2 className="font-serif text-2xl text-maroon-dark mb-4">Pertanyaan Umum</h2>
    <div className="space-y-3 mb-10">
      {faqs.map(([q, a]) => (
        <details key={q} className="bg-white border border-blush rounded-2xl px-5 py-4 group">
          <summary className="cursor-pointer text-sm font-medium text-maroon-dark list-none flex justify-between">{q}<span className="group-open:rotate-45 transition-transform text-rose">+</span></summary>
          <p className="text-sm text-cokelat/80 mt-3">{a}</p>
        </details>
      ))}
    </div>
    <Link to="/contact"><Button>Hubungi Kami</Button></Link>
  </div>
);

export default About;
