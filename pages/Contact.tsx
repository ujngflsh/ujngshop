import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';

const Contact: React.FC = () => {
  const [f, setF] = useState({ name: '', email: '', message: '' });
  const [err, setErr] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = 'Nama wajib diisi';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = 'Email tidak valid';
    if (f.message.trim().length < 10) er.message = 'Pesan minimal 10 karakter';
    setErr(er);
    if (!Object.keys(er).length) { setSent(true); setF({ name: '', email: '', message: '' }); }
  };

  const input = 'w-full px-4 py-3 bg-white border border-blush rounded-xl text-sm focus:outline-none focus:border-rose';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-white rounded-3xl border border-blush p-6 md:p-10">
        <SectionHeader title="Hubungi Kami" subtitle="Ada pertanyaan? Kirim pesan dan kami akan membalas secepatnya." />
        {sent ? (
          <div className="text-center py-8">
            <CheckCircle2 size={48} className="mx-auto text-maroon mb-3" />
            <p className="font-serif text-xl text-maroon-dark mb-4">Pesan terkirim, terima kasih!</p>
            <Button variant="outline" onClick={() => setSent(false)}>Kirim pesan lain</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4" noValidate>
            <div><label className="text-sm font-medium text-maroon-dark">Nama</label><input className={input} value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />{err.name && <p className="text-xs text-maroon mt-1">{err.name}</p>}</div>
            <div><label className="text-sm font-medium text-maroon-dark">Email</label><input type="email" className={input} value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />{err.email && <p className="text-xs text-maroon mt-1">{err.email}</p>}</div>
            <div><label className="text-sm font-medium text-maroon-dark">Pesan</label><textarea rows={5} className={input} value={f.message} onChange={e => setF({ ...f, message: e.target.value })} />{err.message && <p className="text-xs text-maroon mt-1">{err.message}</p>}</div>
            <Button fullWidth size="lg" type="submit">Kirim Pesan</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
