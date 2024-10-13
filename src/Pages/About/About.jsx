import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-red-600 text-white py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Welcome to Sayu Japthai</h1>
          <p className="mt-4 text-lg">
            Where Japanese precision meets Thai passion on your plate!
          </p>
        </div>
      </header>

      {/* Mission Section */}
      <section className="md:py-16 py-4 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            At Sayu Japthai, our mission is simple: to deliver an extraordinary
            dining experience by bringing together the best of Japanese and Thai
            cuisine. We blend traditional flavors with a contemporary twist,
            ensuring every bite takes you on a flavorful journey.
          </p>
          <img
            src="https://lirp.cdn-website.com/ec3815c8/dms3rep/multi/opt/Thai+Food-640w.jpg"
            alt="Sushi and Thai food"
            className="mx-auto rounded-lg shadow-lg w-full md:w-3/4 h-48 lg:h-[500px] md:h-[350px]  object-cover" // Added h-48 and object-cover
          />
        </div>
      </section>

      {/* Vision Section */}
      <section className="md:py-16 py-4 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Our Vision
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            To become the go-to restaurant for lovers of authentic Asian cuisine
            in France. At Sayu Japthai, we’re not just serving food; we’re
            crafting memorable dining experiences that keep you coming back.
            From our commitment to quality ingredients to our dedication to
            sustainable practices, we aim to delight your taste buds and your
            conscience.
          </p>
          <img
            src="https://img.freepik.com/premium-vector/shape-cooking-man-kitchen-cooking-restaurant-cook_743272-32.jpg"
            alt="Restaurant ambiance"
            className="mx-auto rounded-lg shadow-lg w-full md:w-3/4 lg:h-[500px] md:h-[350px]  h-48 object-cover" // Added h-48 and object-cover
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="md:py-16 py-4 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Our Story
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            Established in 2023, Sayu Japthai was born from a passion for both
            Japanese and Thai food. Our founders sought to create a place where
            these two unique cuisines could come together, offering something
            truly special. From sushi to pad Thai, our menu celebrates the rich
            culinary traditions of Japan and Thailand, fused in ways that
            delight and surprise.
          </p>
          <img
            src="https://img.freepik.com/free-psd/fast-food-template-design_23-2150759652.jpg"
            alt="Fusion cuisine"
            className="mx-auto rounded-lg shadow-lg w-full md:w-3/4 lg:h-[500px] md:h-[350px]  h-48  object-cover" // Added h-48 and object-cover
          />
        </div>
      </section>

      {/* Location Section */}
      <section className="md:py-16  py-4 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Visit Us
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Come and enjoy a unique culinary experience at our location in the
            heart of France. Whether you’re craving the delicate flavors of
            sushi or the bold spices of Thai curry, Sayu Japthai has something
            to satisfy every palate.
          </p>
          <address className="text-xl text-gray-800 font-semibold">
            Sayu Japthai <br />
            1234 Rue de Cuisine, Paris, France
          </address>
          <img
            src="https://img.pikbest.com/ai/illus_our/20230427/858fe448e70948c498d8de6ea34d09f2.jpg!w700wp"
            alt="Restaurant in France"
            className="mx-auto rounded-lg shadow-lg w-full md:w-3/4 lg:h-[500px] md:h-[350px] 
            h-48 object-cover mt-8" // Added h-48 and object-cover
          />
        </div>
      </section>
    </div>
  );
};

export default About;
