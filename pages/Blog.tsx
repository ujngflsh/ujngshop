import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';

const Blog: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <SectionHeader title="Our Blog" subtitle="Stories about design, minimalism, and lifestyle." />
      
      <div className="grid gap-8">
        {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col md:flex-row hover:shadow-md transition-shadow cursor-pointer group">
                <div className="md:w-1/3 aspect-video md:aspect-auto bg-slate-200 relative overflow-hidden">
                    <img src={`https://picsum.photos/id/${10 + item}/800/600`} alt="Blog post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-8 md:w-2/3 flex flex-col justify-center">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Lifestyle</span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">The Art of Minimalist Living in 2024</h3>
                    <p className="text-slate-500 mb-4 line-clamp-2">
                        Discover how stripping away the non-essential can lead to a more meaningful and productive life. We explore tips and tricks for decluttering your physical and digital space.
                    </p>
                    <span className="text-sm text-slate-400 font-medium">Read more &rarr;</span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;