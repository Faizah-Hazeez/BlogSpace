function HeroSection() {
  return (
    <main className="lg:pl-20 lg:px-10 px-5 flex lg:items-center flex-col lg:flex-row font-default-family py-4">
      <div className="space-y-5 lg:w-1/2 w-full" data-aos="fade-right">
        <h1 className="lg:text-4xl text-2xl font-bold">
          Your Voice. <span className="text-blue-400"> Your Stories.</span> Your
          Blog.
        </h1>
        <p className="lg:text-xl text-lg">
          {" "}
          Write effortlessly with the power of AI whether you're sharing
          personal stories, tutorials, or opinions, our smart blog generator
          helps you craft engaging posts in just a few clicks, so you can focus
          on what matters most: your voice.
        </p>
      </div>
      <div className="lg:w-1/2" data-aos="fade-left">
        <img src="/blog.jpg" alt="" />
      </div>
    </main>
  );
}

export default HeroSection;
