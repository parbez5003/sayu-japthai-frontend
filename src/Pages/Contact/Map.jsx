const Map = () => {
    return (
        <div className="rounded-lg overflow-hidden px-1">
            <div>
                <div className="container mx-auto relative h-0 overflow-hidden mb-6 pb-[400px] lg:pb-[600px]">
                    <iframe
                        className="absolute top-0 left-0 w-full h-[500px]"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.983595190476!2d-122.2587305844436!3d47.826367979191345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549010fb82b55bdf%3A0x9b4e5d7a91b7624b!2s16717%20Alderwood%20Mall%20Pkwy%20Apt%20K401%2C%20Lynnwood%2C%20WA%2098037%2C%20USA!5e0!3m2!1sen!2sus!4v1610035984427!5m2!1sen!2sus"
                        frameBorder="0"
                        style={{ border: '0' }}
                        allowFullScreen=""
                        aria-hidden="false"
                        tabIndex="0"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Map;