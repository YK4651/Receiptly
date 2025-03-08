const Menu = ({ selectedCategory, setSelectedCategory }) => {
    const categories = [
      "Financial",
      "Customer & Market",
      "Growth & Performance",
      "Operational Efficiency",
      "Investor-Specific",
    ];
  
    return (
      <div className="flex space-x-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1.5 rounded-md ${
              selectedCategory === category ? "bg-blue-200/50 text-[#2A34D1]" : "bg-white text-[#4B5565]"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            <span className="text-sm font-medium">{category}</span>
          </button>
        ))}
      </div>
    );
  };
  
  export default Menu;
  