import React from 'react';
import { Award, Users, Leaf, Truck } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Every piece is crafted with the finest materials and attention to detail.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Your satisfaction drives everything we do. We are here for you at every step.',
  },
  {
    icon: Leaf,
    title: 'Sustainable',
    description: 'We source responsibly and prioritize eco-friendly materials and processes.',
  },
  {
    icon: Truck,
    title: 'Reliable Delivery',
    description: 'White-glove delivery and setup service to every room in your home.',
  },
];

const teamMembers = [
  {
    name: 'Sarah Mitchell',
    role: 'Founder & Creative Director',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'James Okafor',
    role: 'Head of Design',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Elena Vasquez',
    role: 'Customer Experience Lead',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[480px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="FurnStore showroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">About FurnStore</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              We believe great furniture transforms a house into a home. Since 2010, we have been
              curating premium pieces for modern living.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                FurnStore began with a simple idea: everyone deserves beautiful, well-made furniture
                without the hassle. What started as a small showroom in Design City has grown into a
                destination for homeowners who refuse to compromise on quality or style.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We partner directly with master craftsmen and sustainable manufacturers across the
                globe, ensuring every piece that arrives at your door meets our exacting standards.
                Our curators travel the world to source materials and designs that stand the test
                of time.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-900">15+</p>
                  <p className="text-gray-600 mt-1">Years in business</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-900">50k+</p>
                  <p className="text-gray-600 mt-1">Happy customers</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-900">500+</p>
                  <p className="text-gray-600 mt-1">Curated products</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Elegant living room"
                className="rounded-lg w-full h-56 object-cover"
              />
              <img
                src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Cozy bedroom"
                className="rounded-lg w-full h-56 object-cover mt-8"
              />
              <img
                src="https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Dining room"
                className="rounded-lg w-full h-56 object-cover"
              />
              <img
                src="https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Home office"
                className="rounded-lg w-full h-56 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">What We Stand For</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our values guide every decision, from the suppliers we choose to the way we treat
              every customer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="bg-white rounded-xl p-8 shadow-sm text-center">
                  <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Showroom Banner */}
      <section className="relative h-72 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="FurnStore collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-3">Visit Our Showroom</h2>
            <p className="text-lg text-gray-200">
              123 Furniture St, Design City, DC 12345 — Open Mon–Sat 9am–7pm
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Passionate people dedicated to bringing beauty into your home.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 shadow-md"
                />
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
