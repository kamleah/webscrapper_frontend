const Preloader = () => {

    return (
        <div className="flex justify-center items-center h-screen flex-col space-y-6 ">
            <div className="loader"></div>
            <div className="font-bold tracking-widest font-tb text-2xl">Loading...</div>
        </div>
    );
};

export default Preloader;
