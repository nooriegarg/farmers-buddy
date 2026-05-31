const Loader = ({ text = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-3" />
    <p className="text-gray-500 text-sm">{text}</p>
  </div>
);
export default Loader;