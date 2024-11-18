"use client";

export default function CategorySection() {
  const categories = [
    { name: "Music", icon: "🎤" },
    { name: "Nightlife", icon: "🌐" },
    { name: "Performing & Visual Arts", icon: "🎭" },
    { name: "Holidays", icon: "📅" },
    { name: "Dating", icon: "💖" },
    { name: "Hobbies", icon: "🎮" },
    { name: "Business", icon: "💼" },
    { name: "Food & Drink", icon: "🍹" },
  ];

  return (
    <div className="bg-white py-8 mt-8">
      {" "}
      {/* Add mt-8 for margin-top */}
      <div className="container mx-auto max-w-screen-xl">
        <div className="flex justify-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Explore Categories
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center space-y-2"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full text-2xl">
                {category.icon}
              </div>
              <p className="text-gray-700 text-sm font-medium">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
