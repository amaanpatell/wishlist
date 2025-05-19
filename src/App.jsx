import { useState, useEffect } from "react";

export default function App() {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  const [newWishName, setNewWishName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");

  const categories = [
    "Gadgets",
    "Travel",
    "Books",
    "Clothing",
    "Experiences",
    "Other",
  ];

  // Save to localStorage whenever wishlistItems changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const handleAddItem = () => {
    if (!newWishName.trim() || !newItemCategory) return;

    const newItem = {
      id: Date.now().toString(),
      name: newWishName,
      category: newItemCategory,
    };

    setWishlistItems((prevItems) => [...prevItems, newItem]);
    setNewWishName("");
    setNewItemCategory("");
  };

  const handleRemoveItem = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">My Wishlist</h1>

      <div className="border rounded-lg shadow-sm mb-8 p-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label
              htmlFor="item-name"
              className="text-sm font-medium text-gray-700"
            >
              Item Name
            </label>
            <input
              id="item-name"
              type="text"
              placeholder="What do you dream of having?"
              value={newWishName}
              onChange={(e) => setNewWishName(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddItem}
            disabled={!newWishName.trim() || !newItemCategory}
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition disabled:opacity-50"
          >
            Add to Wishlist
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {wishlistItems.length === 0
            ? "Your wishlist is empty"
            : `My Wishes (${wishlistItems.length})`}
        </h2>

        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <span className="inline-block mt-1 px-2 py-0.5 text-sm rounded-full bg-gray-100 text-gray-800">
                {item.category}
              </span>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
