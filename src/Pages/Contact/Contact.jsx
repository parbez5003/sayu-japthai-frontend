import Map from "./Map";

const Contact = () => {
  return (
    <div className="mb-16">
      <section className="">
        <div className="max-w-7xl mx-auto pt-16 px-4 sm:px-6 lg:pt-20 lg:px-8">
          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Visit Our{" "}
              <span className="bg-red-600 text-white px-3 rounded">USA</span>{" "}
              Office
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="mt-10 lg:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2">
                <Map />
              </div>
              <div>
                <div className="max-w-full mx-auto rounded-lg overflow-hidden -mt-10 md:mt-0">
                  <div className="px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Our Address
                    </h3>
                    <p className="mt-1 text-gray-600">
                      {" "}
                      16717 Alderwood Mall Pkwy Apt K401, Lynnwood, WA 98037, US
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                    <p className="mt-1 text-gray-600">
                      Monday - Friday: 9am - 5pm
                    </p>
                    <p className="mt-1 text-gray-600">Saturday: 10am - 4pm</p>
                    <p className="mt-1 text-gray-600">Sunday: Closed</p>
                  </div>
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Contact
                    </h3>
                    <p className="mt-1 text-gray-600">
                      Email: info@example.com
                    </p>
                    <p className="mt-1 text-gray-600">Phone: +1 23494 34993</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
