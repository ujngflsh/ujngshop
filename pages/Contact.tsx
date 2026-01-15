import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';

const Contact: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-100 p-8 md:p-12 shadow-sm">
      <SectionHeader title="Get in Touch" subtitle="We'd love to hear from you. Send us a message!" />
      
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">First Name</label>
                <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Last Name</label>
                <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all" />
            </div>
        </div>
        
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all" />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Message</label>
            <textarea rows={5} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"></textarea>
        </div>

        <Button fullWidth size="lg">Send Message</Button>
      </form>
    </div>
  );
};

export default Contact;