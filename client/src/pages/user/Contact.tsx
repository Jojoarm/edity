import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle, Mail, MapPin, PhoneCall } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current!,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      setForm({ firstName: '', lastName: '', tel: '', email: '', message: '' });
      toast.success('Message sent, I will respond as soon as possible');
    } catch (error) {
      console.error('EmailJS Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section bg-white w-full h-full flex-center py-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-dark-background-color text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get in Touch with
              <span className="block text-primary">Edity</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Ready to transform education? Let's discuss how we can help you
              enhance learning experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span>Expert Team</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span>Quick Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-graduation-cap text-white text-3xl font-thin"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10K+</h3>
              <p className="text-gray-600">Happy Educators</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-trophy text-3xl text-white font-thin"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-headset text-3xl text-white font-thin"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full md:px-10 px-5 bg-[#ffffff] p-6 rounded-3xl shadow-[0_0_25px_rgba(0,0,0,0.1)]">
        <div className="grid grid-cols-1 xl:grid-cols-12 justify-center items-center gap-10 mt-16">
          <div className="xl:col-span-5 min-h-96">
            <div className="bg-primary w-full h-full hover:cursor-grab rounded-3xl overflow-hidden px-4 py-7 md:px-7 md:py-12 text-white">
              <div className="flex flex-col gap-2 md:gap-6">
                <p className="md:mb-2 text-lg md:text-xl">GET IN TOUCH</p>
                <div className="mb-3 text-2xl md:mb-6 md:text-4xl font-semibold">
                  <p>
                    <i className="fas fa-comment-dots" aria-hidden="true"></i>{' '}
                    Connect with Us to Enhance Education
                  </p>
                </div>
                <div className="flex flex-col gap-3 md:gap-7">
                  <div className="mb-3 md:mb-6 flex flex-row space-x-4">
                    <div className="flex items-center justify-center border-b p-3 rounded-full shadow-whitesmoke border-whitesmoke">
                      <MapPin className="text-white-50 size-6" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-lg md:text-2xl">
                        Our Office
                      </h3>
                      <p className="text-base">Winnipeg, Canada</p>
                    </div>
                  </div>
                  <div className="mb-3 md:mb-6 flex flex-row space-x-4">
                    <div className="flex items-center justify-center border-b p-3 rounded-full shadow-whitesmoke border-whitesmoke">
                      <PhoneCall className="text-white-50 size-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg md:text-2xl">
                        Email Us
                      </h3>
                      <p className="text-base">info@edity.com</p>
                    </div>
                  </div>
                  <div className="mb-3 md:mb-6 flex flex-row space-x-4">
                    <div className="flex items-center justify-center border-b  p-3 rounded-full shadow-whitesmoke border-whitesmoke">
                      <Mail className="text-white-50  size-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg md:text-2xl">
                        Call US
                      </h3>
                      <p className="text-base">+1 647-539-1044</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-7">
            <div className="flex-center ">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="contact-form w-full flex flex-col px-10 gap-7"
              >
                <div className="w-full flex flex-col md:flex-row gap-4 space-x-10">
                  <div className="w-full">
                    <label htmlFor="firstName">Your First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="e.g. John"
                      className="text-dark-500"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="lastName">Your Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Doe"
                      className="text-dark-500"
                      required
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col md:flex-row space-y-5 space-x-10">
                  <div className="w-full">
                    <label htmlFor="email">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="yourname@example.com"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="tel">Your Phone Number</label>
                    <input
                      type="number"
                      id="tel"
                      name="tel"
                      value={form.tel}
                      onChange={handleChange}
                      placeholder="(720) 000-0000"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we assist you?"
                    rows={5}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-4 rounded-lg bg-primary text-[#ffffff] max-w-[250px] text-sm font-semibold uppercase hover:bg-primary-200 cursor-pointer text-center"
                >
                  <p className="text">
                    {loading ? 'Sending...' : 'Send Your Message'}
                  </p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
