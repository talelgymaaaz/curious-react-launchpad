
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { trackVisitor } from '@/utils/visitorTracking';

const Contact = () => {
  useEffect(() => {
    trackVisitor('Contact');
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-white pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-serif text-slate-900 mb-8">Contact Us</h1>
          <p className="text-slate-600">Contact page content goes here...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
