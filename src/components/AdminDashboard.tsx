export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      {/* ✅ 1. Section: Stats Summary */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-blue-500 text-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">1,245</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">New Orders</h2>
          <p className="text-2xl font-bold">98</p>
        </div>
        <div className="p-4 bg-red-500 text-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Pending Requests</h2>
          <p className="text-2xl font-bold">15</p>
        </div>
      </div>

      {/* ✅ 2. Section: Recent Activity */}
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          <li className="p-2 border-b">🔹 User JohnDoe registered.</li>
          <li className="p-2 border-b">🔹 Order #1234 was placed.</li>
          <li className="p-2 border-b">🔹 System update completed.</li>
          <li className="p-2">🔹 New feedback received.</li>
        </ul>
      </div>

      {/* ✅ 3. Section: Mockup Chart (Placeholder) */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Sales Performance</h2>
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded">
          📊 (Chart Placeholder)
        </div>
      </div>
    </div>
  );
}
