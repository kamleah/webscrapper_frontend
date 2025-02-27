const TextInputWithLabel = ({ label, placeholder, required, value, onChange }) => {
    return (
        <div className="relative w-full">
            <label className="absolute -top-2 left-3 bg-white px-1 text-gray-700 text-sm font-medium">
                {label} {required && "*"}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full text-sm border rounded-md px-4 py-3 focus:outline-blue-400"
            />
        </div>
    );
};
export default TextInputWithLabel