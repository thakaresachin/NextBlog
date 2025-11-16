const Contact = () => {
  return (
    <section className="bg-black text-white min-h-screen py-24 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center transition-all duration-700 ease-in-out">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-tight mb-4">
          Let’s <span className="text-gray-400">Connect</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          I’m always open to discussing web development projects, collaborations,
          or creative ideas. Feel free to reach out — let’s build something
          impactful together.
        </p>
      </div>

      {/* Info Section */}
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <div>
          <h2 className="text-3xl font-bold mb-2">Sachin Thakare</h2>
          <p className="text-gray-400 text-lg">
            MERN Stack Developer | Frontend Engineer 
          </p>
        </div>

        <div className="border-t border-gray-800 pt-8 space-y-3">
          <p className="text-gray-400">
            <span className="text-white font-semibold">📧 Email:</span>{" "}
            thakaresachin789@gmail.com
          </p>
          <p className="text-gray-400">
            <span className="text-white font-semibold">📞 Phone:</span>{" "}
            +91 8080235652
          </p>
          <p className="text-gray-400">
            <span className="text-white font-semibold">📍 Location:</span>{" "}
            Maharashtra, India
          </p>
          <p className="text-gray-400">
            <span className="text-white font-semibold">🎓 Education:</span>{" "}
            B.E. in Computer Engineering, P.R. Pote Patil College of Engineering and Management
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 pt-8">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-2xl transition-all duration-300"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/-sachin-thakare/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-2xl transition-all duration-300"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a
            href="mailto:thakaresachin789@gmail.com"
            className="text-gray-400 hover:text-white text-2xl transition-all duration-300"
          >
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>

        <div className="pt-10 text-sm text-gray-500 border-t border-gray-800 mt-10">
          © {new Date().getFullYear()} Sachin Thakare — All Rights Reserved
        </div>
      </div>
    </section>
  );
};

export default Contact;
